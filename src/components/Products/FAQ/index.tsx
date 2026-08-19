import React from 'react'
import Link from 'components/shared/ui/Link'
import { Accordion } from '../Accordion'

export const FAQ = ({ question, children }) => {
    return (
        <Accordion label={question}>
            {/* nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - FAQ content from CMS, not user input */}
            <span dangerouslySetInnerHTML={{ __html: children }} />
        </Accordion>
    )
}
