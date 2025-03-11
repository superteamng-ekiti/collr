"use client";

import TabSelector from "@/components/dashboard/tab-selector";
import Image from "next/image";
import { useState } from "react";
import TaskCard from "@/components/dashboard/task-card";
import { ITask } from "@/types";
import CreateNewTask from "@/components/dashboard/create-new-task";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/dashboard/stats-card";

const platformTabs = ["All Tasks", "instagram", "tiktok", "X", "youtube"];
const statusTabs = ["Open", "In Review", "Completed"];

const tasks: ITask[] = [
  {
    id: 1,
    type: "X",
    title: "Retweet and like @Peaq post",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "3k",
    reward: 400000,
    currency: "COLLR",
  },
  {
    id: 2,
    type: "TikTok",
    title: "Comment on Peaq post",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "200",
    reward: 30000,
    currency: "COLLR",
  },
  {
    id: 3,
    type: "X",
    title: "Retweet and like @Peaq post",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "3k",
    reward: 400000,
    currency: "COLLR",
  },
  {
    id: 4,
    type: "TikTok",
    title: "Comment on Peaq post",
    creator: {
      name: "Peaq",
      isVerified: false,
    },
    due: "4d",
    participants: "200",
    reward: 30000,
    currency: "COLLR",
  },
  {
    id: 5,
    type: "X",
    title: "Follow @peaq on X",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "300",
    reward: 1000000,
    currency: "COLLR",
  },
  {
    id: 6,
    type: "TikTok",
    title: "Comment on Peaq post",
    creator: {
      name: "Peaq",
      isVerified: false,
    },
    due: "4d",
    participants: "200",
    reward: 30000,
    currency: "COLLR",
  },
  {
    id: 7,
    type: "X",
    title: "Follow @peaq on X",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "300",
    reward: 1000000,
    currency: "COLLR",
  },
  {
    id: 8,
    type: "TikTok",
    title: "Comment on Peaq post",
    creator: {
      name: "Peaq",
      isVerified: false,
    },
    due: "4d",
    participants: "200",
    reward: 30000,
    currency: "COLLR",
  },
  {
    id: 9,
    type: "X",
    title: "Follow @peaq on X",
    creator: {
      name: "Peaq",
      isVerified: true,
    },
    due: "4d",
    participants: "300",
    reward: 1000000,
    currency: "COLLR",
  },
];

export default function Dashboard() {
  const [taskStatus, setTaskStatus] = useState("Open");

  return (
    <div className="container mx-auto">
      {/*<AppHero title="gm" subtitle="Say hi to your new Solana dApp." />*/}
      <div className={"grid lg:grid-cols-9 gap-6 h-full lg:divide-x"}>
        <div className={"lg:col-span-6 flex flex-col overflow-hidden py-4"}>
          <TabSelector tabs={platformTabs} />
          <div className="px-4">
            <div className="block lg:hidden">
              <StatsCard />
            </div>
            <div
              className={
                "rounded-lg overflow-hidden bg-primary mt-6 px-8 py-3.5 gap-2.5 md:h-[6rem] flex flex-wrap justify-between items-center"
              }
            >
              <div className="flex items-center gap-3 md:gap-6">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/cta-image.png"
                    className="object-cover w-full h-full"
                    priority
                    width={3112}
                    height={892}
                    alt={"cta image"}
                  />
                </div>
                <div className="text-white">
                  <p className="font-medium text-sm">Welcome back, Emmanuel</p>
                  <p className="text-xs text-[#D4D4D4]">
                    Let’s earn together!!!
                  </p>
                </div>
              </div>
              <CreateNewTask>
                <Button
                  variant="secondary"
                  className="px-5 flex-1 md:flex-none uppercase text-xs h-8"
                >
                  Create engagement task
                </Button>
              </CreateNewTask>
              {/*<Image src={'/images/cta-image.png'} priority width={3112} height={892} alt={'cta image'}/>*/}
            </div>
          </div>
          <div className="px-4">
            {/* Tasks Header */}
            <div className="flex items-center flex-wrap border-b pb-2.5 gap-2 lg:gap-5 mt-5 lg:mt-[3.125rem]">
              <div className="flex items-center">
                <span className="mr-2">😀</span>
                <h2 className="text-sm lg:text-lg font-semibold">
                  Created Tasks
                </h2>
              </div>
              <div className="flex justify-between flex-1">
                <div className="flex space-x-2 lg:border-l lg:pl-5">
                  {statusTabs.map((status) => (
                    <button
                      key={status}
                      onClick={() => setTaskStatus(status)}
                      className={`px-2 md:px-4 py-1 text-xs font-light truncate transition-all relative before:-bottom-[8px] lg:before:-bottom-[15px] before:h-[1px] before:absolute before:inset-x-0 ${
                        taskStatus === status
                          ? "text-[#FF897F] font-medium before:bg-[#FF897F]"
                          : "hover:text-[#FF897F] before:bg-transparent"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button className="text-xs text-gray-500 rounded-lg px-4 py-2 hover:bg-secondary ml-auto">
                  View All
                </button>
              </div>
            </div>
            {/* Tasks */}
            {tasks.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))}
          </div>
        </div>
        <div className={"lg:col-span-3 pl-6 py-4"}>
          <div className="sticky top-[88px]">
            <div className="hidden lg:flex flex-col gap-10">
              <CreateNewTask>
                <button>
                  <Image
                    src="/images/side-ads-create-task.png"
                    alt="Create an Engagement Task"
                    width={976}
                    height={348}
                  />
                </button>
              </CreateNewTask>
              <StatsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
