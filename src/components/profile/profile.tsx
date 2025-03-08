"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import profileImageUrl from "../../../public/images/download (7).jpeg";
import bannerImageUrl from "../../../public/images/Frame 58.png";
import money from "../../../public/images/ri_money-dollar-circle-fill.png";
import twitter from "../../../public/images/prime_twitter.png";
import tiktok from "../../../public/images/logos_tiktok-icon.png";

import vector from "../../../public/images/Vector.png";

import { PencilLine } from "lucide-react";

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [loggedTwitter, setLoggedTwitter] = useState(true);
  const [loggedTiktok, setLoggedTiktok] = useState(true);

  useEffect(() => {
    if (loggedTwitter) {
      setLoggedTwitter(true);
    }
  }, []);

  useEffect(() => {
    if (loggedTiktok) {
      setLoggedTiktok(true);
    }
  }, []);

  // Simulate a loading delay (e.g. fetching images or data)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  // Replace these URLs with your own images
  // const bannerImageUrl = "/logos_tiktok-icon.png";
  // const profileImageUrl = "/images/Frame 58.png";

  return (
    <div>
      {/* upper section */}
      <div className="relative w-full h-[120px] md:h-[200px]">
        {/* Banner Image or Skeleton */}
        {loading ? (
          <div className="w-full h-full bg-gray-300 animate-pulse rounded" />
        ) : (
          <Image
            src={bannerImageUrl}
            alt="Banner"
            fill
            className="w-full rounded"
          />
        )}

        {/* Profile Image Container */}
        <div className="absolute -bottom-12 md:-bottom-[60px] left-4 md:left-[300px] flex">
          <div>
            {loading ? (
              <div className="w-[120px] h-[120px] md:w-28 md:h-28 rounded-full bg-gray-300 animate-pulse border-4 border-white" />
            ) : (
              <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
                <Image
                  src={profileImageUrl}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full border-4 border-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* User Information */}
        <div className="mt-[14px] px-4 md:px-0 ml-[130px] md:ml-[440px] ">
          <div className="text-[#1E1E1E] font-bold text-xl">Emmanuel Yusuf</div>
          <div>@emaz</div>
        </div>

        {/* Stats Section */}
        <div className="mt-4 bg-[#FCFCFF]  p-5 md:px-0 mx-auto md:ml-[440px] w-full md:w-[500px] max-w-full rounded-lg pl-[10px] pr-[10px]">
          <div className="flex md:flex-row md:gap-[100px] gap-[40px] ">
            {/* Stats Section 1 */}
            <div className="gap-1">
              <div className="gap-[10px] flex">
                <Image
                  src={money}
                  alt="money"
                  width={10}
                  height={10}
                  className="w-[20px] h-[20px]"
                />
                <div>
                  <div className="font-bold text-base">400,000,000</div>
                  <div>Amount Earned</div>
                </div>
              </div>
            </div>
            <div className="bg-[#DFDFDE] h-[50px] w-[2px] my-2 md:my-0"></div>
            {/* Stats Section 2 */}
            <div className="gap-[10px] flex">
              <Image
                src={vector}
                alt="vector"
                width={10}
                height={10}
                className="w-[20px] h-[20px]"
              />
              <div className="">
                <div className="font-bold text-base">120</div>
                <div>Task Participated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tag */}
      <div className="bg-[#DFDFDE] ml-4 md:ml-[300px] mt-9 h-[2px] w-full md:w-[58%] hidden md:flex justify-center"></div>
      <div className="mt-5">
        <div className="ml-4 md:ml-[300px] text-[#1E1E1E] font-bold mt-9">
          Link Your Social TAGS
        </div>
      </div>
      <div className="mx-3">
        {/* Twitter Account */}
        {loggedTwitter ? (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-center mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div>
              <Image src={twitter} alt="twitter" width={14} height={14} />
            </div>
            <div className="text-[13px] text-base text-black">
              Connect Twitter Account
            </div>
          </div>
        ) : (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-between mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div className="flex items-center gap-2 pl-3 pr-3">
              <Image
                src={twitter}
                alt="twitter"
                width={5}
                height={5}
                className="w-[20px] h-[10px]"
              />
              <div className="text-[13px] text-base text-black">Emaz4me</div>
            </div>
            <div className="text-[13px] text-base cursor-pointer text-[#3C82F6]">
              Remove Account
            </div>
          </div>
        )}
      </div>

      <div className="mx-3">
        {/* TikTok Account */}
        {loggedTiktok ? (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-center mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div>
              <Image src={tiktok} alt="tiktok" width={14} height={14} />
            </div>
            <div className="text-[13px] text-base text-black">
              Connect Tiktok Account
            </div>
          </div>
        ) : (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-between mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div className="flex items-center gap-2 pl-3 pr-3">
              <Image
                src={tiktok}
                alt="tiktok"
                width={5}
                height={5}
                className="w-[20px] h-[10px]"
              />
              <div className="text-[13px] text-base text-black">Emaz4me</div>
            </div>
            <div className="text-[13px] text-base cursor-pointer text-[#3C82F6]">
              Remove Account
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
