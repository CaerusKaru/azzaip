import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RootComponent} from 'app/root/root.component';
import {AppCourseComponent} from '../app-course/app-course.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'course/:course', component: AppCourseComponent
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
