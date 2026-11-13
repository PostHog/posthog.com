import React, { useState } from 'react'
import { Pagination } from 'components/UI/Pagination'

export default function Compact(): JSX.Element {
    const [page, setPage] = useState(3)
    return <Pagination page={page} pageCount={20} onPageChange={setPage} compact />
}
