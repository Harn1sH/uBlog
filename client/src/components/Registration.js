import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Registration Failed. Try changing your Username");
    }
  };
  if (redirect) {
    return <Navigate to="/login"></Navigate>;
  }
  return (
    <div>
      <div className="w-screen text-center text-5xl font-extrabold font-serif mt-12">
        Register
      </div>
      <div className="w-screen text-center my-10">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-y-12"
        >
          <div>
            <TextField
              label="Username"
              name="username"
              className="h-1 w-[500px] "
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
              className="h-1 w-[500px]"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="w-[500px]"
            type="submit"
            disableElevation
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
