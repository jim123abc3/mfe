import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Progress from "./components/Progress";
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { lazy, Suspense, useState } from "react";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} /> 
          <Suspense fallback={<Progress />}>
            <Switch>
              
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>
              <Route path="/">
                <MarketingLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>

            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
}