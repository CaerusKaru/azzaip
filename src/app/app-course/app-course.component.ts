import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {ActivatedRoute} from '@angular/router';
import {CourseMessage} from '../shared/course-message';

@Component({
  selector: 'app-app-course',
  templateUrl: './app-course.component.html',
  styleUrls: ['./app-course.component.scss']
})
export class AppCourseComponent implements OnInit {

  public messages;
  public selectedMessage;

  private course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(data => {
      this.selectedMessage = null;
      this.course = data.course;
      this.courseService.courses.filter(e => e !== null && e.length !== 0).subscribe(c => {
        const res = c.filter(a => a.access_point_name === this.course)[0];
        this.messages = courseService.getMessages(res.resource_uri);
      });
    });
  }

  ngOnInit() {
  }

  public openMessage (message: CourseMessage, index: number) {
    this.selectedMessage = message;
  }

}
