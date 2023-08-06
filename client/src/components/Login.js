import React, { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((output) => {
        setUserInfo(output);
        setRedirect(true);
      });
    } else {
      alert("Invalid Credentials");
    }
  };
  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div>
      <div className="w-screen text-center text-5xl font-extrabold font-serif mt-12">
        Login
      </div>
      <div className="w-screen text-center my-10">
        <form
          method="post"
          className="flex flex-col justify-center items-center gap-y-12"
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              label="Username"
              name="username"
              className="h-1 w-[500px] "
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="h-1 w-[500px]"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="w-[500px]"
            type="submit"
            disableElevation
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
