(function () {
    window.__onThemeChange = function () {}
    function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.className = newTheme
        window.__onThemeChange(newTheme)
    }
    var preferredTheme
    var darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkQuery.addListener(function (e) {
        if (!localStorage.getItem('theme')) {
            window.__setPreferredTheme('system')
        }
    })
    try {
        preferredTheme =
            localStorage.getItem('theme') || 'light'
    } catch (err) {}
    window.__setPreferredTheme = function (theme) {
        const newTheme = theme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : theme
        setTheme(newTheme)
        try {
            localStorage.setItem('theme', newTheme)
        } catch (err) {}
        return newTheme
    }
    setTheme(preferredTheme === 'system' ? (darkQuery.matches ? 'dark' : 'light') : preferredTheme)

    // Set initial skin / wallpaper / reduce-transparency before React hydrates
    try {
        // The classic skin has been retired; always render the modern skin
        document.body.setAttribute('data-skin', 'modern')
        var siteSettings = JSON.parse(localStorage.getItem('siteSettings') || '{}')
        document.body.setAttribute('data-wallpaper', siteSettings.wallpaper || 'keyboard-garden')
        document.body.setAttribute(
            'data-reduce-transparency',
            siteSettings.reduceTransparency ? 'true' : 'false'
        )
    } catch (err) {}
})()