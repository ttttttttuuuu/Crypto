import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import moment from "moment";
// import millify from "millify";
import useFetch from "../hooks/useFetchARB";
import { DataGrid } from "@mui/x-data-grid";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Statistic } from "antd";
// import AnchorIcon from "@mui/icons-material/Anchor";
import clsx from "clsx";
import deribit from "../img/api/deribit_logo.png";
import arb from "../img/api/arb.png";
import exchange_logo from "../img/api/exchange.jpeg";

const { Countdown } = Statistic;
const columns = [
  {
    field: "STRIKE",
    headerName: "STRIKE",
    minWidth: 100,
    flex: 1,
    headerClassName: "super-app-theme--header ",
    cellClassName: "super-app",
  },

  {
    field: "BidCall",
    headerName: "Call",
    minWidth: 100,
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-bid",
  },
  // {
  //   field: "AskCall",
  //   headerName: "AskCall",
  //   minWidth: 200,
  //   flex: 1,
  //   headerClassName: "super-app-theme--header",
  // },

  // {
  //   field: "BidPut",
  //   headerName: "BidPut",
  //   minWidth: 200,
  //   flex: 1,
  //   headerClassName: "super-app-theme--header",
  // },
  {
    field: "AskPut",
    headerName: "Put",
    minWidth: 100,
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: "super-app-ask",
  },
  {
    field: "Sarb",
    headerName: "Synthetic Price",
    minWidth: 100,
    flex: 1,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "ARB",
    headerName: "ARB",
    minWidth: 100,
    flex: 1,
    headerClassName: "super-app-theme--header",
    cellClassName: (params) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app2", {
        negative_text: params.value < 0,
        positive_text: params.value > 0,
      });
    },
  },
  // {
  //   field: "AR",
  //   headerName: "AR",
  //   minWidth: 200,
  //   flex: 1,
  //   headerClassName: "super-app-theme--header",
  // },
];

const Card = () => {
  return (
    <div className="w-48 h-48 bg-black shadow-2xl rounded-2xl text-white mt-5">
      <p className="ml-5  font-bold">STEP 1</p>
      <p className="flex justify-center mt-16 font-semibold text-xl">
        Select symbol
      </p>
    </div>
  );
};
const Card2 = () => {
  return (
    <div className="w-48 h-48 bg-black shadow-2xl rounded-2xl text-white mt-5">
      <p className="ml-5  font-bold ">STEP 2</p>
      <p className="flex justify-center mt-16 font-semibold text-xl ">
        Select exchange
      </p>
    </div>
  );
};
const Card3 = () => {
  return (
    <div className="w-48 h-48 bg-black shadow-2xl rounded-2xl text-white mt-5 ">
      <p className="ml-5  font-bold">STEP 3</p>
      <p className="flex justify-center mt-16 font-semibold text-xl">
        Select date
      </p>
    </div>
  );
};

