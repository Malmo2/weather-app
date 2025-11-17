

export function button() {
    const searchBtn = document.createElement('button');
    searchBtn.textContent = "Search for a city...";
    searchBtn.classList.add('btn');

    return searchBtn;
}