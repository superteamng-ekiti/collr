import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../public/images/Frame 9.png";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="pt-3 flex items-center justify-between pb-3 md:pl-[50px] md:pr-[50px] pl-[20px] pr-[20px] border-b-2 border-gray-300">
        {/* Logo */}
        <div>
          <Image
            src={Logo}
            alt="logo"
            className="md:w-[90px] md:h-[30px] w-[60px] h-[20px]"
          />
        </div>

        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-full p-2 bg-transparent w-[200px] md:w-[300px]">
          <Search className="mr-2 w-[12px] h-[12px] bg-transparent" />
          <input
            type="text"
            placeholder="Search for Collr Listing..."
            className="flex-1 text-[10px] md:text-xs bg-transparent focus:outline-none"
          />
        </div>

        {/* Desktop Login/Sign Up */}
        <div className="hidden md:flex gap-2">
          <div className="text-[10px] md:text-lg flex items-center text-[#404040] px-3 py-2 rounded-xl bg-[#ECECEC]">
            LOGIN
          </div>
          <div className="text-[10px] md:text-lg flex items-center bg-[#030269] px-3 py-2 rounded-xl text-white">
            SIGN UP
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar with Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[70%] bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <div>MENU</div>
              {/* Close Button */}
              <button onClick={() => setIsMenuOpen(false)} className="mb-4">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="text-[16px] font-semibold text-[#404040] rounded-xl bg-[#ECECEC] py-2 text-center">
                LOGIN
              </div>
              <div className="text-[16px] font-semibold text-white rounded-xl bg-[#030269] py-2 text-center">
                SIGN UP
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