const ARB = () => {
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
  const rowData = useFetch({ symbol, date, exchange });
  const [pageSize, setPageSize] = useState(5);
  // console.log(rowData)
  const data = rowData[0];
  const dates = rowData[1];
  const [index, setIndex] = useState(0);
  // const newdates = Array.from(dates);

  const isLoading = rowData[2];
  // const index = rowData[3];
  const expiry = rowData[4];
  const dvol = rowData[5];

  const handleChangeExchange = (event) => {
    setExchange(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
    setIndex(null);
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
      const options = {
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
        params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "457ede552dmsh339a9169e5d8b7fp1f93f6jsn15737177481b",
        },
      };
      const host = window.location.host;
      const url = `http://${host}`;
      axios
        .post(`${url}/get_index`, {
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
          setIndex(response.data?.result);
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

  return (
    <div className="min-h-full ">
      <div id="content">
        <div className="caret-blue-500 focus:caret-indigo-500 mt-5 ">
          <p className="text-white w-full sm:text-6xl  flex justify-center  text-2xl ">
            OPTIONS ARBITRAGE
          </p>
          <p className="text-white w-full sm:text-5xl  flex justify-center text-xl ">
            OPPORTUNITIES VIA PUT-CALL PARITY
          </p>
          <div className="flex sm:justify-end sm:mr-10  justify-center mr:0">
            <a href="#result">
              <button className="mt-10  rounded-2xl bg-yellow-500 shadow-lg shadow-yellow-500/50 text-white w-64 h-16">
                SKIP TO RESULT
              </button>
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-6 sm:gap-4 grid-cols-1">
          <div className="sm:col-start-2 sm:col-end-4 ">
            <p className=" mt-20 text-white text-4xl">Put-Call Parity</p>
            <p className=" mt-5 text-white text-sm sm:w-80 w-full">
              {`Put-call parity is a principle that defines the relationship between
          the price of put and call options of the same on the same underlying
          asset with the same strike price and expiration date.`}
            </p>
          </div>
          <div className="sm:col-end-7 col-span-2 sm:w-64  w-full">
            <img src={deribit} alt="deribit"></img>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-6 sm:gap-4 grid-cols-1">
          <div className="sm:col-start-2 sm:col-end-4   ">
            <p className=" mt-10 text-white text-4xl  justify-center  ">
              A low-risk arbitrage opportunity
            </p>
            <p className=" mt-5 text-white text-sm sm:w-80 w-full">
              {`If the price of one of these options is out of line in relation to the parity equation, it presents a low-risk arbitrage opportunity to put the prices back in line.`}
            </p>
          </div>
          <div className=" sm:col-end-7 sm:col-span-2 sm:w-80 mt-14  w-full">
            <img src={exchange_logo} alt="exchange"></img>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-6 gap-4 grid-cols-1  ">
          <div className="sm:col-start-2 sm:col-end-4  ">
            <p className="mt-20 text-white text-4xl  justify-center  ">
              Common parity trades
            </p>
            <p className=" mt-5 text-white text-sm  sm:w-80   w-full">
              {`Common parity trades include establishing synthetic positions, boxes, and reversal-conversions.`}
            </p>
          </div>
          <div className="sm:col-end-7 sm:col-span-2 sm:w-64 mt-10 w-full  ">
            <img src={arb} alt="Arb"></img>
          </div>
        </div>

        <div className="sm:flex sm:justify-center mt-10">
          <div className="mx-5 flex justify-center">
            <Card />
          </div>
          <div className="mx-5  flex justify-center ">
            <Card2 />
          </div>
          <div className="mx-5  flex justify-center">
            <Card3 />
          </div>
        </div>
        <div className=" text-white flex justify-end mt-10 sm:mr-20  mr-2">
          <Link to="/Doc">
            <button className="w-32 bg-yellow-500/100 shadow-lg rounded-2xl h-10">
              Read more?
            </button>
          </Link>
        </div>

        <div class=" col-start-1 col-end-7 my-10" id="result">
          <p className=" text-s sm:flex sm:justify-center sm:text-3xl text-green-500 bold  text-m flex justify-center">
            IF ARB {">"} 0
          </p>
          <p className="text-white sm:text-5xl sm:flex sm:justify-center text-xl flex justify-center">
            buy call + sell put + long futures
          </p>
        </div>
      </div>

      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      <Divider />
      <div
        className="sm:flex sm:justify-between items-center w-full mf:w-auto mt-10 grid grid-cols-1"
        id="mobile-menu-2 "
      >
        <div className="">
          <FormControl sx={{ m: 1 }}>
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

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              style={{
                color: "#F7BA33",
                fontSize: "large",
                fontWeight: "bold",
              }}
              id="demo-simple-select-label"
            >
              Exchange
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={exchange}
              label="Exhcange"
              style={{
                background: "black",
                color: "#FFF7CD",
              }}
              onChange={handleChangeExchange}
            >
              <MenuItem value={"binance"}>BINANCE</MenuItem>
              <MenuItem value={"BITSTAMP"}>BITSTAMP</MenuItem>
              <MenuItem value={"BYBIT"}>BYBIT</MenuItem>
              <MenuItem value={"COINBASE"}>COINBASE</MenuItem>
              <MenuItem value={"GEMINI"}>GEMINI</MenuItem>
              <MenuItem value={"FTX"}>FTX</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
            </Select>
          </FormControl>
        </div>

        <div
          className=" sm:text-3xl  text-base  grid grid-rows-3 grid-flow-col gap-16 mr-10 "
          style={{
            color: "#FFF7CD",
            display: "flex",
          }}
        >
          <div className="bold ml-2 ">
            <div className="featuredMoneyContainer ">
              {/* <img className="crypto-image" src={index?.iconUrl}></img> */}
              <span className="">{symbol}</span>
            </div>
            <span>${parseInt(index).toFixed(2)}</span>
          </div>

          <div>
            <div className="featuredMoneyContainer">
              <span className="">DVOL</span>
            </div>
            <span>{dvol}</span>
          </div>

          <Countdown
            title="Expiration:"
            value={expiry}
            format="D day  H:mm:s "
          />
        </div>
      </div>
      <div className="h-full  w-full text-black">
        <div
          style={{
            height: 400,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            sx={{
              width: "100%",
              color: "#131415",
              "& .super-app-theme--header": {
                backgroundColor: "#F7BA33",
                color: "#131415",
                fontWeight: "bold",
              },
              "& .super-app-ask": {
                backgroundColor: "#d47483",
                color: "#131415",
              },
              "& .super-app-bid": {
                backgroundColor: "#A4CBB1",
                color: "#131415",
              },
              "& .super-app": {
                color: "gray",
              },
              "& .super-app2.negative_text": {
                color: "#d47483",
                fontWeight: "600",
              },
              "& .super-app2.positive_text": {
                color: "#A4CBB1",
                fontWeight: "600",
              },
            }}
            loading={isLoading}
            rows={data}
            columns={columns}

            // pageSize={20}
            // rowsPerPageOptions={[20]}
          />
        </div>

        <div className=" flex justify-start mr-10">
          <a href="#content">
            <button className="mt-10 ml-20 rounded-2xl bg-yellow-500 shadow-lg shadow-yellow-500/50 text-white w-64 h-16">
              BANK TO INTRODUCTION
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ARB;
