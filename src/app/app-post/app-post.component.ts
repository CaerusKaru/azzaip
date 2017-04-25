import { Component, OnInit } from '@angular/core';
import {CourseService} from '../shared/course.service';
import {MdSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss']
})
export class AppPostComponent implements OnInit {

  public title: string;
  public message: string;
  public errorMessage: boolean;
  public errorTitle: boolean;
  public course;

  private _managed;

  constructor(
    private courseService: CourseService,
    private snackbar: MdSnackBar,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(data => {
      this.course = data;
    });
  }

  ngOnInit() {
    this.courseService.managed.subscribe(data => {
      this._managed = data;
    });
  }

  public post () {
    if (!this.title || !this.message) {
      if (!this.title) {
        this.errorTitle = true;
      }
      if (!this.message) {
        this.errorMessage = true;
      }
      return;
    }

    const res = this._managed.access_points.filter(a => a.access_point_name === this.course);

    if (!res) {
      console.log(res, 'res');
      this.snackbar.open('Unable to post message', '', {
        duration: 1750
      });
      return;
    }

    this.courseService.makeMessage(this.title, this.message, res.parent).subscribe(
      data => {
        this.snackbar.open('Message posted!', '', {
          duration: 1750
        });
        // this.message = null;
        // this.title = null;
        this.errorMessage = false;
        this.errorTitle = false;
      },
      error => {
        this.snackbar.open('Unable to post message', '', {
          duration: 1750
        });
      }
    );
  }
}
