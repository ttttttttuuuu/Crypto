import { useEffect, useState } from "react";
import axios from "axios";

const useFetchFR = ({ symbol, date }) => {
  function getCoinId(symbol) {
    if (symbol === "BTC") {
      return "Qwsogvtv82FCd";
    } else {
      return "razxDUgYGNAdQ";
    }
  }

  const [dataDetail, setDataDetail] = useState([]);
  const [dataDate, setDataDate] = useState([]);
  const [index, setIndex] = useState([]);
  const [expiry, setExpiry] = useState("");
  const [dvol, setDvol] = useState("");
  // 等待動畫
  const [isLoading, setIsLoading] = useState(false);
  const host = window.location.host;
  const url = "https://crypto-muzw.onrender.com";
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel = () => {};
    async function fetchData() {
      //  await
      setIsLoading(true);
      const token = localStorage.getItem("token") ?? "N";
      const response = await axios.post(
        // "https://conoptionapinode.herokuapp.com/FR",
        // "https://optionweb.herokuapp.com/get_FR",
        `${url}/get_FR`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "x-access-token": token,
          },
          data: { symbol, date },
        },
        {
          cancelToken: new CancelToken((c) => (cancel = c)),
        }
      );
      const obj = await response.data;

      // const coinId = getCoinId(symbol);

      // const options = await axios.get(
      //   `https://coinranking1.p.rapidapi.com/coin/${coinId}`,

      //   {
      //     headers: {
      //       "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      //       "X-RapidAPI-Key":
      //         "457ede552dmsh339a9169e5d8b7fp1f93f6jsn15737177481b",
      //     },
      //     params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
      //   }
      // );

      // const data = await options?.data;
      // setIndex(data?.data?.coin);

      // console.log("total:", obj);

      // await axios
      //   .request(options)
      //   .then(function (response) {
      //     // console.log(response.data.data.coin);
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });

      // getIndex(symbol);

      setDataDetail(obj["df"]);
      setDataDate(obj["dates"]);
      setExpiry(obj["expiry"]);
      setDvol(obj["dvol"]);
      setIsLoading(false);
    }

    fetchData();

    return () => {
      setDataDetail([]);
      console.log("cancel");
      cancel();
    };
  }, [symbol, date]);

  return [dataDetail, dataDate, isLoading, index, expiry, dvol];
};

export default useFetchFR;
