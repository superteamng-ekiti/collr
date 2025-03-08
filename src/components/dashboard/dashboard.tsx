'use client'

import TabSelector from "@/components/dashboard/tab-selector";
import Image from "next/image";
import {useState} from "react";
import TaskCard from "@/components/dashboard/task-card";
import {ITask} from "@/types";
import CreateNewTask from "@/components/dashboard/create-new-task";

const platformTabs = ['All Tasks', 'instagram', 'tiktok', 'X', 'youtube']
const statusTabs = ['Open', 'In Review', 'Completed']

const tasks: ITask[] = [
    { id: 1, type: 'X', title: 'Retweet and like @Peaq post', creator: {
            name: 'Peaq',
            isVerified: true
        }, due: '4d', participants: '3k', reward: 400000, currency: 'COLLR' },
    { id: 2, type: 'TikTok', title: 'Comment on Peaq post', creator: {
            name: 'Peaq',
            isVerified: true
        }, due: '4d', participants: '200', reward: 30000, currency: 'COLLR' },
    { id: 3, type: 'X', title: 'Retweet and like @Peaq post', creator: {
        name:'Peaq',
            isVerified: true
        } , due: '4d', participants: '3k', reward: 400000, currency: 'COLLR' },
    { id: 4, type: 'TikTok', title: 'Comment on Peaq post', creator: {
        name:'Peaq',
            isVerified: false
        } , due: '4d', participants: '200', reward: 30000, currency: 'COLLR' },
    { id: 5, type: 'X', title: 'Follow @peaq on X', creator: {
        name:'Peaq',
            isVerified: true
        } , due: '4d', participants: '300', reward: 1000000, currency: 'COLLR' },
    { id: 6, type: 'TikTok', title: 'Comment on Peaq post', creator: {
        name:'Peaq',
            isVerified: false
        } , due: '4d', participants: '200', reward: 30000, currency: 'COLLR' },
    { id: 7, type: 'X', title: 'Follow @peaq on X', creator: {
        name:'Peaq',
            isVerified: true
        } , due: '4d', participants: '300', reward: 1000000, currency: 'COLLR' },
    { id: 8, type: 'TikTok', title: 'Comment on Peaq post', creator: {
        name:'Peaq',
            isVerified: false
        } , due: '4d', participants: '200', reward: 30000, currency: 'COLLR' },
    { id: 9, type: 'X', title: 'Follow @peaq on X', creator: {
        name:'Peaq',
            isVerified: true
        } , due: '4d', participants: '300', reward: 1000000, currency: 'COLLR' }
];

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
]

export default function Dashboard() {

    const [taskStatus, setTaskStatus] = useState('Open');
    
  return (
      // <div>
      <>
        {/*<AppHero title="gm" subtitle="Say hi to your new Solana dApp." />*/}
        <div className={'grid grid-cols-9 gap-6 h-full divide-x'}>
          <div className={'col-span-6 py-4'}>
              <TabSelector tabs={platformTabs}/>
              <div className={'rounded-lg overflow-hidden mt-6'}>
                  <Image src={'/images/cta-image.png'} width={3112} height={892} alt={'cta image'}/>
              </div>
              {/* Tasks Header */}
              <div className="flex items-center border-b pb-2.5 gap-5 mt-[3.125rem]">
                  <div className="flex items-center">
                      <span className="mr-2">😀</span>
                      <h2 className="text-lg font-semibold">Created Tasks</h2>
                  </div>
                  <div className="flex space-x-2 border-l pl-5">
                      {statusTabs.map((status) => (
                          <button
                              key={status}
                              onClick={() => setTaskStatus(status)}
                              className={`px-4 py-1 text-xs font-light transition-all relative before:-bottom-[15px] before:h-[1px] before:absolute before:inset-x-0 ${
                                  taskStatus === status
                                      ? 'text-[#FF897F] font-medium before:bg-[#FF897F]'
                                      : 'hover:text-[#FF897F] before:bg-transparent'
                              }`}
                          >
                              {status}
                          </button>
                      ))}
                  </div>
                  <button className="text-xs text-gray-500 rounded-lg px-4 py-2 hover:bg-secondary ml-auto">View All</button>
              </div>
                {/* Tasks */}
              {
                  tasks.map((task) =>  (
                      <TaskCard task={task} key={task.id} />
                  ))
              }
          </div>
          <div className={'col-span-3 pl-6 py-4'}>
              <div className='sticky top-[88px]'>
                  <CreateNewTask>
                      {/* Trigger */}
                      <button
                          className={'bg-[#F8F8FF] text-left w-full relative rounded-lg isolate px-6 h-[10.875rem] flex flex-col justify-center'}>
                          <div className={'absolute right-2 bottom-0 -z-[10]'}>
                              <Image src={'/images/man-with-phone-cartoon.png'} width={195} height={208}
                                     className={'w-[138px] h-full object-contain'} alt={'engagement'}/>
                          </div>
                          <p className={'text-primary font-bold text-xl max-w-[205px]'}>Create an Engagement Task</p>
                          <p className={'max-w-[17.313rem] mt-2 text-sm'}>Get more engagement on your content through our
                              incentive engagement model.</p>
                      </button>
                  </CreateNewTask>
                  <div>
                    
                  </div>
              </div>
          </div>
      </div>
      </>
  )
}
