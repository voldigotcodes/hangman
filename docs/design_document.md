# Hangman Web Game Version

## Introduction
Hangman is a classic word guessing game where players attempt to guess a secret word one letter at a time. Each incorrect guess results in a part of a stick figure being drawn on the gallows. The objective is to guess the word before the entire stick figure is drawn.

## Goals
The goal of this project is to develop a web-based version of the Hangman game that provides an enjoyable and intuitive user experience.

## Features
- **Word Selection**: Random selection of words from a predefined list.
- **Interactive Interface**: User-friendly interface for guessing letters and displaying progress.
- **Visual Feedback**: Display of the hangman's progress based on incorrect guesses.
- **Scoring System**: Keep track of scores based on the number of incorrect guesses.
- **Leaderboard**: Display the top scorers.

## Design

### Colors
- **Background**: #F0F0F0
- **Text**: #333333
- **Buttons**: #4CAF50 (Correct), #FF5722 (Incorrect)
- **Hangman Parts**: #000000
- **Letter Tiles**: #2196F3

### Layout
The game interface will consist of the following elements:
1. **Header**: Displaying the game title and possibly a logo.
2. **Word Display Area**: Showing the secret word with blanks for each letter.
3. **Hangman Visual**: Displaying the hangman's progress based on incorrect guesses.
4. **Letter Selection Area**: A grid of buttons representing the alphabet for the user to choose from.
5. **Scoreboard**: Displaying the current score and possibly a leaderboard.

### Flow
1. The game starts by selecting a random word from the predefined list.
2. The secret word is displayed with blanks representing each letter.
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