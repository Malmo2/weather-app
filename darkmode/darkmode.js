export const storageKey = 'theme-preference';
const root = document.body;

export const getColorPreference = () => {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }
};

export const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
};

export const reflectPreference = () => {
    if (theme.value === 'dark') {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }

    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', theme.value);
    }
};

export const theme = {
    value: getColorPreference(),
};

reflectPreference();

export const onClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
};

export const initDarkMode = () => {
    reflectPreference();

    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', onClick);
    }

    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches: isDark }) => {
            theme.value = isDark ? 'dark' : 'light';
            setPreference();
        });
};