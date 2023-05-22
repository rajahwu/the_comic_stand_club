import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import { SignupFormPage, LoginFormPage } from "./components";
import {
  SplashPage,
  FeedPage,
  CreatePage,
  ContentPage,
  AllContentPage,
} from "./pages";
import { BaseLayout } from "./layouts";

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
      {isLoaded && (
        <Switch>
          <BaseLayout isLoaded={isLoaded}>
            <Route exact path="/clubs-new">
              <CreatePage />
            </Route>
            <Route exact path="/club/:clubId">
              <ContentPage />
            </Route>
            <Route exact path="/club/:clubId/edit">
              <CreatePage />
            </Route>
            <Route exact path="/stands-new">
              <CreatePage />
            </Route>
            <Route exact path="/stand/:standId">
              <ContentPage />
            </Route>
            <Route exact path="/stand/:standId/edit">
              <CreatePage />
            </Route>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/feed">
              <FeedPage />
            </Route>
            <Route path="/feed/clubs">
              <AllContentPage feedType="clubs" />
            </Route>
            <Route path="/feed/stands">
              <AllContentPage feedType="stands" />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
          </BaseLayout>
        </Switch>
      )}
    </>
  );
}

export default App;
