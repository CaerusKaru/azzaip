import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import {AppMaterialModule} from './app-material/app-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavMenuModule} from './nav-menu/index';
import { RootComponent } from './root/root.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppCourseComponent } from './app-course/app-course.component';
import {CourseService} from './shared/course.service';
import { AppPostComponent } from './app-post/app-post.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    AppCourseComponent,
    AppPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppMaterialModule,
    NavMenuModule,
    AppRoutingModule
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
