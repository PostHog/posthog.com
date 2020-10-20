export const handleToggle = (currentTheme: string, isFirstLoad: boolean = false) => {
    const doc = window.document
    const sidebarElement = doc.getElementById('docs-sidebar')
    const headerElement = doc.getElementById('menu-header')
    const rightNavElement = doc.getElementById('right-navbar')
    const rightNavInnerElement = doc.getElementsByClassName('right-bar-inner')[0] as HTMLElement;
    const docsSearchContainerElement = doc.getElementById('docs-search-container')
    const docsContentWrapperElement = doc.getElementById('docs-content-wrapper')
    const antLayoutContentWrapperElement = doc.getElementById('ant-layout-content-wrapper')

    if (currentTheme === 'dark') {
        sidebarElement.style['background'] = 'rgb(249, 249, 249)'
        headerElement.style['background-color'] = '#ffffff'
        rightNavElement.style['background'] = '#ffffff'
        rightNavInnerElement.style['background-color'] = '#ffffff'
        docsSearchContainerElement.style['background-color'] = '#ffffff'
        docsContentWrapperElement.style['background-color'] = '#ffffff'
        antLayoutContentWrapperElement.style['background-color'] = '#ffffff'
    } else {
        sidebarElement.style['background'] = '#000000'
        headerElement.style['background-color'] = '#000000'
        rightNavElement.style['background'] = '#000000'
        rightNavInnerElement.style['background-color'] = '#000000'
        docsSearchContainerElement.style['background-color'] = '#000000'
        docsContentWrapperElement.style['background-color'] = '#000000'
        antLayoutContentWrapperElement.style['background-color'] = '#000000'
    }

    if (!isFirstLoad) window.localStorage['currentWebsiteTheme'] = currentTheme === 'dark' ? 'light' : 'dark'

}