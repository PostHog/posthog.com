import type { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
    plain: {
        color: '#F8F8F8',
        backgroundColor: '#2C2C2C',
    },
    styles: [
        {
            types: ['prolog', 'constant', 'builtin', 'boolean'],
            style: {
                color: 'rgb(189, 147, 249)',
            },
        },
        {
            types: ['number', 'function'],
            style: {
                color: '#FF6308',
            },
        },
        {
            types: ['punctuation', 'symbol'],
            style: {
                color: 'rgb(248, 248, 242)',
            },
        },
        {
            types: ['string', 'char', 'attr-value'],
            style: {
                color: '#e4a604',
            },
        },
        {
            types: ['tag', 'selector'],
            style: {
                color: '#4695FF',
            },
        },
        {
            types: ['keyword', 'variable'],
            style: {
                color: '#4695FF',
                fontStyle: 'italic',
            },
        },
        {
            types: ['comment', 'attr-name'],
            style: {
                color: 'rgb(163, 162, 162)',
            },
        },
    ],
}

export default theme
