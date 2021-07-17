import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableLayoutComponent } from './table-layout/table-layout.component';
import { RestService } from "./rest.service"
@NgModule({
  declarations: [
    AppComponent,
    TableLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
