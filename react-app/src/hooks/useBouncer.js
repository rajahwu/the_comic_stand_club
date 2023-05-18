import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function useBouncer(status) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (status === "logout") {
      if (!sessionUser) {
        return history.push("/");
      }
    }

    if (status === "login") {
      if (sessionUser) {
        return history.push("/feed");
      }
    }
  }, [status, history, sessionUser]);
}
