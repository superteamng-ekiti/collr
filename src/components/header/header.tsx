import Image from "next/image";
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {WalletButton} from "@/components/solana/solana-provider";
import Link from "next/link";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={'bg-white border-b sticky z-10 top-0'}>
      <div
          className="navbar container justify-between dark:text-neutral-content flex-row gap-4 md:space-y-0">
        {/* Logo */}
        <div className="shrink-0">
          <Link href="/" className="">
            <span className={'sr-only'}>Collr</span>
            <Image src="/images/logo.png" alt="logo" className="md:w-[90px] md:h-[30px] w-[60px] h-[20px]"/>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center border rounded-full py-2 bg-transparent relative max-w-[18.875rem]">
          <div className={'absolute inset-y-0 left-0 pl-2 md:pl-4 flex items-center pointer-events-none'}>
            <Search className={'w-3 h-3 md:w-4 md:h-4 absolute text-gray-400'}/>
          </div>
          <input
              type="text"
              placeholder="Search for Collr Listing..."
              className="flex-1 pl-6 md:pl-11 text-[10px] md:text-sm bg-transparent focus:outline-none"
          />
        </div>

        {/* Desktop Login/Sign Up */}
        <div className="hidden md:flex gap-2">
          <button
              className={'px-6 rounded-lg border text-sm uppercase text-[#404040] h-10 hover:shadow-sm hover:-translate-y-0.5 transition-all'}>
            Login
          </button>
          <button
              className={'px-6 rounded-lg bg-primary uppercase text-white text-sm h-10 hover:shadow-sm hover:-translate-y-0.5 transition-all'}>
            Sign Up
          </button>
          <WalletButton/>
        </div>

        {/* Mobile Sidebar with Overlay */}
        <Sheet>
          <SheetTrigger className='md:hidden shrink-0' asChild>
            <Menu className="w-6 h-6"/>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='sr-only'>Edit profile</SheetTitle>
              <SheetDescription className='sr-only'>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-10">
              <div className="text-[16px] font-semibold text-[#404040] rounded-xl bg-[#ECECEC] py-2 text-center">
                LOGIN
              </div>
              <div className="text-[16px] font-semibold text-white rounded-xl bg-[#030269] py-2 text-center">
                SIGN UP
              </div>
              <WalletButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
