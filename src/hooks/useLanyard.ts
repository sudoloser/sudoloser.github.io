import { useEffect, useState } from 'react';

export interface LanyardUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

export interface LanyardActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
}

export interface LanyardSpotify {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

export interface LanyardData {
  discord_user: LanyardUser;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
}

const LANYARD_ID = '752899252866515025';

export const avatarUrl = (user: LanyardUser) => {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  }
  const index = (BigInt(user.id) >> BigInt(22)) % BigInt(6);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
};

export const useLanyard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    const startPolling = () => {
      if (poll) return;
      const fetchRest = async () => {
        try {
          const res = await fetch(`https://api.lanyard.rest/v1/users/${LANYARD_ID}`);
          const json = await res.json();
          if (json.success) {
            setData(json.data);
            setConnected(true);
          }
        } catch {
          setConnected(false);
        }
      };
      fetchRest();
      poll = setInterval(fetchRest, 30000);
    };

    const connect = () => {
      if (closed) return;
      try {
        ws = new WebSocket('wss://api.lanyard.rest/socket');
      } catch {
        startPolling();
        return;
      }

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.op === 1) {
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: LANYARD_ID } }));
          heartbeat = setInterval(() => {
            ws?.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval ?? 30000);
        } else if (msg.op === 0 && (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE')) {
          setData(msg.d);
          setConnected(true);
        }
      };

      ws.onerror = () => {
        ws?.close();
      };

      ws.onclose = () => {
        if (heartbeat) clearInterval(heartbeat);
        if (!closed) {
          startPolling();
          retry = setTimeout(connect, 15000);
        }
      };
    };

    connect();

    return () => {
      closed = true;
      if (heartbeat) clearInterval(heartbeat);
      if (poll) clearInterval(poll);
      if (retry) clearTimeout(retry);
      ws?.close();
    };
  }, []);

  return { data, connected };
};
