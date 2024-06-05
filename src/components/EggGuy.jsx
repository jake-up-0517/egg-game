import { useEffect } from 'react';
import anime from 'animejs';
import '../styles/eggGuy.css';
import openMouthDown from '../images/egg-guy-open-mouth.png';
import openMouthUp from '../images/egg-guy-open-mouth-up.png';
import closedEyes from '../images/egg-guy-closed-eyes.png';
import mouth from '../images/Chewing-Mouth.png';

export default function EggGuy({ isVisible, eatAnimation, setEatAnimation }) {
  const src = isVisible ? openMouthUp : openMouthDown;

  useEffect(() => {
    if (eatAnimation) {
      anime({
        targets: '.guy-mouth',
        width: ['10%', '5%'],
        duration: 100,
        direction: 'alternate',
        easing: 'easeInOutSine',
        loop: 5,
        complete: () => {
          setEatAnimation(false);
        },
      });
    }
  }, [eatAnimation]);

  if (eatAnimation) {
    return (
      <div id="egg-guy" className="guy-container">
        <img className="guy-body" src={closedEyes} alt="egg guy chewing body" />
        <img className="guy-mouth" src={mouth} alt="egg guy chewing mouth" />
      </div>
    );
  }
  return (
    <div id="egg-guy" className="guy-container">
      <img className="guy-image" src={src} alt="egg guy open mouth down" />
    </div>
  );
}
