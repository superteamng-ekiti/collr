import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {ReactNode, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import Image from "next/image";

export default function CreateNewTask({ children }: {children: ReactNode}) {
    const [selectedPlatform, setSelectedPlatform] = useState('TWITTER / X');
    const [selectedDeadline, setSelectedDeadline] = useState('24hrs');
    const [tokenPool, setTokenPool] = useState('400,000');
    const [participants, setParticipants] = useState('');
    
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='max-w-[42.063rem] rounded-lg w-[90%]'>
                <DialogHeader>
                    <DialogTitle>Create Engagement Task</DialogTitle>
                    <DialogDescription className='sr-only'>engagement task</DialogDescription>
                </DialogHeader>
                <div className='p-6'>
                    <form className='grid gap-6'>
                        {/* Platform Selection */}
                        <div className="grid gap-2">
                            <Label className="text-sm">Select Social Media Platform</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlatform('TWITTER / X')}
                                    className={`flex items-center justify-between h-[2.688rem] truncate transition-all border py-3 px-4 rounded-sm ${
                                        selectedPlatform === 'TWITTER / X' ? 'border-primary' : ''
                                    }`}
                                >
                                    <span className='text-sm'>TWITTER / X</span>
                                    <Image src='/images/twitter-x-logo.png' className='w-4 h-4' width='96' height='96' alt='x logo' />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlatform('TIKTOK')}
                                    className={`flex items-center justify-between h-[2.688rem] truncate transition-all border py-3 px-4 rounded-sm ${
                                        selectedPlatform === 'TIKTOK' ? 'border-primary' : ''
                                    }`}
                                >
                                    <span className='text-sm'>TIKTOK</span>
                                    <Image src='/images/tiktok-logo.png' className='w-4 h-4' width='96' height='96' alt='tiktok logo' />
                                </button>
                            </div>
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="task-name" className='text-sm'>Select Engagement Type</Label>
                            <RadioGroup defaultValue="option-one" className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                                {
                                    ['Like', 'Retweet', 'Comment', 'Follow'].map((type) => (
                                        <Label htmlFor={type} key={type}
                                               className="flex items-center text-sm justify-between border py-3 px-4 rounded-sm space-x-2">
                                            <span>{type}</span>
                                            <RadioGroupItem value={type} id={type}/>
                                        </Label>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="post-url" className='text-sm'>Post Url</Label>
                            <Input type="text" id="post-url" placeholder='Social media url' className='input'/>
                        </div>
                        {/* Token Pool and Participants */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div  className='grid gap-2'>
                                <div className='flex justify-between items-center'>
                                    <Label htmlFor='token-pool'>
                                        Total Token Pool</Label>
                                    <div className="flex items-center text-xs gap-1">
                                            <div className="w-3 h-3 bg-indigo-700 rounded-full"></div>
                                            <span>400,000 COLLR</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="Enter total collr token"
                                        value={tokenPool}
                                        id='token-pool'
                                        onChange={(e) => setTokenPool(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-4 flex items-center">
                                        <span className="bg-indigo-950 text-white text-xs font-bold px-2 py-1 rounded mr-1">MAX</span>
                                    </div>
                                </div>
                            </div>
                            <div  className='grid gap-2'>
                                <Label htmlFor='participants'  className="w-full flex justify-between items-center">Number of Participants <span className="text-gray-400">(Optional)</span></Label>
                                <Input
                                    placeholder="Enter total number of participant"
                                    value={participants}
                                    id='participants'
                                    onChange={(e) => setParticipants(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Deadline */}
                        <div className="grid gap-2">
                            <Label htmlFor="deadline" className="text-sm">Select Engagement Deadline</Label>
                            <RadioGroup
                                value={selectedDeadline}
                                onValueChange={setSelectedDeadline}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            >
                                {['24hrs', '2 days', '7 days', 'Custom'].map((deadline) => (
                                    <Label
                                        htmlFor={deadline}
                                        key={deadline}
                                        className="flex items-center justify-between border py-3 px-4 rounded-sm space-x-2"
                                    >
                                        <span>{deadline}</span>
                                        <RadioGroupItem value={deadline} id={deadline}/>
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className='pt-6 w-full'>
                            <Button className='w-full uppercase'>
                                create engagement task
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
