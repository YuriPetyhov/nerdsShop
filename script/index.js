import getSortedArr from "../utils/sorting.js";
import {viewCatalog} from '../utils/viewCatalog.js';

fetch('https://nerdsb.herokuapp.com/catalog/')
    .then(data => {
        return data.json()
    })
    .then(items => {
        sessionStorage.setItem("items", JSON.stringify(items));
        sessionStorage.removeItem("filteredArr", JSON.stringify(items));
        viewCatalog(items)
    })
    .catch(err => console.error(err));

const form = document.querySelector('#layout');
const arrows = document.querySelector('.arrows');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const arr = JSON.parse(sessionStorage.getItem('items'));

    if (document.querySelector('input[name="choose"]:checked')) {
        const inputValue = document.querySelector('input[name="choose"]:checked').value;
        const filteredArr = arr.filter((item) => {
            return item.type === inputValue
        });
        sessionStorage.setItem('filteredArr', JSON.stringify(filteredArr));
        viewCatalog(filteredArr);
    }

});

arrows.addEventListener('click', (e) => {
    document.querySelectorAll('.arrows span').forEach((item) => item.classList.remove('active') )
    e.target.classList.add('active');
    const sortedArr = getSortedArr(e.target.id)
    viewCatalog(sortedArr)
});

const filterParams = document.querySelector('.catalog__filter .params .tabs');
filterParams.addEventListener('click', (e) => {
    const arrTabs = document.querySelectorAll('.catalog__filter .params .tabs span')
    arrTabs.forEach((item) => item.classList.remove('active'));
    e.target.classList.add('active')

    if (document.querySelector('input[name="choose"]:checked')) {
        let res = getSortedArr(document.querySelector('.arrows > .active').id);
        sessionStorage.setItem('filteredArr', JSON.stringify(res))
        viewCatalog(res);
    }
})

