// Original: https://github.com/sdras/night-owl-vscode-theme
// Converted automatically using ./tools/themeFromVsCode
var theme = {
    plain: {
        color: '#d6deeb',
        backgroundColor: '#011627',
    },
    styles: [
        {
            types: ['changed'],
            style: {
                color: 'rgb(162, 191, 252)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['deleted'],
            style: {
                color: '#f92672',
                fontStyle: 'italic',
            },
        },
        {
            types: ['inserted', 'attr-name'],
            style: {
                color: 'rgb(173, 219, 103)',
                fontStyle: 'italic',
            },
        },
        {
            types: ['comment'],
            style: {
                color: '#8292a2',
                fontStyle: 'italic',
            },
        },
        {
            types: ['string', 'url'],
            style: {
                color: '#a6e22e',
            },
        },
        {
            types: ['variable'],
            style: {
                color: '#f8f8f2',
            },
        },
        {
            types: ['number'],
            style: {
                color: '#ae81ff',
            },
        },
        {
            types: ['builtin', 'char', 'constant', 'function'],
            style: {
                color: '#f92672',
            },
        },
        {
            // This was manually added after the auto-generation
            // so that punctuations are not italicised
            types: ['punctuation'],
            style: {
                color: 'rgb(199, 146, 234)',
            },
        },
        {
            types: ['selector', 'doctype'],
            style: {
                color: '#a6e22e',
                fontStyle: 'italic',
            },
        },
        {
            types: ['class-name'],
            style: {
                color: 'rgb(255, 203, 139)',
            },
        },
        {
            types: ['tag', 'operator', 'keyword'],
            style: {
                color: '#66d9ef',
            },
        },
        {
            types: ['boolean'],
            style: {
                color: 'rgb(255, 88, 116)',
            },
        },
        {
            types: ['property'],
            style: {
                color: 'rgb(128, 203, 196)',
            },
        },
        {
            types: ['namespace'],
            style: {
                color: 'rgb(178, 204, 214)',
            },
        },
    ],
}

export default theme
