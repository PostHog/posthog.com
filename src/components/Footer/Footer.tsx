import React from 'react'
import { Link } from 'gatsby'

import NewsletterSignup from './NewsletterSignup'

const FooterListItem = ({ to, children, hideBorder }) => {
    const baseClasses = 'block py-3 text-white opacity-80 hover:opacity-100'
    const fullClassList = hideBorder ? baseClasses : `${baseClasses} border-b border-blue-600`

    return (
        <Link to={to} className={fullClassList}>
            {children}
        </Link>
    )
}

const FooterSubCategory = ({ children }) => <h7 className="block text-blue-600 mt-8 font-bold">{children}</h7>

const FooterCategory = ({ children }) => <h5 className="text-blue-600 text-lg">{children}</h5>

const Footer = ({ showNewsletter }: { showNewsletter?: boolean }) => {
    const newsletterSignup = showNewsletter ? <NewsletterSignup /> : null

    return (
        <div className="footer-universal py-24">
            {newsletterSignup}
            <div className="w-11/12 max-w-4xl flex flex-col md:flex-row justify-between mx-auto">
                <div className="w-full md:w-1/4 md:pr-8">
                    <FooterCategory>Product</FooterCategory>
                    <FooterSubCategory>Overview</FooterSubCategory>
                    <FooterListItem to="" hideBorder="true">
                        Product overview &amp; comparison
                    </FooterListItem>

                    <FooterSubCategory>Product suite</FooterSubCategory>
                    <FooterListItem to="">Analytics</FooterListItem>
                    <FooterListItem to="">Heatmaps</FooterListItem>
                    <FooterListItem to="">Session replay</FooterListItem>
                    <FooterListItem to="">Feature Flags</FooterListItem>
                    <FooterListItem to="">User feedback</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Revenue tracking
                    </FooterListItem>

                    <FooterSubCategory>Features</FooterSubCategory>
                    <FooterListItem to="">Auto capture</FooterListItem>
                    <FooterListItem to="">Plugins</FooterListItem>
                    <FooterListItem to="">Data portability</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Private cloud deployment
                    </FooterListItem>
                </div>
                <div className="w-full md:w-1/4 md:px-8">
                    <FooterCategory>Community</FooterCategory>
                    <FooterSubCategory>Code</FooterSubCategory>
                    <FooterListItem to="">Source code</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        All repositories
                    </FooterListItem>

                    <FooterSubCategory>Discussion</FooterSubCategory>
                    <FooterListItem to="">Slack</FooterListItem>
                    <FooterListItem to="">Issues</FooterListItem>
                    <FooterListItem to="">Support</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Contact sales
                    </FooterListItem>

                    <FooterSubCategory>Get involved</FooterSubCategory>
                    <FooterListItem to="">Roadmap</FooterListItem>
                    <FooterListItem to="">Contributors</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Merch
                    </FooterListItem>
                </div>
                <div className="w-full md:w-1/4 md:px-8">
                    <FooterCategory>Docs</FooterCategory>
                    <FooterSubCategory>Getting started</FooterSubCategory>
                    <FooterListItem to="">Open source</FooterListItem>
                    <FooterListItem to="">Private cloud</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        PostHog cloud
                    </FooterListItem>

                    <FooterSubCategory>Configuring PostHog</FooterSubCategory>
                    <FooterListItem to="">Installation</FooterListItem>
                    <FooterListItem to="">Docs</FooterListItem>
                    <FooterListItem to="">API</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Libraries
                    </FooterListItem>

                    <FooterSubCategory>Using PostHog</FooterSubCategory>
                    <FooterListItem to="">Features</FooterListItem>
                    <FooterListItem to="">Plugins</FooterListItem>
                    <FooterListItem to="">Tutorials</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        FAQ
                    </FooterListItem>
                </div>
                <div className="w-full md:w-1/4 md:pl-8">
                    <FooterCategory>Company</FooterCategory>
                    <FooterSubCategory>About</FooterSubCategory>
                    <FooterListItem to="">Open source</FooterListItem>
                    <FooterListItem to="">Our story</FooterListItem>
                    <FooterListItem to="">Handbook</FooterListItem>
                    <FooterListItem to="">Team</FooterListItem>
                    <FooterListItem to="">Investors</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Careers
                    </FooterListItem>

                    <FooterSubCategory>Resources</FooterSubCategory>
                    <FooterListItem to="">Blog</FooterListItem>
                    <FooterListItem to="">HogTalks</FooterListItem>
                    <FooterListItem to="">Media</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Merch
                    </FooterListItem>

                    <FooterSubCategory>Get in touch</FooterSubCategory>
                    <FooterListItem to="">Contact sales</FooterListItem>
                    <FooterListItem to="" hideBorder="true">
                        Support
                    </FooterListItem>
                </div>
            </div>
        </div>
    )
}

export default Footer
