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
      this.validator = validateForm;
      this.component = <ClubForm createForm={this} />;
    }
    if (/\/club\/\d\/edit/.test(location.pathname)) {
      this.type = ["club", "edit"];
      this.title = "Edit club";
      this.state = { 
        id: location.pathname.split("/")[2], 
        name: "clubName", 
        description: "description", 
        imageUrl: "imageUrl" 
      }
      this.validator = validateForm;
      this.clubId = location.pathname.split("/")[2];
      this.component = <ClubForm createForm={this} />;
    }
    if (/\/stands-new/.test(location.pathname)) {
      this.type = ["stand", "new"];
      this.title = "Build a new stand";
      this.state = { 
        name: "standName", 
        description: "description", 
        imageUrl: "imageUrl" 
      }
      this.validator = validateForm;
      this.component = <StandForm createForm={this} />;
    }
    if (/\/stand\/\d\/edit/.test(location.pathname)) {
      this.type = ["stand", "edit"];
      this.title = "Edit stand";
      this.state = { 
        id: location.pathname.split("/")[2], 
        name: "standName", 
        description: "description", 
        imageUrl: "imageUrl" }
      this.validator = validateForm;
      this.clubId = location.pathname.split("/")[2];
      this.component = () => <StandForm createForm={this} />;
    }

    this.formData = formData;
    this.name = this.type[0]
    this.method = this.type[1]
  }

  setFormData(formData) {
    this.formData = formData;
  }

  validate(errors) {
    return this.validator(this.formData, errors);
  }

  update = async () => {
    if (!this.state.id) return;
    const response = await fetch(`/api/${this.name}s/${this.clubId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData),
    });
    console.log("form update method updated", response);
    return response;
  };
}

function validateForm(formData, errors) {
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
