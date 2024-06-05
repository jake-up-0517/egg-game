import '../styles/modal.css';
import border from '../images/Border-Lines.png';

export default function Modal({
  randomNumber,
  setIsModalOpen,
  buyEggsModalContent,
  setBuyEggsModalContent,
  currentEggsEaten,
  totalEggsEaten,
  setDisplayEggs,
  remainingEggs,
}) {
  const handleModalClose = () => {
    setIsModalOpen(false);
    setBuyEggsModalContent(false);
    setDisplayEggs(true);
    currentEggsEaten.current = 0;
    totalEggsEaten.current = 0;
    remainingEggs.current = 80;
  };

  if (buyEggsModalContent) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="model-border-lines-container">
            <img
              className="model-border-lines-image"
              src={border}
              alt="border lines"
            />
          </div>
          <div className="modal-text-container">
            <div className="text-line">Dude, you ran out of eggs.</div>
            <div className="text-line">Would you like to buy</div>
            <div className="text-line">an 80 pack of eggs?</div>
            <input
              type="text"
              className="text-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleModalClose();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="model-border-lines-container">
          <img
            className="model-border-lines-image"
            src={border}
            alt="border lines"
          />
        </div>
        <div className="modal-text-container">
          <h2>{randomNumber} EGGS</h2>
        </div>
      </div>
    </div>
  );
}
