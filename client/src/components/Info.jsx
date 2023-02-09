import React, { useState } from "react";
import millify from "millify";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import useFetch from "../hooks/useFetchIndex";
import { Statistic, Row, Col } from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Info = () => {
  const Index = useFetch()?.data?.coins;

  // const [cryptos, setCryptos] = useState("");

  // setCryptos(Index?.data?.coins);
  // setIndex(data);

  return (
    <>
      {Index?.map((currency) => (
        <li className="nav-item">
          <span className="info-featuredTitle">{currency.name}</span>
          <div className="featuredMoneyContainer">
            <img className="crypto-image" src={currency.iconUrl}></img>
            <span className="featuredMoney">
              ${millify(currency.price, { precision: 2 })}
            </span>
            {/* <span className="featuredMoneyRate">
                       -11.4 <ArrowDownward className="featuredIcon negative" />
                     </span> */}
          </div>
        </li>
      ))}
    </>
  );
};

export default Info;
