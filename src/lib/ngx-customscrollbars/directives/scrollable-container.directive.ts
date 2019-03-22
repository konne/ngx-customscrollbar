import { Directive, NgZone, Host, ElementRef, OnDestroy, AfterViewInit, Component } from '@angular/core';
import { ViewportControl } from '../provider/viewport.control';
import { DomHelper } from '../helper/dom.helper';
import { HtmlViewport } from '../viewport/html.viewport';
import { ViewEncapsulation } from '@angular/compiler/src/core';

/**
 * directive for html elements
 * this will wrap the html element into HtmlViewport
 * react on dom changes and updates scrollbar
 */
@Directive({
    selector: '[ngxCustomScrollbarScrollable]',
})
export class NgxCustomScrollbarScrollableDirective implements AfterViewInit, OnDestroy {

    private htmlViewport: HtmlViewport;
    private domMutations: MutationObserver;
    private dimension: DomHelper.IScrollContainerMeasure;

    constructor(
        @Host() private viewportControl: ViewportControl,
        private zone: NgZone,
        private el: ElementRef
    ) { }

    /**
     * if component gets destroyed tell our control we gets destroyed
     * and remove from dom mutations
     *
     * @memberof ScrollableContainerDirective
     */
    ngOnDestroy() {
        this.htmlViewport.destroy();
        this.domMutations.disconnect();
        this.viewportControl = null;
    }

    /**
     * start watching the dom after view has been initialized
     * this ensures initial data has allready been set.
     *
     * We only want to know if we add or remove some items
     *
     * @memberof ScrollableContainerDirective
     */
    ngAfterViewInit(): void {
        this.htmlViewport = new HtmlViewport(this.zone);
        this.htmlViewport.element = this.el.nativeElement;
        this.viewportControl.viewPort = this.htmlViewport;
        this.dimension = this.viewportControl.viewportDimension;

        this.watchDom();
    }

    /**
     * watch dom for changes in child list,  if something has been changed
     * we update scrollbars
     */
    private watchDom() {

        this.domMutations = new MutationObserver((mutations: MutationRecord[]) => {
            if (this.requireUpdate()) {
                this.viewportControl.update();
            }
        });

        this.domMutations.observe(this.el.nativeElement, {
            attributes: true,
            attributeFilter: ['style'],
            characterData: true,
            childList: true,
            subtree: true,
        });
    }

    /**
     * check for changes we have to react for since this changes the
     * height of the scrollContainer
     */
    private requireUpdate(): boolean {

        const newDimensions = DomHelper.getScrollContainerMeasure(this.el.nativeElement);

        let needsUpdate = true;
        needsUpdate = this.dimension.height !== newDimensions.height;
        needsUpdate = needsUpdate || this.dimension.width !== newDimensions.width;
        needsUpdate = needsUpdate || this.dimension.scrollHeight !== newDimensions.scrollHeight;
        needsUpdate = needsUpdate || this.dimension.scrollWidth !== newDimensions.scrollWidth;

        /** write new dimensions */
        this.dimension = newDimensions;

        return needsUpdate;
    }
}
