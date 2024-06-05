import '../styles/eggBasket.css';
import basket from '../images/egg-basket.png';

export default function EggBasket({ remainingEggs, displayEggs }) {
  return (
    <div id="egg-basket" className="basket-container">
      <img className="basket-image" src={basket} alt="basket full of eggs" />
      {displayEggs && <div>EGGS: {remainingEggs.current}</div>}
    </div>
  );
}
