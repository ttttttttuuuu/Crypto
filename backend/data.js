const axios = require("axios");
const moment = require("moment");
const mathjs = require("mathjs");

async function get_Date(currency, plan) {
  const url = `https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=${currency}&kind=option`;

  const res = await axios.get(url);

  const obj = res?.data["result"];
  let date = [];

  // for i in range(0, len(res)):
  //     date.append(res[i]['instrument_name'].split('-')[1])
  obj.map((i) =>
    date.includes(i["instrument_name"].split("-")[1])
      ? ""
      : date.push(i["instrument_name"].split("-")[1])
  );
  date.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a) - new Date(b);
  });

  if (plan === "N") {
    date = date.slice(0, 3);
  }

  return date;
}
// get_Date("BTC");
const getDVOL = async (coinId) => {
  const start = Date.now();
  const req = await axios.get(
    `https://www.deribit.com/api/v2/public/get_volatility_index_data?currency=${coinId}&start_timestamp=${(
      start - 36000
    ).toString()}&end_timestamp=${start.toString()}&resolution=1`
  );
  try {
    const obj = req?.data;
    let dvol = obj?.result?.data[0];
    // console.log(dvol);
    dvol = dvol[dvol.length - 1];
    return dvol;
  } catch (err) {
    console.log(err);
  }

  //   console.log(dvol);
  //   return dvol;
  //   //   res.json({ result: dvol[dvol.length - 1] });
  // })
  // .catch(function (error) {
  //   console.error(error);
  //   //   return null;
  // });
};

const getPrice = async (symbol) => {
  let coinId;
  if (symbol === "BTC") {
    coinId = "btc_usd";
  } else {
    if (symbol === "ETH") {
      coinId = "eth_usd";
    } else {
      if (symbol === "SOL") {
        coinId = "sol_usd";
      }
    }
  }
  const req = await axios.get(
    `https://www.deribit.com/api/v2/public/get_index_price?index_name=${coinId}`
  );
  try {
    const obj = req?.data;
    // console.log(obj.result.index_price);
    return obj.result.index_price;
  } catch (error) {
    console.error(error);
  }
};

const getSummary = async (coinId, date) => {
  const url = `https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=${coinId}&kind=option`;

  const req = await axios.get(url);
  const Data = [];
  try {
    const obj = req?.data;

    obj.result.map((d) =>
      d.instrument_name.split("-")[1] === date
        ? //   &&
          //   d.bid_price != null &&
          //   d.ask_price != null
          Data.push({
            instrument: d.instrument_name,
            strike: parseInt(d.instrument_name.split("-")[2]),
            bid: d.bid_price,
            ask: d.ask_price,
            size: d.instrument_name.split("-")[3] === "C" ? "CALL" : "PUT",
          })
        : ""
    );
    // console.log(Data);
    return Data;
    // return obj.result.index_price;
  } catch (error) {
    console.error(error);
  }
};

const getSummaryARB = async (coinId, date) => {
  const url = `https://www.deribit.com/api/v2/public/get_book_summary_by_currency?currency=${coinId}&kind=option`;

  const req = await axios.get(url);
  let instruments = [];
  const Data = [];
  const result = [];
  try {
    const obj = req?.data;
    obj.result.map((d) =>
      d.instrument_name.split("-")[1] === date
        ? instruments.push(parseInt(d.instrument_name.split("-")[2]))
        : ""
    );

    instruments = new Set(instruments);
    instruments = Array.from(instruments);
    instruments.sort(function (a, b) {
      return a - b;
    });

    obj.result.map((d) =>
      d.instrument_name.split("-")[1] === date
        ? //   &&
          //   d.bid_price != null &&
          //   d.ask_price != null
          Data.push({
            instrument: d.instrument_name,
            strike: parseInt(d.instrument_name.split("-")[2]),
            bid: d.bid_price,
            ask: d.ask_price,
            size: d.instrument_name.split("-")[3] === "C" ? "CALL" : "PUT",
          })
        : ""
    );

    instruments.forEach((i) => {
      let data = {};
      Data.map((d) => {
        if (d.strike === i && d.size === "CALL") {
          data.bidCall = d.bid;
          data.askCall = d.ask;
        }
        if (d.strike === i && d.size === "PUT") {
          data.bidPut = d.bid;
          data.askPut = d.ask;
        }
        if (data.bidCall || data.askPut || data.bidPut || data.askCall) {
          data.strike = i;
        }
      });
      result.push(data);
    });

    // console.log(result);
    // console.log(Data);
    return result;
    // return obj.result.index_price;
  } catch (error) {
    console.error(error);
  }
};

