import React, { useState } from "react";
import useFetch from "../hooks/useFetchLogin";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, Navigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { alpha, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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

const ForgetPassword = () => {
  const [timeState, setTimeState] = useState({
    time: 10,
    btnDisable: false,
    btnContent: "Send Code",
    color: "gray",
  });
  const [register, setRegister] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");

  const rowData = useFetch({});
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [passopen, setPassOpen] = useState(false);

  let timeChange;
  let ti = timeState.time;
  const username = "confirm new password code!";
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
  const url = `http://${host}`;
  //const url = `http://localhost:5001`;

  const handleButtonSendCode = () => {
    if (email && username !== "") {
      setTimeState({ btnContent: "10s", btnDisable: true, color: "#E6E6FA" });
      timeChange = setInterval(clock, 1000);

      axios
        .post(`${url}/get_sendSMS`, {
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

  const handleSubmitClick = () => {
    if (email && password && confirm && code !== "") {
      setErrMsg("");
      if (password === confirm) {
        axios
          .post(`${url}/get_forgetPassword`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            },
            email: email,
            username: username,
            password: password,
            code: code,
          })

          .then((response) => {
            // console.log(response);
            if (response.data.message) {
              // console.log(response.data);
              setErrMsg(response.data.message);
            } else {
              setRedirect(<Navigate to="/Login" />);
              window.location.replace("/Login");
              alert(`Success!`);

              // checked
              //   ? alert(
              //       `Hi ${username},We recommend that you use Fair Price or Arbitrage,hope it can help you make the right choice`
              //     )
              //   : alert(
              //       `HI  ${username},We recommend that you use Indicator or refer our Docs`
              // );
            }
          });
      } else {
        setErrMsg("Password is not same!");
      }
    }
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
      // console.log("false");
    }
  };

  const handlePassword = (event) => {
    const value = event.target.value.trim();
    var passTest = /^(?=.*[0-9\!@#\$%\^&\*])(?=.*[a-zA-Z]).{8,16}$/;
    if (!passTest.test(value)) {
      setPassOpen(true);
      // console.log("请输入正确的Password");
      setErrMsg("Please enter a correct password");
      // console.log(value);
    } else {
      setPassword(value);
      setPassOpen(false);
      // console.log("false");
    }
  };

  return (
    redirect ?? (
      <div
        className="w-full flex justify-center "
        // style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="  p-4  bg-[#1F2122] rounded-md shadow-md mt-10 ">
          {/* <h2 className=" w-full text-[#FFD400] font-bold mb-10 text-5xl  ">
            <Link to="/">X</Link>
          </h2> */}
          <p style={{ color: "red" }}>{errMsg}</p>
          <p className="my-2 text-yellow-400">Email</p>
          <input
            type="email"
            className=" focus:ring-2 w-full p-2 rounded-md"
            onChange={handleEmail}
          />
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

          <p className="my-2 text-yellow-400">New Password</p>
          <input
            type="newPassword"
            className="border-2  focus:ring-2 w-full p-2 rounded-md"
            onChange={handlePassword}
          />
          <p className="my-2 text-yellow-400">Confirm Password</p>
          <input
            type="password"
            className="border-2  focus:ring-2 w-full p-2 rounded-md"
            onChange={(event) => setConfirm(event.target.value)}
          />
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
              Please input Use 8 or more characters with a mix of letters and
              numbers
            </Alert>
          </Collapse>

          {/* <p className="mt-4 mb-2 text-[#FFD400] ">Confirm Password</p>
          <input
            type="password"
            className="border-2 border-#131415-400 focus:ring-2 w-full p-2 rounded-md"
            onChange={(event) => setPassword2(event.target.value)}
          /> */}

          <p className="mt-4 mb-2 text-yellow-400 ">Email Verification</p>
          <input
            type="code"
            className="border-2 border-#131415-400 focus:ring-2 w-40 p-2 rounded-md"
            onChange={(event) => setCode(event.target.value)}
          />
          <button
            className="active:ring-2 
              duration-200  text-s text-[#F7BA33]
              tracking-wide   w-40 ml-2"
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
          <div>
            <Link to="/Login">
              <button
                className="text-[#F7BA33] text-sm"
                onClick={handleButtonClick}
              >
                Login ?
              </button>
            </Link>
          </div>
          <button
            className="w-full  cursor active:ring-2 bg-[#FFD400] hover:bg-[#F7BA33] active:bg-[#F7BA33]
    duration-200 py-3 text-lg text-#FFF7CD
    tracking-wide rounded-lg mt-4"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export default ForgetPassword;
