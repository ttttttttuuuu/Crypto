import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../index.css";
import Spline from "@splinetool/react-spline";
import glasses from "../img/glasses.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import cryptoIcon from "../img/Crypto.png";
import growingUp from "../img/growUp.png";
import resultsIcon from "../img/results.png";
// import bgc from "../Options Crypto Trade/Background of OCT-3.mp4";

// const Homepage = () => {
//   return (
//     <div className="h-[calc(50vh-80px)] w-full flex justify-center items-end text-white">
//       <div className="h-10 overflow-visible">
//         <div>dhkjashkdjsa</div>
//         <div>dsadsadas</div>
//         <div>dsadsad</div>
//       </div>
//     </div>
//   );
// };

const Homepage = () => {
  return (
    <div className="max-h-full">
      <div className="relative  w-full xs:hidden">
        <div className="xs:hidden h-screen min-h-screen ">
          <Spline scene="https://prod.spline.design/594FIo5otfoYAi3M/scene.splinecode" />
        </div>

        {/* <div className="flex  justify-center items-center w-full mt-10">
        <h1 className=" font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white ss:leading-[100.8px] leading-[75px]">
          Option
          <span className="text-yellow-400">Crypto</span>
          Trade
        </h1>
      </div> */}

        <div
          className={`flex-1 flex justify-center items-start  flex-col  px-10 `}
        >
          <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 xs:hidden ">
            <img src={glasses} alt="discount" className="w-[32px] h-[32px] " />
            <p className={` ml-2  text-slate-500`}>
              <span className="text-white">Login</span> can see all {""}
              <span className="text-white"> instruments</span> calculation.
            </p>
          </div>

          <div className="flex  justify-center items-center w-full mt-10  xs:mt-20">
            <h1 className=" font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white ss:leading-[100.8px] leading-[75px]">
              Option
              <span className="text-yellow-400">Crypto</span>
              Trade
            </h1>
          </div>
          <div className="flex  justify-center items-center w-full xs:hidden ">
            <p className={`  max-w-[470px] mt-5 text-slate-400 italic`}>
              Robust, Reliable and Lightning Fast
            </p>
          </div>
          <div className="flex  justify-center items-center w-full xs:hidden ">
            <p className={`  max-w-[470px]  text-slate-400 italic`}>
              cryptocurrency derivatives platform for traders of all options and
              crypto trading.
            </p>
          </div>

          <div className="flex justify-center items-center w-full h-full md:hidden xl:hidden">
            <div className={`  text-yellow-400 w-full m-5`}>
              <NavLink to="/FairPrice">
                <div className="svgWaveRelative  ">
                  <div className="svgWaveText font-poppins font-medium">
                    Fair Price
                  </div>
                  <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
                </div>
              </NavLink>
            </div>
            <div className={`  text-yellow-400 w-full m-5`}>
              <NavLink to="/ARB">
                <div className="svgWaveRelative  ">
                  <div className="svgWaveText font-poppins font-medium">
                    Arbitrage
                  </div>
                  <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="Fair Price m-h-screen  xs:hidden">
          <div
            id="content"
            className={`flex flex-row min-h-full  xs:grid xs:grid-cols-1`}
          >
            <div className={`flex-1 flex  relative xs:flex-none `}>
              <div
                className={`flex-1 flex justify-start   items-center  flex-col px-10  xs:px-0  `}
              >
                <div className="w-full h-full ">
                  <div className="flex flex-row  justify-start xs:justify-center items-center w-full  ">
                    <h1 className=" flex-row xs:flex xs:justify-center  font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white  xs:text-[28px] ">
                      The Options <br className="block " />{" "}
                      <span className="text-yellow-400">FAIR PRICE</span>
                    </h1>
                  </div>

                  <div className="flex flex-row justify-start  xs:justify-center items-center  w-full ">
                    <div>
                      <p
                        className={` max-w-[470px] mt-5 text-slate-400 italic xs:max-w-[235px]`}
                      >
                        Use Fair Price to choose which transaction types is most
                        likely can take a profit.
                      </p>
                      <div
                        className={`flex justify-start items-center xs:justify-center  text-yellow-400 w-full my-5`}
                      >
                        <NavLink to="/FairPrice">
                          <div className="svgWaveRelative  ">
                            <div className="svgWaveText font-poppins font-medium">
                              Fair Price
                            </div>
                            <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                            <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                            <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                            <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex-1 flex justify-center items-center   flex-col   w-full ">
            <div className="flex flex-row justify-center  items-center text-white w-full font-bold pl-5 xs:pl-0">
              <div className="flex flex-row justify-center items-center px-4 ">
                <div className="bg-[#2bc48a]  rounded-xl w-[64px] h-[64px] flex justify-center items-center ">
                  CALLS
                </div>
                <div className="flex justify-center items-center  w-[64px] h-[64px] xl:w-[96px] xl:h-[96px] ">
                  VS
                </div>
                <div className="bg-[red]  rounded-xl  w-[64px] h-[64px] flex justify-center items-center">
                  PUTS
                </div>
              </div>
            </div>
          </div> */}

            <div className="flex-1 flex justify-start items-center   flex-col w-full xs:mt-10">
              <div className="flex justify-center items-center w-full ">
                {/* <div> */}
                <div className="w-full">
                  <div className="flex justify-center w-full ">
                    <h2 className="font-poppins font-semibold xs:text-[16px] text-[40px] text-white   ">
                      Easily check the <br className="block xs:hidden" />{" "}
                      Instruments & Fair Price
                    </h2>
                  </div>

                  <div className="flex justify-center w-full">
                    <p
                      className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[470px] xs:max-w-[235px] mt-5 xs:mt-0 xs:text-[10px]`}
                    >
                      C O N .3.0 - Option Crypto Trade is your best optionCrypto
                      Strategies choice, use our App or Web get the real time
                      FairPrice, Let you can take the best profit out.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="ARB"
          className={`  flex flex-row min-h-screen xs:grid xs:grid-col-1 xs:hidden `}
        >
          <div
            className={`flex-1 flex justify-center items-start  flex-col  px-10  xs:px-0`}
          >
            <div className="xs:hidden">
              <div className="flex flex-row justify-between items-center w-full  ">
                <h1 className="flex-1 font-poppins font-semibold xl:text-[72px] md:text-[72px] xs:text-[28px] text-white ss:leading-[100.8px] leading-[75px]">
                  The Options <br className="block " />{" "}
                  <span className="text-yellow-400">Arbitrage</span>
                </h1>
                <div className={`flex xs:hidden md:mr-4 mr-0  text-yellow-500`}>
                  <Link offset="100" to="/ARB">
                    <div
                      className={`flex justify-center items-center w-[140px] h-[140px] rounded-full bg-[#2bc48a] p-[2px] cursor-pointer animate-bounce `}
                    >
                      <div
                        className={`flex justify-center items-center  flex-col bg-primary w-[100%] h-[100%] hover:bg-[#2bc48a]    rounded-full  hover:text-white`}
                      >
                        <div
                          className={`flex justify-center items-start flex-row `}
                        >
                          <p className="font-poppins font-medium text-[18px] leading-[23.4px] ">
                            <span className="">Get</span>
                          </p>
                        </div>
                        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                          <span className="">Started</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <h1 className="font-poppins font-semibold  xl:text-[44px] md:text-[42px] text-white  leading-[75px] w-full">
                Opportunities Via Put-Call Parity
              </h1>
            </div>

            <div className="xs:flex xs:justify-center items-center w-full md:hidden xl:hidden xs:my-10">
              <h1 className=" flex-row xs:flex xs:justify-center  font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white  xs:text-[28px] ">
                The Options <br className="block " />{" "}
                <span className="text-yellow-400">Arbitrage</span>
              </h1>
            </div>
            <div className="xs:flex xs:justify-center items-center w-full md:hidden xl:hidden ">
              <h2 className=" flex-row xs:flex xs:justify-center  font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white  xs:text-[14px] ">
                Opportunities Via Put-Call Parity
              </h2>
            </div>

            <div className="xs:flex xs:justify-center xs:w-full xs:my-5">
              <p
                className={` max-w-[470px] xs:max-w-[300px] mt-5 xs:mt-0 text-slate-400 italic`}
              >
                Put-call parity is a principle that defines the relationship
                between the price of put and call options of the same on the
                same underlying asset with the same strike price and expiration
                date.
              </p>
            </div>
          </div>

          {/* <div className={`flex-1 flex w-full `}></div> */}

          <div className={`flex-1 flex  md:my-0 my-10 relative w-full px-2`}>
            <div className="w-full  flex flex-col items-center justify-center z-[10] pr-10 xs:pr-0  ">
              <div className="w-full flex p-6 rounded-[20px] mb-6 rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue `}
                >
                  <img
                    src={cryptoIcon}
                    alt="cryptoIcon"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    Rewards
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    IF ARB {">"} 0 ? buy call + sell put + long futures
                  </p>
                </div>
              </div>
              <div className="w-full flex p-6 rounded-[20px] mb-6 rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}
                >
                  <img
                    src={resultsIcon}
                    alt="resultsIcon"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    A low-risk arbitrage opportunity
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    If the price of one of these options is out of line in
                    relation to the parity equation, it presents a low-risk
                    arbitrage opportunity to put the prices back in line.
                  </p>
                </div>
              </div>

              <div className="w-full  flex p-6 rounded-[20px] mb-0  rohit">
                <div
                  className={`w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue`}
                >
                  <img
                    src={growingUp}
                    alt="growingUp"
                    className="w-[50%] h-[50%] object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-col ml-3">
                  <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                    Live data
                  </h4>
                  <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                    Every 5 seconds will get the new results, guarantee your
                    maximum benefit
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          </div>

          <div
            className={`flex justify-start items-center xs:justify-center  text-yellow-400 w-full my-5 md:hidden xl:hidden`}
          >
            <NavLink to="/ARB">
              <div className="svgWaveRelative  ">
                <div className="svgWaveText font-poppins font-medium">
                  Arbitrage
                </div>
                <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
              </div>
            </NavLink>
          </div>
        </div>

        {/* <div className="grid sm:grid-cols-2  grid-cols-1 w-full relative">
        <div>
          <Spline scene="https://prod.spline.design/SHy0B9fpqFT6kSK8/scene.splinecode" />
        </div>

        <div>
          <Spline scene="https://prod.spline.design/oyhq3GIZdBVKaD2m/scene.splinecode" />
        </div>
      </div> */}
      </div>

      <div className="md:hidden xl:hidden h-[calc(50vh-80px)] w-full flex justify-center items-end ">
        <div className="h-10 overflow-visible">
          <div className="flex  justify-center items-center w-full ">
            <h1 className=" font-poppins font-semibold xl:text-[72px] md:text-[72px] text-white  ">
              Option
              <span className="text-yellow-400">Crypto</span>
              Trade
            </h1>
          </div>

          <div className="flex justify-center items-center w-full md:hidden xl:hidden">
            <div className={`  text-yellow-400 w-full m-5`}>
              <NavLink to="/FairPrice">
                <div className="svgWaveRelative  ">
                  <div className="svgWaveText font-poppins font-medium">
                    Fair Price
                  </div>
                  <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
                </div>
              </NavLink>
            </div>
            <div className={`  text-yellow-400 w-full m-5`}>
              <NavLink to="/ARB">
                <div className="svgWaveRelative  ">
                  <div className="svgWaveText font-poppins font-medium">
                    Arbitrage
                  </div>
                  <div className="svgWaveAbsolute svgWaveAbsolute1"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute2"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute3"></div>
                  <div className="svgWaveAbsolute svgWaveAbsolute4"></div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
