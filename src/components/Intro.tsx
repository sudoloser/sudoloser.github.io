import { useState } from 'react';

const words = ['Hi', "I'm", 'sudoloser'];
const wordColors = ['ds-turquoise', 'ds-yellow', 'ds-orange'];

const Intro = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    if (step < words.length) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="sl-intro ds-grid" onClick={handleClick}>
      <div className="sl-intro-words">
        {words.map((word, i) => (
          <span
            key={word}
            className={`sl-intro-word ${wordColors[i]} ${i < step ? 'sl-shown' : ''}`}
          >
            {word}
          </span>
        ))}
      </div>

      {step === 0 && (
        <div className="alert">
          <div className="loading-container">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`loading-${i + 1}`} />
            ))}
          </div>
          <span>Touch the screen to start.</span>
          <div className="loading-container">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`loading-${i + 1}`} />
            ))}
          </div>
        </div>
      )}

      {step > 0 && step < words.length && (
        <span className="sl-intro-hint">touch to continue</span>
      )}
      {step === words.length && (
        <button className="button-lg" onClick={onFinish}>
          START
        </button>
      )}
    </div>
  );
};

export default Intro;
