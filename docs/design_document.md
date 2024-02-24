# Hangman Web Game Version

## Introduction
Hangman is a classic word guessing game where players attempt to guess a secret word one letter at a time. Each incorrect guess results in a part of a stick figure being drawn on the gallows. The objective is to guess the word before the entire stick figure is drawn.

## Goals
The goal of this project is to develop a web-based version of the Hangman game that provides an enjoyable and intuitive user experience.

## Features
- **Word Selection**: Random selection of words from a predefined list.
- **Interactive Interface**: User-friendly interface for guessing letters and displaying progress.
- **Visual Feedback**: Display of the hangman's progress based on incorrect guesses.


## Design

### Colors
- **Background 1**: #00ffff
- **Background 2**: #ffffff
- **Text**: #333333 (others), #05bc05 (win message), #ff0000 (lose message)
- **Buttons**: #808080 (Disabled), #ffffff (active), #00ffff (background active), #efefef (background disabled)
- **Hangman Parts**: #000000
- **Keyboard Tiles**: #808080 (Disabled), #ffffff (active)

### Layout
The game interface will consist of the following elements:
1. **Header**: Displaying the game title.
2. **Word Category Display Area**: Asking you what type of word you want to guess.
3. **Word Display Area**: Showing the secret word with blanks for each letter.
4. **Hangman Visual**: Displaying the hangman's progress based on incorrect guesses.
5. **Letter Selection Area**: A grid of buttons representing the alphabet for the user to choose from.

### Flow
1. The game starts by selecting a predefined niche from which we will generate a random word.
2. The secret word is displayed with blanks (dashes) representing each letter.
3. The user selects a letter from the alphabet grid.
   - If the letter is correct, it fills in the corresponding blanks in the word display.
   - If the letter is incorrect, a part of the hangman is drawn.
4. Steps 3 and 4 repeat until the user either guesses the word correctly or the hangman is fully drawn.
5. If the user wins, display a victory message with the option to play again.
6. If the user loses, display a defeat message with the correct word and the option to play again.

## Technologies
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Not required for basic functionality, but could be added for features like user authentication and scoring persistence.

## Conclusion
The Hangman game web version aims to provide an entertaining and engaging experience for users while maintaining the classic gameplay mechanics. With its simple yet intuitive design, players can enjoy the challenge of guessing words while avoiding the grim fate of the hangman.