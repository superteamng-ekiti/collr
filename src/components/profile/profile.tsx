"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { usePrivy } from "@privy-io/react-auth";

const test_connect1 = async () => {
  try {
    window.location.href = "http://localhost:41816/api/auth/tiktok";
  } catch (error) {
    console.log("error from redirecting, ", error);
  }
};

const test_connect_2 = async (code: string, email: string) => {
  try {
    const response = await axios.post(
      "http://localhost:41816/api/auth/tiktok-access",
      {
        email,
        code
      }
    );

    console.log(response.data);

    const video_data = await axios.post(
      "http://localhost:41816/api/scrape-tiktok-video",
      {
        email: "kolawoleelijah019@gmail.com"
      }
    );
    console.log(video_data.data.response);

    return video_data.data.response as TikTokVideoResponse;
  } catch (error) {
    console.log("error from access token", error);
  }
};

export function Profile() {
  const [loggedTwitter, setLoggedTwitter] = useState(true);
  const [loggedTiktok, setLoggedTiktok] = useState(true);
  const [tiktokVideos, setTikTokVideos] = useState<TikTokVideoResponse>();

  const { user } = usePrivy();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");
    const scopes = params.get("scopes");
    const state = params.get("state");

    if (code) {
      console.log("Code:", code);
      console.log("Scopes:", scopes);
      console.log("State:", state);

      test_connect_2(code, "kolawoleelijah019@gmail.com")
        .then((response) => {
          setTikTokVideos(response);
        })
        .catch((error) => {
          console.log(error);
        });

      // You can now send this code to your backend to exchange for an access token
    }
  }, []);

  useEffect(() => {
    if (loggedTwitter) {
      setLoggedTwitter(true);
    }
  }, [loggedTwitter]);

  useEffect(() => {
    if (loggedTiktok) {
      setLoggedTiktok(true);
    }
  }, [loggedTiktok]);

  return (
    <div className="w-full">
      {/* upper section */}
      <div className="relative w-full h-[120px] md:h-[200px]">
        <Image
          src="/images/cover-bg.png"
          alt="Banner"
          fill
          className="w-full object-cover rounded"
        />

        {/* Profile Image Container */}
        <div className="absolute -bottom-12 md:-bottom-[60px] left-4 md:left-[300px] flex">
          <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
            <Image
              src="/images/profile.jpeg"
              alt="Profile"
              fill
              className="object-cover rounded-full border-4 border-white"
            />
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
                  src="/images/ri_money-dollar-circle-fill.png"
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
                src="/images/Vector.png"
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
              <Image
                src="/images/twitter-x-logo.png"
                alt="twitter"
                width={14}
                height={14}
              />
            </div>
            <div className="text-[13px] text-base text-black">
              Connect Twitter Account
            </div>
          </div>
        ) : (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-between mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div className="flex items-center gap-2 pl-3 pr-3">
              <Image
                src="/images/twitter-x-logo.png"
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
          <div
            className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-center mx-auto md:ml-[300px] md:mr-0 mt-5 hover:cursor-pointer"
            onClick={async () => {
              await test_connect1();
            }}
          >
            <div>
              <Image
                src="/images/tiktok-logo.png"
                alt="tiktok"
                width={14}
                height={14}
              />
            </div>
            <div className="text-[13px] text-base text-black">
              Connect Tiktok Account
            </div>
          </div>
        ) : (
          <div className="flex gap-2 bg-[#F8F8FF] text-white h-[50px] w-full md:w-[58%] rounded-lg items-center justify-between mx-auto md:ml-[300px] md:mr-0 mt-5">
            <div className="flex items-center gap-2 pl-3 pr-3">
              <Image
                src="/images/tiktok-logo.png"
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
      <div className="__preview_images text-center w-full py-3 px-10 flex flex-row flex-wrap gap-2">
        {!tiktokVideos
          ? "No Preview Videos"
          : tiktokVideos.videos.map((item) => {
              return (
                <img
                  src={item.cover_image_url}
                  height={"300px"}
                  width={"200px"}
                  alt=""
                  className="__preview_images"
                />
              );
            })}
      </div>
    </div>
  );
}

interface TikTokVideo {
  id: string;
  title: string;
  duration: number;
  embed_link: string;
  cover_image_url: string;
  video_description: string;
}

interface TikTokVideoResponse {
  cursor: number;
  has_more: boolean;
  videos: TikTokVideo[];
}
