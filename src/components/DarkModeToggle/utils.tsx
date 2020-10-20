export const handleToggle = (currentTheme: string) => {
    const doc = window.document
    const sidebarElement = doc.getElementById('docs-sidebar')
    const headerElement = doc.getElementById('menu-header')
    const rightNavElement = doc.getElementById('right-navbar')
    const rightNavInnerElement = doc.getElementsByClassName('right-bar-inner')[0] as HTMLElement
    const docsSearchContainerElement = doc.getElementById('docs-search-container')
    const docsContentWrapperElement = doc.getElementById('docs-content-wrapper')
    const antLayoutContentWrapperElement = doc.getElementById('ant-layout-content-wrapper')
    const paragraphElements = doc.getElementsByTagName('p')
    const linkElements = doc.getElementsByTagName('a')
    const listElements = doc.getElementsByTagName('li')
    const headerElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const spanListElements = doc.querySelectorAll('li span')

    if (currentTheme === 'dark') {
        sidebarElement.style['background'] = 'rgb(249, 249, 249)'
        headerElement.style['background-color'] = '#ffffff'
        rightNavElement.style['background'] = '#ffffff'
        rightNavInnerElement.style['background-color'] = '#ffffff'
        docsSearchContainerElement.style['background-color'] = '#ffffff'
        docsContentWrapperElement.style['background-color'] = '#ffffff'
        antLayoutContentWrapperElement.style['background-color'] = '#ffffff'
    } else {
        sidebarElement.style['background'] = 'rgb(14 13 13)'
        headerElement.style['background-color'] = '#18191a'
        rightNavElement.style['background'] = '#18191a'
        rightNavInnerElement.style['background-color'] = '#18191a'
        docsSearchContainerElement.style['background-color'] = '#18191a'
        docsContentWrapperElement.style['background-color'] = '#18191a'
        antLayoutContentWrapperElement.style['background-color'] = '#18191a'
        for (let p of paragraphElements) {
            p.style['color'] = 'rgb(208 193 193)'
        }
        for (let header of headerElements) {
            // eslint-disable-next-line
            ;(header as HTMLElement).style['color'] = '#ffffff'
        }
        for (let span of spanListElements) {
            // eslint-disable-next-line
            ;(span as HTMLElement).style['color'] = '#ffffff'
        }
        for (let li of listElements) {
            li.style['color'] = 'rgb(208 193 193)'
        }
        for (let a of linkElements) {
            a.style['color'] = 'rgb(196 18 197)'
        }
    }

    window.localStorage['currentWebsiteTheme'] = currentTheme === 'dark' ? 'light' : 'dark'
}
