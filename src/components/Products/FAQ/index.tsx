import React from 'react'
import Link from 'components/Link'
import { Accordion } from '../Accordion'

export const FAQ = ({ question, children }) => {
    return (
        <Accordion label={question}>
            <span dangerouslySetInnerHTML={{ __html: children }} />
        </Accordion>
    )
}
