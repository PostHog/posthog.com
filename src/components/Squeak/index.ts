import { QuestionForm } from './components/QuestionForm'
import { Question } from './components/Question'
import { Authentication } from './components/Authentication'
import { SignIn } from './components/auth/SignIn'
import { SignUp } from './components/auth/SignUp'
import { Squeak } from './components/Squeak'
import { Avatar } from './components/Avatar'
import { Questions } from './components/Questions'
import { EditProfile } from './components/EditProfile'
import { TopicSelector } from './components/TopicSelector'
import { useQuestion } from './hooks/useQuestion'
import qs from 'qs'

const fetchTopicGroups = async () => {
    // FIXME: This is has to fetch _every_ (or probably at most 25) quesiton that's part of a topic even though we only need the most recent one
    const topicGroupsQuery = qs.stringify(
        {
            populate: {
                topics: {
                    populate: {
                        questions: {
                            sort: 'activeAt:desc',
                            fields: ['id', 'activeAt'],
                            filters: {
                                $or: [
                                    {
                                        archived: {
                                            $null: true,
                                        },
                                    },
                                    {
                                        archived: {
                                            $eq: false,
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    )
    const topicGroups = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topic-groups?${topicGroupsQuery}`)

    if (!topicGroups.ok) {
        throw new Error('Failed to fetch topic groups')
    }

    return topicGroups.json().then((topicGroups) => topicGroups.data)
}

const topicGroupsSorted = ['Products', 'Platform', 'Data', 'Self-hosting', 'Other']

export {
    Authentication,
    Squeak,
    Questions,
    Question,
    QuestionForm,
    Avatar,
    useQuestion,
    SignIn,
    SignUp,
    EditProfile,
    TopicSelector,
    fetchTopicGroups,
    topicGroupsSorted,
}
