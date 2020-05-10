export const sortParams = {
    arr: sessionStorage.getItem('filteredArr')
        ? JSON.parse(sessionStorage.getItem('filteredArr'))
        : JSON.parse(sessionStorage.getItem('items')),

    up: function (flag) {
        return this.arr.sort((prevElem, nextElem) => {
            if (prevElem[flag] < nextElem[flag]) //сортируем строки по возрастанию
                return -1
            if (prevElem[flag] > nextElem[flag])
                return 1
            return 0
        });

    },
    down: function (flag) {
        return this.arr.sort((prevElem, nextElem) => {
            if (prevElem[flag] > nextElem[flag]) //сортируем строки по убываниб
                return -1
            if (prevElem[flag] < nextElem[flag])
                return 1
            return 0
        });

    },
    numericalSort: function (param) {
        return param === "up"
            ? this.arr.sort((prev, next) => prev.cost - next.cost)
            : this.arr.sort((prev, next) => next.cost - prev.cost)
    }
}
