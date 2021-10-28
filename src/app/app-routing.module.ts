import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { WorkPageComponent } from './pages/work-page/work-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'work',
    component: WorkPageComponent,
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
