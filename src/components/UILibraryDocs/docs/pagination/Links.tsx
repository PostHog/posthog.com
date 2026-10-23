import React from 'react'
import { Pagination } from 'components/UI/Pagination'

export default function Links(): JSX.Element {
    return <Pagination page={3} pageCount={8} getPageHref={(page) => (page === 1 ? '/blog' : `/blog/${page}`)} />
}
