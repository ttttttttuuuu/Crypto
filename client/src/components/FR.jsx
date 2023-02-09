import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import axios from "axios";
import moment from "moment";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FillingBottle, BouncingBalls } from "react-cssfx-loading";
import Divider from "@mui/material/Divider";
import { Statistic } from "antd";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import glasses from "../img/glasses.png";
import longCall from "../img/options/longCall.svg";
import longPut from "../img/options/longPut.svg";
import shortPut from "../img/options/shortPut.svg";
import shortCall from "../img/options/shortCall.svg";
import bill from "../img/bill.png";
import apple from "../img/apple.svg";
import google from "../img/google.svg";
const { Countdown } = Statistic;

const FR = () => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  var today = new Date();
  today = today.setDate(today.getDate() + 1);
  today = new Date(today);

  const formatDate = (date) => {
    let formatted_date = `${date.getDate()}${months[date.getMonth()]}${
      date.getFullYear().toString()[2] + date.getFullYear().toString()[3]
    }`;
    return formatted_date;
  };

  const tomorrow = formatDate(today);

  // const [strategy, setStrategy] = useState("FR");
  const [date, setDate] = useState(tomorrow);

  const [symbol, setSymbol] = useState("BTC");

  const [pageSize, setPageSize] = useState(10);
  const [select, setSelect] = useState(null);
  const [change, setChange] = useState(false);
  const [abort, setAbort] = useState(tomorrow);
  const [index, setIndex] = useState(0);
  const [dates, setDates] = useState([]);
  const [dvol, setDvol] = useState(0);
  const [preIndex, setPreIndex] = useState(0);
  const [Call, setCall] = useState([]);
  const [Put, setPut] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDateLoading, setIsDateLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);
  const [symbolList, setSymbolList] = useState(false);
  const [checked, setChecked] = useState(true);
  const [LState, setLState] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      setLState(true);
    }
  }, []);

  useEffect(() => {
    function handleResize() {
      const screens = getWindowDimensions();
      setWindowDimensions(screens);
      console.log(screens.width);
      if (screens.width < 501) {
        setChecked((prev) => false);
      }
    }
    // handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions.width]);

  // function getSort(col) {
  //   Call.sort(function (a, b) {
  //     // console.log(a.instrument);
  //     return parseFloat(a.col) - parseFloat(b.col);
  //   });

  //   PUT.sort(function (a, b) {
  //     return parseFloat(a.col) - parseFloat(b.col);
  //   });
  // }

  const host = window.location.host;
  const url = `https://crypto-muzw.onrender.com`;
  //const url = `http://localhost:5001`;
  const token = localStorage.getItem("token") ?? "N";

  useEffect(() => {
    let controller = new AbortController();

    setIsLoading(true);
    setCall([]);
    setPut([]);
    setInstruments([]);
    // console.log("begin", controller.signal.aborted);

    function getIndex() {
      axios
        .post(`${url}/get_index`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          symbol,
        })
        .then(function (response) {
          // console.log(response.data.data.coin);
          // console.log(response?.data);

          setIndex((prev) => response.data?.result);
        })
        .catch(function (error) {
          console.error(error);
        });

      axios
        .post(`${url}/getDVOL`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          symbol,
        })
        .then(function (response) {
          let d = response.data?.result;

          setDvol((prev) => (isNaN(parseFloat(d)) ? prev : parseFloat(d)));
        })
        .catch(function (error) {
          console.error(error);
        });

      axios
        .post(`${url}/get_FR`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token,
          },
          signal: controller.signal,
          data: { symbol, date },
        })
        .then(function (response) {
          // setDates((prev) => response.data.dates);

          setCall((prev) => response.data.FairPrice[0]);
          setPut((prev) => response.data.FairPrice[1]);
          setInstruments((prev) => response.data.FairPrice[2]);
          if (!controller.signal.aborted) setIsLoading(false);
          // setDvol((prev) => (isNaN(parseFloat(d)) ? prev : parseFloat(d)));
        })
        .catch(function (error) {
          console.error(error);
        });
    }

    const interval = setInterval(() => {
      getIndex(symbol);
    }, 5000);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [symbol, date]);

  useEffect(() => {
    setIsDateLoading(true);

    let cancel = () => {};
    axios
      .post(`${url}/get_dates`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": token,
        },
        data: { symbol },
      })
      .then(function (response) {
        // console.log(response.data.data.coin);
        // console.log(response?.data);

        setDates((prev) => response.data?.dates);
        setIsDateLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
    return () => {
      // clearInterval(interval);
      cancel();
    };
  }, [symbol]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
      // setPreIndex(ref.current);
    }, [value]);
    return ref.current;
  }

  function clickState(s) {
    const newSelect = select;
    if (newSelect !== s) {
      setSelect(s);
    } else {
      setSelect(null);
    }
  }

  const prevCount = usePrevious(index);

  const YellowSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#2bc48a",
      "&:hover": {
        backgroundColor: alpha("#2bc48a", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#2bc48a",
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <div
      className="w-full h-full hover:min-h-full font-mono xl:px-4  "
      id="content"
    >
      {windowDimensions.width < 501 ? (
        <div
          className={`flex md:flex-row flex-col  py-6
          }`}
        >
          <div className="caret-blue-500 focus:caret-indigo-500 mt-5 font-mono xl:px-4">
            <p className="text-white w-full text-6xl  flex justify-center  xs:text-2xl ">
              OPTIONS
            </p>
            <p className="text-white w-full text-5xl  flex justify-center xs:text-xl ">
              FAIR PRICE
            </p>
          </div>
        </div>
      ) : (
        <div className="">
          <div
            id="content"
            className={`flex flex-row min-h-screen  ${LState ? "hidden" : ""} `}
          >
            <div className={`flex-1 flex  md:my-0 my-10 relative`}>
              <div className="w-full  flex flex-col items-center justify-center z-[10] ">
                <div className="flex  flex-row ">
                  <div className="basis-1/2 px-2 ">
                    <div className="w-full flex  rounded-[20px] m-5 rohit p-10 ">
                      <div className="flex-1 flex flex-col ">
                        <h4 className="flex justify-center items-center font-poppins font-semibold text-white text-[30px]  mb-1">
                          Long Call
                        </h4>
                        {/* <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                      IF ARB {">"} 0 ? buy call + sell put + long futures
                    </p> */}
                        <div className="flex justify-center items-center">
                          <img
                            src={longCall}
                            alt="longCall"
                            className="w-[100%] max-w-[100px]   object-contain "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex  rounded-[20px] m-5  rohit p-10 ">
                      <div className="flex-1 flex flex-col ">
                        <h4 className="flex justify-center items-center font-poppins font-semibold text-white text-[30px]  mb-1">
                          Long Put
                        </h4>

                        <div className="flex justify-center items-center">
                          <img
                            src={longPut}
                            alt="longPut"
                            className="w-[100%] max-w-[100px]   object-contain "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2 px-2 ">
                    <div className="w-full flex  rounded-[20px] m-5 rohit p-10 ">
                      <div className="flex-1 flex flex-col ">
                        <h4 className="flex justify-center items-center font-poppins font-semibold text-white text-[30px]  mb-1">
                          Short Call
                        </h4>

                        <div className="flex justify-center items-center">
                          <img
                            src={shortCall}
                            alt="shortPut"
                            className="w-[100%] max-w-[100px]   object-contain "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex  rounded-[20px] m-5 rohit p-10 ">
                      <div className="flex-1 flex flex-col ">
                        <h4 className="flex justify-center items-center font-poppins font-semibold text-white text-[30px]  mb-1">
                          Short Put
                        </h4>

                        <div className="flex justify-center items-center">
                          <img
                            src={shortPut}
                            alt="shortPut"
                            className="w-[100%] max-w-[100px]   object-contain "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* gradient start */}
              <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
              <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
              <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
              {/* gradient end */}
            </div>

            <div
              className={`flex-1 flex justify-center    flex-col  px-10  xs:px-6 w-full mr-20`}
            >
              <div className="flex  flex-row justify-end items-center  mb-2">
                <div className="flex py-[6px] flex-row  items-center px-4 bg-discount-gradient rounded-[10px]">
                  <img
                    src={glasses}
                    alt="discount"
                    className="w-[32px] h-[32px] "
                  />
                  <p className={` ml-2  text-slate-500`}>
                    <span className="text-white">Login</span> can see all {""}
                    <span className="text-white"> instruments</span>{" "}
                    calculation.
                  </p>
                </div>
              </div>

              <div className="flex flex-row justify-end items-center w-full mt-10">
                <div className={`flex xs:hidden mr-10  text-yellow-400`}>
                  <AnchorLink offset="100" href="#result">
                    <div className="svgWaveRelativeCircle ">
                      <div className="svgWaveText font-poppins font-medium">
                        Get {"\n"} Started
                      </div>
                      <div className="svgWaveAbsoluteCircle svgWaveAbsolute1"></div>
                      <div className="svgWaveAbsoluteCircle svgWaveAbsolute2"></div>
                      <div className="svgWaveAbsoluteCircle svgWaveAbsolute3"></div>
                      <div className="svgWaveAbsoluteCircle svgWaveAbsolute4"></div>
                    </div>
                  </AnchorLink>
                </div>

                <h1 className=" flex-row justify-end items-end font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white mr-10  ">
                  The Options <br className="block " />{" "}
                  <span className="text-yellow-400">FAIR PRICE</span>
                </h1>
              </div>

              <div className="flex flex-row justify-center  items-center text-white  ml-20 font-bold ">
                {/* <div className="flex flex-row  justify-end  items-center px-4">
                  <div className="bg-[#2bc48a]  rounded-xl w-[64px] h-[64px] flex justify-center items-center ">
                    CALLS
                  </div>
                  <div className="flex justify-center items-center  w-[64px] h-[64px] ">
                    VS
                  </div>
                  <div className="bg-[red]  rounded-xl  w-[64px] h-[64px] flex justify-center items-center">
                    PUTS
                  </div>
                </div> */}
              </div>
              <div className="flex flex-row justify-end  items-center   ml-20  ">
                <p className={` max-w-[470px] mt-5 text-slate-400 italic`}>
                  Use Fair Price to choose which transaction types is most
                  likely can take a profit.
                </p>
              </div>
            </div>
          </div>
          <div className={`flex flex-row   ${LState ? "hidden" : ""} `}>
            <div className="flex-1 flex justify-start items-center   flex-col   xs:px-6 w-full">
              <div className="flex justify-center items-center w-full mt-10">
                <div>
                  <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
                    Easily check the <br className="block xs:hidden" />{" "}
                    Instruments & Fair Price
                  </h2>
                  <p
                    className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] mt-5`}
                  >
                    C O N .3.0 - Option Crypto Trade is your best optionCrypto
                    Strategies choice, use our App or Web get the real time
                    FairPrice, Let you can take the best profit out.
                  </p>

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
              </div>
            </div>
            <div
              id="product"
              className="flex-1 flex justify-center items-center   mt-0 xs:mt-10 relative`"
            >
              <div className="flex-1 flex  justify-center items-center mt-0 xl:mt-10 relative">
                <img
                  src={bill}
                  alt="billing"
                  className="w-[100%] h-[100%] relative z-[5] "
                />

                {/* gradient start */}
                <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
                <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
                {/* gradient end */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className=" h-full w-full   bg-[#1F2122]  rounded-2xl px-4"
        id="result"
      >
        <div className="overflow-auto " style={{ height: "calc(100% - 76px)" }}>
          <div className="min-w-full  rounded-lg  mb-10">
            <div className="flex justify-between xs:grid grid-cols-1 pl-8 xs:pl-2 text-l mt-10">
              <div className="py-2 text-white flex  ">
                {!symbolList ? (
                  <span>
                    <button
                      className={`px-2  max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400 mt-1.5  `}
                      // onClick={() => setSymbol("BTC")}
                      onMouseOver={() => setSymbolList((prev) => true)}
                      onMouseLeave={() => setSymbolList((prev) => false)}
                    >
                      {symbol}
                    </button>
                  </span>
                ) : (
                  <div
                    className={` ${symbolList ? "z-50" : "z-0"} py-0 mt-1.5`}
                    onMouseLeave={() => setSymbolList((prev) => false)}
                  >
                    <li>
                      <button
                        className={`px-2  max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400`}
                        onClick={() => {
                          setSymbol("BTC");
                          setSymbolList(false);
                        }}
                      >
                        BTC
                      </button>
                    </li>
                    <li>
                      <button
                        className={`px-2  max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400`}
                        onClick={() => {
                          setSymbol("ETH");
                          setSymbolList(false);
                        }}
                      >
                        ETH
                      </button>
                    </li>
                    <li>
                      <button
                        className={`px-2  max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400`}
                        onClick={() => {
                          setSymbol("SOL");
                          setSymbolList(false);
                        }}
                      >
                        SOL
                      </button>
                    </li>
                  </div>
                )}

                <div className="mt-1.5">
                  {isDateLoading ? (
                    <div className="flex  justify-center  pl-10 mt-1">
                      <BouncingBalls
                        color="#2bc48a"
                        width="48px"
                        // height="48px"
                        duration="2s"
                      />
                    </div>
                  ) : (
                    <>
                      {dates?.map((d) => (
                        <span className="pl-8 ">
                          <button
                            className={`px-2 w-[100px] mb-1 ${
                              d === date ? "bg-yellow-400" : "bg-[#131415]"
                            } max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400 `}
                            onClick={() => setDate(d)}
                          >
                            {d}
                          </button>
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex  justify-center mt-20 p-5">
                <FillingBottle
                  color="#FACC15"
                  width="48px"
                  height="48px"
                  duration="2s"
                />
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <div className="flex justify-between">
                    <div className="featuredMoneyContainer cursor-pointer text-white mt-4">
                      {symbol === "BTC" ? (
                        <svg
                          className="w-[1em] h-[1em] mt-1"
                          style={{
                            display: "inline-block",
                            fill: "currentColor",
                            flexShrink: "0",
                            transform:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            fontSize: "16px",
                          }}
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 84 84"
                          currency="btc"
                        >
                          <circle
                            cx="42"
                            cy="42"
                            r="42"
                            fill="#F7931A"
                          ></circle>
                          <path
                            fill="#fff"
                            d="M60.52 36.017c.835-5.59-3.42-8.593-9.24-10.598l1.889-7.57-4.61-1.148-1.837 7.37a193.548 193.548 0 00-3.692-.868l1.85-7.42-4.605-1.148-1.89 7.568a154.01 154.01 0 01-2.942-.692l.005-.024-6.356-1.586-1.226 4.921s3.42.784 3.348.832c1.866.466 2.203 1.701 2.147 2.68l-2.15 8.625c.129.033.295.08.479.153-.154-.038-.318-.08-.487-.12l-3.014 12.081c-.228.567-.807 1.418-2.112 1.095.046.067-3.35-.836-3.35-.836l-2.288 5.275 5.998 1.495c1.116.279 2.209.572 3.285.847l-1.907 7.657 4.604 1.149 1.888-7.576c1.258.341 2.479.656 3.673.953l-1.882 7.54 4.608 1.149 1.908-7.643c7.858 1.487 13.768.887 16.255-6.22 2.005-5.722-.1-9.023-4.234-11.176 3.01-.694 5.28-2.674 5.884-6.765zM49.99 50.78c-1.425 5.722-11.06 2.629-14.185 1.853l2.53-10.144c3.125.78 13.143 2.323 11.654 8.29zm1.425-14.847c-1.3 5.205-9.32 2.56-11.922 1.912l2.295-9.2c2.602.648 10.98 1.858 9.627 7.288z"
                          ></path>
                        </svg>
                      ) : symbol === "ETH" ? (
                        <svg
                          className="w-[1em] h-[1em] mt-1"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 84 84"
                          currency="eth"
                          style={{
                            display: "inline-block",
                            fill: "currentColor",
                            flexShrink: "0",
                            transform:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            fontSize: "16px",
                          }}
                        >
                          <circle
                            cx="42"
                            cy="42"
                            r="42"
                            fill="#627EEA"
                          ></circle>
                          <path
                            fill="#D8DEF8"
                            d="M41.997 15l-.371 1.23v35.707l.371.361 16.993-9.797L41.997 15z"
                          ></path>
                          <path
                            fill="#FFFFFF"
                            d="M41.993 15L25 42.501l16.993 9.797V15z"
                          ></path>
                          <path
                            fill="#D8DEF8"
                            d="M41.997 55.436l-.21.249v12.719l.21.596L59 45.644l-17.003 9.792z"
                          ></path>
                          <path
                            fill="#FFFFFF"
                            d="M41.993 69V55.436L25 45.644 41.993 69z"
                          ></path>
                          <path
                            fill="#AAB8EA"
                            d="M41.99 52.297l16.993-9.796-16.992-7.534v17.33z"
                          ></path>
                          <path
                            fill="#D8DEF8"
                            d="M25 42.5l16.993 9.797v-17.33L25 42.5z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-[1em] h-[1em] mt-1"
                          style={{
                            display: "inline-block",
                            fill: "currentColor",
                            flexShrink: "0",
                            transform:
                              "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            fontSize: "16px",
                          }}
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 84 84"
                          currency="sol"
                        >
                          <circle cx="42" cy="42" r="42" fill="#000"></circle>
                          <g clip-path="url(#clip0_1531_13144)">
                            <path
                              fill="url(#paint0_linear_1531_13144)"
                              d="M62.784 53.172l-6.934 7.324a1.61 1.61 0 01-1.178.504H21.806a.815.815 0 01-.442-.13.782.782 0 01-.147-1.204l6.939-7.324a1.608 1.608 0 011.174-.504h32.866a.8.8 0 01.738.477.784.784 0 01-.15.857zm-6.934-14.75a1.61 1.61 0 00-1.178-.503H21.806a.814.814 0 00-.442.13.782.782 0 00-.147 1.204l6.939 7.324a1.611 1.611 0 001.174.504h32.866a.799.799 0 00.738-.477.784.784 0 00-.15-.857l-6.933-7.324zm-34.045-5.26h32.867a1.63 1.63 0 001.178-.504l6.934-7.324a.79.79 0 00.15-.857.8.8 0 00-.739-.477H29.33a1.631 1.631 0 00-1.174.504l-6.937 7.324a.79.79 0 00-.15.856.796.796 0 00.296.347c.131.085.284.13.44.13z"
                            ></path>
                          </g>
                          <defs>
                            <linearGradient
                              id="paint0_linear_1531_13144"
                              x1="24.545"
                              x2="58.43"
                              y1="61.882"
                              y2="23.102"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0.08" stop-color="#9945FF"></stop>
                              <stop offset="0.3" stop-color="#8752F3"></stop>
                              <stop offset="0.5" stop-color="#5497D5"></stop>
                              <stop offset="0.6" stop-color="#43B4CA"></stop>
                              <stop offset="0.72" stop-color="#28E0B9"></stop>
                              <stop offset="0.97" stop-color="#19FB9B"></stop>
                            </linearGradient>
                            <clipPath id="clip0_1531_13144">
                              <path
                                fill="#fff"
                                d="M0 0H42V37H0z"
                                transform="translate(21 24)"
                              ></path>
                            </clipPath>
                          </defs>
                        </svg>
                      )}

                      <span className={`px-2 `}>{symbol}:</span>
                      <span
                        className={` ${
                          index > prevCount
                            ? "text-[#75cf00]"
                            : "text-[#FC5328]"
                        }`}
                      >
                        ${parseInt(index).toFixed(2)}
                      </span>
                    </div>
                    <div className="featuredMoneyContainer px-4 text-white mt-4">
                      <span className="px-2">DVOL:</span>
                      <span>{dvol}</span>
                    </div>
                  </div>
                </div>

                <Divider className="bg-slate-100 rounded-2xl" />

                <div className="z-2 sticky  ">
                  <div className="text-[#CCCFD1] h-[32px] flex  text-m bg-[#131516]  ">
                    <div
                      className={`px-2 flex justify-center  items-center   xs:hidden flex-1`}
                    >
                      <p className="text-xs mt-1 ">Show All</p>
                      <YellowSwitch
                        {...label}
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        className="text-xs"
                      />
                    </div>
                    <div className="xs:hidden flex-1 flex justify-center  items-center">
                      Calls
                    </div>

                    <div className=" font-bold flex-1  flex justify-center  items-center xs:hidden">
                      {moment(date).format("D MMM YY").toLocaleUpperCase()}
                    </div>

                    <div className=" font-bold flex-1  flex justify-center  items-center md:hidden xl:hidden">
                      {date}
                    </div>
                    <div className="xs:hidden flex-1 flex justify-center  items-center">
                      Puts
                    </div>

                    <div className="flex justify-center  items-center md:text-sm  xs:text-[12px]  text-white xs:hidden flex-1 text-center">
                      <Countdown
                        title="Expiration:"
                        value={moment(date).format("YYYY-MM-DD 16:00:00")}
                        format="D day  H:mm:s "
                        style={{
                          display: "flex",
                          // opacity: 0.8,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <Divider className="bg-slate-100 " />
                <div className="h-full overflow-auto transition-all ">
                  <div className="flex w-full">
                    <div className="w-[100%]">
                      <div className="flex text-sm  xs:text-xs xs:grid grid-cols-1 ">
                        <div
                          className={`${
                            windowDimensions.width < 501 ? "mt-5" : "hidden"
                          } text-[#CCCFD1] h-[32px] flex justify-evenly text-m bg-[#131516]  items-center`}
                        >
                          <div className="">Calls</div>
                        </div>
                        <div id="CALL" className="flex-1 ">
                          <div className="bg-[#1F2122] cursor-pointer h-[32px] flex relative box-border font-bold ">
                            <div className="flex-1 text-[#ffffff] px-[4px] relative flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Alert
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Fair Price
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Bid
                            </div>
                            <div
                              className={`${
                                checked ? "hidden" : ""
                              } flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                            ></div>

                            <div className="flex-1 text-[#ffffff]  px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50px] xs:min-w-[20px] ">
                              Value%
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Ask
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Above%
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Below%
                            </div>
                          </div>
                          {!checked
                            ? Call.filter((e) => e.Alert !== "-").map(
                                (c, i) => (
                                  <div
                                    className={`
                               ${
                                 i === select
                                   ? "bg-[#07594A]"
                                   : i % 2 === 0
                                   ? "bg-[#101212]"
                                   : "bg-[#1F2122]"
                               }
                               cursor-pointer h-[32px] flex relative box-border `}
                                    onClick={() => {
                                      clickState(i);
                                    }}
                                  >
                                    <div
                                      className={`flex-1 ${
                                        c["Alert"] === "LONG"
                                          ? "text-[#75cf00]"
                                          : c["Alert"] === "SHORT"
                                          ? "text-[#FC5328]"
                                          : "text-white"
                                      } px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                                    >
                                      {c["Alert"]}
                                    </div>
                                    <div className="flex-1 text-[#ffffff] px-[4px] relative flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {c["Fair Price"]}
                                    </div>

                                    <div className="flex-1 text-[white] px-[4px] relative text-xs  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {windowDimensions.width < 501 ? (
                                        <span
                                          className={`${
                                            c["bid"] !== "-"
                                              ? "text-[#75cf00]"
                                              : ""
                                          } `}
                                        >
                                          {c["bid"]}
                                        </span>
                                      ) : (
                                        <div className="grid grid-cols-1">
                                          <span
                                            className={`${
                                              c["bid"] !== "-"
                                                ? "text-[#75cf00]"
                                                : ""
                                            } `}
                                          >
                                            {c["bid"]}
                                          </span>
                                          <span
                                            className={`${
                                              isNaN(
                                                parseFloat(c["bid"] * index)
                                              )
                                                ? "hidden"
                                                : ""
                                            }`}
                                          >
                                            ${" "}
                                            {parseFloat(
                                              c["bid"] * index
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {c["strike"]}
                                    </div>
                                    <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {c["Value %"]}
                                    </div>
                                    <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {windowDimensions.width < 501 ? (
                                        <span
                                          className={`${
                                            c["ask"] !== "-"
                                              ? "text-[#FC5328]"
                                              : ""
                                          } `}
                                        >
                                          {c["ask"]}
                                        </span>
                                      ) : (
                                        <div className="grid grid-cols-1">
                                          <span
                                            className={`${
                                              c["ask"] !== "-"
                                                ? "text-[#FC5328]"
                                                : ""
                                            } `}
                                          >
                                            {c["ask"]}
                                          </span>
                                          <span
                                            className={`${
                                              isNaN(
                                                parseFloat(c["ask"] * index)
                                              )
                                                ? "hidden"
                                                : ""
                                            }`}
                                          >
                                            $
                                            {parseFloat(
                                              c["ask"] * index
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {c["Pabove %"]}
                                    </div>
                                    <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                      {c["Pbelow %"]}
                                    </div>
                                  </div>
                                )
                              )
                            : Call.map((c, i) => (
                                <div
                                  className={`
                               ${
                                 i === select
                                   ? "bg-[#07594A]"
                                   : i % 2 === 0
                                   ? "bg-[#101212]"
                                   : "bg-[#1F2122]"
                               }
                               cursor-pointer h-[32px] flex relative box-border `}
                                  onClick={() => {
                                    clickState(i);
                                  }}
                                >
                                  <div
                                    className={`flex-1 ${
                                      c["Alert"] === "LONG"
                                        ? "text-[#75cf00]"
                                        : c["Alert"] === "SHORT"
                                        ? "text-[#FC5328]"
                                        : "text-white"
                                    } px-[4px] relative flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                                  >
                                    {c["Alert"]}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Fair Price"]}
                                  </div>

                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["bid"] !== "-"
                                            ? "text-[#75cf00]"
                                            : ""
                                        } `}
                                      >
                                        {c["bid"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["bid"] !== "-"
                                              ? "text-[#75cf00]"
                                              : ""
                                          } `}
                                        >
                                          {c["bid"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["bid"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          ${" "}
                                          {parseFloat(c["bid"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Value %"]}
                                  </div>
                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["ask"] !== "-"
                                            ? "text-[#FC5328]"
                                            : ""
                                        } `}
                                      >
                                        {c["ask"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["ask"] !== "-"
                                              ? "text-[#FC5328]"
                                              : ""
                                          } `}
                                        >
                                          {c["ask"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["ask"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          $
                                          {parseFloat(c["ask"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pabove %"]}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pbelow %"]}
                                  </div>
                                </div>
                              ))}
                        </div>
                        <div
                          id="STRIKE"
                          className={`flex[0 0 60px] ${
                            checked ? "w-[60px] mx-1" : "w-[120px] "
                          } `}
                        >
                          <div className="  h-[32px] flex justify-center box-border">
                            <div className=" text-[#ffffff]  leading-4 mt-2"></div>
                          </div>
                          {!checked ? (
                            <></>
                          ) : (
                            Call?.map((d, i) => (
                              <div className="  h-[32px] flex justify-center box-border  xs:hidden ">
                                <div className=" text-[#ffffff] leading-4 mt-2">
                                  {d.instrument.split("-")[2]}
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        <div
                          className={`${
                            windowDimensions.width < 501 ? "" : "hidden"
                          } text-[#CCCFD1] h-[32px] flex justify-evenly text-m bg-[#131516]  items-center`}
                        >
                          <div className="">Puts</div>
                        </div>
                        <div id="PUT" className="flex-1">
                          <div className="bg-[#1F2122] cursor-pointer h-[32px] flex relative box-border font-bold ">
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Alert
                            </div>
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]"
                              // onClick={() => getSort("Fair Price")}
                            >
                              Fair Price
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Bid
                            </div>
                            <div
                              className={`${
                                checked ? "hidden" : ""
                              } flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                            ></div>

                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Value%
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Ask
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Above%
                            </div>
                            <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                              Below%
                            </div>
                          </div>
                          {!checked
                            ? Put.filter((e) => e.Alert !== "-").map((c, x) => (
                                <div
                                  className={` ${
                                    x + 100 === select
                                      ? "bg-[#07594A]"
                                      : (x + 100) % 2 === 0
                                      ? "bg-[#101212]"
                                      : "bg-[#1F2122]"
                                  } cursor-pointer h-[32px] flex relative box-border `}
                                  onClick={() => {
                                    clickState(x + 100);
                                  }}
                                >
                                  <div
                                    className={`flex-1 ${
                                      c["Alert"] === "LONG"
                                        ? "text-[#75cf00]"
                                        : c["Alert"] === "SHORT"
                                        ? "text-[#FC5328]"
                                        : "text-white"
                                    } px-[4px] relative flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                                  >
                                    {c["Alert"]}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Fair Price"]}
                                  </div>

                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["bid"] !== "-"
                                            ? "text-[#75cf00]"
                                            : ""
                                        } `}
                                      >
                                        {c["bid"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["bid"] !== "-"
                                              ? "text-[#75cf00]"
                                              : ""
                                          } `}
                                        >
                                          {c["bid"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["bid"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          ${" "}
                                          {parseFloat(c["bid"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["strike"]}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Value %"]}
                                  </div>
                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["ask"] !== "-"
                                            ? "text-[#FC5328]"
                                            : ""
                                        } `}
                                      >
                                        {c["ask"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["ask"] !== "-"
                                              ? "text-[#FC5328]"
                                              : ""
                                          } `}
                                        >
                                          {c["ask"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["ask"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          $
                                          {parseFloat(c["ask"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pabove %"]}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pbelow %"]}
                                  </div>
                                </div>
                              ))
                            : Put.map((c, x) => (
                                <div
                                  className={` ${
                                    x + 100 === select
                                      ? "bg-[#07594A]"
                                      : (x + 100) % 2 === 0
                                      ? "bg-[#101212]"
                                      : "bg-[#1F2122]"
                                  } cursor-pointer h-[32px] flex relative box-border `}
                                  onClick={() => {
                                    clickState(x + 100);
                                  }}
                                >
                                  <div
                                    className={`flex-1 ${
                                      c["Alert"] === "LONG"
                                        ? "text-[#75cf00]"
                                        : c["Alert"] === "SHORT"
                                        ? "text-[#FC5328]"
                                        : "text-white"
                                    } px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]`}
                                  >
                                    {c["Alert"]}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Fair Price"]}
                                  </div>

                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["bid"] !== "-"
                                            ? "text-[#75cf00]"
                                            : ""
                                        } `}
                                      >
                                        {c["bid"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["bid"] !== "-"
                                              ? "text-[#75cf00]"
                                              : ""
                                          } `}
                                        >
                                          {c["bid"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["bid"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          ${" "}
                                          {parseFloat(c["bid"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Value %"]}
                                  </div>
                                  <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {windowDimensions.width < 501 ? (
                                      <span
                                        className={`${
                                          c["ask"] !== "-"
                                            ? "text-[#FC5328]"
                                            : ""
                                        } `}
                                      >
                                        {c["ask"]}
                                      </span>
                                    ) : (
                                      <div className="grid grid-cols-1">
                                        <span
                                          className={`${
                                            c["ask"] !== "-"
                                              ? "text-[#FC5328]"
                                              : ""
                                          } `}
                                        >
                                          {c["ask"]}
                                        </span>
                                        <span
                                          className={`${
                                            isNaN(parseFloat(c["ask"] * index))
                                              ? "hidden"
                                              : ""
                                          }`}
                                        >
                                          $
                                          {parseFloat(c["ask"] * index).toFixed(
                                            2
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pabove %"]}
                                  </div>
                                  <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                    {c["Pbelow %"]}
                                  </div>
                                </div>
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {windowDimensions.width < 501 ? (
        <></>
      ) : (
        <div className=" flex  justify-center mt-10 ">
          <AnchorLink
            offset="100"
            href="#content"
            onClick={() => setLState(false)}
          >
            <div
              className={`text-yellow-400 flex justify-center items-center w-full h-[70px]  bg-[#2bc48a] p-[2px] cursor-pointer rounded-xl  hover:animate-pulse`}
            >
              <div
                className={`flex justify-center items-center px-5  flex-col w-[100%] h-[100%]  rounded-full  text-white`}
              >
                <div className={`flex justify-center items-start flex-row `}>
                  <p className="font-poppins font-medium text-[18px] ">
                    <span className="">Back To Information</span>
                  </p>
                </div>
              </div>
            </div>
          </AnchorLink>
        </div>
      )}
    </div>
  );
};

export default FR;
