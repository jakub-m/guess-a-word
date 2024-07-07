import {useState} from 'react';
import './App.css';
import { Keyboard, KeyboardHandleClickArgs } from './Keyboard';
import { LetterRow, stringToRichText } from './LetterRow';
import { getWordFromRow } from './wordUtils';
import { useNavigate } from 'react-router-dom';
import { encodeB64 } from './encoding';

const nLetters = 5
const blank = " "

export const ProposeApp = () => {
  const [proposed, setProposed] = useState(stringToRichText(blank.repeat(nLetters)))
  const navigate = useNavigate()
  const handleKeyboardClick = ({letter, isBackspace, isReturn}: KeyboardHandleClickArgs) => {
    if (isBackspace) {
      const i = proposed.findLastIndex((rl) => rl.letter !== blank)
      if (i === -1) {
        return
      }
      const newProposed = [...proposed]
      newProposed[i] = {letter: blank}
      setProposed(newProposed)
    } else if (isReturn) {
      const word = getWordFromRow(proposed, blank)
      if (word.length !== nLetters) {
        return
      }
      navigate("?p=guess&w=" + encodeB64(word))
    } else if (letter) {
      const i = proposed.findIndex((rl) => rl.letter === blank)
      if (i === -1) {
        return
      }
      const newProposed = [...proposed]
      newProposed[i] = {letter}
      setProposed(newProposed)
    }
  }
  return (
    <>
      <LetterRow letters={proposed}/>
      <div style={{height: '2rem'}}></div>
      <Keyboard handleClick={handleKeyboardClick} />
    </>
  )
}