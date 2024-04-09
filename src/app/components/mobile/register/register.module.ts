import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

//Modules
import {RegisterRoutingModule} from './register-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Components
import {RegisterFirstComponent} from './register-first/register-first.component';
import {RegisterSecondComponent} from './register-second/register-second.component';
import {RegisterThirdComponent} from './register-third/register-third.component';
import {RegisterForthComponent} from './register-forth/register-forth.component';
import {RegisterFirstAdditionalComponent} from './register-first-additional/register-first-additional.component';
import {RegisterFifthComponent} from './register-fifth/register-fifth.component';
import {RegisterComponent} from './register.component';
import {NgxMaskModule} from 'ngx-mask';
import {MobileSharedModule} from '../shared/mobile-shared.module';


@NgModule({
  declarations: [
    RegisterFirstComponent,
    RegisterSecondComponent,
    RegisterThirdComponent,
    RegisterForthComponent,
    RegisterFirstAdditionalComponent,
    RegisterFifthComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MobileSharedModule,
  ]
})
export class RegisterModule {
}
