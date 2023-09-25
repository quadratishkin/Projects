selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
}); // todo: создать массив фильтров в него передовать и удалять выбранные опции
selectOptions.forEach((option) => {
  option.addEventListener("click", () => {
    option.classList.toggle("checked");
    let checked = document.querySelectorAll(".checked"), // выбранные пользователем опции селекта поиска.
      btnText = document.querySelector(".btn-text");
    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} Выбрано`;
    } else {
      btnText.innerText = "Выберите столбцы для поиска";
    }
    activeFilters = Array.from(checked).map(el => { // заполняем массив фильтров
      for (const child of el.children) {
        if (child.classList.contains('item-text')) {
          return child.textContent;
        }
      }
    });
  });
});