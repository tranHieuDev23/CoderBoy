import { ActivatedRoute, Params } from "@angular/router";
import { OnInit, Inject, PLATFORM_ID, Optional } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { RESPONSE } from "@nguniversal/express-engine/tokens";
import { TransferState } from "@angular/platform-browser";

export abstract class SSRComponent implements OnInit {
    private isBrowser: boolean

    constructor(
        protected activatedRoute: ActivatedRoute,
        @Inject(PLATFORM_ID) platformId: Object,
        @Optional() @Inject(RESPONSE) protected response: any,
        protected transferState: TransferState
    ) {
        this.isBrowser = isPlatformBrowser(platformId)
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (this.isBrowser)
                this.onBrowserInit(params)
            else
                this.onServerInit(params)
        })
    }

    abstract onBrowserInit(params: Params): void 
    abstract onServerInit(params: Params): void 
}