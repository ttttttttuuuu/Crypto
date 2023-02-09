import React, { useState } from "react";
import useFetch from "../hooks/useFetchLogin";
import axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { BarWave } from "react-cssfx-loading";
import { Link, Navigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Spline from "@splinetool/react-spline";
import glasses from "../img/glasses.png";
import apple from "../img/apple.svg";
import google from "../img/google.svg";

const Login = () => {
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(null);

  const rowData = useFetch();

  // const handleButtonClick = () => {
  //   // 傳入參數: 新的 todo + 解構 todos
  //   const re = register;
  //   setRegister(!re);
  // };
  const host = window.location.host;
  const url = `http://${host}`;
  //const url = `http://localhost:5001`;
  const handleLoginClick = () => {
    if (email && password !== "") {
      setIsLoading(true);
      axios
        .post(`${url}/get_login`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          email: email,
          password: password,
        })

        .then((response) => {
          // console.log(response);
          setIsLoading(false);
          if (response.data.message) {
            // console.log(response.data);
            setErrMsg(response.data.message);
          } else {
            // setLoginStatus(true);
            localStorage.setItem("token", response.data.token);
            // console.log(response.data.token);
            setRedirect(<Navigate to="/" />);
            window.location.replace("/");
            // alert(`Welcome back,${response.data.username}`);
          }
        });
    } else {
      if (email === "") {
        alert("Please input email");
      }

      if (password === "") {
        alert("Please input password");
      }
    }
  };

  return (
    <div className=" w-full font-mono ">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 100,
        }}
        open={isLoading}
      >
        <div className="flex  justify-center  opacity-100">
          <BarWave
            color="#2bc48a"
            width="100px"
            // height="48px"
            duration="2s"
          />
        </div>
      </Backdrop>

      {/* <div className=" w-full text-[#E2AA27] font-bold    flex flex-row-reverse ">
        <p className="sm:mr-20 text-3xl  mr-0">
          <Link to="/">X</Link>
        </p>
      </div> */}
      {redirect ?? (
        <div className="w-full gap-2 bg-[#131415] h-full  flex mt-5">
          {/* <div className="flex-1 w-full h-screen xs:hidden">
            <Spline scene="https://prod.spline.design/K1W6N9tARBIrbZDX/scene.splinecode" />
          </div> */}

          <div
            className={`flex-1 flex justify-center items-start  flex-col  px-10  xs:px-6 xs:hidden `}
          >
            <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
              <img
                src={glasses}
                alt="discount"
                className="w-[32px] h-[32px] "
              />
              <p className={` ml-2  text-slate-500`}>
                <span className="text-white">Login</span> can see all {""}
                <span className="text-white"> instruments</span> calculation.
              </p>
            </div>

            <div className="flex flex-row justify-between items-center w-full mt-10">
              <h1 className="flex-1 font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white ss:leading-[100.8px] leading-[75px]">
                Option
                <span className="text-yellow-400">Crypto</span>
                Trade
              </h1>
            </div>
            <div>
              <p className={` max-w-[470px] mt-5 text-slate-400 italic`}>
                Robust, Reliable and Lightning Fast
              </p>
              <p className={` max-w-[470px]  text-slate-400 italic`}>
                cryptocurrency derivatives platform for traders of all options
                and crypto trading.
              </p>
            </div>
            <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
              <img
                src={apple}
                alt="google_play"
                className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
              />
              <img
                src={google}
                alt="google_play"
                className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
              />
            </div>
          </div>

          <div className="flex-1 w-full m-10 xs:m-0 xs:mt-10 flex justify-center">
            <div className="w-96 items-center bg-[#1F2122] p-10 rounded-2xl ">
              <div className={`${isLoading ? "opacity-50" : ""}`}>
                <div className="w-full text-3xl cursor-pointer flex  justify-center text-white mt-10">
                  <p>C</p> <p className="text-[#E2AA27]">O</p> <p>N.3.0</p>
                </div>
                <p className="text-[red] text-base mt-5 flex  justify-center">
                  {errMsg}
                </p>

                <div className="flex justify-center">
                  <p className=" w-full text-[#E2AA27] mt-5 ">Email</p>
                </div>

                <div className=" flex justify-center">
                  <input
                    type="email"
                    className="border-2 border-[#1F2122] focus:ring-2  p-2 rounded-xl w-full text-white bg-[#131415]"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className=" flex   justify-center">
                  <p className=" w-full text-[#E2AA27] mt-5">Password</p>
                </div>

                <div className=" flex   justify-center ">
                  <input
                    type="password"
                    className="border-2 border-[#1F2122] focus:ring-2 w-full p-2 rounded-xl text-white bg-[#131415]"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                {/* {isLoading ? (
                  <div className="flex  justify-center  pl-20 ml-5  mt-5 fixed opacity-100">
                    <BarWave
                      color="#2bc48a"
                      width="100px"
                      // height="48px"
                      duration="2s"
                    />
                  </div>
                ) : (
                  <></>
                )} */}
                <div className=" flex  justify-center mt-10">
                  <button
                    className="w-64  active:ring-2 bg-[#131415] hover:bg-yellow-400
        duration-200 py-3 text-lg text-white
        tracking-wide rounded-lg mt-4 "
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>

                <div className=" flex   justify-center mt-2">
                  <Link to="/forgetPassword">
                    <p className=" w-64 text-yellow-400 text-sm flex justify-end">
                      Forget Password ?
                    </p>
                  </Link>
                </div>

                <div className=" flex   justify-center">
                  <Link to="/register">
                    <button
                      className="text-black w-64  active:ring-2 bg-yellow-400 hover:bg-[#F7BA33] hover:text-white duration-200 py-3 text-lg  rounded-lg mt-4 "
                      // onClick={handleLoginClick}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
