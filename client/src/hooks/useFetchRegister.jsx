import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const useFetchRegister = ({ data }) => {
  // console.log(data);

  const [errMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(null);

  // 等待動畫
  const [isLoading, setIsLoading] = useState(false);
  const host = window.location.host;
  const url = `https://crypto-muzw.onrender.com`;
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel = () => {};

    async function fetchData() {
      //  await
      setIsLoading(true);
      // if (data["password"].length >= 8) {
      axios
        // .post("https://conoptionapinode.herokuapp.com/register", {
        .post(`${url}/get_register`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          email: data.email,
          username: data.username,
          password: data.password,
          code: data.code,
          checked: data.checked,
        })

        .then((response) => {
          // console.log(response);
          if (response.data.message) {
            // console.log(response.data);
            setErrMsg(response.data);
          } else {
            // setLoginStatus(true);
            localStorage.setItem("token", response.data.token);
            // console.log(response.data.token);
            setRedirect(<Navigate to="/" />);
          }
        });
    }

    setIsLoading(false);

    // setExpiry(obj["expiry"]);

    fetchData();

    return () => {
      setErrMsg("");
      setRedirect(null);
      // console.log("cancel");
      cancel();
    };
  }, [data]);

  return [errMsg, isLoading, redirect];
};

export default useFetchRegister;
