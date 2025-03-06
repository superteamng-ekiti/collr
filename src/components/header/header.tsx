import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/Frame 9.png";

const Header = () => {
  return (
    <div>
      {/* image */}
      <div className="mt-2 flex justify-between">
        <Image src={Logo} alt="logo" className="w-[80px] h-[40px]" />
      </div>
      <div>
        <input />
      </div>
      <div>
        <div>Login</div>
        <div>SignUP</div>
      </div>
    </div>
  );
};

export default Header;
