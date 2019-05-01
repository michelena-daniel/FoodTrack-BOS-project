import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorModule } from '../error/error.module';
import { AuthModule } from '../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageRoutingModule } from './mainPage-routing.module';
import { WallComponent } from './components/wall/wall.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PublisherComponent } from './components/publisher/publisher.component';
import { PostFeedComponent } from './components/post-feed/post-feed.component';
import { NgxsModule } from '@ngxs/store';
import { PostState } from './components/store/post.state';

@NgModule({
  declarations: [
      WallComponent,
      StatisticsComponent,
      UserProfileComponent,
      MainPageComponent,
      PublisherComponent,
      PostFeedComponent

  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ErrorModule,
    AuthModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([PostState])
  ]
})
export class MainPageModule {}
