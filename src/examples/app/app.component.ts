import { Component } from '@angular/core';
import { ViewportControl } from 'ngx-customscrollbars';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    viewProviders: [ViewportControl]
})
export class AppComponent {

    public constructor(
    ) {
    }
}
