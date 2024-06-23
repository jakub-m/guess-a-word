import React from 'react';
import { LetterRow, RichLetter } from './LetterRow';

interface GridProps {
    rows: RichLetter[][]
}

const Grid: React.FC<GridProps> = ({rows}) => {
  const letterRows = rows.map((row, i) => 
    {
        return (<LetterRow letters={row} key={i}/>)
    }
)
  return (
    <>
      {letterRows}
    </>
  );
}

export { Grid };
export type { GridProps };