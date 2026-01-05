/**
 * Displays an error message to the user for a limited time.
 *
 * @param {string} message - The error message to show
 *
 * Behavior:
 * - Shows the error message element
 * - Automatically hides it after 5 seconds
 */

export function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.style.display = 'block';

    setTimeout(() => {
        errorEl.style.display = 'none';
    }, 5000);
}
