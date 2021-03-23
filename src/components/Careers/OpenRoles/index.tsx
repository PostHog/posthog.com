import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export const OpenRoles = () => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.whr) {
            window.whr(document).ready(function () {
                window.whr_embed(456332, { detail: 'titles', base: 'jobs', zoom: 'country', grouping: 'none' })
            })
        }
    }, [])

    return (
        <div className="mt-24 text-white text-center">
            <div className="w-11/12 max-w-5xl mx-auto bg-black bg-opacity-20 rounded-lg p-4 md:p-8 lg:p-12 ">
                <h2>Open roles</h2>
                <p className="opacity-80 mt-1 text-center max-w-4xl mx-auto">
                    Our team is proactively looking for the following:
                </p>
                <div id="whr_embed_hook"></div>
                <Helmet>
                    <script src="https://www.workable.com/assets/embed.js" type="text/javascript"></script>
                </Helmet>
            </div>
        </div>
    )
}
