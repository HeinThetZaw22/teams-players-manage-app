import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className=" max-w-[1240px] mx-auto xl:px-30  md:px-14 sm:px-10 px-4 ">
      {children}
    </div>
  );
};

export default Container;
