import { create } from 'zustand';

interface AudioState {
  isMuted: boolean;
  isMusicPlaying: boolean;
  isVoicePlaying: boolean;
  setMuted: (muted: boolean) => void;
  setMusicPlaying: (playing: boolean) => void;
  setVoicePlaying: (playing: boolean) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isMuted: false,
  isMusicPlaying: false,
  isVoicePlaying: false,
  setMuted: (muted) => set({ isMuted: muted }),
  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),
  setVoicePlaying: (playing) => set({ isVoicePlaying: playing }),
}));
