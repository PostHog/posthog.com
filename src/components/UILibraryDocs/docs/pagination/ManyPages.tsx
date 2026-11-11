import React, { useState } from 'react'
import { Pagination } from 'components/UI/Pagination'

export default function ManyPages(): JSX.Element {
    const [page, setPage] = useState(10)
    return <Pagination page={page} pageCount={20} onPageChange={setPage} siblingCount={1} />
}
