import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  public isOpen = true;
  public courses;
  public activeLinkIndex;
  public managed;

  constructor(
    private courseService: CourseService
  ) {
    this.courses = courseService.courses;
    this.managed = courseService.managed;
  }

  ngOnInit() {
  }

  get utln () {
    return this.courseService.utln;
  }

  get isAdmin () {
    return this.courseService.isAdmin;
  }

  public toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  public settings () {
  }

  public logOut () {
  }

}
