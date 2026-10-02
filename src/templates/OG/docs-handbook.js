/* eslint-disable @typescript-eslint/no-var-requires */
const tameCard = require('./tame.js')

const buttons = { '/handbook': 'Read the handbook', '/tutorials': 'Read the tutorial' }

module.exports = ({ title, readTime, section, slug }) =>
    tameCard({
        windowTitle: section.name,
        chipColor: section.color,
        hog: section.hog,
        title,
        lines: readTime ? [readTime] : [],
        button: buttons[section.prefix] || (slug.startsWith('/docs') ? 'Read the docs' : 'Read more'),
    })
