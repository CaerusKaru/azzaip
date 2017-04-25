import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdMenuModule, MdSidenavModule, MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdTabsModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule
  ]
})
export class AppMaterialModule { }
