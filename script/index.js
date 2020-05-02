
fetch('https://nerdsb.herokuapp.com/catalog/:fixed')
    .then(data => {
        return data.json()
    })
    .then(items => viewCatalog(items))
    .catch(err => console.error(err))

const catalog = document.querySelector('#catalog__cards');
const viewCatalog = (data) => {
    let resString  = '';
    data.forEach((item) => {
        let {
            cost,
            description,
            img,
            title,
            type,
        } = item;

            const template = `
          <article class="card">
               <img src=${img} alt="">
                <div class="card__up-block">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a href="" class="btn-card">${cost}</a>
                </div>
            </article>
    `;

        resString+=template

        });
    catalog.innerHTML = resString
};
const form =document.querySelector('#layout');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const a = document.querySelector('input[name="choose"]:checked').value;
    console.log(a)
})