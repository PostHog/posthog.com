import React from 'react'

import githubReleaseTrackerImage from '../AppsList/logos/github-release-tracker.png'
import gitlabReleaseTrackerImage from '../AppsList/logos/gitlab-release-tracker.png'
import bitbucketReleaseTrackerImage from '../AppsList/logos/bitbucket-release-tracker.png'
import twitterFollowersImage from '../AppsList/logos/twitter-followers.png'

const LegacyListing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-gray-accent-light">
                <img className="icon w-8 h-8 mb-2" src={image} />
                <span className="text-primary">{name}</span>
            </a>
        </li>
    )
}

export default function AppsList() {
    return (
        <React.Fragment>
            <LegacyListing name="GitHub Release Tracker" image={githubReleaseTrackerImage} url="#" />
            <LegacyListing name="GitLab Release Tracker" image={gitlabReleaseTrackerImage} url="#" />
            <LegacyListing name="BitBucket Release Tracker" image={bitbucketReleaseTrackerImage} url="#" />
            <LegacyListing name="Twitter Followers" image={twitterFollowersImage} url="#" />
        </React.Fragment>
    )
}
