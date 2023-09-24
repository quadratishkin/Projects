const selectBtn = document.querySelector(".select-btn"),
  items = document.querySelectorAll(".item");
selectBtn.addEventListener("click", () => {
  selectBtn.classList.toggle("open");
}); // todo: создать массив фильтров в него передовать и удалять выбранные опции
items.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("checked");
    let checked = document.querySelectorAll(".checked"),
      btnText = document.querySelector(".btn-text");
    if (checked && checked.length > 0) {
      btnText.innerText = `${checked.length} Выбрано`;
    } else {
      btnText.innerText = "Выберите столбцы для поиска";
    }
  });
});
