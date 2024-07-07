import { RichLetter } from "./LetterRow";
import { State } from "./Letter";

/** Get word from a row, while ignoring blank character. */
export const getWordFromRow = (row: RichLetter[], blank: string): string => {
  return row
    .filter((e) => e.letter !== blank)
    .map((e) => e.letter)
    .join("");
};

export const compareWordsAsRichLetter = (
  word: string,
  answer: string
): RichLetter[] => {
  return Array.from(word).map((wordLetter, i): RichLetter => {
    let state = State.Vanilla;
    if (answer.at(i) === wordLetter) {
      state = State.Found;
    } else if (answer.indexOf(wordLetter) >= 0) {
      state = State.Somewhere;
    } else {
      state = State.Nowhere;
    }
    return {
      letter: wordLetter,
      state,
    };
  });
};
