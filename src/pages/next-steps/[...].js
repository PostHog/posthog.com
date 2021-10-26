import React, { useEffect, useState } from 'react'
import Layout from 'components/SignUp/Layout'
import Logo from 'components/Logo'
import { heading } from 'components/SignUp/classes'

const classes = {
    p: 'text-[17px] leading-[1.7]',
}

export default function NextSteps({ location }) {
    const [customer, setCustomer] = useState({
        name: '',
        logo: '',
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getCustomer() {
            const name = location.pathname.split('/')[2]
            if (name) {
                const customer = await fetch(`/.netlify/functions/customer?name=${name}`).then((res) => res.json())
                setCustomer(customer)
            }
            setLoading(false)
        }
        getCustomer()
    }, [])
    return (
        <div style={{ opacity: loading ? '0' : '1' }}>
            <Layout crumbs={[{ title: 'Next steps' }]}>
                <div className="px-5">
                    <div className="flex justify-center items-center my-16 space-x-4 transition-opacity">
                        <Logo noText />
                        <span className="text-2xl">❤️</span>
                        <img className="w-[64px]" src={customer.logo} />
                    </div>
                    <h1 className={heading()}>Next steps</h1>
                    <section className="max-w-[600px] my-16 mx-auto bg-white p-12 rounded-md ">
                        <h3>Hey {customer.name} team! 👋</h3>
                        <p className={classes.p}>
                            We’ve created this handy guide to answer common questions you or your team may have.
                        </p>
                        <p className={classes.p}>
                            If you have questions that aren’t covered here, just shoot us an email!
                        </p>
                    </section>
                </div>
            </Layout>
        </div>
    )
}
