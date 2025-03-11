'use client';

import Image from "next/image";
import CreateNewTask from "@/components/dashboard/create-new-task";
import {Button} from "@/components/ui/button";
import StatsCard from "@/components/dashboard/stats-card";

export default function TaskDetails() {
    return (
            <div className='container flex flex-col-reverse items-start justify-start lg:grid lg:grid-cols-9 flex-1 gap-6 lg:divide-x'>

                {/* Left Content */}
                <div className="lg:col-span-6 flex-1 flex flex-col py-4">
                    <div className='flex flex-col px-4 md:px-0 md:flex-row flex-wrap w-full justify-between items-start'>
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-indigo-900 mb-2">Peaq - Retweet and like</h1>
                            <div className="flex items-center text-gray-600 mb-4">
                                <span>Curated by:</span>
                                <span className="ml-1 font-medium">Peaq</span>
                                {/*<CheckCircle size={16} className="ml-1 text-blue-500"/>*/}
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-600">Peaq Twitter followers</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-gray-700 font-medium mb-2">Call-to-Action</h2>
                                <a href="https://twitter.com/intent/follow?screen_name=PEAQ"
                                   className="text-blue-600 hover:underline"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    https://twitter.com/intent/follow?screen_name=PEAQ
                                </a>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button className="px-4 py-2 rounded-lg border text-sm text-[#404040] hover:bg-gray-50">
                                START TASK
                            </button>
                            <Button className="px-4 py-2 rounded-lg text-sm">
                                VERIFY TASK
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className={'lg:col-span-3 pl-6 py-4'}>
                    <div className='sticky top-[88px]'>
                        <div className='flex flex-col gap-10'>
                            <CreateNewTask>
                                <button>
                                    <Image src='/images/side-ads-create-task.png' alt='Create an Engagement Task'
                                           width={976} height={348}/>
                                </button>
                            </CreateNewTask>
                            <StatsCard/>
                        </div>
                    </div>
                </div>
            </div>
    )
}
