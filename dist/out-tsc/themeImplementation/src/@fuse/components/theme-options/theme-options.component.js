"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var animations_1 = require("@fuse/animations");
var config_service_1 = require("@fuse/services/config.service");
var navigation_service_1 = require("@fuse/components/navigation/navigation.service");
var sidebar_service_1 = require("@fuse/components/sidebar/sidebar.service");
var FuseThemeOptionsComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FormBuilder} _formBuilder
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Renderer2} _renderer
     */
    function FuseThemeOptionsComponent(document, _formBuilder, _fuseConfigService, _fuseNavigationService, _fuseSidebarService, _renderer) {
        this.document = document;
        this._formBuilder = _formBuilder;
        this._fuseConfigService = _fuseConfigService;
        this._fuseNavigationService = _fuseNavigationService;
        this._fuseSidebarService = _fuseSidebarService;
        this._renderer = _renderer;
        // Set the defaults
        this.barClosed = true;
        // Set the private defaults
        this._unsubscribeAll = new rxjs_1.Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseThemeOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Build the config form
        // noinspection TypeScriptValidateTypes
        this.form = this._formBuilder.group({
            colorTheme: new forms_1.FormControl(),
            customScrollbars: new forms_1.FormControl(),
            layout: this._formBuilder.group({
                style: new forms_1.FormControl(),
                width: new forms_1.FormControl(),
                navbar: this._formBuilder.group({
                    primaryBackground: new forms_1.FormControl(),
                    secondaryBackground: new forms_1.FormControl(),
                    folded: new forms_1.FormControl(),
                    hidden: new forms_1.FormControl(),
                    position: new forms_1.FormControl(),
                    variant: new forms_1.FormControl()
                }),
                toolbar: this._formBuilder.group({
                    background: new forms_1.FormControl(),
                    customBackgroundColor: new forms_1.FormControl(),
                    hidden: new forms_1.FormControl(),
                    position: new forms_1.FormControl()
                }),
                footer: this._formBuilder.group({
                    background: new forms_1.FormControl(),
                    customBackgroundColor: new forms_1.FormControl(),
                    hidden: new forms_1.FormControl(),
                    position: new forms_1.FormControl()
                }),
                sidepanel: this._formBuilder.group({
                    hidden: new forms_1.FormControl(),
                    position: new forms_1.FormControl()
                })
            })
        });
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            // Update the stored config
            _this.fuseConfig = config;
            // Set the config form values without emitting an event
            // so that we don't end up with an infinite loop
            _this.form.setValue(config, { emitEvent: false });
        });
        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (value) {
            // Reset the form values based on the
            // selected layout style
            _this._resetFormValues(value);
        });
        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(operators_1.takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            // Update the config
            _this._fuseConfigService.config = config;
        });
    };
    /**
     * On destroy
     */
    FuseThemeOptionsComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // Remove the custom function menu
        //this._fuseNavigationService.removeNavigationItem('custom-function');
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param value
     * @private
     */
    FuseThemeOptionsComponent.prototype._resetFormValues = function (value) {
        switch (value) {
            // Vertical Layout #1
            case 'vertical-layout-1':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'below-static'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'below-static'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Vertical Layout #2
            case 'vertical-layout-2':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'below'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'below'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Vertical Layout #3
            case 'vertical-layout-3':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'left',
                                layout: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'above-static'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'above-static'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
            // Horizontal Layout #1
            case 'horizontal-layout-1':
                {
                    this.form.patchValue({
                        layout: {
                            width: 'fullwidth',
                            navbar: {
                                primaryBackground: 'fuse-navy-700',
                                secondaryBackground: 'fuse-navy-900',
                                folded: false,
                                hidden: false,
                                position: 'top',
                                variant: 'vertical-style-1'
                            },
                            toolbar: {
                                background: 'fuse-white-500',
                                customBackgroundColor: false,
                                hidden: false,
                                position: 'above'
                            },
                            footer: {
                                background: 'fuse-navy-900',
                                customBackgroundColor: true,
                                hidden: false,
                                position: 'above-fixed'
                            },
                            sidepanel: {
                                hidden: false,
                                position: 'right'
                            }
                        }
                    });
                    break;
                }
        }
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    FuseThemeOptionsComponent.prototype.toggleSidebarOpen = function (key) {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    };
    var _a, _b, _c;
    __decorate([
        core_1.HostBinding('class.bar-closed'),
        __metadata("design:type", Boolean)
    ], FuseThemeOptionsComponent.prototype, "barClosed", void 0);
    FuseThemeOptionsComponent = __decorate([
        core_1.Component({
            selector: 'fuse-theme-options',
            templateUrl: './theme-options.component.html',
            styleUrls: ['./theme-options.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None,
            animations: animations_1.fuseAnimations
        }),
        __param(0, core_1.Inject(common_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object, forms_1.FormBuilder, typeof (_a = typeof config_service_1.FuseConfigService !== "undefined" && config_service_1.FuseConfigService) === "function" ? _a : Object, typeof (_b = typeof navigation_service_1.FuseNavigationService !== "undefined" && navigation_service_1.FuseNavigationService) === "function" ? _b : Object, typeof (_c = typeof sidebar_service_1.FuseSidebarService !== "undefined" && sidebar_service_1.FuseSidebarService) === "function" ? _c : Object, core_1.Renderer2])
    ], FuseThemeOptionsComponent);
    return FuseThemeOptionsComponent;
}());
exports.FuseThemeOptionsComponent = FuseThemeOptionsComponent;
//# sourceMappingURL=theme-options.component.js.map