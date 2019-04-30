
import { Directive, NgZone, Host, ElementRef, OnDestroy, AfterViewInit } from "@angular/core";
import { ViewportControl } from "../provider/viewport.control";
import { Viewport } from "../viewport/viewport";
import { IViewportControl } from "../api/viewport-control.interface";
import { DomHelper } from "../helper/dom.helper";
import { Scrollbar } from "../api/scrollbar.interface";

/**
 * directive for html elements
 * this will wrap the html element into HtmlViewport
 * react on dom changes and updates scrollbar
 */
@Directive( {
    selector: "[ngxCustomScrollbarVirtualViewport]",
    exportAs: "ngxCustomScrollbarVirtualViewport"
} )
export class NgxCustomScrollbarVirtualViewportDirective extends Viewport implements AfterViewInit, OnDestroy {

    public control: IViewportControl;

    private _scrollOffset;

    constructor (
        @Host() private viewportControl: ViewportControl,
        private zone: NgZone,
        private el: ElementRef
    ) {
        super();

        this._scrollOffset = {
            left: 0,
            top: 0,
        };
    }

    public get scrolledOffset() {
        return this._scrollOffset;
    }

    /**
     * calculate offset of scroll container
     */
    public measureSize(): DomHelper.IScrollContainerMeasure {
        const domMeasure = DomHelper.getMeasure( this.el.nativeElement );
        const measure: DomHelper.IScrollContainerMeasure = {
            ...domMeasure,
            scrollHeight: 1000,
            scrollLeft: 0,
            scrollTop: 0,
            scrollWidth: domMeasure.innerWidth
        };
        return measure;
    }

    /** scrolled to */
    public scrollTo( offset: Scrollbar.IOffset ) {
        this._scrollOffset.left = offset.left;
        this._scrollOffset.top = offset.top;
        this.scrolled$.next();
    }

    /**
     * if component gets destroyed tell our control we gets destroyed
     * and remove from dom mutations
     *
     * @memberof ScrollableContainerDirective
     */
    public ngOnDestroy() {
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
    public ngAfterViewInit(): void {
        this.viewportControl.viewPort = this;
    }
}
