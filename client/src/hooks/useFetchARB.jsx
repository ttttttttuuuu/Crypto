import { useEffect, useState } from "react";
import axios from "axios";

function getCoinId(symbol) {
  if (symbol === "BTC") {
    return "Qwsogvtv82FCd";
  } else {
    return "razxDUgYGNAdQ";
  }
}

const useFetchARB = ({ symbol, date, exchange }) => {
  const [dataDetail, setDataDetail] = useState([]);
  const [dataDate, setDataDate] = useState([]);
  const [index, setIndex] = useState([]);
  const [expiry, setExpiry] = useState("");
  const [dvol, setDvol] = useState("");

  // 等待動畫
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://crypto-muzw.onrender.com";
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel = () => {};
    async function fetchData() {
      //  await
      setIsLoading(true);
      const token = localStorage.getItem("token") ?? "N";
      const response = await axios.post(
        // "https://conoptionapinode.herokuapp.com/ARB",
        `${url}/get_ARB`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "x-access-token": token,
          },
          data: { symbol, date, exchange },
        },
        {
          cancelToken: new CancelToken((c) => (cancel = c)),
        }
      );
      const obj = await response.data;

      // const coinId = getCoinId(symbol);

      // const options = {
      //   method: "GET",
      //   url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      //   params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
      //   headers: {
      //     "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      //     "X-RapidAPI-Key":
      //       "457ede552dmsh339a9169e5d8b7fp1f93f6jsn15737177481b",
      //   },
      // };

      // await axios
      //   .request(options)
      //   .then(function (response) {
      //     // console.log(response.data.data.coin);
      //     setIndex(response.data.data?.coin);
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });

      // console.log("total:", obj);

      setDataDetail(obj["df"]);
      setDataDate(obj["dates"]);
      setDvol(obj["dvol"]);
      setIsLoading(false);
      setExpiry(obj["expiry"]);
    }

    fetchData();
    return () => {
      setDataDetail([]);
      // console.log("cancel");
      cancel();
    };
  }, [symbol, date, exchange]);

  return [dataDetail, dataDate, isLoading, index, expiry, dvol];
};

export default useFetchARB;
