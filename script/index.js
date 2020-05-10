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

})

const arrows = document.querySelector('.arrows');
const up = document.querySelector('.arrows #up');
const down = document.querySelector('.arrows #down');


arrows.addEventListener('click', (e) => {
        down.classList.remove('active');
        up.classList.remove('active');
        e.target.classList.add('active');
        const sortedArr = getSortedArr(e.target.id)
        viewCatalog(sortedArr)
})
const filterParams = document.querySelector('.catalog__filter .params .tabs');
filterParams.addEventListener('click', (e) => {

    const arr = JSON.parse(sessionStorage.getItem('items'));
        const arrTabs = document.querySelectorAll('.catalog__filter .params .tabs span')
        arrTabs.forEach((item) => item.classList.remove('active'));
        e.target.classList.add('active')

    if (document.querySelector('input[name="choose"]:checked')) {
        const filtredS = JSON.parse(sessionStorage.getItem('filteredArr'));
        let res;
        if (e.target.id === 'cost') {
            if (down.classList.contains('active')) {
                res = filtredS.sort((prev, next) => {
                    return next[e.target.id] - prev[e.target.id]
                })
            }
        } else {
            if (down.classList.contains('active')) {
                res = filtredS.sort((prev, next) => {
                    if (prev[e.target.id] < next[e.target.id]) {
                        return -1
                    }
                    if (prev[e.target.id] > next[e.target.id]) {
                        return 1
                    }
                    return 0
                })

            } else {
                res = filtredS.sort((prev, next) => {
                    if (prev[e.target.id] < next[e.target.id]) {
                        return -1
                    }
                    if (prev[e.target.id] > next[e.target.id]) {
                        return 1
                    }
                    return 0
                })
            }
        }
        sessionStorage.setItem('filteredArr', JSON.stringify(res))
        viewCatalog(res);
    } else {
        let sortedArr = [];
        if (down.classList.contains('active')) {
            if (e.target.id === 'cost') {
                sortedArr = arr.sort((prevElem, nextElem) => nextElem[e.target.id] - prevElem[e.target.id]);
            } else {
                sortedArr = arr.sort((prevElem, nextElem) => {
                    if (prevElem[e.target.id] > nextElem[e.target.id]) //сортируем строки по возрастанию
                        return -1
                    if (prevElem[e.target.id] < nextElem[e.target.id])
                        return 1
                    return 0
                });
            }

        }
        if (up.classList.contains('active')) {
            if (e.target.id === 'cost') {
                sortedArr = arr.sort((prevElem, nextElem) => prevElem[e.target.id] - nextElem[e.target.id]);
            } else {
                sortedArr = arr.sort((prevElem, nextElem) => {

                    if (prevElem[e.target.id] < nextElem[e.target.id]) //сортируем строки по возрастанию
                        return -1
                    if (prevElem[e.target.id] > nextElem[e.target.id])
                        return 1
                    return 0
                });
            }

        }
        viewCatalog(sortedArr);
    }
    // console.log(e.target.id)
})

