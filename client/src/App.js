import React, { useEffect, useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import { Context } from "./Store";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Assignment from "./pages/Assignment";
import './App.css';
import Classroom from "./pages/Classroom";
import ClassComponent from "./pages/Class";

export default function App() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    axios
      .get("/api/checktoken", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch({
            type: "VERIFY_AUTH",
            payload: {
              isAuth: true,
              userData: res.data.user,
            },
          });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/assignment" exact component={Assignment} />
        <Route path="/classroom" exact component={Classroom} />
        <Route path="/classroom/:id" component={ClassComponent} />
      </Switch>
    </>
  );
}
