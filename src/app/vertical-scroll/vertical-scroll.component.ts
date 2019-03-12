import { Component } from '@angular/core';
import { ViewportControl } from 'projects/scrollbars/src/lib/provider/viewport.control';

@Component({
    selector: 'app-vertical-scroll',
    templateUrl: 'vertical-scroll.component.html',
    styleUrls: ['./vertical-scroll.component.scss'],
    viewProviders: [ViewportControl]
})
export class VerticalScrollComponent {
    public items: Array<string | number> = Array.from({ length: 300 }, (val, index) => index);
}
