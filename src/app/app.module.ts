import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MobileModule} from './components/mobile/mobile.module';
import {DesktopModule} from './components/desktop/desktop.module';
import {BaseComponent} from './components/base.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeadersInterceptor} from './interceptors/headers.interceptor';
import {SocketIoModule} from 'ngx-socket-io';
import {SharedModule} from './components/shared/shared.module';
import {DesktopSharedModule} from './components/desktop/shared/desktop-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MobileModule,
    DesktopModule,
    HttpClientModule,
    SocketIoModule,
    SharedModule,
    DesktopSharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
