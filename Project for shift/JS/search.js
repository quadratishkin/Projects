const searchBtn = document.querySelector('.search-wrapper__search-btn');
const searchResultsCountEl = document.querySelector('.search-wrapper__results-number');
searchBtn.addEventListener('click', ()=>{
    const searchText = document.querySelector('.search-wrapper__search-text').value.trim(); // значение строки поиска
    if (!searchText.length) {
        return;
    }
    resetHighlight(); // сбрасываем подсветку раннее найденных значений.
    const searchRegExp = new RegExp(searchText, 'gi');
    let resultCount = 0; // счётчик количества совпадений
    activeFilters.forEach(filterName => {
        const activeColumn = columns.find(column => { // Ищем в массиве колонок ту, которая соответствует фильтру
            return  column.children[0].textContent === filterName;
            }
        );
        const cells = Array.from(activeColumn.children);
        cells.forEach(cell => {
            resultCount += (cell.textContent.match(searchRegExp) || []).length; // заполняем найденные значения в
            handleHighlight(cell, searchRegExp);
        });

    });
    searchResultsCountEl.textContent = resultCount.toString();
});

function handleHighlight (cell, searchRegExp) {
    // todo: Сделать функцию подсветки.
}

function resetHighlight() {

}