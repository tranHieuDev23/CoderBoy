import { ActivatedRoute, Params } from "@angular/router";
import { OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

export abstract class SSRPageComponent implements OnInit {
    constructor(
        protected activatedRoute: ActivatedRoute,
        @Inject(PLATFORM_ID) protected platformId: Object
    ) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            if (isPlatformBrowser(this.platformId))
                this.onBrowserInit(params)
            else
                this.onServerInit(params)
        })
    }

    abstract onBrowserInit(params: Params): void 
    abstract onServerInit(params: Params): void 
}