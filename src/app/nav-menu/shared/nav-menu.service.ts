import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";

@Injectable()
export class NavMenuService {

  constructor(
    private router: Router,
    private location : Location,
  ) {
    this._currentPath = location.path();
    this.openPage = this._currentPage.asObservable();
    this.openSection = this._openedSection.asObservable();
    this.initRouter();
  }

  public openPage : Observable<number>;
  public openSection : Observable<number>;

  public addLink (id : number, link : string, parent : number) {
    if (this._currentPath && this._currentPath.indexOf(link) > -1) {
      this.selectSection(parent);
      this.selectPage(id);
    }
    this._links.push({
      id: id,
      link: link,
      parent: parent
    })
  }

  public removeLink (id : number, link : string, parent : number) {
    this._links.splice(this._links.indexOf({
      id: id,
      link: link,
      parent: parent
    }), 1);
  }

  public selectSection (id : number) {
    this._openedSection.next(id);
  }

  public toggleSelectSection (id : number) {
    this._openedSection.next(this._openedSection.getValue() === id ? null : id);
  }

  public selectPage (id : number) {
    this._currentPage.next(id);
  }

  private _links : any[] = [];
  private _openedSection : BehaviorSubject<number> = new BehaviorSubject(null);
  private _currentPage : BehaviorSubject<number> = new BehaviorSubject(null);
  private _currentPath : string;

  private initRouter () {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => { this.updateSelection(); this._currentPath = this.location.path() });
  }

  private updateSelection () {
    let madeSelection = this._links.reduce((a, d) => a ? a : this.matchPage(d), false);
    if (!madeSelection) {
      this.selectPage(null);
      this.selectSection(null);
    }
  }

  private matchPage (page) : boolean
  {
    if (this.location.path().indexOf(page.link) !== -1) {
      this.selectSection(page.parent);
      this.selectPage(page.id);
      return true;
    }
    return false;
  };
}
