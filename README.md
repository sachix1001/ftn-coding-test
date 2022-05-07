# FTR Platform Developer Coding Test

This project is for FTR coding test

The application accept an ongoing series of user supplied numbers as inputs, and output
notifications when certain conditions are met. It should operate as follows:

1. On startup, the program will prompt the user for the number of seconds (X) between
outputting the frequency of each number to the screen.
2. Every X seconds the program will display, in frequency descending order, the list of
numbers and their frequency.
3. If the user enters 'halt' the timer should pause.
4. If the user enters 'resume' the timer should resume.
5. If the user enters a number that is one of the first 1000 numbers in the Fibonacci
sequence, the system should alert "FIB"
6. If the user enters 'quit', the application should output the numbers and their frequency, a
farewell message, and finally terminate.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
