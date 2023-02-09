import { useEffect, useState } from "react";
import axios from "axios";
import { CatchingPokemonSharp } from "@mui/icons-material";

// function getIndex(INDEX) {
//   var msg = {
//     jsonrpc: "2.0",
//     method: "public/get_index",
//     id: 42,
//     params: {
//       currency: INDEX,
//     },
//   };

//   var ws = new WebSocket("wss://www.deribit.com/ws/api/v2");
//   ws.onmessage = function (e) {
//     // do something with the response...
//     console.log("received from server : ", e.data);
//     setDataDetail(JSON.parse(e.data).result[INDEX]);
//   };
//   ws.onopen = function () {
//     ws.send(JSON.stringify(msg));
//   };
// }

const useFetchIndex = () => {
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel = () => {};

    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
        "tiers[0]": "1",
        orderBy: "marketCap",
        orderDirection: "desc",
        limit: "2",
        offset: "0",
      },
      headers: {
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        "X-RapidAPI-Key": "457ede552dmsh339a9169e5d8b7fp1f93f6jsn15737177481b",
      },
    };

    async function fetchData() {
      await axios
        .request(options)
        .then(function (response) {
          // console.log(response.data);
          setDataDetail(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      // getIndex(symbol);
    }
    fetchData();
    return () => {
      setDataDetail([]);
      // console.log("cancel");
      cancel();
    };
  }, []);

  return dataDetail;
};

export default useFetchIndex;
