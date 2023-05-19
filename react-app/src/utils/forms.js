import ClubForm from "../components/FormComponents/ClubForm";

export class CreateForm {
    constructor(location, formData = {}) {
        if (/\/clubs-new/.test(location.pathname)) {
            this.type = ["club", "new"];
            this.title = "Start a new club";
            this.validator = validateClub;
        }
        if (/\/club\/\d\/edit/.test(location.pathname)) {
            this.type = ["club, edit"];
            this.title = "Edit club";
            this.validator = validateClub;
            this.clubId = location.pathname.split("/")[2];
        }

        if (this.type[0] === "club") this.component = <ClubForm createForm={this} />;
        // if (this.type[0] === "club") this.component = () => <h1>Hi</h1>;
        this.formData = formData;
    }

    setFormData(formData) {
        this.formData = formData;
    }

    validate(errors) {
        return this.validator(this.formData, errors);
    }

    update() {
        if (!this.clubId) return;
        fetch(`/api/clubs/${this.clubId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.formData),
        });
        return this.formData;
    }
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
