import React from 'react'
import { GetServerData } from 'gatsby'

const Question: React.FC<{ serverData: QuestionProps }> = ({ serverData }) => {
    return <div>ID: {serverData.id}</div>
}

export default Question

type QuestionProps = {
    id: string | undefined
}

export const getServerData: GetServerData<QuestionProps> = async ({ params }) => {
    return {
        props: {
            id: params?.id as string | undefined,
        },
    }
}
