import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
const NAV = () => {
  const [select, setSelect] = useState("How options work?");
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setSelect(event.target.value);
  };

  return (
    <div className="text-white text-m mt-5  h-full">
      <div className="xs:hidden ">
        <div className="row-span-3  ml-1 mb-2 text-4xl bg-[#131415]">
          <p className=" divide-y divide-blue-200 ">Document</p>
        </div>
        <div className="bg-[#1F2122] rounded-2xl py-5">
          <div
            className={`row-span-3  ml-1 `}
            style={{
              color: select === "How options work?" ? "#FFD400" : "white",
            }}
          >
            <a href="#1">
              <button onClick={handleClick} value="How options work?">
                How options work?
              </button>
            </a>
          </div>

          <div
            className="row-span-3  mt-5 ml-1  "
            style={{
              color: select === "Our Vision" ? "#FFD400" : "white",
            }}
          >
            <a href="#2">
              <button onClick={handleClick} value="Our Vision">
                Our Vision
              </button>
            </a>
          </div>

          <div className="text-sm text-slate-600 mt-5">Options Strategy</div>
          <div
            className="row-span-3  mt-2 ml-1 "
            style={{
              color:
                select === "Four Basic Legs in Options Trading"
                  ? "#FFD400"
                  : "white",
            }}
          >
            <a href="#3">
              <button
                onClick={handleClick}
                value="Four Basic Legs in Options Trading"
              >
                Four Basic Legs in Options Trading
              </button>
            </a>
          </div>

          <div
            className="row-span-3 mt-2  ml-1 "
            style={{
              color: select === "What is Arbitrage" ? "#FFD400" : "white",
            }}
          >
            <a href="#4">
              <button onClick={handleClick} value="What is Arbitrage">
                What is Arbitrage
              </button>
            </a>
          </div>

          <div className="text-sm text-slate-600 mt-5"> Calculation</div>

          <div
            className="row-span-3 mt-2  ml-1 "
            style={{
              color: select === "Arbitrage equation" ? "#FFD400" : "white",
            }}
          >
            <a href="#5">
              <button onClick={handleClick} value="Arbitrage equation">
                Arbitrage equation
              </button>
            </a>
          </div>

          <div
            className="row-span-3 mt-2  ml-1 "
            style={{
              color: select === "Fair Price equation" ? "#FFD400" : "white",
            }}
          >
            <a href="#6">
              <button onClick={handleClick} value="Fair Price equation">
                Fair Price equation
              </button>
            </a>
          </div>

          <div
            className="row-span-3  mt-2 ml-1 "
            style={{
              color:
                select === "The Probability Calculator Software"
                  ? "#FFD400"
                  : "white",
            }}
          >
            <a href="#7">
              <button
                onClick={handleClick}
                value="The Probability Calculator Software"
              >
                The Probability Calculator Software
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        className="block md:hidden ml-auto cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <IoMenu className="text-2xl text-textBase" />
      </div>

      {isActive && (
        <div className="p-4 w-275 bg-navBar rounded-lg fixed top-24 right-16 flex flex-col items-center justify-evenly gap-6">
          <a href="#1">
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              How options work?
            </p>
          </a>
          <a href="#2">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              Our Vision
            </p>
          </a>
          <a href="#3">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              Four Basic Legs in Options Trading
            </p>
          </a>
          <a href="#4">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              What is Arbitrage
            </p>
          </a>
          <a href="#5">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              Arbitrage equation
            </p>
          </a>
          <a href="#6">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              Fair Price equation
            </p>
          </a>
          <a href="#7">
            {" "}
            <p
              className="text-base  text-textBase font-medium hover:text-slate-100 cursor-pointer duration-100 ease-in-out "
              onClick={() => setIsActive(false)}
            >
              The Probability Calculator Software
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default NAV;
