import React from 'react'
import { Toggle, ToggleGroup } from 'components/UI/Toggle'

export default function Required(): JSX.Element {
    const [value, setValue] = React.useState(['weekly'])
    return (
        <div className="flex flex-col items-start gap-3">
            <ToggleGroup required defaultValue={['trends']} aria-label="Insight type">
                <Toggle value="trends">Trends</Toggle>
                <Toggle value="funnels">Funnels</Toggle>
                <Toggle value="retention">Retention</Toggle>
            </ToggleGroup>
            <ToggleGroup
                required
                appearance="raised"
                value={value}
                onValueChange={setValue}
                aria-label="Report frequency"
            >
                <Toggle value="daily">Daily</Toggle>
                <Toggle value="weekly">Weekly</Toggle>
                <Toggle value="monthly">Monthly</Toggle>
            </ToggleGroup>
            <span className="text-sm text-secondary">Report frequency: {value[0]}</span>
        </div>
    )
}
