import { useLanyard, avatarUrl } from '../hooks/useLanyard';

const statusMeta: Record<string, { label: string; color: string }> = {
  online: { label: 'Online', color: '#00a238' },
  idle: { label: 'Idle', color: '#f3e300' },
  dnd: { label: 'Do Not Disturb', color: '#fb0018' },
  offline: { label: 'Offline', color: '#808080' },
};

const activityVerb = (type: number) => {
  switch (type) {
    case 0:
      return 'Playing';
    case 1:
      return 'Streaming';
    case 2:
      return 'Listening to';
    case 3:
      return 'Watching';
    case 5:
      return 'Competing in';
    default:
      return 'Doing';
  }
};

const LoadingDots = () => (
  <div className="loading-container">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className={`loading-${i + 1}`} />
    ))}
  </div>
);

const DiscordWidget = () => {
  const { data, connected } = useLanyard();

  const customStatus = data?.activities.find((a) => a.type === 4);
  const activity = data?.activities.find((a) => a.type !== 4);
  const status = statusMeta[data?.discord_status ?? 'offline'];

  return (
    <div className="discord-widget pictochat-window">
      <div className="pictochat-message pictochat-enter-highlight">
        <header className="ds-blue-50 dw-head">
          <span className="dw-dot" style={{ backgroundColor: status.color }} />
          discord
        </header>
        <span>live presence, straight from the DS.</span>
      </div>

      {!data ? (
        <div className="pictochat-status" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <LoadingDots />
          <span>{connected ? 'syncing…' : 'connecting to lanyard…'}</span>
        </div>
      ) : (
        <>
          <div className="pictochat-message">
            <header className="ds-turquoise-50 dw-head">
              <span className="dw-dot" style={{ backgroundColor: status.color }} />
              {data.discord_user.global_name ?? data.discord_user.username}
            </header>
            <div className="dw-body">
              <div className="info-square dw-avatar">
                <img src={avatarUrl(data.discord_user)} alt="avatar" />
              </div>
              <div className="dw-lines">
                <span className="dw-name">@{data.discord_user.username}</span>
                <span className="dw-sub" style={{ color: status.color === '#808080' ? undefined : status.color }}>
                  {status.label}
                </span>
                {customStatus?.state && <span className="dw-sub">“{customStatus.state}”</span>}
              </div>
            </div>
          </div>

          {activity && (
            <div className="pictochat-message">
              <header className="ds-darkpurple-50">{activityVerb(activity.type)} {activity.name}</header>
              <span>
                {[activity.details, activity.state].filter(Boolean).join(' — ') || '\u00a0'}
              </span>
            </div>
          )}

          {data.listening_to_spotify && data.spotify && (
            <div className="pictochat-message">
              <header className="ds-green-50">spotify</header>
              <div className="dw-spotify">
                <img src={data.spotify.album_art_url} alt={`${data.spotify.album} cover`} />
                <div className="dw-lines">
                  <span className="dw-name">{data.spotify.song}</span>
                  <span className="dw-sub">by {data.spotify.artist}</span>
                  <span className="dw-sub">on {data.spotify.album}</span>
                </div>
              </div>
            </div>
          )}

          <div className="pictochat-status pictochat-exit-highlight">
            {data.discord_status === 'offline'
              ? 'now leaving..'
              : `now chatting.. via ${data.discord_user.username}`}
          </div>
        </>
      )}
    </div>
  );
};

export default DiscordWidget;
