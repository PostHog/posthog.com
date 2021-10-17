import { createHistory, LocationProvider } from '@reach/router'
import { themes } from '@storybook/theming'
import '../src/styles/global.css'
const history = createHistory(window)

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

export const decorators = [
    (Story) => (
        <LocationProvider history={history}>
            <Story />
        </LocationProvider>
    ),
]
