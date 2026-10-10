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

    // The menu bar is server-rendered, but its triggers stay inert until React
    // hydrates, so a click in that window is swallowed with no feedback. Record the
    // click and mark the trigger as pending; MenuBar replays it once it is live.
    document.addEventListener(
        'pointerdown',
        function (event) {
            if (window.__menuBarHydrated) return
            var pending = window.__pendingMenuBarClick
            if (pending) pending.trigger.removeAttribute('data-pending')
            window.__pendingMenuBarClick = null
            var target = event.target
            var trigger = target && target.closest && target.closest('[data-menubar-trigger]')
            if (!trigger) return
            trigger.setAttribute('data-pending', '')
            window.__pendingMenuBarClick = { trigger: trigger, time: Date.now() }
        },
        true
    )

    // Hide dismissed WizardHint variants before first paint
    try {
        ;['warehouse-wizard-hint-dismissed', 'ai-observability-wizard-hint-dismissed'].forEach(function (key) {
            if (localStorage.getItem(key) === '1') {
                document.documentElement.classList.add(key)
            }
        })
    } catch (err) {}
})()