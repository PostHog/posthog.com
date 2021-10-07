import { themes } from '@storybook/theming'
import '../src/styles/global.css'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    darkMode: {
        dark: { ...themes.dark, appContentBg: '#151515' },
        light: { ...themes.normal, appContentBg: 'white' },
        stylePreview: true,
    },
}
