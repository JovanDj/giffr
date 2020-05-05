import React, { FunctionComponent } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { Trending } from "./Trending/Trending";

export const App: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/">
        <Trending />
      </Route>

      <Route path="/trending">
        <Trending />
      </Route>
    </Switch>
  );
};
