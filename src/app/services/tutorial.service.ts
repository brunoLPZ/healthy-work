import { Injectable } from '@angular/core';
import * as introJs from 'intro.js';

const TUTORIAL_HOME_STEPS: introJs.Step[] = [
  {
    title: 'HEALTH WORK APP',
    intro:
      'This is a really simple app to remember you to take some breaks during your work routines.',
  },
  {
    title: 'GO HOME',
    intro: 'Visit this home page anytime you want by pressing this button.',
    element: '#tutorial-home-btn',
  },
  {
    title: 'HELP!',
    intro: 'Ask for help at any page to understand what is going on.',
    element: '#tutorial-help-btn',
  },
  {
    title: 'SETTINGS',
    intro: 'Adapt the application settings to fit your working routines.',
    element: '#tutorial-settings-btn',
  },
  {
    title: 'START TO WORK',
    intro: `Click here to begin your working routine. Have fun and don't forget to take breaks.`,
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
      'You can choose any video you want to reproduce during the work sessions. I suggest you to use a long video with some relaxing music but, of course, this is up to you.',
    element: '#tutorial-video-field',
  },
  {
    title: 'SAVE THE SETTINGS',
    intro:
      'Click here to save your settings. These settings will be saved in your browser local storage. If you keep using the same browser your preferences will remain there.',
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
      'You can start and stop the timer at any moment. Take into account that these button also starts and stops the video.',
    element: '.tutorial-start-stop-btn',
  },
  {
    title: 'THE BACKGROUND VIDEO',
    intro:
      'Select a video to play as background while you work by changing the application settings. The video will be automatically played when the timer starts but you can pause it or play it manually if you want.',
    element: '#tutorial-video',
  },
  {
    title: 'SKIP THE SESSION',
    intro:
      'You can skip a work session or a break if you feel that is too much.',
    element: '.tutorial-skip-btn',
  },
  {
    title: 'CREATE A TASK',
    intro:
      'You can create a maximun of 10 tasks to keep track of your working progress. You can set a name and a status to the task. It is possible to create, edit and delete tasks at any time.',
    element: '#tutorial-create-task-btn',
  },
  {
    title: 'YOUR TASKS',
    intro: 'In this table you can see the tasks that you have created',
    element: '.tutorial-task-table',
  },
  {
    title: 'YOUR TASKS',
    intro: 'Here you have the name of your task.',
    element: '.tutorial-task-name',
  },
  {
    title: 'YOUR TASKS',
    intro:
      'Here you can see the current status of your tasks. Click <i>Next</i> to see the different status options.',
    element: '.tutorial-task-status',
  },
  {
    title: 'YOUR TASKS',
    intro:
      'You can select one of these task status depending on your current progress in the task.',
    element: '#tutorial-task-legend',
  },
  {
    title: 'YOUR TASKS',
    intro: 'Focus on a task by pressing this button.',
    element: '.tutorial-task-edit',
  },
  {
    title: 'YOUR TASKS',
    intro: 'Edit your task to change its name or its status.',
    element: '.tutorial-task-edit',
  },
  {
    title: 'YOUR TASKS',
    intro: `Delete your task once you are done with it. Notice that you won't be able to recover a deleted task.`,
    element: '.tutorial-task-delete',
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
      let steps = TUTORIAL_WORK_STEPS;
      if (!document.getElementsByClassName('tutorial-task-table').length) {
        steps = steps.filter((step) => step.title !== 'YOUR TASKS');
      } else {
        this.changeTaskLegendOpacity(true);
        this.tutorial.oncomplete(() => this.changeTaskLegendOpacity(false));
        this.tutorial.onexit(() => this.changeTaskLegendOpacity(false));
      }
      if (!document.getElementById('tutorial-video')) {
        steps = steps.filter((step) => step.title !== 'THE BACKGROUND VIDEO');
      }
      this.tutorial.setOptions({
        tooltipClass: 'tutorial-tooltip',
        showBullets: false,
        showProgress: false,
        steps,
      });
      this.tutorial.onbeforechange(async (targetElement) => {
        const timer = document
          .getElementsByClassName('tutorial-timer')
          ?.item(0) as HTMLElement;
        if (
          targetElement.classList.contains('tutorial-start-stop-btn') &&
          timer &&
          timer.classList.contains('timer-container-fixed')
        ) {
          setTimeout(() => {
            this.tutorial.refresh();
          }, 500);
        }
      });
    }
    this.tutorial.start();
  }

  private changeTaskLegendOpacity(visible: boolean) {
    const taskLegend = document.getElementById('tutorial-task-legend');
    if (taskLegend) {
      taskLegend.style.opacity = visible ? '1' : '0';
    }
  }
}
