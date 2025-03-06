import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/Frame 9.png";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <div className="mt-2 flex justify-between pb-3 pl-5 pr-5 border-b-2 border-gray-300">
      {/* image */}
      <div className="">
        <Image src={Logo} alt="logo" className="w-[90px] h-[30px]" />
      </div>
      <div className="flex items-center border border-gray-300 rounded-full p-2 bg-transparent max-w-xs">
        <Search className="mr-2 bg-transparent" />
        <input
          type="text"
          placeholder="Search for Collr Listing..."
          className="flex-1 text-sm bg-transparent focus:outline-none"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex items-center text-[#404040]  pl-[15px] pr-[15px] pb-[10px]  pt-[10px] rounded-xl bg-[#ECECEC] ">
          Login
        </div>
        <div className="flex items-center bg-[#030269] pl-[15px] pr-[15px] pb-[10px]  pt-[10px] rounded-xl text-white">
          Sign UP
        </div>
      </div>
    </div>
  );
};

export default Header;
