const tableEl = document.getElementsByClassName("table-wrapper")[0]; // Контейнер таблицы
const columnHeaders = Array.from( // массив заголовков таблицы
    document.getElementsByClassName("column__header")
);
const columns = Array.from(document.getElementsByClassName("column")); // массив колонок таблицы

const selectBtn = document.querySelector(".select-btn"), // кнопка открытия селекта
    selectOptions = document.querySelectorAll(".item"); // опции селекта
let activeFilters = []; // опции селекта для поиска по соответствующим колонкам
