import {ITask} from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function TaskCard({ task}: { task: ITask }) {
    return (
        <div key={task.id}
             className="bg-white py-3 px-0 lg:px-3 flex flex-col w-full overflow-hidden sm:flex-row justify-between sm:items-center">
            <div className="flex items-center mb-2 w-full sm:mb-0">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gray-100 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                    {task.type === 'X' ? (
                        <Image src='/images/twitter-x-logo.png' className='w-4 h-4' width='96' height='96' alt='x logo' />
                    ) : (
                        <Image src='/images/tiktok-logo.png' className='w-4 h-4' width='96' height='96' alt='tiktok logo' />
                    )}
                </div>
                <div className='flex-1'>
                    <div className='flex justify-between items-center w-full min-w-0 overflow-hidden'>
                        <Link href="/tasks/[id]" as={`/tasks/${task.id}`} className="font-medium truncate text-xs md:text-base max-w-full">{task.title}</Link>
                        <div className="md:hidden flex items-center justify-end gap-1 text-xs flex-shrink-0">
                            <Image src='/images/round-logo.svg' className='w-4 h-4' width='96' height='96' alt='coin'/>
                            <div className="text-right min-w-0 max-w-full">
                                <p className="font-semibold truncate">{task.reward.toLocaleString()} {task.currency}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-nowrap items-center text-xs font-light md:font-normal gap-6 divide-x text-gray-500 mt-1">
                      <span className="text-xs flex items-center gap-0.5">
                        {task.creator.name}
                          {task.creator.isVerified && (
                              <Image src='/images/icon-verified.svg' className='w-4 h-4' width='96' height='96' alt='verified' />
                          )}
                      </span>
                        <span className="pl-2 lg:pl-6">Due in {task.due}</span>
                        <span className="pl-2 lg:pl-6">{task.participants} participants</span>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex shrink-0 items-center gap-1 mt-2 sm:mt-0">
                <Image src='/images/round-logo.svg' className='w-4 h-4' width='96' height='96' alt='coin' />
                <div className="text-right">
                    <p className="font-semibold">{task.reward.toLocaleString()} {task.currency}</p>
                </div>
            </div>
        </div>
    )
}
