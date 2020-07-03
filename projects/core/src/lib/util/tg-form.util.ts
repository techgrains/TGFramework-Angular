import { FormGroup } from '@angular/forms';


/**
 * Form Utility
 *
 * @export
 * @class TGFormUtil
 */
export class TGFormUtil {

    /**
     * Validate if FormControl has any error
     *
     * @static
     * @param {FormGroup} formGroup
     * @param {string} controlName
     * @param {string} validationType
     * @returns {boolean}
     * @memberof TGFormUtil
     */
    public static isControlHasError(formGroup: FormGroup, controlName: string, validationType: string): boolean {
        const control = formGroup.controls[controlName];
        if (!control) {
            return false;
        }

        const result =
            control.hasError(validationType) &&
            (control.dirty || control.touched);
        return result;
    }

    /**
     * Mark as Touched all form controls
     *
     * @static
     * @param {FormGroup} formGroup
     * @memberof TGFormUtil
     */
    public static markAsTouched(formGroup: FormGroup) {
        const controls = formGroup.controls;
        Object.keys(controls).forEach(controlName =>
            controls[controlName].markAsTouched()
        );
    }
}
