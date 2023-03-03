import axios from 'axios'

const subscriptionURL = process.env.SUBSTACK_URL

export const subscribe = async (url, email) => {
    try {
        await axios.post(`${url}/api/v1/free`, {
            first_url: `${url}/subscribe`,
            first_referrer: '',
            current_url: `${url}/subscribe`,
            current_referrer: '',
            referral_code: '',
            source: 'subscribe_page',
            email,
        })
    } catch (error) {
        throw new Error(error)
    }
}

const handler = async (req, res) => {
    const { email } = JSON.parse(req.body)

    try {
        await subscribe(subscriptionURL, email)
    } catch (error) {
        return res.status(500).json({ error })
    }

    return res.status(200).json({ success: true })
}

export default handler
