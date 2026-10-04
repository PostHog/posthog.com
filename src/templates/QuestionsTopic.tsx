// /questions/topic/<slug>. The page window renders the forum (components/Inbox) for every
// /questions path and reads the topic from the `data` prop, so this component renders nothing.
export interface QuestionsTopicProps {
    data: { topic: { id: string; squeakId: number; label: string } }
}

export default function QuestionsTopic(_props: QuestionsTopicProps) {
    return null
}
