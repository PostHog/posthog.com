import React from 'react'
import NoHatingAllowed from 'components/NoHatingAllowed'
import { HomepageCards } from 'components/NoHatingAllowed/data'
import Wizard from 'components/Wizard'

export default function Cards() {
    return (
        <Wizard>
            <NoHatingAllowed data={HomepageCards} youllHate="hate" size="text-2xl" />
        </Wizard>
    )
}
