import React from 'react';
import './Letter.css';

/** The order has meaning when comparing the states to leave the "larger" state visible on the Keyboard. */
enum State {
  Vanilla,
  Nowhere,
  Somewhere,
  Found,
}

interface LetterProps {
  letter: string;
  state?: State;
  handleClick?: (args: {letter: string}) => void
}

const stateClasses: {[key in State]: string} = {
  [State.Vanilla]: 'vanilla',
  [State.Somewhere]: 'somewhere',
  [State.Nowhere]: 'nowhere',
  [State.Found]: 'found',
}

const Letter: React.FC<LetterProps> = ({ letter, handleClick, state = State.Vanilla }) => {
  const stateClass = stateClasses[state]
  const internalHandleClick = () => {
    if (!handleClick) {
      return
    }
    handleClick({letter})
  }

  return (
    <div className={`letter ${stateClass}`} onClick={internalHandleClick}>
      {letter}
    </div>
  );
}

export { Letter, State};
export type { LetterProps };

