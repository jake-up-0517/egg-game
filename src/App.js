import React, { useState, useEffect, useRef } from 'react';
import './styles/app.css';
import EggBasket from './components/EggBasket';
import EggGuy from './components/EggGuy';
import Egg from './components/Egg';
import Modal from './components/Modal';
import border from './images/Border-Lines.png';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eatAnimation, setEatAnimation] = useState(false);
  const [buyEggsModalContent, setBuyEggsModalContent] = useState(false); //boolean to display modal to buy eggs
  const [displayEggs, setDisplayEggs] = useState(false); //boolean to display number of eggs in basket
  const [eggX, setEggX] = useState(null);
  const [eggY, setEggY] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null); //number of eggs eaten shown on modal
  const [targetEggs, setTargetEggs] = useState(10); //number of eggs eaten before modal opens
  const currentEggsEaten = useRef(0); //actual number of eggs eaten in current cycle
  const totalEggsEaten = useRef(0); //actual number of eggs eaten overall
  const remainingEggs = useRef(0); //shown after eggs are 'bought'

  useEffect(() => {
    const generateRandomNumber = (min, max) => {
      if (isModalOpen === false) {
        return Math.floor(Math.random() * (max - min) + min);
      }
    };

    const handleMouseDown = (event) => {
      const elem = document.getElementById('egg-basket');
      const rect = elem.getBoundingClientRect();
      setEggX(event.clientX - rect.width / 2);
      setEggY(event.clientY - rect.height / 2);
      if (
        event.clientX >= rect.x &&
        event.clientX <= rect.x + rect.width &&
        event.clientY >= rect.y &&
        event.clientY <= rect.y + rect.height &&
        isModalOpen === false
      ) {
        setEggX(event.clientX);
        setEggY(event.clientY);
        setIsVisible(true);
        document.addEventListener('mousemove', handleMouseMove);
      }
    };

    const handleMouseUp = (event) => {
      const elem = document.getElementById('egg-guy');
      const rect = elem.getBoundingClientRect();
      if (
        event.clientX >= rect.x &&
        event.clientX <= rect.x + rect.width &&
        event.clientY >= rect.y &&
        event.clientY <= rect.y + rect.height &&
        isModalOpen === false
      ) {
        currentEggsEaten.current = currentEggsEaten.current + 1;
        totalEggsEaten.current = totalEggsEaten.current + 1;
        setEatAnimation(true);
      }
      if (!displayEggs && totalEggsEaten.current >= 30) {
        setBuyEggsModalContent(true);
        setIsModalOpen(true);
      }
      if (currentEggsEaten.current >= targetEggs) {
        setRandomNumber(generateRandomNumber(1, 7));
        setIsModalOpen(true);
        setTimeout(() => {
          currentEggsEaten.current = 0;
          setTargetEggs(generateRandomNumber(10, 15));
          setIsModalOpen(false);
        }, 2500);
      }
      if (displayEggs) {
        remainingEggs.current = remainingEggs.current - 1;
      }
      if (displayEggs && remainingEggs.current <= 0) {
        setBuyEggsModalContent(true);
        setIsModalOpen(true);
        remainingEggs.current = 0;
      }
      if (remainingEggs.current === 79) {
        remainingEggs.current = 40;
      }
      if (remainingEggs.current === 39) {
        setIsModalOpen(true);
        setRandomNumber(41);
        setTimeout(() => {
          currentEggsEaten.current = 0;
          setTargetEggs(generateRandomNumber(10, 15));
          setIsModalOpen(false);
        }, 2500);
      }
      setIsVisible(false);
      document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseMove = (event) => {
      const elem = document.getElementById('egg');
      const rect = elem.getBoundingClientRect();
      setEggX(event.clientX - rect.width / 2);
      setEggY(event.clientY - rect.height / 2);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isModalOpen]);

  return (
    <div className="App">
      <div className="game-container">
        <div className="heading-title">
          <div className="border-lines-container">
            <img
              className="border-lines-image"
              src={border}
              alt="border lines"
            />
          </div>
          <div className="title">FEED EGGS</div>
        </div>
        <div className="game-wrapper">
          <Egg isVisible={isVisible} x={eggX} y={eggY} />
          <EggGuy
            isVisible={isVisible}
            eatAnimation={eatAnimation}
            setEatAnimation={setEatAnimation}
          />
          <EggBasket remainingEggs={remainingEggs} displayEggs={displayEggs} />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          randomNumber={randomNumber}
          setIsModalOpen={setIsModalOpen}
          buyEggsModalContent={buyEggsModalContent}
          setBuyEggsModalContent={setBuyEggsModalContent}
          currentEggsEaten={currentEggsEaten}
          totalEggsEaten={totalEggsEaten}
          setDisplayEggs={setDisplayEggs}
          remainingEggs={remainingEggs}
        />
      )}
    </div>
  );
}

export default App;
