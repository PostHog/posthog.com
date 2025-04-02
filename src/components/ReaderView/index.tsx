import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarState {
    isOpen: boolean
    width: number
}

const leftSidebarWidth = '250px'
const rightSidebarWidth = '300px'

export default function ReaderView() {
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(true)

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
        setIsTocVisible((prev) => !prev)
    }, [])

    return (
        <div className="w-full h-full flex flex-col bg-light dark:bg-dark">
            {/* First row - Header */}
            <div className="flex w-full gap-2 p-2 flex-shrink-0">
                <motion.div
                    className="flex-shrink-0"
                    animate={{ width: isNavVisible ? leftSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    home
                    <button className="border border-light bg-white" onClick={toggleNav}>
                        toggle nav
                    </button>
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>back, forward</div>
                    <div>search</div>
                </div>
                <motion.div
                    className="flex-shrink-0 flex justify-end"
                    animate={{ width: isTocVisible ? rightSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    <button className="border border-light bg-white" onClick={toggleToc}>
                        toggle ToC
                    </button>
                </motion.div>
            </div>

            {/* Second row - Main Content */}
            <div className="flex w-full gap-2 min-h-0 flex-grow overflow-hidden">
                <AnimatePresence>
                    {isNavVisible && (
                        <motion.div
                            id="nav"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: leftSidebarWidth, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 overflow-y-auto p-4"
                        >
                            <p>
                                In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu, dictum
                                mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris pellentesque
                                bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam sit amet, condimentum
                                nisi. Suspendisse eleifend ante consequat odio euismod, non ultricies ipsum sagittis.
                                Maecenas quis nisi rutrum, feugiat nunc eget, convallis velit.
                            </p>
                            <p>
                                In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu, dictum
                                mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris pellentesque
                                bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam sit amet, condimentum
                                nisi. Suspendisse eleifend ante consequat odio euismod, non ultricies ipsum sagittis.
                                Maecenas quis nisi rutrum, feugiat nunc eget, convallis velit.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex-grow bg-white dark:bg-accent-dark overflow-y-auto p-4">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod ornare dolor ac luctus.
                        Quisque cursus orci non consectetur interdum. Duis auctor erat vitae suscipit ornare.
                        Pellentesque egestas quis odio quis consectetur. Sed dignissim euismod fringilla. Phasellus
                        egestas, nunc sit amet venenatis consequat, quam felis congue ex, quis accumsan metus enim in
                        ipsum. Maecenas bibendum vel ligula et malesuada. Suspendisse ac nisi in odio mollis pretium.
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent
                        varius semper leo, sed tempor tortor maximus vitae. Phasellus a imperdiet nunc, sed tincidunt
                        nisi. Morbi est tellus, efficitur eleifend imperdiet eu, varius at dolor. Morbi in erat ac
                        tortor sodales molestie.
                    </p>

                    <p>
                        Suspendisse tempus tempor mi luctus faucibus. Proin lobortis elit ac nulla egestas, sed posuere
                        ante varius. Praesent at nibh a lectus blandit finibus. Vivamus ornare mi orci, eu pulvinar nunc
                        bibendum et. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc dignissim
                        commodo lectus sit amet molestie. Nunc ultrices lacinia odio non semper. Morbi sollicitudin
                        imperdiet finibus. Nullam auctor, turpis at viverra fringilla, ex dui posuere est, eu faucibus
                        ligula augue sed tellus. In ac diam nec ligula viverra vulputate. Sed venenatis vestibulum
                        laoreet. Sed vestibulum aliquet dapibus. Morbi vitae molestie lectus.
                    </p>

                    <p>
                        Sed et bibendum libero. Nunc in lacinia nisi, vel molestie mi. Aliquam aliquet nisi vitae quam
                        eleifend laoreet. Vivamus hendrerit varius nisi ut faucibus. Morbi sed sagittis quam. Aliquam
                        aliquam varius auctor. Aenean lacinia eros at justo aliquet ultrices. Suspendisse elit diam,
                        aliquet a lectus id, scelerisque maximus mauris. Quisque tellus lorem, faucibus vitae justo
                        luctus, posuere hendrerit orci. Nulla in magna velit. Proin ultrices mi ac leo luctus, in
                        placerat turpis dapibus. Aenean hendrerit diam ut velit ultricies dictum. Maecenas pretium nunc
                        ullamcorper mauris fringilla elementum.
                    </p>

                    <p>
                        Nam ut dignissim ipsum. Maecenas in consectetur diam, rutrum sodales nisl. Duis luctus id massa
                        non ultricies. Fusce id convallis nisi, eu lobortis sem. Integer dignissim diam sit amet sapien
                        posuere pellentesque. Duis porttitor dapibus nibh at tempus. Orci varius natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus. Quisque a nibh nec ligula maximus blandit.
                        Aliquam sodales rhoncus lorem, vel pulvinar eros rhoncus tincidunt. Pellentesque auctor feugiat
                        congue. Suspendisse consectetur porttitor volutpat. Nam luctus, enim at tristique convallis,
                        massa neque auctor eros, vel feugiat nulla eros vitae elit. Morbi pellentesque sollicitudin ex,
                        at accumsan ipsum faucibus vitae. Aliquam erat volutpat. Integer aliquet mattis pellentesque.
                        Sed laoreet nisl ligula, in sodales risus aliquam ut.
                    </p>

                    <p>
                        In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu, dictum mattis
                        arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris pellentesque bibendum cursus.
                        Phasellus vitae mauris vehicula, condimentum diam sit amet, condimentum nisi. Suspendisse
                        eleifend ante consequat odio euismod, non ultricies ipsum sagittis. Maecenas quis nisi rutrum,
                        feugiat nunc eget, convallis velit.
                    </p>
                </div>
                <AnimatePresence>
                    {isTocVisible && (
                        <motion.div
                            id="toc"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: rightSidebarWidth, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 overflow-y-auto p-4"
                        >
                            <p>
                                In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu, dictum
                                mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris pellentesque
                                bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam sit amet, condimentum
                                nisi. Suspendisse eleifend ante consequat odio euismod, non ultricies ipsum sagittis.
                                Maecenas quis nisi rutrum, feugiat nunc eget, convallis velit.
                            </p>
                            <p>
                                In ut tortor eget enim posuere tristique. Sed tortor orci, dignissim at diam eu, dictum
                                mattis arcu. Pellentesque vel condimentum nulla, at pretium augue. Mauris pellentesque
                                bibendum cursus. Phasellus vitae mauris vehicula, condimentum diam sit amet, condimentum
                                nisi. Suspendisse eleifend ante consequat odio euismod, non ultricies ipsum sagittis.
                                Maecenas quis nisi rutrum, feugiat nunc eget, convallis velit.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Third row - Footer */}
            <div className="flex w-full gap-2 p-2 flex-shrink-0">
                <motion.div
                    className="flex-shrink-0"
                    animate={{ width: isNavVisible ? leftSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    home, sidebar
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>Questions?</div>
                    <div>text sizing</div>
                </div>
                <motion.div
                    className="flex-shrink-0"
                    animate={{ width: isTocVisible ? rightSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    edit buttons
                </motion.div>
            </div>
        </div>
    )
}
