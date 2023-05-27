/* elementi DOM */
let input = document.getElementById("input_search");
let containerCards = document.getElementById("container_cards");
let buttonCard = document.getElementById("button_card");
let cart = document.getElementById("cart");
let logoButton = document.getElementById("logo_button");

/* ritorna alla home */
logoButton.addEventListener("click",()=> {
    containerCards.innerHTML="";
    homeCard()
});

/* variabile valore input */
let lowInputValue = "";

/* funzione avvio ricerca */
function search() {
    if (input.value.length>2){
        let inputValue = "";
        inputValue = input.value;
        lowInputValue = inputValue.toLowerCase()
        input.value = "";
        searchCard();
    } else {
        alert("inserisci almeno tre lettere");
        input.value = "";
    }
}

/* funzione card home */
function homeCard() {
    fetch ("https://striveschool-api.herokuapp.com/books")
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
                    <p class="card-text">€ ${bookPrice}</p>
                    <button onclick="addCart()" type="button" class="btn btn-dark">Add to cart</button>
                </div>
            </div>`;
            containerCards.appendChild(newDiv);
        }
    })
    .catch((err)=> console.log(err))
}

/* ricerca card */
function searchCard() {
    containerCards.innerHTML="";
    fetch ("https://striveschool-api.herokuapp.com/books")
    .then((response)=> response.json())
    .then((object)=>{
        for (let i = 0; i < object.length; i++) {
            let bookTitle = object[i].title;
            let bookImg = object[i].img;
            let bookPrice = object[i].price;
            let lowBookTitle = bookTitle.toLowerCase();
            if (lowBookTitle.includes(lowInputValue)) {
                let newDiv= document.createElement("div");
                newDiv.classList.add("col-12", "col-sm-6", "col-md-4","col-lg-3", "col-xl-2","d-flex", "justify-content-center")
                newDiv.innerHTML=`
                <div class="card my-2" style="width: 18rem;">
                    <img src="${bookImg}" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${bookTitle}</h5>
                        <p class="card-text">€ ${bookPrice}</p>
                        <button onclick="addCart()" type="button" class="btn btn-dark">Add to cart</button>
                    </div>
                </div>`;
                containerCards.appendChild(newDiv);
            } else {
            }
        }
    })
    .catch((err)=> console.log(err))
}
/* avvio funzione al caricamneto pagina */
document.onload= homeCard();

function addCart(){
    console.log("aggiunto")
}