const FR = async (symbol, date) => {
  let sigma = await getDVOL(symbol);
  sigma = sigma / 100;
  let price = await getPrice(symbol);
  price = parseFloat(price);

  const DF = await getSummary(symbol, date);

  // let I = moment(date).format("YYYY-MM-DD 16:00:00");
  let I = moment(date).format("YYYY-MM-DD hh:mm:ss");
  I = new Date(I);
  let now = moment().format("YYYY-MM-DD hh:mm:ss");
  now = new Date(now);
  let T = (I - now) / 1000 / 60 / 60 / 24 / 365;
  //   console.log(I - now, T);
  //   const risk = 0.01;
  let Calls = [];
  let Puts = [];
  let Strike = [];
  DF.forEach((df, i) => {
    let K = parseInt(df.strike);
    let option = df.size;
    // let d1 =
    //   (Math.log(price / K) + (risk + sigma ** 2 / 2) * T) /
    //   (sigma * Math.sqrt(T));
    // let d2 = d1 - sigma * Math.sqrt(T);

    let d3 =
      Math.log(price / K) / (sigma * Math.sqrt(T)) - 0.5 * sigma * Math.sqrt(T);

    const price_call_INV =
      (cdfNormal(d3, 0, 1) -
        (K / price) *
          Math.exp(sigma * sigma * T) *
          cdfNormal(d3 - sigma * Math.sqrt(T), 0, 1)) *
      price;

    const price_put_INV =
      ((K / price) *
        Math.exp(sigma * sigma * T) *
        cdfNormal(-d3 + sigma * Math.sqrt(T), 0, 1) -
        cdfNormal(-d3, 0, 1)) *
      price;
    //  FINALLY CALCULATING FAIR PRICES FOR CALL AND PUTS
    // const price_call =
    //   price * cdfNormal(d1, 0, 1) -
    //   K * Math.exp(-risk * T) * cdfNormal(d2, 0, 1);
    // const price_put =
    //   K * Math.exp(-risk * T) * cdfNormal(-d2, 0, 1) -
    //   price * cdfNormal(-d1, 0, 1);
    option === "CALL"
      ? (df["Fair Price"] = price_call_INV.toFixed(1))
      : (df["Fair Price"] = price_put_INV.toFixed(1));
    // console.log(d1, d2);
    // console.log(price_call, price_put);
    if (df.bid != null && df.ask != null) {
      if (df["Fair Price"] < df.bid * price) {
        df.Alert = "SHORT";
        df["Value %"] = (
          ((price * df.bid) / df["Fair Price"] - 1) *
          100
        ).toFixed(1);
      } else {
        if (df["Fair Price"] > df.ask * price) {
          df.Alert = "LONG";
          df["Value %"] = (
            (df["Fair Price"] / (price * df.ask) - 1) *
            100
          ).toFixed(1);
        } else {
          df.Alert = "-";
          df["Value %"] = "-";
        }
      }
      let abc = ab(price, K, T, sigma);
      df["Pbelow %"] = abc[0];
      df["Pabove %"] = abc[1];
    } else {
      df.Alert = "-";
      df["Value %"] = "-";
      df["Pbelow %"] = "-";
      df["Pabove %"] = "-";
    }

    option === "CALL" ? Calls.push(df) : Puts.push(df);
    Strike.push(K);
  });
  Strike = new Set(Strike);
  Strike = Array.from(Strike);
  Strike.sort(function (a, b) {
    return a - b;
  });
  Calls.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return a.strike - b.strike;
  });
  Puts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return a.strike - b.strike;
  });

  //   console.log(Strike);
  return [Calls, Puts, Strike];
};

const ARB = async (symbol, date) => {
  let sigma = await getDVOL(symbol);
  sigma = sigma / 100;
  let price = await getPrice(symbol);
  price = parseFloat(price);

  let DF = await getSummaryARB(symbol, date);

  // let I = moment(date).format("YYYY-MM-DD 16:00:00");
  let I = moment(date).format("YYYY-MM-DD hh:mm:ss");
  I = new Date(I);
  let now = moment().format("YYYY-MM-DD hh:mm:ss");
  now = new Date(now);
  let T = (I - now) / 1000 / 60 / 60 / 24 / 365;
  DF = DF.filter((d) => d.bidCall != null && d.askPut != null);
  DF.map((df) => {
    df.sarb =
      (df.strike * (1 - 0.001)) / (1 + df.askPut - df.bidCall) +
      2 * 0.0002 +
      (0.0002 + 0.0005);

    df.profit =
      df.strike +
      (df.bidCall - df.askPut - 1 - 2 * 0.0002 - 0.0002 - 0.0005) *
        (price / (1 - 0.001));
    df.ARB = (df.profit / price) * 100;
    df.AR = df.ARB / T;
  });
  // console.log(DF);
  return DF;
};

// ARB("BTC", "14OCT22");
// FR("BTC", "14OCT22");

// function cdfNormal(x, mean, standardDeviation) {
//   return (1 - mathjs.erf((mean - x) / (Math.sqrt(2) * standardDeviation))) / 2;
// }

function cdfNormal(x, mean, std) {
  var x = (x - mean) / std;
  var t = 1 / (1 + 0.2315419 * Math.abs(x));
  var d = 0.3989423 * Math.exp((-x * x) / 2);
  var prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) prob = 1 - prob;
  return prob;
}

function ab(price, strike, time, value) {
  let p = price;
  let q = strike;
  //   let t = time / 24 / 365;
  let t = time;
  let v = value;

  let vt = v * Math.sqrt(t);
  let lnpq = Math.log(q / p);
  let d1 = lnpq / vt;

  let y = Math.floor((1 / (1 + 0.2316419 * Math.abs(d1))) * 100000) / 100000;
  let z = Math.floor(0.3989423 * Math.exp(-((d1 * d1) / 2)) * 100000) / 100000;
  let y5 = 1.330274 * Math.pow(y, 5);
  let y4 = 1.821256 * Math.pow(y, 4);
  let y3 = 1.781478 * Math.pow(y, 3);
  let y2 = 0.356538 * Math.pow(y, 2);
  let y1 = 0.3193815 * y;
  let x = 1 - z * (y5 - y4 + y3 - y2 + y1);
  x = Math.floor(x * 100000) / 100000;

  if (d1 < 0) x = 1 - x;

  let pabove = Math.floor(x * 1000) / 10;
  let pbelow = Math.floor((1 - x) * 1000) / 10;

  return [pabove, pbelow];
}

module.exports = {
  getDVOL,
  getPrice,
  FR,
  get_Date,
  getPrice,
  ARB,
};
