import React from 'react'
import type { Theme } from '../types'
import { getAllThemes, getThemeBackground } from '../themes'

type Props = {
    value: Theme
    onChange: (theme: Theme) => void
}

export default function ThemePicker({ value, onChange }: Props) {
    const themes = getAllThemes()
    return (
        <div className="grid grid-cols-6 gap-1.5">
            {themes.map((theme) => {
                const isActive = theme.name === value.name && theme.mode === value.mode
                const bg = getThemeBackground(theme)
                const style: React.CSSProperties = bg.startsWith('linear-gradient')
                    ? { background: bg }
                    : { backgroundColor: bg }
                return (
                    <button
                        key={`${theme.name}-${theme.mode}`}
                        type="button"
                        onClick={() => onChange(theme)}
                        title={`${theme.name} (${theme.mode})`}
                        className={`aspect-square rounded border-2 transition ${
                            isActive ? 'border-primary scale-110' : 'border-transparent hover:border-primary/40'
                        }`}
                        style={style}
                    />
                )
            })}
        </div>
    )
}
