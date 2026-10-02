/* eslint-disable @typescript-eslint/no-var-requires */
const tameCard = require('./tame.js')

module.exports = ({ role, timezone }) =>
    tameCard({
        windowTitle: 'Careers',
        hog: 'remote-work',
        title: role,
        lines: [timezone ? `Remote · ${timezone}` : 'Fully remote'],
        button: 'Apply now',
    })
