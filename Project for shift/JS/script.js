const tableEl = document.getElementsByClassName("table-wrapper")[0];
const columnHeaders = Array.from(
  document.getElementsByClassName("column__header")
);
const columns = Array.from(document.getElementsByClassName("column"));
let isHeadersRemoved = false;
handleColumnToggle();
window.addEventListener("resize", () => {
  handleColumnToggle();
});

columnHeaders.forEach((header) => {
  header.addEventListener("mouseover", () => {
    // Красим ячейки столбца при наведении на заголовок, заголовок не красим
    for (const cell of Array.from(header.parentNode.children).slice(1)) {
      cell.classList.add("cell--highlighted");
    }
  });

  header.addEventListener("mouseout", () => {
    // стираем окраску
    for (const cell of header.parentNode.children) {
      cell.classList.remove("cell--highlighted");
    }
  });
});

function handleColumnToggle() {
  if (tableEl.clientWidth <= 420 && !isHeadersRemoved) {
    // убираем загаловки сверху, ставим над ячейками
    isHeadersRemoved = true;
    toggleColumnHeaders(isHeadersRemoved);
  }
  if (tableEl.clientWidth > 420 && isHeadersRemoved) {
    // возраждаем заголовки
    isHeadersRemoved = false;
    toggleColumnHeaders(isHeadersRemoved);
  }
}
function toggleColumnHeaders(needHide) {
  const displayValue = needHide ? "none" : "block";
  columnHeaders.forEach((header) => {
    header.style.display = displayValue;
  });
  if (needHide) {
    displayColumnDefinitions(); // Отображаем заголовок над каждой ячейкой таблицы
  } else {
    hideColumnDefinitions(); // прячем заголовок у каждой ячейкой таблицы
  }
}
function displayColumnDefinitions() {
  columns.forEach((column) => {
    const columnHeaderText = column.children[0].textContent;

    for (const cell of Array.from(column.children).slice(0, -1)) {
      if (cell.classList.contains("column__header--collapsed")) {
        continue;
      }
      const elem = document.createElement("div");
      elem.classList.add("column__header--collapsed");
      elem.innerHTML = columnHeaderText;
      cell.parentNode.insertBefore(elem, cell.nextSibling);
    }
  });
}
function hideColumnDefinitions() {
  const columnDefinitions = document.getElementsByClassName(
    "column__header--collapsed"
  );
  for (const definition of Array.from(columnDefinitions)) {
    definition.remove();
  }
}
