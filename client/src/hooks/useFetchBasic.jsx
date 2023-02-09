import { useEffect, useState } from "react";
import axios from "axios";

const useFetchBasic = ({ send }) => {
  // console.log(send);
  const [dataDetail, setDataDetail] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);
  const [close, setClose] = useState("0");
  // 等待動畫
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel = () => {};
    const host = window.location.host;
    const url = `http://${host}`;
    //const url = `http://localhost:5001`;
    async function fetchData() {
      //  await
      setIsLoading(true);
      const response = await axios.post(
        `${url}/get_BASIC`,
        // "https://conoptionapinode.herokuapp.com/BASIC",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
          data: {
            symbol: send["symbol"].replace(/\s*/g, ""),
            exchange: send["exchange"],
            interval: send["interval"],
          },
        },
        {
          cancelToken: new CancelToken((c) => (cancel = c)),
        }
      );
      const obj = await response.data;
      // console.log(obj);
      if (obj[0] !== "err") {
        const analysis = obj["analysis"];
        const s = [];
        send["strategy"].map((sgy) =>
          s.push({ name: sgy, result: analysis[sgy] })
        );
        setClose(obj["analysis"]["close"]);
        setDataDetail(s);
        setDataTotal(obj["summary"]);
        setIsLoading(false);
      } else {
        setClose("INPUT ERROR");
        setIsLoading(false);
      }

      // setExpiry(obj["expiry"]);
    }

    fetchData();
    return () => {
      setDataDetail([]);
      setDataTotal([]);
      // console.log("cancel");
      cancel();
    };
  }, [send]);

  return [dataDetail, isLoading, dataTotal, close];
};

export default useFetchBasic;
