import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Context } from "../Store";
import axios from "axios";
import Layout from "../components/Layout";

export default function Home() {
  const [state, dispatch] = useContext(Context);

  return (
    <div>
      {state.isAuth ? (
        <Layout>
          <p>Authenticated</p>
          <br />
          <Button
            onClick={() => {
              axios
                .get("/api/logout")
                .then((res) => {
                  document.location = "/";
                })
                .catch((err) => {
                  console.error(err);
                  dispatch({
                    type: "VERIFY_AUTH",
                    payload: {
                      isAuth: false,
                      userData: null,
                    },
                  });
                });
            }}
          >
            Logout
          </Button>
        </Layout>
      ) : (
        <Layout>
          <p>Hello user</p>
          <br />
          <Link to="/auth">
            <Button>Authenticate</Button>
          </Link>
        </Layout>
      )}
    </div>
  );
}
