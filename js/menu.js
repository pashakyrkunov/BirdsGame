window.onload = function () {

    let lowButton = document.getElementById('low_button');
    let mediumButton = document.getElementById('medium_button');
    let hardButton = document.getElementById('hard_button');
    let skyButton = document.getElementById('light_bg_button');
    let sunSetButton = document.getElementById('dark_bg_button');

    if (window.localStorage.level === undefined) {
        window.localStorage.level = 'low';
    }

    if (window.localStorage.theme === undefined) {
        window.localStorage.theme = 'dark';
    }

    function init() {
        lowButton.onclick = function() {
            updateLevel('low');
        };

        mediumButton.onclick = function() {
            updateLevel('medium');
        };

        hardButton.onclick = function() {
            updateLevel('hard');
        };

        skyButton.onclick = function() {
            updateTheme('light');
        };

        sunSetButton.onclick = function() {
            updateTheme('dark'); 
        };
        updateLevelButtons();
        updateThemeButtons();

    }

   
    function updateLevel(level) {
        window.localStorage.level = level;
        updateLevelButtons();
    }
    
    function updateTheme(theme) {
        window.localStorage.theme = theme;
        updateThemeButtons();
    }

    function updateLevelButtons() {
        let level = window.localStorage.level;

        lowButton.style.backgroundColor = (level === 'low') ? 'darkseagreen' : 'lightgoldenrodyellow';
        mediumButton.style.backgroundColor = (level === 'medium') ? 'darkseagreen' : 'lightgoldenrodyellow';
        hardButton.style.backgroundColor = (level === 'hard') ? 'darkseagreen' : 'lightgoldenrodyellow';

        lowButton.style.color = (level === 'low') ? 'lightgoldenrodyellow' : 'darkseagreen';
        mediumButton.style.color = (level === 'medium') ? 'lightgoldenrodyellow' : 'darkseagreen';
        hardButton.style.color = (level === 'hard') ? 'lightgoldenrodyellow' : 'darkseagreen';
    }

    function updateThemeButtons() {
        let theme = window.localStorage.theme;

        skyButton.style.backgroundColor = (theme === 'light') ? 'darkseagreen' : 'lightgoldenrodyellow';
        sunSetButton.style.backgroundColor = (theme === 'dark') ? 'darkseagreen' : 'lightgoldenrodyellow';

        skyButton.style.color = (theme === 'light') ? 'lightgoldenrodyellow' : 'darkseagreen';
        sunSetButton.style.color = (theme === 'dark') ? 'lightgoldenrodyellow' : 'darkseagreen';
    }

    init();
};