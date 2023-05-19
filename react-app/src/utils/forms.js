export class CreateForm {
    constructor(location, formData = {}) {
        if (/\/clubs-new/.test(location.pathname)) {
            this.type = ["club", "new"]
            this.title = "Start a new club"
            this.validator = validateClub
        }
        if (/\/club\/\d\/edit/.test(location.pathname)) {
            this.type = ["club, edit"]
            this.title = "Edit club"
            this.validator = validateClub
        }
        this.formData = formData
    }

    // get type() {
    //     return this.type
    // }

    // get title() {
    //     return this.title
    // }

    // get formData() {
    //     return this.formData
    // }

    setFormData(formData) {
        this.formData = formData
    }

    validate(errors) {
       return this.validator(this.formData, errors)
    }
}


// export function getFormType(location) {
//     const formType = {};
//     if (location.pathname === "/clubs-new") {
//         formType["title"] = "Start a new club";
//         formType["validator"] = validateClub;
//     }
//     if (/\/club\/\d\/edit/.test(location.pathname)) {
//         formType["title"] = "Edit club";
//         formType["validator"] = validateClub;
//     }
//     return formType;
// }

function validateClub(formData, errors) {
    if (formData.clubName?.length <= 0) {
        errors.clubName = "Club name length must be greater than zero";
        errors.errors ? (errors.errors += 1) : (errors.errors = 1);
    }

    if (formData.description?.length > 2000) {
        errors.description = "Description must be less than 2000 characters";
        errors.errors ? (errors.errors += 1) : (errors.errors = 1);
    }
    if (formData.description?.length <= 0) {
        errors.description = "Description must be greater than 0 characters";
        errors.errors ? (errors.errors += 1) : (errors.errors = 1);
    }

    if (errors.errors) {
        return errors;
    }
    return null;
}
