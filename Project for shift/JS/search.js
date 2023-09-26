const searchBtn = document.querySelector(".search-wrapper__search-btn");
const searchResultsCountEl = document.querySelector(
  ".search-wrapper__results-number"
);
let replacedMatchesDictionary = [];
let oldValue = "";
document
  .querySelector(".search-wrapper__search-btn")
  .addEventListener("click", () => {
    const searchEl = document.getElementById("search-text"); // значение строки поиска
    const searchText = searchEl.value.trim();
    const newColumnsData = Array.from(
      document.getElementsByClassName("column")
    );
    resetHighlight(searchText);
    replacedMatchesDictionary = [];
    if (!searchText.length) {
      searchResultsCountEl.textContent = "0"; // если ищем пустую строку - обнуляем счётчик
      oldValue = "";
      return;
    }
    let resultCount = 0; // счётчик количества совпадений
    const searchRegExp = new RegExp(searchText, "gi");
    activeFilters.forEach((filterName) => {
      const activeColumn = newColumnsData.find((column) => {
        // Ищем в массиве колонок ту, которая соответствует фильтру
        return column.children[0].textContent === filterName;
      });
      const cells = Array.from(activeColumn.children);
      cells.forEach((cell) => {
        // forEach, т.к. надо всё равно пройтись по всем клеткам. Нет смысла проходить через for of.
        const foundMatches = cell.textContent.match(searchRegExp) || [];
        if (foundMatches.length === 0) {
          // нет совпадений в ячейке? скипаем!
          return;
        }
        replacedMatchesDictionary.push(...foundMatches);
        resultCount += foundMatches.length; // foundMatches всегда существует (выше скип). Поэтому просто добавляем к счётчику найденные совпадения в данной ячейке.
        handleHighlight(cell, searchRegExp); // теперь нужно их покрасить
      });
    });
    searchResultsCountEl.textContent = resultCount.toString();
    oldValue = searchText;
  });

function handleHighlight(cell, searchRegExp) {
  // searchRegExp.source - это то, что мы ищем. Но нужно подсветить текст. Поэтому обрамляем его span-ом.
  (cell.textContent.match(searchRegExp) || []).forEach((match, index) => {
    let currentSearchIdx = 0;
    cell.innerHTML = cell.innerHTML.replace(
      new RegExp(match, "gi"),
      (match) => {
        return currentSearchIdx++ === index
          ? `<span class="search-text__highlighted">${match}</span>`
          : match;
      }
    );
  });
}

function resetHighlight(searchText) {
  const matches = Array.from(
    document.getElementsByClassName("search-text__highlighted")
  );
  matches.forEach((match, i) => {
    match.replaceWith(replacedMatchesDictionary[i]);
  });
}
