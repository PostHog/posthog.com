import type { PrismTheme } from 'prism-react-renderer'

export const lightTheme: PrismTheme = {
    plain: {
        color: '#000',
        backgroundColor: '#E5E7E0',
    },
    styles: [
        {
            types: ['comment'],
            style: {
                color: 'rgb(0, 128, 0)',
            },
        },
        {
            types: ['builtin'],
            style: {
                color: 'rgb(0, 112, 193)',
            },
        },
        {
            types: ['number', 'variable', 'inserted'],
            style: {
                color: 'rgb(9, 134, 88)',
            },
        },
        {
            types: ['operator'],
            style: {
                color: 'rgb(0, 0, 0)',
            },
        },
        {
            types: ['constant', 'char'],
            style: {
                color: 'rgb(129, 31, 63)',
            },
        },
        {
            types: ['tag'],
            style: {
                color: 'rgb(128, 0, 0)',
            },
        },
        {
            types: ['attr-name'],
            style: {
                color: 'rgb(255, 0, 0)',
            },
        },
        {
            types: ['deleted', 'string'],
            style: {
                color: 'rgb(163, 21, 21)',
            },
        },
        {
            types: ['changed', 'punctuation'],
            style: {
                color: 'rgb(4, 81, 165)',
            },
        },
        {
            types: ['function', 'keyword'],
            style: {
                color: 'rgb(0, 0, 255)',
            },
        },
        {
            types: ['class-name'],
            style: {
                color: 'rgb(38, 127, 153)',
            },
        },
    ],
}

export const darkTheme: PrismTheme = {
    plain: {
        color: '#FFF',
        backgroundColor: '#232429',
    },
    styles: [
        {
            types: ['prolog'],
            style: {
                color: 'rgb(0, 0, 128)',
            },
        },
        {
            types: ['comment'],
            style: {
                color: 'rgb(106, 153, 85)',
            },
        },
        {
            types: ['builtin', 'changed', 'keyword', 'interpolation-punctuation'],
            style: {
                color: 'rgb(86, 156, 214)',
            },
        },
        {
            types: ['number', 'inserted'],
            style: {
                color: 'rgb(181, 206, 168)',
            },
        },
        {
            types: ['constant'],
            style: {
                color: 'rgb(100, 102, 149)',
            },
        },
        {
            types: ['attr-name', 'variable'],
            style: {
                color: 'rgb(156, 220, 254)',
            },
        },
        {
            types: ['deleted', 'string', 'attr-value', 'template-punctuation'],
            style: {
                color: 'rgb(206, 145, 120)',
            },
        },
        {
            types: ['selector'],
            style: {
                color: 'rgb(215, 186, 125)',
            },
        },
        {
            types: ['tag'],
            style: {
                color: 'rgb(78, 201, 176)',
            },
        },
        {
            types: ['tag'],
            languages: ['markup'],
            style: {
                color: 'rgb(86, 156, 214)',
            },
        },
        {
            types: ['punctuation', 'operator'],
            style: {
                color: 'rgb(212, 212, 212)',
            },
        },
        {
            types: ['punctuation'],
            languages: ['markup'],
            style: {
                color: '#808080',
            },
        },
        {
            types: ['function'],
            style: {
                color: 'rgb(220, 220, 170)',
            },
        },
        {
            types: ['class-name'],
            style: {
                color: 'rgb(78, 201, 176)',
            },
        },
        {
            types: ['char'],
            style: {
                color: 'rgb(209, 105, 105)',
            },
        },
    ],
}
