import { Injectable } from '@angular/core';
import * as introJs from 'intro.js';

const TUTORIAL_HOME_STEPS: introJs.Step[] = [
  {
    title: 'HEALTH WORK APP',
    intro:
      'This is a really simple app to remember you to take some breaks during your work routines',
  },
  {
    title: 'GO HOME',
    intro: 'Visit this home page anytime you want by pressing this button',
    element: '#tutorial-home-btn',
  },
  {
    title: 'HELP!',
    intro: 'Ask for help at any page to understand what is going on',
    element: '#tutorial-help-btn',
  },
  {
    title: 'SETTINGS',
    intro: 'Adapt the application settings to fit your working routines',
    element: '#tutorial-settings-btn',
  },
  {
    title: 'START TO WORK',
    intro: `Click here to begin your working routine. Have fun and don't forget to take breaks`,
    element: '#tutorial-start-btn',
  },
];

const TUTORIAL_SETTINGS_STEPS: introJs.Step[] = [
  {
    title: 'TIME FOR WORK',
    intro: 'Choose here the time your going to work for each session.',
    element: '#tutorial-work-time-field',
  },
  {
    title: 'TIME FOR BREAKS',
    intro: 'Choose here the time to relax between working sessions.',
    element: '#tutorial-break-time-field',
  },
  {
    title: 'YOUTUBE VIDEOS',
    intro:
      'You can choose any video you want to reproduce during the work sessions. I suggest you to use a long video with some relaxing music but, of course, this is up to you',
    element: '#tutorial-video-field',
  },
  {
    title: 'SAVE THE SETTINGS',
    intro:
      'Click here to save your settings. These settings will be saved in your browser local storage. If you keep using the same browser your preferences will remain there',
    element: '#tutorial-save-btn',
    position: 'top',
  },
];

const TUTORIAL_WORK_STEPS: introJs.Step[] = [
  {
    title: 'THE TIMER',
    intro: 'This is the timer that displays the remaining time of the session.',
    element: '.tutorial-timer',
  },
  {
    title: 'START/STOP THE TIMER',
    intro:
      'You can start and stop the timer at any moment. Take into account that these button also starts and stops the video',
    element: '.tutorial-start-stop-btn',
  },
  {
    title: 'SKIP THE SESSION',
    intro:
      'You can skip a work session or a break if you feel that is too much.',
    element: '.tutorial-skip-btn',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private tutorial: introJs.IntroJs;

  constructor() {
    this.tutorial = introJs();
  }

  startTutorial(type: string) {
    if (type === 'home') {
      this.tutorial.setOptions({
        tooltipClass: 'tutorial-tooltip',
        showBullets: false,
        showProgress: false,
        steps: TUTORIAL_HOME_STEPS,
      });
    } else if (type === 'settings') {
      this.tutorial.setOptions({
        tooltipClass: 'tutorial-tooltip',
        showBullets: false,
        showProgress: false,
        steps: TUTORIAL_SETTINGS_STEPS,
      });
    } else if (type === 'work') {
      this.tutorial.setOptions({
        tooltipClass: 'tutorial-tooltip',
        showBullets: false,
        showProgress: false,
        steps: TUTORIAL_WORK_STEPS,
      });
    }
    this.tutorial.start();
  }
}
