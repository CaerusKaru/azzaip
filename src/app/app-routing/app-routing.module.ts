import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from '../root/root.component';
import {AppCourseComponent} from '../app-course/app-course.component';
import {AppPostComponent} from '../app-post/app-post.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'course/:course', component: AppCourseComponent
      },
      {
        path: 'post/:course', component: AppPostComponent
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
