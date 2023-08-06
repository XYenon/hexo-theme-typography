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
function switchTheme(theme) {
    const oldStylePath = $('#theme-style').attr('href');
    const newStylePath = oldStylePath.replace(/\/style-.+?\.css/, `/style-${theme}.css`);
    if (oldStylePath !== newStylePath) {
        $('#theme-style').attr('href', newStylePath);
    }
}
$(document).ready(function () {
    if (window.matchMedia && $('body').attr('data-theme') === 'auto') {
        const newColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        switchTheme(newColorScheme);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            const newColorScheme = event.matches ? 'dark' : 'light';
            switchTheme(newColorScheme);
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
