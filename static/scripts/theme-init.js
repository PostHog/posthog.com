(function () {
    window.__onThemeChange = function () {}
    function setTheme(newTheme) {
        window.__theme = newTheme
        preferredTheme = newTheme
        document.body.className = newTheme
        window.__onThemeChange(newTheme)
    }
    var preferredTheme
    var slug = window.location.pathname.substring(1)
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

    // Set initial skin value
    try {
        const savedSkin = JSON.parse(localStorage.getItem('siteSettings') || '{}').skinMode || 'modern'
        document.body.setAttribute('data-skin', savedSkin)
        const savedWallpaper = JSON.parse(localStorage.getItem('siteSettings') || '{}').wallpaper || 'keyboard-garden'
        document.body.setAttribute('data-wallpaper', savedWallpaper)
    } catch (err) {}
})()