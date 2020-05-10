const catalog = document.querySelector('#catalog__cards .cards');

export const viewCatalog = (data) => {
    let resString = ``;
    data.forEach((item) => {
        let {
            cost,
            description,
            img,
            title,
            type,
            category
        } = item;
        const image = `../img/${img.split("/")[img.split("/").length - 1]}`;
        const template = `
              <article class="card">
                   <img src=${image} alt=${title}>
                    <div class="card__up-block">
                        <h3>${title}</h3>
                        <p>${description}</p>
                        <p>${category}</p>
                        <a href="" class="btn-card">${cost}</a>
                    </div>
                </article>
             `;

        resString += template

    });
    catalog.innerHTML = resString
};
