import { ClubForm, StandForm } from "../components/FormComponents";

export class CreateForm {
  constructor(location, formData = {}) {
    if (/\/clubs-new/.test(location.pathname)) {
      this.type = ["club", "new"];
      this.title = "Start a new club";
      this.state = {
        name: "clubName",
        description: "description",
        imageUrl: "imageUrl"
      }
      this.validator = validateClub;
      this.component = <ClubForm createForm={this} />;
    }
    if (/\/club\/\d{1,3}\/edit/.test(location.pathname)) {
      this.type = ["club", "edit"];
      this.title = "Edit club";
      this.state = {
        id: location.pathname.split("/")[2],
        name: "clubName",
        description: "description",
        imageUrl: "imageUrl"
      }
      this.validator = validateStand;
      this.id = location.pathname.split("/")[2];
      this.component = <ClubForm createForm={this} />;
    }
    if (/\/stands-new/.test(location.pathname)) {
      this.type = ["stand", "new"];
      this.title = "Build a new roster";
      this.state = {
        name: "standName",
        description: "description",
        characters: "characters"
      }
      this.validator = validateStand;
      this.component = <StandForm createForm={this} />;
    }
    if (/\/stand\/\d{1,3}\/edit/.test(location.pathname)) {
      this.type = ["stand", "edit"];
      this.title = "Edit roster";
      this.state = {
        id: location.pathname.split("/")[2],
        name: "standName",
        description: "description",
        characters: "characters"
      }
      this.validator = validateStand;
      this.id = location.pathname.split("/")[2];
      this.component = <StandForm createForm={this} />;
    }

    this.name = this.type[0]
    this.method = this.type[1]
    this.formData = formData;
  }

  setFormData(formData) {
    this.formData = formData;
  }

  validate(errors) {
    return this.validator(this.formData, errors);
  }

  create = async () => {
    if (this.method !== "new") return;
    const response = await fetch(`/api/${this.name}s/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData),
    });

    if (response.ok) {
      const success = await response.json()
      // console.log("form create method created", success);
      return success;
    }
    const errors = response.json();
    console.error("form create method created errors", errors);
    return errors;
  };

  update = async () => {
    if (!this.state.id) return;
    const response = await fetch(`/api/${this.name}s/${this.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData),
    });

    if (response.ok) {
      const success = await response.json()
      // console.log("form update method updated", success)
      return success;
    }
    const errors = await response.json()
    console.error("form update method updated errors", errors);
    return errors;
  };
}

function validateClub(formData, errors) {
  if (formData[this.state.name]?.length <= 4) {
    errors[this.state.name] = "Club name length must be greater than 4 characters";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }

  if (formData[this.state.description]?.length > 2000) {
    errors[this.state.description] = "Description must be less than 2000 characters";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }
  if (formData[this.state.description]?.length <= 0) {
    errors[this.state.description] = "Description must be greater than 0 characters";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }

  if (errors.errors) {
    return errors;
  }
  return null;
}

function validateStand(formData, errors) {
  if (formData[this.state.name]?.length <= 0) {
    errors[this.state.name] = "Club name length must be greater than zero";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }

  if (formData[this.state.description]?.length > 2000) {
    errors[this.state.description] = "Description must be less than 2000 characters";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }
  if (formData[this.state.description]?.length <= 0) {
    errors[this.state.description] = "Description must be greater than 0 characters";
    errors.errors ? (errors.errors += 1) : (errors.errors = 1);
  }

  if (errors.errors) {
    return errors;
  }
  return null;
}
