var stage;
var siteNavShown = true;

function triggerSiteNav() {
    return;
    if (siteNavShown) {
        $('#site-nav').hide(300);
        siteNavShown = false;
    } else {
        $('#site-nav').show(300);
        siteNavShown = true;
    }
}
function updateSidebar() {
    if (window.innerWidth <= 768 || window.innerHeight <= 600) {
        $('#side-bar').innerWidth($('#stage').width());
        $('#main-container').removeClass('col-sm-9');
        //$('#site-nav').hide();
        //siteNavShown = false;
    } else {
        //$('#site-nav').show();
        //siteNavShown = true;
        var sidebarW =
            stage.width() - $('#main-container').outerWidth() + (window.innerWidth - stage.innerWidth()) / 2;
        $('#side-bar').outerWidth(sidebarW);
        console.log("sidebarW=" + sidebarW);
        $('#main-container').addClass('col-sm-9');
    }
}
function applyTheme(theme) {
    const oldStylePath = $('#theme-style').attr('href');
    const newStylePath = oldStylePath.replace(/\/style-.+?\.css/, `/style-${theme}.css`);
    if (oldStylePath !== newStylePath) {
        $('#theme-style').attr('href', newStylePath);
    }
}
function switchTheme(theme) {
    window.localStorage.setItem('theme', theme);
    $('body').attr('data-theme', theme);
    const icon = theme === 'auto' ? 'fa-circle-half-stroke' : (theme === 'light' ? 'fa-sun' : 'fa-moon');
    const themeSwitch = $('#theme-switch i');
    themeSwitch.removeClass();
    themeSwitch.addClass(`fa ${icon}`);
    themeSwitch.attr('aria-label', `Theme: ${theme}`);
    if (theme === 'auto') {
        if (window.matchMedia) {
            const prefersColorSchemeMqList = window.matchMedia('(prefers-color-scheme: dark)');
            const theme = prefersColorSchemeMqList.matches ? 'dark' : 'light';
            applyTheme(theme);
        }
    } else {
        applyTheme(theme);
    }
}
function toggleTheme() {
    const themes = ['auto', 'light', 'dark'];
    const currentTheme = $('body').attr('data-theme');
    const currentThemeIndex = themes.indexOf(currentTheme);
    const newThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[newThemeIndex];
    switchTheme(newTheme);
}
$(document).ready(function () {
    let localTheme = window.localStorage.getItem('theme');
    if (localTheme === null) {
        localTheme = $('body').attr('data-theme');
    }
    switchTheme(localTheme);
    if (window.matchMedia) {
        const prefersColorSchemeMqList = window.matchMedia('(prefers-color-scheme: dark)');
        prefersColorSchemeMqList.addEventListener('change', event => {
            if ($('body').attr('data-theme') !== 'auto') {
                return;
            }
            const newColorScheme = event.matches ? 'dark' : 'light';
            applyTheme(newColorScheme);
        });
    }

    stage = $('#stage');
    $(window).resize(function () {
        updateSidebar();
    });
    updateSidebar();
    $('#main-container').removeClass('invisible');
    $('#main-container').addClass('fadeInTop');
    if (window.innerWidth <= 768) {
        $('#side-bar').removeClass('invisible');
        $('#side-bar').addClass('fadeInTop');
    } else {
        $('#side-bar').removeClass('invisible');
        $('#side-bar').addClass('fadeInRight');
    }
    $('.site-title').click(function () {
        $('.site-title a')[0].click();
    })
});
