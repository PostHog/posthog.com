import React from 'react'
import List from 'components/List'
import useFrameworkList from 'hooks/docs/useFrameworkList'

interface InstallationFrameworksProps {
    columns?: 2 | 3 | 4
}

const ProductAnalyticsInstallationFrameworks = ({ columns = 3 }: InstallationFrameworksProps) => {
    const columnClassMap = {
        2: '@md:grid-cols-2',
        3: '@md:grid-cols-3',
        4: '@md:grid-cols-4',
    }

    const frameworks = useFrameworkList()

    return <List className={`grid gap-4 grid-cols-2 ${columnClassMap[columns]} not-prose`} items={frameworks} />
}
export default ProductAnalyticsInstallationFrameworks
