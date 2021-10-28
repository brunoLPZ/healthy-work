import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

const LOCAL_STORAGE_SETTINGS = 'healthy-work-settings';
export const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/';
export const YOUTUBE_API_ENABLE = '?enablejsapi=1';

export const DEFAULT_SETTINGS: Settings = {
  workTime: 60,
  breakTime: 30,
  youtubeId: '5qap5aO4i9A',
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {
    if (!localStorage.getItem(LOCAL_STORAGE_SETTINGS)) {
      this.storeSettings(DEFAULT_SETTINGS);
    }
  }

  storeSettings(settings: Settings) {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  }

  getSettings(): Settings {
    const localStorageSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
    if (localStorageSettings) {
      return JSON.parse(localStorageSettings);
    } else {
      return DEFAULT_SETTINGS;
    }
  }
}
