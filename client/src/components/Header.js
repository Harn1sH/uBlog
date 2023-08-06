/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { UserContext } from "../UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });
        setUserInfo(response);
      } catch (error) {
        console.log("err1");
      }
    }
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };
  const username = userInfo?.username;

  return (
    <div className="w-screen shadow-xl py-2 bg-gradient-to-b from-neutral-200 to-white">
      <header className="flex justify-between mx-[66px] my-3 ">
        <Link to="/" className="font-bold text-3xl">
          Ublog
        </Link>
        <nav className="space-x-5 font-semibold text-2xl">
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          {username && (
            <div className="flex gap-x-2">
              <Link
                to="/create"
                className="items-center justify-center text-center "
              >
                <Button
                  endIcon={<AddBoxIcon />}
                  variant="outlined"
                  color="success"
                >
                  create
                </Button>
              </Link>
              <Button
                startIcon={<LogoutIcon />}
                onClick={logout}
                color="error"
                variant="contained"
                disableElevation
                className="w-[30px] text-center text-sm"
              ></Button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
