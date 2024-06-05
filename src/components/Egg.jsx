import '../styles/egg.css';
import egg from '../images/egg.png';

export default function Egg({ isVisible, x, y }) {
  return (
    isVisible && (
      <div
        id="egg"
        className="egg-container"
        style={{ left: x, top: y, position: 'absolute' }}
      >
        <img className="egg-image" src={egg} alt="egg" />
      </div>
    )
  );
}
