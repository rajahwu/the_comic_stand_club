export function getFormType(location) {
    const formType = {};
    if (location.pathname === "/clubs-new") {
        formType["title"] = "Start a new club";
        formType["validator"] = validateClub;
    }
    if (/\/club\/\d\/edit/.test(location.pathname)) {
        formType["title"] = "Edit club";
        formType["validator"] = validateClub;
    }
    return formType;
}

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
