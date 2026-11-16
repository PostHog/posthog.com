import React, { useState } from 'react'
import { Pagination } from 'components/UI/Pagination'

export default function Basic(): JSX.Element {
    const [page, setPage] = useState(1)
    return <Pagination page={page} pageCount={5} onPageChange={setPage} />
}
