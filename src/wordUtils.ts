import { RichLetter } from "./LetterRow";
import { State } from "./Letter";

/** Return the answer of the day. */
const getAnswer = () => {
  // TODO replace with proper getter
  return "JAJCO";
};

/** Get word from a row, while ignoring blank character. */
const getWordFromRow = (row: RichLetter[], blank: string): string => {
  return row
    .filter((e) => e.letter !== blank)
    .map((e) => e.letter)
    .join("");
};

const compareWordsAsRichLetter = (
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

export { getAnswer, getWordFromRow, compareWordsAsRichLetter };
