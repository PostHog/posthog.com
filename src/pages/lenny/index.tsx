import React from 'react'
import LennyProductPass from 'components/Lenny/LennyProductPass'

// Co-branded landing page for Lenny's Newsletter Product Pass holders. Prerendered so search
// engines and anyone Lenny links from get a real static page with a crawlable H1.
export default function Lenny(): JSX.Element {
    return <LennyProductPass />
}
