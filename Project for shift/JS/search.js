const searchBtn = document.querySelector(".search-wrapper__search-btn");
const searchResultsCountEl = document.querySelector(
  ".search-wrapper__results-number"
);
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
        const foundMatchesCount = (cell.textContent.match(searchRegExp) || [])
          .length;
        if (foundMatchesCount === 0) {
          // нет совпадений в ячейке? скипаем!
          return;
        }
        resultCount += foundMatchesCount; // foundMatchesCount всегда существует (выше скип). Поэтому просто добавляем к счётчику найденные совпадения в данной ячейке.
        handleHighlight(cell, searchRegExp); // теперь нужно их покрасить
      });
    });
    searchResultsCountEl.textContent = resultCount.toString();
    oldValue = searchText;
  });

function handleHighlight(cell, searchRegExp) {
  // searchRegExp.source - это то, что мы ищем. Но нужно подсветить текст. Поэтому обрамляем его span-ом.
  const replaceHtmlStr = `<span class="search-text__highlighted">${searchRegExp.source}</span>`; // todo: обработать проблему с подменой регистра
  cell.innerHTML = cell.innerHTML.replace(searchRegExp, replaceHtmlStr);
}

function resetHighlight(searchText) {
  const matches = Array.from(
    document.getElementsByClassName("search-text__highlighted")
  );
  matches.forEach((match) => {
    match.replaceWith(match.textContent);
  });
}
