import { FormGroup } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function passwordMatchValidator(g: FormGroup) {
    if (g.get('password').value !== g.get('confirmPassword').value) {
        g.get('confirmPassword').setErrors({ notSame: true });
    }
    return null;
}
