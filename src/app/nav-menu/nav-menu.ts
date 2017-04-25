import {
  Component, Input, ViewEncapsulation, QueryList,
  OnDestroy, ContentChildren, AfterViewInit, ElementRef, Renderer2, Directive
} from '@angular/core';
import {NavMenuService} from './shared/nav-menu.service';
import {animate, style, transition, state, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

let uniqueId = 0;

@Component({
  host: {
    '[attr.id]': 'id',
    '[class.nav-link]': 'true'
  },
  selector: 'nav-menu-link',
  templateUrl: './nav-menu-link.html',
  encapsulation: ViewEncapsulation.None
})
export class NavMenuLinkComponent {

  @Input() link : string;
  @Input() id : number = uniqueId++;

  constructor(
    private router: Router,
    private menuService : NavMenuService
  ) {
    menuService.openPage.subscribe(data => this._isSelected = data === this.id);
  }

  public isSelected : Observable<boolean> = this.menuService.openPage.map(i => i === this.id);

  navigate(url) {
    this.router.navigate([url]);
  }

  private _isSelected : boolean;
}

@Component({
  host: {
    '[attr.id]': 'id'
  },
  selector: 'nav-menu-toggle',
  templateUrl: './nav-menu-toggle.html',
  animations: [
    // TODO make this into AnimationBuilder with Angular 4.1-rc.1
    trigger('openMenu', [
      state('false', style({
        height: 0,
        visibility: 'hidden'
      })),
      state('true',  style({
        height: '*',
        visibility: 'visible'
      })),
      transition('void => false', animate(0, style({ height: 0 }))),
      transition('* => *', animate('750ms cubic-bezier(0.35, 0, 0.25, 1)'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuToggleComponent implements AfterViewInit, OnDestroy {

  @Input () label : string;
  @Input () id : number = uniqueId++;
  @ContentChildren(NavMenuLinkComponent) links : QueryList<NavMenuLinkComponent>;

  constructor(
    private menuService: NavMenuService
  ) {
    menuService.openSection.subscribe(data => {
      this._openSection = data == this.id;
    });
  }

  ngAfterViewInit () {
    this._finalLinks = this.links.toArray();
    // TODO change this to how Material handles md-chips
    setTimeout(_ => this.initLinks(), 500);
  }

  ngOnDestroy () {
    this._finalLinks.map(c => this.menuService.removeLink(c.id, c.link, this.id));
  }

  public isOpen () {
    return this._openSection;
  }

  public toggle ()  {
    this.menuService.toggleSelectSection(this.id);
  }

  private _finalLinks : NavMenuLinkComponent[];
  private _openSection : boolean;

  private initLinks () {
    this._finalLinks.map(c => this.menuService.addLink(c.id, c.link, this.id));
  }
}

@Component({
  selector: 'nav-menu-header',
  templateUrl: './nav-menu-header.html',
  encapsulation: ViewEncapsulation.None
})
export class NavMenuHeaderComponent {
  @Input () label : string;
  constructor() { }
}

@Component({
  host: {
    '[class.nav-menu]': 'true'
  },
  selector: 'nav-menu-container',
  templateUrl: './nav-menu-container.html',
  styleUrls: ['./nav-menu.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavMenuContainerComponent {
  private _color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /** The color of the nav-menu. Can be primary, accent, or warn. */
  @Input()
  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._updateColor(value);
  }

  private _updateColor(newColor: string) {
    this._setElementColor(this._color, false);
    this._setElementColor(newColor, true);
    this._color = newColor;
  }

  private _setElementColor(color: string, isAdd: boolean) {
    if (color && color !== '') {
      if (!isAdd) {
        this.renderer.removeClass(this.elementRef.nativeElement, `mat-${color}`);
      } else {
        this.renderer.addClass(this.elementRef.nativeElement, `mat-${color}`);
      }
    }
  }
}
