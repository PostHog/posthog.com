import React from 'react'

export default function QuestionSkeleton() {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="w-[40px] h-[40px] bg-black dark:bg-white opacity-20 rounded-full flex-shrink-0" />
            <div className="w-full">
                <div className="flex items-center space-x-2">
                    <div className="h-[17px] bg-black dark:bg-white opacity-20 w-[40px] rounded-md" />
                    <div className="h-[17px] bg-black dark:bg-white opacity-20 w-[80px] rounded-md" />
                </div>
                <div className="w-full bg-black dark:bg-white opacity-20 h-[18px] rounded-md mt-2" />
                <div className="w-full bg-black dark:bg-white opacity-20 h-[200px] rounded-md mt-2" />
            </div>
        </div>
    )
}
