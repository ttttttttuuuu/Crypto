import React, { useState } from "react";
import useFetch from "../hooks/useFetchLogin";
import { BarWave } from "react-cssfx-loading";
import { Link, Navigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { alpha, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Spline from "@splinetool/react-spline";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FFD400",
    "&:hover": {
      backgroundColor: alpha("#FFD400", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#FFD400",
  },
}));

const Register = () => {
  const [timeState, setTimeState] = useState({
    time: 10,
    btnDisable: false,
    btnContent: "Send Code",
    color: "gray",
  });
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [passopen, setPassOpen] = useState(false);

  let timeChange;
  let ti = timeState.time;

  const clock = () => {
    if (ti > 0) {
      ti = ti - 1;
      setTimeState({
        time: ti,
        btnContent: ti,
        color: "#E6E6FA",
        btnDisable: true,
      });
      // console.log(ti);
    } else {
      clearInterval(timeChange);
      setTimeState({
        time: 10,
        btnContent: "Send Code",
        btnDisable: false,
        color: "gray",
      });
    }
  };

  const handleButtonClick = () => {
    // 傳入參數: 新的 todo + 解構 todos
    const re = register;
    setRegister(!re);
  };
  const host = window.location.host;
  const url = `https://crypto-muzw.onrender.com`;

  const handleButtonSendCode = () => {
    if (email && username !== "") {
      setTimeState({ btnContent: "10s", btnDisable: true, color: "#E6E6FA" });
      timeChange = setInterval(clock, 1000);

      axios
        .post(`${url}/sendSMS`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          email: email,
          username: username,
        })

        .then((response) => {
          // console.log("1", response);
          if (response.data.message) {
            // console.log(response.data);
            setErrMsg(response.data);
          }
        });
    } else {
      alert("Please input email and username first!");
    }
  };

  const handleSignUpClick = () => {
    if (email && username && password && code !== "") {
      axios
        .post(`${url}/get_register`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          email: email,
          username: username,
          password: password,
          code: code,
          checked: checked,
        })

        .then((response) => {
          // console.log(response);
          if (response.data.message) {
            // console.log(response.data);
            setErrMsg(response.data.message);
          } else {
            // setLoginStatus(true);
            localStorage.setItem("token", response.data.token);
            // console.log(response.data.token);
            setRedirect(<Navigate to="/" />);
            window.location.replace("/");

            // checked
            //   ? alert(
            //       `Hi ${username},We recommend that you use Fair Price or Arbitrage,hope it can help you make the right choice`
            //     )
            //   : alert(
            //       `HI  ${username},We recommend that you use Indicator or refer our Docs`
            // );
          }
        });
    }
    // else {
    //   if (email === "") {
    //     alert("Please input email");
    //   }
    //   if (username === "") {
    //     alert("Please input username");
    //   }
    //   if (password === "") {
    //     alert("Please input password");
    //   }
    //   if (password.length <= 8) {
    //     alert("Please Use 8 or more characters");
    //   }
    //   if (code === "") {
    //     alert("Please input email verification");
    //   }
    // }
  };

  const handleChangeLevel = (event) => {
    setChecked(event.target.checked);
  };

  const handleEmail = (event) => {
    const value = event.target.value.trim();
    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
      )
    ) {
      setOpen(true);
      setErrMsg("Please enter a correct email address");
      // console.log("请输入正确的Email");
    } else {
      setEmail(value);
      setOpen(false);
      console.log("false");
    }
  };

  const handlePassword = (event) => {
    const value = event.target.value.trim();
    var passTest = /^(?=.*[0-9\!@#\$%\^&\*])(?=.*[a-zA-Z]).{8,16}$/;
    if (!passTest.test(value)) {
      setPassOpen(true);
      setErrMsg("Please enter a correct password");
      // console.log("请输入正确的Password");
      // console.log(value);
    } else {
      setPassword(value);
      setPassOpen(false);
      // console.log("false");
    }
  };

  return (
    <div className=" w-full  mt-10">
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

      {redirect ?? (
        <div className="w-full flex bg-[#131415] h-full ">
          <div className="flex-1 w-full  flex justify-center">
            <div className="w-96 items-center bg-[#1F2122] p-10 rounded-2xl">
              <div className="w-full text-3xl cursor-pointer flex  justify-center text-white ">
                <p>C</p> <p className="text-[#FFD400] ">O</p> <p>N.3.0</p>
              </div>

              <p className="flex justify-center text-[red] ">{errMsg}</p>
              <div className=" flex justify-center my-2">
                <p className=" w-full text-white   ">Email</p>
              </div>
              <div className=" flex  justify-center my-2 ">
                <input
                  type="email"
                  className=" text-white bg-[#131415] p-2 rounded-md w-full"
                  onChange={handleEmail}
                />
              </div>

              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Please input correct email format!
                </Alert>
              </Collapse>
              <div className=" flex   justify-center my-2">
                <p className=" w-full text-white   ">Username</p>
              </div>
              <div className=" flex justify-center my-2">
                <input
                  type="username"
                  className="text-white bg-[#131415]  p-2 rounded-md w-full"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className=" flex  justify-center my-2">
                <p className=" w-full text-white ">Password</p>
              </div>
              <div className=" flex justify-center my-2">
                <input
                  type="password"
                  className=" text-white bg-[#131415]   w-full p-2 rounded-md"
                  onChange={handlePassword}
                />
              </div>

              <Collapse in={passopen}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setPassOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Please input Use 8 or more characters with a mix of letters
                  and numbers
                </Alert>
              </Collapse>
              <div className=" flex justify-start my-3">
                <FormControlLabel
                  style={{ color: "white" }}
                  control={
                    <GreenSwitch
                      checked={checked}
                      onChange={handleChangeLevel}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Professional Investor ?"
                />
              </div>
              <div className=" flex justify-center">
                <p className="mt-4  text-white  w-full text-sm ">
                  Email Verification:
                </p>
                <input
                  type="code"
                  className="text-white bg-[#131415]  focus:ring-2 w-32 p-2 rounded-md"
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>

              <div className=" flex justify-center my-3">
                <button
                  className="active:ring-2 
              duration-200  text-s 
              tracking-wide w-full ml-2 mt-2"
                  style={{
                    borderRadius: "5px",
                    height: "30px",
                    backgroundColor: `${timeState.color}`,
                  }}
                  onClick={handleButtonSendCode}
                  disabled={timeState.btnDisable}
                >
                  {timeState.btnContent}
                </button>
              </div>
              <div className=" flex justify-center my-3">
                <Link to="/Login">
                  <p className=" w-full text-[#FFD400] text-sm flex justify-end">
                    Already have account ?
                  </p>
                </Link>
              </div>
              <div className=" flex justify-center m">
                <button
                  className="w-64  cursor active:ring-2 bg-[#FFD400] hover:bg-[#F7BA33] active:bg-[#F7BA33]
    duration-200 py-3 text-lg text-black
    tracking-wide rounded-lg mt-4"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* <div className="h-full  xs:h-0 xs:w-0">
            <Spline scene="https://prod.spline.design/K1W6N9tARBIrbZDX/scene.splinecode" />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Register;
