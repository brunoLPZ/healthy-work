import { Injectable } from '@angular/core';
import { WorkSession } from '../models/work-session';

const LOCAL_STORAGE_SESSION = 'healthy-work-session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  storeSession(session: WorkSession) {
    localStorage.setItem(LOCAL_STORAGE_SESSION, JSON.stringify(session));
  }

  getSessionNumber(): number {
    const localStorageSession = localStorage.getItem(LOCAL_STORAGE_SESSION);
    if (localStorageSession) {
      const workSession: WorkSession = JSON.parse(localStorageSession);
      return workSession.sessions;
    } else {
      return 0;
    }
  }
}
