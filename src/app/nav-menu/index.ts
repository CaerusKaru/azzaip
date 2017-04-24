import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavMenuService} from "./shared/nav-menu.service";
import {NospacePipe} from "./shared/nospace.pipe";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  NavMenuContainerComponent, NavMenuHeaderComponent, NavMenuLinkComponent,
  NavMenuToggleComponent
} from "./nav-menu";
import {MdButtonModule, MdIconModule, MdListModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdListModule,
    FlexLayoutModule
  ],
  declarations: [
    NospacePipe,
    NavMenuHeaderComponent,
    NavMenuToggleComponent,
    NavMenuLinkComponent,
    NavMenuContainerComponent
  ],
  providers: [NavMenuService],
  exports: [
    NavMenuHeaderComponent,
    NavMenuLinkComponent,
    NavMenuToggleComponent,
    NavMenuContainerComponent
  ]
})
export class NavMenuModule { }

export * from './nav-menu'
