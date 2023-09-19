const li = Array.from(document.querySelectorAll('li'));

const dataSlideList = li.map((el) => el.getAttribute('data-slide'));
const idList = li.map((el) => el.getAttribute('id'));

console.log(dataSlideList);
console.log(idList);
