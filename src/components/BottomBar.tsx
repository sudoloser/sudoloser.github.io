const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

interface BottomBarProps {
  isMuted: boolean;
  onMuteToggle: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
  audioTime: number;
  audioDuration: number;
}

const BottomBar = ({
  isMuted,
  onMuteToggle,
  onPrevTrack,
  onNextTrack,
  audioTime,
  audioDuration,
}: BottomBarProps) => (
  <div className="sl-player">
    <button className="button-square" onClick={onPrevTrack} aria-label="Previous track">
      «
    </button>
    <button
      className="button-square"
      onClick={onMuteToggle}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? '✕' : '♪'}
    </button>
    <button className="button-square" onClick={onNextTrack} aria-label="Next track">
      »
    </button>

    {audioDuration > 0 && (
      <>
        <span className="sl-time">{formatTime(audioTime)}</span>
        <div className="sl-track">
          <div
            className="sl-track-fill"
            style={{ width: `${(audioTime / audioDuration) * 100}%` }}
          />
        </div>
        <span className="sl-time">{formatTime(audioDuration)}</span>
      </>
    )}
  </div>
);

export default BottomBar;
