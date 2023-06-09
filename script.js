/* elementi DOM */
let input = document.getElementById("input_search");
let containerCards = document.getElementById("container_cards");
let cart = document.getElementById("cart");
let logoButton = document.getElementById("logo_button");
let notFound = document.getElementById("not_found");

/* URL */
let Url = "https://striveschool-api.herokuapp.com/books";

/* variabile valore input */
let inputValue = "";
let lowInputValue = "";

/* ritorna alla home */
logoButton.addEventListener("click",()=> {
    containerCards.innerHTML="";
    homeCard();
});

/* avvio funzione al caricamneto pagina */
document.onload = homeCard();


/* funzione card home */
function homeCard() {
    notFound.classList.add("d-none");
    fetch (Url)
    .then((response)=> response.json())
    .then((object)=>{
        for (let i = 0; i < object.length; i++) {
            let bookTitle = object[i].title;
            let bookImg = object[i].img;
            let bookPrice = object[i].price;
            let newDiv= document.createElement("div");
            newDiv.classList.add("col-12", "col-sm-6", "col-md-4","col-lg-3", "col-xl-2","d-flex", "justify-content-center")
            newDiv.innerHTML=`
            <div class="card my-2" style="width: 18rem;">
                <img src="${bookImg}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${bookTitle}</h5>
                    <div class=" d-flex justify-content-between">
                        <button onclick="addToCart('${bookTitle}','${bookPrice}')" id="button_card" type="button" class="btn btn-dark">€ ${bookPrice}</button>
                        <button onclick="remove('${newDiv}')" id="button_card" type="button" class="btn btn-danger">X</button>
                    </div>
                </div>
            </div>`;
            containerCards.appendChild(newDiv);
        }
    })
    .catch((err)=> console.log(err))
}

/* funzione avvio ricerca */
function search() {
    if (input.value.length>2){
        inputValue = input.value;
        lowInputValue = inputValue.toLowerCase()
        input.value = "";
        searchCard();
    } else {
        alert("inserisci almeno tre lettere");
        input.value = "";
    }
}

/* ricerca card */
function searchCard() {
    containerCards.innerHTML="";
    fetch (Url)
    .then((response)=> response.json())
    .then((object)=>{
        notFound.classList.remove("d-none");
        for (let i = 0; i < object.length; i++) {
            let bookTitle = object[i].title;
            let bookImg = object[i].img;
            let bookPrice = object[i].price;
            let lowBookTitle = bookTitle.toLowerCase();
            if (lowBookTitle.includes(lowInputValue)) {
                notFound.classList.add("d-none");
                let newDiv= document.createElement("div");
                newDiv.classList.add("col-12", "col-sm-6", "col-md-4","col-lg-3", "col-xl-2","d-flex", "justify-content-center")
                newDiv.innerHTML=`
                <div class="card my-2" style="width: 18rem;">
                    <img src="${bookImg}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${bookTitle}</h5>
                        <p class="card-text">€ ${bookPrice}</p>
                        <button onclick="addToCart('${bookTitle}','${bookPrice}')" id="button_card" type="button" class="btn btn-dark">Add to cart</button>
                    </div>
                </div>`;
                containerCards.appendChild(newDiv);
                
            }
        }
    })
    .catch((err)=> console.log(err))
}

/* aggiunta elementi carrello */
function addToCart(title,price){
    let newLi = document.createElement("li");
    newLi.classList.add("m-1")
    let titleLi = document.createElement("h6");
    titleLi.innerText= `${title}`;
    let priceLi = document.createElement("p");
    priceLi.innerText=`€${price}`;
    let cancel = document.createElement("button");
    cancel.classList.add("btn", "btn-danger");
    cancel.innerText="X";

    newLi.appendChild(titleLi);
    newLi.appendChild(priceLi);
    newLi.appendChild(cancel);

    cart.appendChild(newLi);
}


