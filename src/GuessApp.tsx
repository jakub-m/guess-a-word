import {useState} from 'react';
import './App.css';
import { Keyboard, KeyboardHandleClickArgs } from './Keyboard';
import { Grid } from './Grid';
import { RichLetter } from './LetterRow';
import './globals'
import { compareWordsAsRichLetter, getWordFromRow } from './wordUtils';
import { State } from './Letter';
import { useSearchParamsValue } from './useStateParamsHook';
import { decodeB64, encodeB64 } from './encoding';

const charBlank = ' '
const answerLength = 5
const nRows = 6
const paramWord="w"
const defaultEncodedAnswer = encodeB64("KONIK")

const getEmptyGrid = (): RichLetter[][] => {
  const getRow = () => {
    const a = [] as RichLetter[]
    for (let i = 0; i < answerLength; i++) {
        a.push({letter: charBlank})
    }
    return a
  }

  const grid: RichLetter[][] = []

  for (let i = 0; i < nRows; i++) {
    grid.push(getRow())
  }
  return grid
}

const maxState = (a: State, b: State | undefined): State => {
  if (!b) {
    return a
  }
  if (a > b) {
    return a
  }
  return b
}

const getStateMapFromRows = (rows: RichLetter[][]): {[letter: string]: State} => {
  const mapping: {[letter: string]: State} = {}
  rows.flatMap((row) => row).forEach((rl) => {
    const v = mapping[rl.letter]
    if (v) {
        mapping[rl.letter] = maxState(v, rl.state)
    } else {
      if (rl.state) {
        mapping[rl.letter] = rl.state
      }
    }
  })
  return mapping
}

export const GuessApp = () => {
  const [grid, setGrid] = useState(getEmptyGrid())
  const encodedAnswer = useSearchParamsValue(paramWord, defaultEncodedAnswer)
  // If activeRowIndex is >= grid.length, it means that the user already hit enter at the final row.
  const [activeRowIndex, setActiveRowIndex] = useState(0)

  const handleKeyboardClick = ({letter, isBackspace, isReturn}: KeyboardHandleClickArgs) => {
    if (activeRowIndex >= grid.length) {
      // Return after the last row was hit.
      return
    }

    const row = grid[activeRowIndex]

    if (isBackspace) {
      const i = row.findLastIndex((e) => e.letter !== charBlank)
      if (i === -1) {
        return
      }
      row[i] = {letter: charBlank}
      grid[activeRowIndex] = row
      setGrid([...grid])

    } else if (isReturn) {
      const currentWord = getWordFromRow(row, charBlank)
      if (currentWord.length !== answerLength) {
        return
      }
      const newRow = compareWordsAsRichLetter(currentWord, decodeB64(encodedAnswer))
      setActiveRowIndex(activeRowIndex+1)
      grid[activeRowIndex] = newRow
      setGrid([...grid])

    } else {
      const i = row.findIndex((e) => e.letter === charBlank)
      if (i === -1) {
        return
      }
      row[i] = {letter}
      grid[activeRowIndex] = row
      setGrid([...grid])
    }
  }

  const mapping = getStateMapFromRows(grid)
  const getLetterState = (letter: string): State => {
    return mapping[letter]
  }

  return (
    <>
      <Grid rows={grid} />
      <div style={{height: '2rem'}}></div>
      <Keyboard handleClick={handleKeyboardClick} getLetterState={getLetterState}/>
    </>
  )
}