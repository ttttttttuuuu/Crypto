import React from "react";
import binance_logo from "../img/api/Binance_logo.webp";
import deribit_logo from "../img/api/deribit_logo.png";
import ftx_logo from "../img/api/ftx.png";
import tv_logo from "../img/api/Tv.png";
import apple from "../img/apple.svg";
import google from "../img/google.svg";
const Footer = () => {
  return (
    <div className="w-full  flex xs:justify-center justify-between items-center flex-col px-4 pt-10 xs:pt-2 gradient-bg-footer xs:hidden">
      <div className="flex justify-end  xs:justify-center w-full pr-10 xs:pr-0 my-5 ">
        <img
          src={apple}
          alt="google_play"
          className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer "
        />
        <img
          src={google}
          alt="google_play"
          className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
        />
      </div>

      <div className="flex justify-center items-center flex-col mt-20 xs:mt-0 text-sm xs:text-xs">
        {/* <p className="text-white  text-center font-medium mt-2">
          contact: sydney11822@icloud.com
        </p> */}
      </div>

      <div className="xs:w-[90%] w-full h-[0.25px] bg-[#131415] mt-5 " />

      <div className="xs:hidden w-full flex justify-between items-center ">
        <p className="text-white text-left text-xs">Data provided by</p>
        <a
          href="https://www.deribit.com/statistics/BTC/options-data"
          target="_blank"
        >
          <img src={deribit_logo} alt="Deribit" className="w-32" />
        </a>
        <a href="https://www.binance.com/" target="_blank">
          <img src={binance_logo} alt="Binance" className="w-32" />
        </a>
        {/* <a href="https://ftx.com/" target="_blank">
          <img src={ftx_logo} alt="FTX" className="w-32" />
        </a> */}
        <a href="https://www.tradingview.com/" target="_blank">
          <img src={tv_logo} alt="TradingView" className="w-32" />
        </a>
        <p className="text-white text-right text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
