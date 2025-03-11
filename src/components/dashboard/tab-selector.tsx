"use client"

import {useState} from "react";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function TabSelector({ tabs }: { tabs: string[]}) {
    const [selectedTabIndex, selectTabIndex] = useState(0)
    
    return (
        <ScrollArea className='whitespace-nowrap w-full'>
            <div className={'flex w-max gap-2 pl-4 pb-4'}>
                {
                    tabs.map((tab, index) => (
                        <button
                            onClick={() => selectTabIndex(index)}
                            className={`border px-3 py-1.5 whitespace-nowrap rounded-full capitalize transition-all duration-300 active:scale-90 text-xs ${selectedTabIndex === index ? 'bg-[#F6F6FF] text-primary' : 'bg-transparent text-[#B9B9B9]'}`}
                            key={index}
                        >
                            {tab}
                        </button>
                    ))
                }
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
