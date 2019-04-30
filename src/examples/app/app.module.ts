import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatTableModule} from "@angular/material";

import { AppComponent } from "./app.component";
import { VerticalScrollComponent } from "./vertical-scroll/vertical-scroll.component";
import { HorizontalScrollComponent } from "./horizontal-scroll/horizontal-scroll.component";
import { HorizontalVerticalScrollComponent } from "./horizontal-vertical-scroll/horizontal-vertical-scroll.component";
import { AsyncScrollComponent } from "./async/async-scroll.component";
import { NgxCustomScrollbarModule } from "ngx-customscrollbars";
import { TableComponent } from "./table/table.component";
import { CdkVirtualScrollOverviewExampleComponent } from "./cdk-virtual-scroll/virtual-scroll.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { VirtualScrollExampleComponent } from "./virtual-scroll/virtual-scroll.component";

@NgModule({
  declarations: [
    AppComponent,
    AsyncScrollComponent,
    HorizontalScrollComponent,
    HorizontalVerticalScrollComponent,
    VerticalScrollComponent,
    CdkVirtualScrollOverviewExampleComponent,
    VirtualScrollExampleComponent,
    TableComponent
  ],
  imports: [
    ScrollingModule,
    MatTableModule,
    NgxCustomScrollbarModule,
    BrowserModule,
    RouterModule.forRoot([
        {
            path: "",
            component: VerticalScrollComponent
        },
        {
            path: "cdk-virtual-scroll",
            component: CdkVirtualScrollOverviewExampleComponent
        },
        {
            path: "horizontal",
            component: HorizontalScrollComponent
        },
        {
            path: "horizontal-vertical",
            component: HorizontalVerticalScrollComponent
        },
        {
            path: "async",
            component: AsyncScrollComponent
        },
        {
            path: "table",
            component: TableComponent
        },
        {
            path: "virtual-scroll",
            component: VirtualScrollExampleComponent
        }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
