///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
 
@Component({
    selector: 'myapp',
    templateUrl: './index.html'
})
 
export class AppComponent {}
 
bootstrap(AppComponent);