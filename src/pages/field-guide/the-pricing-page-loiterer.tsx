import React from 'react'
import SpeciesEntry from 'components/FieldGuide/SpeciesEntry'
import { SPECIES_BY_SLUG } from 'components/FieldGuide/speciesData'

export default function Page(): JSX.Element {
    return <SpeciesEntry species={SPECIES_BY_SLUG['pricing-page-loiterer']} />
}
