import { useState, useEffect } from 'react';

const games = [
  { name: 'Minecraft', icon: '/images/icons/minecraft.png' },
  { name: 'NTE', icon: '/images/icons/nte.png' },
  { name: 'Fortnite', icon: '/images/icons/fortnite.png' },
  { name: 'R6 Siege', icon: '/images/icons/r6s.png' },
];

const AboutTab = () => {
  const [showGames, setShowGames] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!showGames) {
      timer = setTimeout(() => setShowHint(true), 5000);
    } else {
      setShowHint(false);
    }
    return () => clearTimeout(timer);
  }, [showGames]);

  return (
    <>
      <div className="info">
        <div className="info-square">
          <img src="https://github.com/sudoloser.png" alt="sudoloser avatar" width={64} height={64} />
        </div>
        <div className="info-container">
          <div className="info-label ds-green">about me</div>
          <div className="info-text">
            Hi, I'm sudoloser. A young developer trying to make the most of my time.
          </div>
        </div>
      </div>

      <div className="sl-about-stage">
        {!showGames ? (
          <div className="sl-phone" onClick={() => setShowGames(true)}>
            <p style={{ fontWeight: 'bold' }}>Motorola G stylus 2024</p>
            <img src="/images/phone.png" alt="Phone" className="sl-device" />
            {showHint && <span className="sl-hint">👆</span>}
            <div className="sl-os-note">
              <img src="/images/icons/derpfest.png" alt="OS" />
              <span>Hello Moto OS (Android 15), former DerpFest user.</span>
            </div>
          </div>
        ) : (
          <div className="sl-games" onClick={() => setShowGames(false)}>
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontWeight: 'bold' }}>
              Favorite Games (tap to return)
            </p>
            {games.map((game) => (
              <div key={game.name} className="sl-game">
                <div className="info-square">
                  <img src={game.icon} alt={game.name} />
                </div>
                <span>{game.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <details>
        <summary>hardware</summary>
        <p>The DS Lite Is An Insane Budget System For 2026. Did You Know? Modding A 3DS Is Surprisingly Easy</p>
      </details>

      <ds-calendar />
    </>
  );
};

export default AboutTab;
