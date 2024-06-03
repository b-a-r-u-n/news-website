const API_KEY = "f60fd4ab109549039e8b316be0c34f54";
const URL = "https://newsapi.org/v2/everything?q=";

/* This code snippet is adding click event listeners to three different elements in the HTML document.
When the element with the id "politics" is clicked, it will call the `fetchData("politics")`
function. Similarly, when the elements with the ids "cricket" and "job" are clicked, they will call
`fetchData("cricket")` and `fetchData("job")` functions respectively. */
document.querySelector("#politics").addEventListener('click' , () => {
    fetchData("politics");
});
cricket = document.querySelector("#cricket").addEventListener('click' , () => {
    fetchData("cricket");
});
document.querySelector("#job").addEventListener('click' , () => {
    fetchData("job");
});


let inputData = document.querySelector("#input-data");

document.querySelector("#btn").addEventListener('click' , () => {
    let search = inputData.value.toLowerCase();
    if(search == ""){
        return;
    }
    fetchData(search);
});


window.addEventListener('load' , () => {
    fetchData("india");
})

const fetchData = async (query) => {
    let responce = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    let data = await responce.json();
    console.log(data);
    dataBind(data.articles);
}

const dataBind = (articles) => {
    let cardContainer = document.querySelector("#card-container");
    let cardTemplate = document.querySelector("#card-template");

    cardContainer.innerHTML = "";
    articles.forEach(article => {
        if(article.urlToImage == null){
            return;
        }
        cardClone = cardTemplate.content.cloneNode(true);
        getData(cardClone , article);
        cardContainer.appendChild(cardClone);

    });
}

const getData = (cardClone , article) => {
    let cardImage = cardClone.querySelector("#card-image");
    let title = cardClone.querySelector("#title");
    let date = cardClone.querySelector("#date");
    let desc = cardClone.querySelector("#desc");
    
    cardImage.src = article.urlToImage;
    title.innerText = article.title;
    desc.innerText = article.description;

    let time = new Date(article.publishedAt).toLocaleString();
    date.innerText = `${article.source.name} -- ${time}`;

    cardClone.firstElementChild.addEventListener("click" , () => {
        window.open(article.url , "_blank");
    })
}





let magnifyingGlass = document.querySelector(".fa-magnifying-glass");
let body = document.querySelector(".body");


magnifyingGlass.addEventListener('click' , () => {
    body.style.right = 0;
})

let input = document.querySelector("#mobileSearch");
let button = document.querySelector("#mobileButton");
button.addEventListener('click' , () => {
    let searchData = input.value.toLowerCase();
    console.log(searchData);
    if (searchData == "") {
        return;
    }
    body.style.right = "-100%";
    fetchData(searchData);
    console.log("Clicked");
})
