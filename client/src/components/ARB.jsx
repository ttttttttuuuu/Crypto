import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { FillingBottle, BouncingBalls } from "react-cssfx-loading";
import Divider from "@mui/material/Divider";
import { Statistic } from "antd";
import glasses from "../img/glasses.png";
import cryptoIcon from "../img/Crypto.png";
import growingUp from "../img/growUp.png";
import resultsIcon from "../img/results.png";

const { Countdown } = Statistic;

const ARB = () => {
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

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

  const [exchange, setExchange] = useState("FTX");
  const [date, setDate] = useState(tomorrow);
  const [symbol, setSymbol] = useState("BTC");
  // const rowData = useFetch({ symbol, date, exchange });
  const [pageSize, setPageSize] = useState(5);

  const [index, setIndex] = useState(0);
  const [dates, setDates] = useState([]);
  const [dvol, setDvol] = useState(0);
  const [ARB, setARB] = useState([]);
  const [symbolList, setSymbolList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDateLoading, setIsDateLoading] = useState(false);
  const [select, setSelect] = useState(null);
  const [sorted, setSorted] = useState({ bol: false, col: null });
  const [checked, setChecked] = useState(true);
  const [LState, setLState] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      setLState(true);
    }
  }, []);

  const host = window.location.host;
  const url = `https://crypto-muzw.onrender.com`;
  //const url = `http://localhost:5001`;
  const token = localStorage.getItem("token") ?? "N";
  useEffect(() => {
    setIsLoading(true);
    let controller = new AbortController();
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
        .post(`${url}/get_ARB`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token,
          },
          data: { symbol, date },
          signal: controller.signal,
        })
        .then(function (response) {
          console.log(response.data.arb);
          // setDates((prev) => response.data.dates);

          setARB((prev) => response.data.arb);
          if (!controller.signal.aborted) setIsLoading(false);
          // setDvol((prev) => (isNaN(parseFloat(d)) ? prev : parseFloat(d)));
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // getIndex(symbol);
    const interval = setInterval(() => {
      getIndex(symbol);
    }, 5000);
    return () => {
      clearInterval(interval);
      controller.abort();
      clearInterval(interval);
    };
    // return () =>
  }, [symbol, date]);

  useEffect(() => {
    setIsDateLoading(true);
    const CancelToken = axios.CancelToken;
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

  useEffect(() => {
    function Sort(s) {
      if (sorted.bol) {
        const sortARB = ARB.sort(function (a, b) {
          return a[s] - b[s];
        });
        setARB(sortARB);
      } else {
        const sortARB = ARB.sort(function (a, b) {
          return b[s] - a[s];
        });
        setARB(sortARB);
      }
    }
    Sort(sorted.col);
  }, [sorted]);

  const prevCount = usePrevious(index);

  return (
    <div className="min-h-full font-mono">
      {windowDimensions.width < 501 ? (
        <div
          id="content"
          className={`flex flex-col  py-6
          }`}
        >
          <div className="caret-blue-500 focus:caret-indigo-500 mt-5 font-mono xl:px-4">
            <p className="text-white w-full text-6xl  flex justify-center  xs:text-2xl ">
              OPTIONS ARBITRAGE
            </p>
            <p className="text-white w-full text-m  flex justify-center  ">
              OPPORTUNITIES VIA PUT-CALL PARITY
            </p>
          </div>
        </div>
      ) : (
        <div
          id="content"
          className={`flex flex-row min-h-screen  ${LState ? "hidden" : ""} `}
        >
          <div
            className={`flex-1 flex justify-center items-start  flex-col  px-10  xs:px-6`}
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
                The Options <br className="block " />{" "}
                <span className="text-yellow-400">Arbitrage</span>
              </h1>
              <div className={`flex xs:hidden md:mr-4 mr-0  text-yellow-500`}>
                <AnchorLink offset="100" href="#result">
                  <div
                    className={`flex justify-center items-center w-[140px] h-[140px] rounded-full bg-[#2bc48a] p-[2px] cursor-pointer animate-bounce `}
                  >
                    <div
                      className={`flex justify-center items-center  flex-col bg-primary w-[100%] h-[100%] hover:bg-[#2bc48a]    rounded-full  hover:text-white`}
                    >
                      <div
                        className={`flex justify-center items-start flex-row `}
                      >
                        <p className="font-poppins font-medium text-[18px] leading-[23.4px] ">
                          <span className="">Get</span>
                        </p>
                      </div>
                      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                        <span className="">Started</span>
                      </p>
                    </div>
                  </div>
                </AnchorLink>
              </div>
            </div>

            <h1 className="font-poppins font-semibold  xl:text-[44px] md:text-[42px] text-white  leading-[75px] w-full">
              Opportunities Via Put-Call Parity
            </h1>
            <p className={` max-w-[470px] mt-5 text-slate-400 italic`}>
              Put-call parity is a principle that defines the relationship
              between the price of put and call options of the same on the same
              underlying asset with the same strike price and expiration date.
            </p>
          </div>

          <div className={`flex-1 flex  md:my-0 my-10 relative`}>
            <div className="w-full  flex flex-col items-center justify-center z-[10] pr-10">
              <div className="w-full flex p-6 rounded-[20px] mb-6 rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue `}
                >
                  <img
                    src={cryptoIcon}
                    alt="cryptoIcon"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    Rewards
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    IF ARB {">"} 0 ? buy call + sell put + long futures
                  </p>
                </div>
              </div>
              <div className="w-full flex p-6 rounded-[20px] mb-6 rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}
                >
                  <img
                    src={resultsIcon}
                    alt="resultsIcon"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    A low-risk arbitrage opportunity
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    If the price of one of these options is out of line in
                    relation to the parity equation, it presents a low-risk
                    arbitrage opportunity to put the prices back in line.
                  </p>
                </div>
              </div>
              <div className="w-full  flex p-6 rounded-[20px] mb-0  rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}
                >
                  <img
                    src={growingUp}
                    alt="growingUp"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    Live data
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    Every 5 seconds will get the new results, guarantee your
                    maximum benefit
                  </p>
                </div>
              </div>
            </div>

            {/* <img src={punk} alt="billing" className="w-[50%] h-[50%] z-[5]" /> */}

            {/* gradient start */}
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
            {/* gradient end */}
          </div>
        </div>
      )}

      <Divider />
      <div id="result" className=" h-[100%]  w-full rounded-2xl">
        <div className="overflow-auto " style={{ height: "calc(100% - 76px)" }}>
          <div className="min-w-full rounded-lg">
            <div className="flex justify-between pl-8 text-l xs:text-sm">
              <div className="py-2 text-white flex ">
                {!symbolList ? (
                  <span>
                    <button
                      className={`px-2  max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400 mt-1.5 `}
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
                        <span className=" pl-8 ">
                          <button
                            className={`px-3 mb-1 w-[100px] ${
                              d === date ? "bg-yellow-500" : "bg-[#131415]"
                            } max-h-[25px] border border-slate-100 rounded-lg hover:bg-yellow-400`}
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
            {windowDimensions.width < 501 ? (
              <>
                <div className="flex justify-end text-white text-xs">
                  <div className="featuredMoneyContainer cursor-pointer ">
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
                        <circle cx="42" cy="42" r="42" fill="#F7931A"></circle>
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
                        <circle cx="42" cy="42" r="42" fill="#627EEA"></circle>
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

                    <span className={`px-2 mt-1`}>{symbol}:</span>
                    <span
                      className={` ${
                        index > prevCount ? "text-[#75cf00]" : "text-[#FC5328]"
                      } mt-1`}
                    >
                      ${parseInt(index).toFixed(2)}
                    </span>
                  </div>

                  <div className="featuredMoneyContainer px-4 mt-1">
                    <span className="px-2">DVOL:</span>
                    <span>{dvol}</span>
                  </div>
                </div>
                <div className="flex justify-end  mr-10 text-white text-xs  xs:hidden">
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
              </>
            ) : (
              <div className="flex justify-end text-white  ">
                <div className="flex justify-between">
                  <div className="featuredMoneyContainer cursor-pointer ">
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
                        <circle cx="42" cy="42" r="42" fill="#F7931A"></circle>
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
                        <circle cx="42" cy="42" r="42" fill="#627EEA"></circle>
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
                        index > prevCount ? "text-[#75cf00]" : "text-[#FC5328]"
                      }`}
                    >
                      ${parseInt(index).toFixed(2)}
                    </span>
                  </div>

                  <div className="featuredMoneyContainer px-4">
                    <span className="px-2">DVOL:</span>
                    <span>{dvol}</span>
                  </div>
                </div>

                <div className="flex justify-end  mr-2 ">
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
            )}

            <Divider className="bg-slate-100 rounded-2xl" />
            {isLoading ? (
              <div className="flex  justify-center mt-20 p-5">
                <FillingBottle
                  color="#EAB308"
                  width="48px"
                  height="48px"
                  duration="2s"
                />
              </div>
            ) : (
              <>
                <div className="z-2 sticky  ">
                  <div className="text-[#CCCFD1] h-[32px] flex justify-evenly text-m bg-[#131516]  items-center">
                    {/* <div className="">Calls</div> */}
                    <div className=" items-center font-bold xs:hidden">
                      {moment(date).format("D MMM YY").toLocaleUpperCase()}
                    </div>

                    <div className="  items-center font-bold md:hidden xl:hidden">
                      {date}
                    </div>
                    {/* <div>Puts</div> */}
                  </div>
                </div>
                <Divider className="bg-slate-100 " />
                <div className="h-full overflow-visible transition-all my-10">
                  <div className="flex w-[100%]">
                    <div className="w-[100%]">
                      <div className="flex">
                        <div id="ARB" className="flex-1 text-m xs:text-xs">
                          <div className="bg-[#1F2122] cursor-pointer h-[32px] flex relative box-border font-bold">
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]"
                              onClick={() =>
                                setSorted((prev) => ({
                                  bol: !prev.bol,
                                  col: "sarb",
                                }))
                              }
                            >
                              Synthetic Price
                            </div>
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]"
                              onClick={() =>
                                setSorted((prev) => ({
                                  bol: !prev.bol,
                                  col: "bidCall",
                                }))
                              }
                            >
                              CALL
                            </div>
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]"
                              onClick={() =>
                                setSorted((prev) => ({
                                  bol: !prev.bol,
                                  col: "strike",
                                }))
                              }
                            ></div>
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx] "
                              onClick={() =>
                                setSorted((prev) => ({
                                  bol: !prev.bol,
                                  col: "askPut",
                                }))
                              }
                            >
                              PUT
                            </div>
                            <div
                              className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]"
                              onClick={() =>
                                setSorted((prev) => ({
                                  bol: !prev.bol,
                                  col: "ARB",
                                }))
                              }
                            >
                              ARB
                            </div>
                          </div>
                          {ARB?.map((c, i) => (
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
                              <div className="absolute bg-[#76d800]"></div>

                              <div className="flex-1 text-[#ffffff] px-[4px] relative  flex  justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                {c["sarb"] < 1000
                                  ? c["sarb"].toFixed(2)
                                  : c["sarb"].toFixed(0)}
                              </div>

                              <div className="flex-1 text-[white] px-[4px] relative text-xs flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50xpx]">
                                <div className="grid grid-cols-1 w-full h-full">
                                  <p
                                    className={`${
                                      c["bidCall"] !== "-"
                                        ? "text-[#75cf00]"
                                        : ""
                                    } `}
                                  >
                                    {c["bidCall"]}
                                  </p>
                                  <span
                                    className={`${
                                      isNaN(parseFloat(c["bidCall"] * index))
                                        ? "hidden"
                                        : ""
                                    }`}
                                  >
                                    <p>
                                      $
                                      {parseFloat(c["bidCall"] * index).toFixed(
                                        2
                                      )}
                                    </p>
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 text-[#ffffff] px-[3px] relative flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[50px]">
                                {c["strike"]}
                              </div>
                              <div className="flex-1 text-[white] px-[6px] relative text-xs  flex justify-center items-center   leading-4 border border-r-1 border-[#2D2F30] min-w-[60px]">
                                <div className="grid grid-cols-1 w-full h-full">
                                  <p
                                    className={`${
                                      c["askPut"] !== "-"
                                        ? "text-[#FC5328]"
                                        : ""
                                    } `}
                                  >
                                    {c["askPut"]}
                                  </p>
                                  <p
                                    className={`${
                                      isNaN(parseFloat(c["askPut"] * index))
                                        ? "hidden"
                                        : ""
                                    }`}
                                  >
                                    $
                                    {parseFloat(c["askPut"] * index).toFixed(2)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex-1 text-[#ffffff] px-[4px] relative  flex justify-center items-center  leading-4 border border-r-1 border-[#2D2F30] min-w-[40px]">
                                {c["ARB"].toFixed(2)}
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
              className={`text-yellow-500 flex justify-center items-center w-full h-[70px]  bg-[#2bc48a] p-[2px] cursor-pointer rounded-xl  hover:animate-pulse`}
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

export default ARB;
