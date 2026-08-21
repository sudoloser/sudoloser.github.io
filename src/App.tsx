import { useState, useEffect, useRef } from 'react';
import Intro from './components/Intro';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import BottomBar from './components/BottomBar';
import HomeTab from './components/HomeTab';
import ReposTab from './components/ReposTab';
import AboutTab from './components/AboutTab';

export type TabId = 'home' | 'repos' | 'about';

const TRACKS = ['/audio/music/lofi-1.mp3', '/audio/music/lofi-2.mp3', '/audio/music/lofi-3.mp3'];

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!introDone) return;
    const audio = new Audio(TRACKS[trackIndex]);
    audio.loop = true;
    audio.volume = 0.4;
    audio.addEventListener('loadedmetadata', () => setAudioDuration(audio.duration || 0));
    audio.addEventListener('timeupdate', () => setAudioTime(audio.currentTime || 0));
    musicRef.current?.pause();
    musicRef.current = audio;
    setAudioTime(0);
    setAudioDuration(0);
    return () => {
      audio.pause();
    };
  }, [introDone, trackIndex]);

  useEffect(() => {
    const audio = musicRef.current;
    if (!audio || !introDone) return;
    if (isMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => console.log('music play blocked'));
    }
  }, [isMuted, introDone, trackIndex]);

  const skipTrack = (dir: 1 | -1) =>
    setTrackIndex((i) => (i + dir + TRACKS.length) % TRACKS.length);

  return (
    <>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}

      <header className="sl-topbar bar ds-slate">
        <TopBar />
      </header>

      <nav className="sl-nav">
        <NavBar activeTab={activeTab} onTabChange={setActiveTab} />
      </nav>

      <main className="sl-main">
        <div className="sl-paper ds-grid">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'repos' && <ReposTab />}
          {activeTab === 'about' && <AboutTab />}
        </div>
      </main>

      <footer className="sl-bottombar bar-lg-reverse ds-slate">
        <BottomBar
          isMuted={isMuted}
          onMuteToggle={() => setIsMuted(!isMuted)}
          onPrevTrack={() => skipTrack(-1)}
          onNextTrack={() => skipTrack(1)}
          audioTime={audioTime}
          audioDuration={audioDuration}
        />
      </footer>
    </>
  );
}

export default App;
