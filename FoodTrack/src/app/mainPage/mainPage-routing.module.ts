import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WallComponent } from './components/wall/wall.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'mainPage',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'wall',
        component: WallComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}