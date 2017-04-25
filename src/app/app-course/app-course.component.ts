import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';

@Component({
  selector: 'app-app-course',
  templateUrl: './app-course.component.html',
  styleUrls: ['./app-course.component.scss']
})
export class AppCourseComponent implements OnInit {

  public courses;

  constructor(
    private courseService: CourseService
  ) {
    this.courseService.courses.subscribe(data => {
      this.courses = data;
    });
  }

  ngOnInit() {
  }

}
