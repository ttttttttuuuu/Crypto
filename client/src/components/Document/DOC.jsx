import React from "react";
import { Content, NAV } from "./index";

const DOC = () => {
  return (
    <div className="flex">
      <div className="  mt-5 flex-none w-80 xs:w-0 ">
        <div className="fixed h-full ">
          <NAV />
        </div>
      </div>
      <div className="flex-1   px-5  xs:px-2 w-full  ">
        <Content />
      </div>
    </div>
  );
};

export default DOC;
