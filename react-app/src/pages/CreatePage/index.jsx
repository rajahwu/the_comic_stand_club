import { useBouncer } from "../../hooks";
import { useLocation } from "react-router-dom";
import { CreateForm } from "../../utils/forms";

export default function CreatePage() {
  useBouncer("logout");
  const location = useLocation();
  const createForm = new CreateForm(location)
  console.log("create page location ", location)
  console.log("create page create form ", createForm.component)
  return createForm.component
}
