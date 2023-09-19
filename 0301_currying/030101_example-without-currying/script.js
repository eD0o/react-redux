const li = Array.from(document.querySelectorAll('li'));

const getElementAttr=(el,key)=>{
  return el.getAttribute(key)
}

const dataSlideList = li.map((el) => getElementAttr(el,'data-slide'));
const idList = li.map((el) => getElementAttr(el,'id'));

console.log(dataSlideList);
console.log(idList);
