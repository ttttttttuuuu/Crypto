import React, { useState } from "react";
import moment from "moment";
import millify from "millify";
import useFetch from "../hooks/useFetchBasic";
import { styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Strategies = [
  "Recommend.Other",
  "Recommend.All",
  "Recommend.MA",
  "RSI",
  "RSI[1]",
  "Stoch.K",
  "Stoch.D",
  "Stoch.K[1]",
  "Stoch.D[1]",
  "CCI20",
  "CCI20[1]",
  "ADX",
  "ADX+DI",
  "ADX-DI",
  "ADX+DI[1]",
  "ADX-DI[1]",
  "AO",
  "AO[1]",
  "Mom",
  "Mom[1]",
  "MACD.macd",
  "MACD.signal",
  "Rec.Stoch.RSI",
  "Stoch.RSI.K",
  "Rec.WR",
  "W.R",
  "Rec.BBPower",
  "BBPower",
  "Rec.UO",
  "UO",
  "close",
  "EMA5",
  "SMA5",
  "EMA10",
  "SMA10",
  "EMA20",
  "SMA20",
  "EMA30",
  "SMA30",
  "EMA50",
  "SMA50",
  "EMA100",
  "SMA100",
  "EMA200",
  "SMA200",
  "Rec.Ichimoku",
  "Ichimoku.BLine",
  "Rec.VWMA",
  "VWMA",
  "Rec.HullMA9",
  "HullMA9",
  "Pivot.M.Classic.S3",
  "Pivot.M.Classic.S2",
  "Pivot.M.Classic.S1",
  "Pivot.M.Classic.Middle",
  "Pivot.M.Classic.R1",
  "Pivot.M.Classic.R2",
  "Pivot.M.Classic.R3",
  "Pivot.M.Fibonacci.S3",
  "Pivot.M.Fibonacci.S2",
  "Pivot.M.Fibonacci.S1",
  "Pivot.M.Fibonacci.Middle",
  "Pivot.M.Fibonacci.R1",
  "Pivot.M.Fibonacci.R2",
  "Pivot.M.Fibonacci.R3",
  "Pivot.M.Camarilla.S3",
  "Pivot.M.Camarilla.S2",
  "Pivot.M.Camarilla.S1",
  "Pivot.M.Camarilla.Middle",
  "Pivot.M.Camarilla.R1",
  "Pivot.M.Camarilla.R2",
  "Pivot.M.Camarilla.R3",
  "Pivot.M.Woodie.S3",
  "Pivot.M.Woodie.S2",
  "Pivot.M.Woodie.S1",
  "Pivot.M.Woodie.Middle",
  "Pivot.M.Woodie.R1",
  "Pivot.M.Woodie.R2",
  "Pivot.M.Woodie.R3",
  "Pivot.M.Demark.S1",
  "Pivot.M.Demark.Middle",
  "Pivot.M.Demark.R1",
  "open",
  "P.SAR",
  "BB.lower",
  "BB.upper",
  "AO[2]",
  "volume",
  "change",
  "low",
  "high",
];
const Exchanges = ["BINANCE", "FTX", "BYBIT", "KUCOIN"];

const Interval = ["1m", "5m", "15m", "30m", "1h", "2h", "4h", "1d", "1W", "1M"];

const Basic = () => {
  const [exchange, setExchange] = useState("BINANCE");

  const [symbol, setSymbol] = useState("BTCUSD");
  const [strategy, setStrategy] = useState(["RSI", "SMA20", "MACD.macd"]);
  const [interval, setInterval] = useState("1m");
  const [send, setSend] = useState({
    symbol: "BTCUSD",
    exchange: "BINANCE",
    strategy: ["RSI", "SMA20", "MACD.macd"],
    interval: "1m",
  });

  const rowData = useFetch({ send });
  const sgy = rowData[0];
  const isLoading = rowData[1];
  const summary = rowData[2];
  const close = rowData[3];
  var colorRe = "gray";
  if (summary.RECOMMENDATION === "BUY") {
    colorRe = "green";
  }
  if (summary.RECOMMENDATION === "SELL") {
    colorRe = "#f44336";
  }

  if (summary.RECOMMENDATION === "STRONG_SELL") {
    colorRe = "#ba000d";
  }
  if (summary.RECOMMENDATION === "STRONG_BUY") {
    colorRe = "#76ff03";
  }

  const handleChangeExchange = (event) => {
    setExchange(event.target.value);
  };

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStrategy(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeInterval = (event) => {
    setInterval(event.target.value);
  };
  const handleSend = (event) => {
    setSend({ symbol, exchange, strategy, interval });
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: "#FFF7CD",
    height: "50px",
    marginTop: "10px",
    backgroundColor: "#F7BA33",
    "&:hover": {
      backgroundColor: yellow[900],
    },
  }));

  return (
    <div className="min-h-full hover:min-h-full mt-10">
      <div
        className=" justify-between items-center w-full md:flex mf:w-auto mf:order-1"
        id="mobile-menu-2 "
      >
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Symbol"
              onChange={handleChangeSymbol}
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "#F7BA33",
                  fontSize: "large",
                  fontWeight: "bold",
                },
              }}
              InputProps={{
                style: { color: "#FFF7CD" },
              }}
              defaultValue="BTCUSD"
              style={{
                background: "#1d1e25",
                color: "#FFF7CD",
                borderRadius: "5px",
              }}
            />
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
              label="Exhcange"
              value={exchange}
              style={{
                background: "#1d1e25",
                color: "#FFF7CD",
              }}
              onChange={handleChangeExchange}
            >
              {Exchanges?.map((exc) => (
                <MenuItem value={exc}>{exc}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              style={{
                color: "#F7BA33",
                fontSize: "large",
                fontWeight: "bold",
              }}
              id="demo-multiple-name-label"
            >
              Strategies
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={strategy}
              onChange={handleChange}
              input={<OutlinedInput label="Strategy" />}
              style={{
                background: "#1d1e25",
                color: "#FFF7CD",
              }}
            >
              {Strategies.map((sg) => (
                <MenuItem value={sg}>{sg}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              style={{
                color: "#F7BA33",
                fontSize: "large",
                fontWeight: "bold",
              }}
              id="demo-multiple-name-label"
            >
              Time frame
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              label="Interval"
              value={interval}
              onChange={handleChangeInterval}
              style={{
                background: "#1d1e25",
                color: "#FFF7CD",
              }}
            >
              {Interval.map((sg) => (
                <MenuItem value={sg}>{sg}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="flex justify-end">
            <ColorButton variant="contained" size="large" onClick={handleSend}>
              Quick Search
            </ColorButton>
          </div>
        </div>

        <div
          className=" grid grid-rows-3 grid-flow-col gap-16 "
          style={{
            color: "#FFF7CD",
            display: "flex",
          }}
        >
          <h1
            className=" mr-10"
            style={{ color: "#F7BA33", fontSize: "30px", fontWeight: "bold" }}
          >
            PRICE:{close}
          </h1>
          {/* <div>
            <div className="featuredMoneyContainer">
              <img className="crypto-image" src={index?.iconUrl}></img>
              <span className="">{index?.symbol}</span>
            </div>
            <span>${parseInt(index.price).toFixed(2)}</span>
          </div> */}
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Divider />
      <h1
        className="w-full justify-center justify-items-center text-center mt-10  "
        style={{ color: "#F7BA33", fontSize: "60px", fontWeight: "bold" }}
      >
        ANALYSIS
      </h1>
      <div className=" grid   xs:grid-cols-2 gap-4  justify-center justify-items-center text-center grid-cols-3  ">
        {sgy?.map((sg) => (
          <div className="mt-10 mb-10 sm:w-64 w-full strategy -apple-system bg-[#1d1e25] ">
            <p style={{ color: "#F7BA33", fontSize: "30px" }}>{sg.name}</p>
            <br />
            <p>{sg.result.toFixed(3)}</p>
          </div>
        ))}
      </div>
      <div
        className="w-full justify-center justify-items-center text-center  "
        style={{ color: "#FFF7CD" }}
      >
        <div style={{ color: "#F7BA33" }}>
          {/* <h1
            style={{ color: "#F7BA33", fontSize: "60px", fontWeight: "bold" }}
          >
          
          </h1> */}
          RECOMMENDATION :
          <h1 style={{ color: colorRe, fontSize: "60px", fontWeight: "bold" }}>
            {summary.RECOMMENDATION}
          </h1>
        </div>

        <div className="flex space-x-4  justify-center justify-items-center text-center ">
          <div className="bg-[#1d1e25] w-64 h-32 text-center ">
            <p className="mt-14"> BUY: {summary.BUY}</p>
          </div>
          <div className="bg-[#1d1e25] w-64 h-32 text-center ">
            <p className="mt-14">NEUTRAL:{summary.NEUTRAL}</p>
          </div>

          <div className="bg-[#1d1e25] w-64 h-32 text-center ">
            <p className="mt-14"> SELL: {summary.SELL} </p>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Basic;
