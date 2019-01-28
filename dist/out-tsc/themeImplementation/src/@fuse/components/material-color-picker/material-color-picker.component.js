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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@fuse/animations");
var mat_colors_1 = require("@fuse/mat-colors");
var forms_1 = require("@angular/forms");
exports.FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return FuseMaterialColorPickerComponent; }),
    multi: true
};
var FuseMaterialColorPickerComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseMaterialColorPickerComponent() {
        // Set the defaults
        this.colorChanged = new core_1.EventEmitter();
        this.colors = mat_colors_1.MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedHue = '500';
        this.view = 'palettes';
        // Set the private defaults
        this._color = '';
        this._modelChange = function () {
        };
        this._modelTouched = function () {
        };
    }
    Object.defineProperty(FuseMaterialColorPickerComponent.prototype, "color", {
        get: function () {
            return this._color;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Selected class
         *
         * @param value
         */
        set: function (value) {
            if (!value || value === '' || this._color === value) {
                return;
            }
            // Split the color value (red-400, blue-500, fuse-navy-700 etc.)
            var colorParts = value.split('-');
            // Take the very last part as the selected hue value
            this.selectedHue = colorParts[colorParts.length - 1];
            // Remove the last part
            colorParts.pop();
            // Rejoin the remaining parts as the selected palette name
            this.selectedPalette = colorParts.join('-');
            // Store the color value
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Control Value Accessor implementation
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register on change function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnChange = function (fn) {
        this._modelChange = fn;
    };
    /**
     * Register on touched function
     *
     * @param fn
     */
    FuseMaterialColorPickerComponent.prototype.registerOnTouched = function (fn) {
        this._modelTouched = fn;
    };
    /**
     * Write value to the view from model
     *
     * @param color
     */
    FuseMaterialColorPickerComponent.prototype.writeValue = function (color) {
        // Return if null
        if (!color) {
            return;
        }
        // Set the color
        this.color = color;
        // Update the selected color
        this.updateSelectedColor();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Select palette
     *
     * @param event
     * @param palette
     */
    FuseMaterialColorPickerComponent.prototype.selectPalette = function (event, palette) {
        // Stop propagation
        event.stopPropagation();
        // Go to 'hues' view
        this.view = 'hues';
        // Update the selected palette
        this.selectedPalette = palette;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Select hue
     *
     * @param event
     * @param hue
     */
    FuseMaterialColorPickerComponent.prototype.selectHue = function (event, hue) {
        // Stop propagation
        event.stopPropagation();
        // Update the selected huse
        this.selectedHue = hue;
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Remove color
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.removeColor = function (event) {
        // Stop propagation
        event.stopPropagation();
        // Return to the 'palettes' view
        this.view = 'palettes';
        // Clear the selected palette and hue
        this.selectedPalette = '';
        this.selectedHue = '';
        // Update the selected color
        this.updateSelectedColor();
    };
    /**
     * Update selected color
     */
    FuseMaterialColorPickerComponent.prototype.updateSelectedColor = function () {
        if (this.selectedColor && this.selectedColor.palette === this.selectedPalette && this.selectedColor.hue === this.selectedHue) {
            return;
        }
        // Set the selected color object
        this.selectedColor = {
            palette: this.selectedPalette,
            hue: this.selectedHue,
            class: this.selectedPalette + '-' + this.selectedHue,
            bg: this.selectedPalette === '' ? '' : mat_colors_1.MatColors.getColor(this.selectedPalette)[this.selectedHue],
            fg: this.selectedPalette === '' ? '' : mat_colors_1.MatColors.getColor(this.selectedPalette).contrast[this.selectedHue]
        };
        // Emit the color changed event
        this.colorChanged.emit(this.selectedColor);
        // Mark the model as touched
        this._modelTouched(this.selectedColor.class);
        // Update the model
        this._modelChange(this.selectedColor.class);
    };
    /**
     * Go to palettes view
     *
     * @param event
     */
    FuseMaterialColorPickerComponent.prototype.goToPalettesView = function (event) {
        // Stop propagation
        event.stopPropagation();
        this.view = 'palettes';
    };
    /**
     * On menu open
     */
    FuseMaterialColorPickerComponent.prototype.onMenuOpen = function () {
        if (this.selectedPalette === '') {
            this.view = 'palettes';
        }
        else {
            this.view = 'hues';
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FuseMaterialColorPickerComponent.prototype, "colorChanged", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [Object])
    ], FuseMaterialColorPickerComponent.prototype, "color", null);
    FuseMaterialColorPickerComponent = __decorate([
        core_1.Component({
            selector: 'fuse-material-color-picker',
            templateUrl: './material-color-picker.component.html',
            styleUrls: ['./material-color-picker.component.scss'],
            animations: animations_1.fuseAnimations,
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [exports.FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [])
    ], FuseMaterialColorPickerComponent);
    return FuseMaterialColorPickerComponent;
}());
exports.FuseMaterialColorPickerComponent = FuseMaterialColorPickerComponent;
//# sourceMappingURL=material-color-picker.component.js.map