/*
 * The game starts by pressing the "Start" button
 * The game lasts 60 seconds or until the last life is lost (the player has three "lives")
 * Time shown in the upper right corner
 * Squares are displayed in the middle of the game (number given from the parameter)
 * Every 2 seconds a randomly selected square lights up green
 * The square is lit green for 1 seconds and during this time the player must click on it
 * If the player manages to click on the green square, he gets 1 point
 * The player loses a life if it hits another square
 * The "you lost a life" alert appears
 * The game can be reset - the time and score counters are reset, and the "life" counter returns to its initial state * (np. 3) 
 */

import App from './App';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(< App tab="home" />);