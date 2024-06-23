import React from 'react';
import { Letter, State } from './Letter';
import './LetterRow.css'

interface LetterRowProps {
  letters: RichLetter[]
  handleClick?: (args: LetterRowHandleClickArgs) => void
}

interface RichLetter {
  letter: string
  state?: State
}

interface LetterRowHandleClickArgs {
  /** Letter clicked */
  letter: string
  /** Letter key */
  i: number
}

export const LetterRow: React.FC<LetterRowProps> = ({ letters, handleClick }) => {
  const internalHandleClick = (letter: string, i: number) => {
    if (!handleClick) {
      return
    }
    handleClick({letter, i})
  }
  return (
    <div className="letter-row">
      {letters.map((rl, i) => (
        <Letter
          key={i}
          letter={rl.letter}
          state={rl.state}
          handleClick={({letter}) => {internalHandleClick(letter, i)}}/>
        ))}
    </div>
  );
}

export const stringToRichText = (s: string): RichLetter[] => {
  return [...s].map((letter) => {return {letter}})
}

export type { LetterRowProps, RichLetter, LetterRowHandleClickArgs };