import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {CourseMessage} from './course-message';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AccessPoint} from './access-point';
import {UserAccount} from './user-account';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class CourseService {

  public courses: Observable<AccessPoint[]>;
  public userAccount: UserAccount;

  private _isAdmin = false;
  private _utln = 'masnes01';
  private _courses: BehaviorSubject<AccessPoint[]> = new BehaviorSubject([]);

  constructor(
    private http: Http
  ) {
    this.courses = this._courses.asObservable();
    this.http.get(environment.CC_ENDPOINT + '/api/v1/user_account/?utln=' + this.utln)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(data => {
        this.userAccount = data[0];
        this._isAdmin = this.userAccount.manager_level > 0;
        this.getCourses().subscribe(c => {
          this._courses.next(c);
          console.log(c);
        });
      });
  }

  get utln () {
    return this._utln;
  }

  get isAdmin () {
    return this._isAdmin;
  }

  public getMessages (managed_resource_uri: string): Observable<CourseMessage[]> {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/message/?managed_resource_uri=' + managed_resource_uri)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public makeMessage (message: CourseMessage): Observable<CourseMessage> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_ENDPOINT + '/api/v1/message/', message, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateMessage (message: CourseMessage): Observable<CourseMessage> {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/message/', message)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCourses (): Observable<AccessPoint[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(environment.API_ENDPOINT + '/api/v1/access/', {id: this.userAccount.id}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body['objects'] || body || { };
  }

  private handleError (error: Response | any) {
    // TODO: Add remote logging
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
