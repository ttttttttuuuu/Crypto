import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const useFetchLogin = () => {
  const [redirect, setRedirect] = useState(null);
  const host = window.location.host;
  const url = `https://crypto-muzw.onrender.com`;
  //const url = `http://localhost:5001`;
  useEffect(() => {
    // console.log("GET_token:", localStorage.getItem("token"));
    axios
      // .post("https://conoptionapinode.herokuapp.com/loginState", {
      .post(`${url}/loginState`, {
        // .post("http://localhost:5001/loginState", {

        headers: {
          "Access-Control-Allow-Origin": "*",
          "access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data === "Failed") {
          // setLoginStatus(true);
          setRedirect(null);
        } else {
          setRedirect(<Navigate to="/" />);
        }
      });
  }, []);

  return;
};

export default useFetchLogin;
