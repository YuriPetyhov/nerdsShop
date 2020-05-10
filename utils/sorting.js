 import {sortParams} from "./sortParams.js";

 export let getSortedArr = function (param) {
     const flag = [...document.querySelectorAll('.catalog__filter .params .tabs span')]
         .find((item) => item.classList.contains('active')).id;
     if (flag === 'cost') {
         return sortParams.numericalSort(param)
     } else {
         return sortParams[param](flag)
     }

 }

 export default getSortedArr;
