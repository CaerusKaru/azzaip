import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  public isOpen = true;
  public utln: string;
  public isAdmin = false;
  public courses;

  constructor(
    private courseService: CourseService
  ) {
    this.courses = courseService.courses;
  }

  ngOnInit() {
    this.utln = this.courseService.utln;
    this.isAdmin = this.courseService.isAdmin;
  }

  public toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

}
