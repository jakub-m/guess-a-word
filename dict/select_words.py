import sys
import argparse
from pathlib import Path


def main():
    word_length = 5
    illegal_chars = ".- "

    input_path = Path("sjp-odm-20240624/odm.txt")
    #input_path = Path("pop.txt")
    words = load_words(input_path)

    # ignore words with space
    words = [w for w in words if set(w) & set(illegal_chars) == set()]
    # proper len
    words = [w for w in words if len(w) == word_length]

    for w in sorted(set(words)):
        print(w)


def load_words(input_path):
    words = []
    with input_path.open() as r:
        for line in r:
            words += [w.strip() for w in line.split(",")]
    return words


main()
