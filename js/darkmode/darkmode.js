export const storageKey = 'theme-preference';
const root = document.body;

/**
 * Hämta aktuell färgpreferens.
 * Kollar localStorage, annars används systemets 'prefers-color-scheme'.
 * @returns {'dark'|'light'} - Antingen 'dark' eller 'light'.
 */
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

/**
 * Spegla `theme.value` i DOM: lägg till eller ta bort `dark-mode`-klassen
 * och uppdatera toggle-knappens `aria-label`.
 */
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

/**
 * Globalt tema-objekt. Ändra `value` för att byta läge.
 */
export const theme = {
    value: getColorPreference(),
};

reflectPreference();

/**
 * Växla tema mellan 'light' och 'dark' och spara valet.
 */
export const onClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
};

/**
 * Initiera dark mode-funktionalitet: spegla nuvarande preferens
 * och sätt upp nödvändiga event listeners.
 *
 */

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