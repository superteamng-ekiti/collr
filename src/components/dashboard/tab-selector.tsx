"use client"

import {useState} from "react";

export default function TabSelector({ tabs }: { tabs: string[]}) {
    const [selectedTabIndex, selectTabIndex] = useState(0)
    
    return (
        <div className={'flex gap-2'}>
            {
                tabs.map((tab, index) => (
                    <button
                        onClick={() => selectTabIndex(index)}
                        className={`border px-3 py-1.5 rounded-full capitalize transition-all duration-300 active:scale-90 text-xs ${selectedTabIndex === index ? 'bg-[#F6F6FF] text-primary' : 'bg-transparent text-[#B9B9B9]'}`}
                        key={index}
                    >
                        {tab}
                    </button>
                ))
            }
        </div>
    )
}
