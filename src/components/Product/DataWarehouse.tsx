import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'
import dataWarehouse from './images/data-warehouse.svg'

export default function DataWarehouse() {
    return (
        <FeatureWrapperRow
            id="data-warehouse"
            title="Data warehouse"
            description={
                <>
                    <p>PostHog syncs with BigQuery, Snowflake, or Redshift.</p>
                    <img src={dataWarehouse} />
                </>
            }
        />
    )
}
