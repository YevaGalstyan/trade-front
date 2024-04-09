import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NoCommaPipe} from '../../pipes/no-comma.pipe';

@NgModule({
  declarations: [
    NoCommaPipe,
  ],
  exports: [
    NoCommaPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
