import React from 'react'
import { Check } from 'components/Icons/Icons'
import EmailSubmitted from './EmailSubmitted'
import SubmitEmail from './SubmitEmail'

export default function QuestionSubmitted({ values, emailSubmitted, isValid, loading }) {
    return (
        <div>
            <p className="mb-0">{values.question}</p>
            <p className="text-[14px] font-semibold opacity-50">by {values.name}</p>
            <p className="flex items-center space-x-1 font-semibold text-[#43AF79]">
                <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                    <Check className="w-[12px] h-[12px] text-white" />
                </span>
                <span>Question sent. Answer will be posted here.</span>
            </p>
            <div className="p-6 bg-white rounded-[10px]">
                {emailSubmitted ? <EmailSubmitted /> : <SubmitEmail loading={loading} isValid={isValid} />}
            </div>
        </div>
    )
}
