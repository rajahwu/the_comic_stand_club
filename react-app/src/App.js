import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { Navigation, SignupFormPage, LoginFormPage } from "./components";
import { SplashPage, FeedPage, CreatePage, ContentPage } from "./pages";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <a href="../docs/index.html" target="_blank">
        API_Docs
      </a>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/clubs-new">
            <CreatePage />
          </Route>
          <Route exact path="/club/:clubId">
            <ContentPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/feed">
            <FeedPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
