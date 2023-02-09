import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import useFetch from "../hooks/useFetchFR";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import millify from "millify";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Statistic } from "antd";
import clsx from "clsx";
import detail from "../img/api/options_detail.png";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const { Countdown } = Statistic;

const columns = [
  {
    field: "instrument",
    headerName: "Instrument",
    flex: 2,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "bid",
    headerName: "Bid",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "ask",
    headerName: "Ask",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Fair Price",
    headerName: "Fair Price",
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app2",
  },
  {
    field: "Alert",
    headerName: "Alert",
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.value === "SHORT",
        positive: params.value === "LONG",
      });
    },
  },
  {
    field: "SIZE",
    headerName: "Put/Call",
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative: params.value === "PUT",
        positive: params.value === "CALL",
      });
    },
  },

  {
    field: "Value %",
    headerName: "Value %",
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        negative_text: params.value < 0,
        positive_text: params.value > 0,
      });
    },
  },
  {
    field: "Pabove %",
    headerName: "Pabove %",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Pbelow %",
    headerName: "Pbelow %",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
];
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
  const rowData = useFetch({ symbol, date });
  const [pageSize, setPageSize] = useState(10);
  const data = rowData[0];
  const dates = rowData[1];
  const [index, setIndex] = useState(0);
  // const newdates = Array.from(dates);

  const isLoading = rowData[2];
  // const index = rowData[3];
  const expiry = rowData[4];
  const dvol = rowData[5];

  // const handleChangeStrategy = (event) => {
  //   setStrategy(event.target.value);
  // };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  };
  function getCoinId(symbol) {
    if (symbol === "BTC") {
      return "btc_usd";
      // return "Qwsogvtv82FCd";
    } else {
      return "eth_usd";
      // return "razxDUgYGNAdQ";
    }
  }

  useEffect(() => {
    function getPrice(coinId) {
      axios
        .post(`https://optionweb.herokuapp.com/get_index`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          coinId,
        })
        .then(function (response) {
          // console.log(response.data.data.coin);
          // console.log(response?.data);
          setIndex((prev) => response.data?.result);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    const interval = setInterval(() => {
      getPrice(getCoinId(symbol));
    }, 5000);

    return () => clearInterval(interval);
  }, [symbol]);

  // console.log(moment().format("DMMMYY").toUpperCase());

  return (
    <div className="w-full h-full hover:min-h-full  ">
      <div id="content">
        <div className="caret-blue-500 focus:caret-indigo-500 mt-5">
          <p className="text-white w-full sm:text-6xl  flex justify-center  text-2xl ">
            OPTIONS FAIR PRICE
          </p>

          <div className=" sm:justify-end sm:mr-10  flex justify-center mr-0">
            <a href="#result">
              <button className="mt-10  rounded-2xl bg-yellow-500 shadow-lg shadow-yellow-500/50 text-white w-64 h-16">
                SKIP TO RESULT
              </button>
            </a>
          </div>
        </div>

        <div className="md:grid grid-cols-6 gap-4 m-10">
          <div className="col-start-2 col-end-4 ">
            <p className="mt-20 text-white text-4xl w-full">
              4 Basic options transaction types{" "}
            </p>
            <div className=" mt-5 text-white w-full">
              <ul className="text-l">
                <li>Long Call : When price rise (Take Profit) </li>
                <li>
                  Short Put : When price rise or not as expected (Take Profit){" "}
                </li>
                <li>Long Put : When price fall (Take Profit) </li>
                <li>
                  Short Call: When price fall or less than expected (Take
                  Profit){" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-end-7 col-span-2 w-full mt-10">
            <img src={detail} alt="detail"></img>
          </div>
        </div>

        <div className="md:grid grid-cols-6 gap-4">
          <div className="col-start-2 col-end-4 ml-9">
            <p className="mt-20 text-white text-4xl w-full">Make decision</p>
            <p className="mt-5 text-white text-xl w-full">
              {`Use Fair Price  to choose which transaction types is most likely  can take a profit.`}
            </p>
          </div>
          <div className="col-end-7 col-span-2 w-full">
            <div className="text-white text-4xl bg-slate-500 rounded-2xl w-80 text-center my-10">
              Long / Short
            </div>
            <div className="text-white text-4xl bg-slate-500 rounded-2xl w-80 text-center">
              Call / Put
            </div>
          </div>
        </div>

        <div className="md:grid grid-cols-6 gap-4  mt-20">
          <div className=" ml-10 col-start-2 col-end-4 ">
            <p className="  mt-20 text-white text-4xl">2 Strategies</p>
            <div className=" mt-5 text-white text-xl w-full">
              <ul>
                <li>1. Take profit when the "Alert" change</li>
                <li>2. Hold to end</li>
              </ul>
            </div>

            {/* <p className=" mt-5 text-white text-sm w-80">
              {`Common parity trades include establishing synthetic positions, boxes, and reversal-conversions.`}
            </p> */}
          </div>
          <div className="col-end-7 col-span-2 w-96">
            <Spline scene="https://prod.spline.design/4vvymvvnqB-4bdhC/scene.splinecode" />
          </div>
        </div>

        <div className="flex justify-center mt-10"></div>
        <div
          className=" text-white md:flex justify-end mt-10 sm:mr-20  ml-2"
          id="result"
        >
          <Link to="/Doc">
            <button className="w-32 bg-yellow-500/100 shadow-lg rounded-2xl h-10">
              Read more?
            </button>
          </Link>
        </div>
      </div>

      <div
        className="sm:flex sm:justify-between items-center w-full  mf:w-auto mt-10 grid grid-cols-1 "
        id="mobile-menu-2 "
      >
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              style={{
                color: "#F7BA33",
                fontSize: "large",
                fontWeight: "bold",
              }}
              id="demo-simple-select-label"
            >
              Symbol
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={symbol}
              label="Symbol"
              style={{
                background: "black",
                color: "#FFF7CD",
              }}
              onChange={handleChangeSymbol}
            >
              <MenuItem value={"BTC"}>BTC</MenuItem>
              <MenuItem value={"ETH"}>ETH</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 240 }}>
            <InputLabel
              style={{
                color: "#F7BA33",
                fontSize: "large",
                fontWeight: "bold",
              }}
              id="demo-simple-select-label"
            >
              Date
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={date}
              label="Date"
              style={{
                background: "black",
                color: "#FFF7CD",
              }}
              onChange={handleChangeDate}
            >
              {dates.map((date) => (
                <MenuItem value={date}>{date}</MenuItem>
              ))}
              {/* <MenuItem value={dates[0]}>{dates[0]}</MenuItem>
              <MenuItem value={dates[1]}>{dates[1]}</MenuItem>
              <MenuItem value={dates[2]}>{dates[2]}</MenuItem>
              <MenuItem value={dates[3]}>{dates[3]}</MenuItem>
              <MenuItem value={dates[4]}>{dates[4]}</MenuItem>
              <MenuItem value={dates[5]}>{dates[5]}</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div
          className="sm:text-3xl text-base grid grid-rows-3 grid-flow-col gap-16 mr-10 ml-1"
          style={{
            color: "#FFF7CD",
            display: "flex",
          }}
        >
          <div className="bold ml-2">
            <div className="featuredMoneyContainer">
              {/* <img className="crypto-image" src={index?.iconUrl}></img> */}
              <span className="">{symbol}</span>
            </div>
            <span>${parseInt(index).toFixed(2)}</span>
          </div>

          <div>
            <div className="featuredMoneyContainer">
              {/* <img className="crypto-image" src={index?.iconUrl}></img> */}
              <span className="">DVOL</span>
            </div>
            {/* <span> {dvol}</span> */}
            <span>{dvol}</span>
          </div>

          <Countdown
            title="Expiration:"
            value={expiry}
            format="D day  H:mm:s "
            style={
              {
                // opacity: 0.8,
              }
            }
          />
        </div>
      </div>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      <Divider />
      <div className=" h-full  text-black w-full">
        <div className="h-screen " style={{ backgroundColor: "white" }}>
          {{ data } ? (
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              pagination
              sx={{
                width: "100%",
                color: "#131415",
                fontSize: "bold",

                "& .super-app-theme--header": {
                  backgroundColor: "#F7BA33",
                  color: "#131415",
                  fontWeight: "bold",
                },
                "& .super-app.negative": {
                  backgroundColor: "#d47483",
                  // color: "#d47483",
                  // fontWeight: "600",
                },
                "& .super-app.positive": {
                  backgroundColor: "#A4CBB1",
                  // color: "#A4CBB1",
                  // fontWeight: "600",
                },
                "& .super-app2": {
                  // backgroundColor: "#A4CBB1",
                  color: "#F7BA33",
                  fontWeight: "600",
                },

                "& .super-app.negative_text": {
                  color: "#d47483",
                  fontWeight: "600",
                },
                "& .super-app.positive_text": {
                  color: "#A4CBB1",
                  fontWeight: "600",
                },
              }}
              loading={isLoading}
              rows={data}
              columns={columns}
            />
          ) : (
            "Nothing"
          )}
        </div>
        <div className=" flex sm:justify-start sm:mr-10 justify-center">
          <a href="#content">
            <button className="mt-10  rounded-2xl bg-yellow-500 shadow-lg shadow-yellow-500/50 text-white w-64 h-16">
              BANK TO INTRODUCTION
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FR;
