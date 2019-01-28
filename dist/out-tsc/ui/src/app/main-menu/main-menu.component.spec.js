"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = require("@angular/cdk/layout");
var testing_1 = require("@angular/core/testing");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var main_menu_component_1 = require("./main-menu.component");
describe('MainMenuComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [main_menu_component_1.MainMenuComponent],
            imports: [
                animations_1.NoopAnimationsModule,
                layout_1.LayoutModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatListModule,
                material_1.MatSidenavModule,
                material_1.MatToolbarModule,
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(main_menu_component_1.MainMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should compile', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=main-menu.component.spec.js.map