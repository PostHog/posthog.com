import type { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
    plain: {
        color: '#F8F8F2',
        backgroundColor: '#2c2c2c',
    },
    styles: [
        {
            types: ['prolog', 'constant', 'builtin'],
            style: {
                color: 'rgb(189, 147, 249)',
            },
        },
        {
            types: ['inserted', 'function'],
            style: {
                color: 'rgb(242, 107, 44)',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: 'rgb(255, 85, 85)',
            },
        },
        {
            types: ['changed'],
            style: {
                color: 'rgb(255, 184, 108)',
            },
        },
        {
            types: ['punctuation', 'symbol'],
            style: {
                color: 'rgb(248, 248, 242)',
            },
        },
        {
            types: ['string', 'char', 'tag', 'selector'],
            style: {
                color: 'rgb(15, 184, 88)',
            },
        },
        {
            types: ['keyword', 'variable'],
            style: {
                color: 'rgb(84, 117, 247)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['comment'],
            style: {
                color: 'rgb(163, 162, 162)',
            },
        },
        {
            types: ['attr-name'],
            style: {
                color: 'rgb(241, 250, 140)',
            },
        },
    ],
}

export default theme
