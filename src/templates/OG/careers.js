/* eslint-disable @typescript-eslint/no-var-requires */
const tameCard = require('./tame.js')

module.exports = () =>
    tameCard({
        windowTitle: 'Careers',
        hog: 'town-crier',
        title: "We're hiring",
        titleSize: 84,
        lines: ['Fully remote.', 'All salaries public.'],
        button: 'See open roles',
    })
