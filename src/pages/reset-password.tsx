import Layout from 'components/Layout'
import SEO from 'components/seo'
import ResetPassword from 'components/Squeak/components/Classic/ResetPassword'
import React from 'react'

export default function ForgotPassword() {
    return (
        <>
            <SEO title="Reset password" noindex />
            <ResetPassword />
        </>
    )
}
