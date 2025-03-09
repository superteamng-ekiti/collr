import React from 'react';
import { DollarSign, Briefcase } from 'lucide-react';

const StatsCard = () => {
    return (
            <div className="rounded-lg px-3 py-3.5 bg-[#FCFCFF]">
                <div className="grid grid-cols-2 divide-x">
                    {/* Left stat */}
                    <div className="pr-6">
                        <div className="flex items-start">
                            <div className="bg-red-300 rounded-full w-6 h-6 flex justify-center items-center">
                                <DollarSign size={18} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm text-[#353535] font-bold">40,000,000</h2>
                            <p className="text-xs mt-1">Total Value Earned</p>
                        </div>
                    </div>

                    {/* Right stat */}
                    <div className="pl-6">
                        <div className="flex items-start">
                            <div className="bg-red-300 rounded-full w-6 h-6 flex justify-center items-center">
                                <Briefcase size={14} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm text-[#353535] font-bold">1200</h2>
                            <p className="text-xs mt-1">Tasks Listed</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default StatsCard;
