import { useState, useEffect } from 'react';
import DiscordWidget from './DiscordWidget';

const socials = [
  { label: 'X / Twitter', username: 'sudoloser', href: 'https://x.com/sudoloser' },
  { label: 'Reddit', username: 'Agreeable_Elk2698', href: 'https://www.reddit.com/u/Agreeable_Elk2698/s/8ZkJPOBUuV' },
  { label: 'TikTok', username: 'asnced', href: 'https://tiktok.com/@asnced' },
  { label: 'Instagram', username: 'huxhml', href: 'https://instagram.com/huxhml' },
];

const HomeTab = () => (
  <>
    <div className="sl-hero">
      <div className="pictochat-message">
        <header className="ds-slate-50">terminal</header>
        <span>
          $ echo "Hi, I'm sudoloser"
          <br />
          Hi, I'm sudoloser
        </span>
      </div>

      <div className="ds-grid sl-hero-clock" style={{ width: 'fit-content' }}>
        <ds-clock hide-border style={{ '--color': 'var(--color-ds-slate)' } as React.CSSProperties} />
      </div>
    </div>

    <div className="info">
      <div className="info-square">
        <img src="https://github.com/sudoloser.png" alt="sudoloser avatar" width={64} height={64} />
      </div>
      <div className="info-container">
        <div className="info-label ds-turquoise">📍 USA</div>
        <div className="info-text">
          young developer trying to make the most of my time. find me around the web below.
        </div>
      </div>
    </div>

    <div className="sl-social-list">
      {socials.map((social) => (
        <div key={social.label} className="pictochat-message sl-float">
          <header className="ds-orange-50">{social.label}</header>
          <div className="sl-social-row">
            <span>{social.username}</span>
            <a href={social.href} target="_blank" rel="noreferrer">
              visit →
            </a>
          </div>
        </div>
      ))}
    </div>

    <DiscordWidget />
  </>
);

export default HomeTab;
