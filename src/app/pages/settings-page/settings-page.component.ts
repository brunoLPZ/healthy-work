import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from 'src/app/models/settings';
import {
  DEFAULT_SETTINGS,
  SettingsService,
} from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private router: Router
  ) {
    const userSettings = this.settingsService.getSettings();
    this.settingsForm = this.fb.group({
      workTime: [
        userSettings.workTime,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(60),
        ],
      ],
      breakTime: [
        userSettings.breakTime,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(30),
        ],
      ],
      youtubeId: [
        `https://www.youtube.com/watch?v=${userSettings.youtubeId}`,
        [Validators.required, this.youtubeUrlValidator],
      ],
    });
  }

  saveSettings(): void {
    this.settingsForm.updateValueAndValidity();
    if (!this.settingsForm.invalid) {
      const settings: Settings = {
        workTime: +this.settingsForm.get('workTime')?.value,
        breakTime: +this.settingsForm.get('breakTime')?.value,
        youtubeId: this.extractYoutubeId(
          this.settingsForm.get('youtubeId')?.value
        ),
      };
      this.settingsService.storeSettings(settings);
      this.router.navigate(['/', 'work']);
    }
  }

  private extractYoutubeId(url: string): string {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('v') || DEFAULT_SETTINGS.youtubeId;
  }
  private youtubeUrlValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    try {
      const url = new URL(control.value);
      const videoParam = url.searchParams.get('v');
      if (url.hostname !== 'www.youtube.com' || !videoParam) {
        return { invalidUrl: control.value };
      }
      return null;
    } catch {
      return { invalidUrl: control.value };
    }
  };
}
