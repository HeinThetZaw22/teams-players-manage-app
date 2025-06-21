import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" flex items-center justify-center h-full">
      <HashLoader size={30} />
    </div>
  );
};

export default Loader;
