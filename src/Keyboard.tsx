import React from 'react';
import { LetterRow, RichLetter, LetterRowHandleClickArgs } from './LetterRow';
import { State } from './Letter';

const alphabetPolish = 'aąbcćdeęfghijklłmnńoóprsśtuwyzźż'

const charReturn = "⏎"
const charBackspace = "⌫"

interface KeyboardProps {
    alphabet?: string
    handleClick?: (args: KeyboardHandleClickArgs) => void
    getLetterState?: (letter: string) => State
}

interface KeyboardHandleClickArgs {
    /** If the clicked key is special, then the letter is "". */
    letter: string
    isReturn: boolean
    isBackspace: boolean
}

const Keyboard: React.FC<KeyboardProps> = ({handleClick, getLetterState, alphabet = alphabetPolish}) => {
  const getLetterState2 = getLetterState || (() => State.Vanilla)
  const allKeys = charBackspace + alphabet + charReturn
  const keys: RichLetter[] = Array.from(allKeys.toUpperCase()).map(
    (letter): RichLetter => {
      const state = getLetterState2(letter)
      return {letter, state}
    }
  )

  const internalHandleClick = ({letter}: LetterRowHandleClickArgs) => {
    if (!handleClick) {
        return
    }
    const isBackspace = letter === charBackspace
    const isReturn = letter === charReturn
    let letterNoSpecial = letter
    if (isBackspace || isReturn) {
      letterNoSpecial = ""
    }
    handleClick({
        letter: letterNoSpecial,
        isBackspace,
        isReturn,
    })
  }

  return (
      <LetterRow letters={keys} handleClick={internalHandleClick}/>
  );
}

export { Keyboard };
export type { KeyboardProps, KeyboardHandleClickArgs };

