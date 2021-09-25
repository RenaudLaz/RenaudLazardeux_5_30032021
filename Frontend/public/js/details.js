let urlParams = new URLSearchParams(window.location.search);
let id_num = urlParams.get('id');
let apiProductListUrl = 'http://localhost:3000/api/teddies/' + id_num.toString();

fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);
            renderProduct(data);
            renderBasketBadge();
        }   
    )

//Récupération des éléments de la page details.html
function renderProduct(data)
{
//Récup Nom Ourson
    console.log(data.name);
    titre = document.createElement('h1');
    titre.innerHTML +=  data.name;
    titre.style.color = "#4F9FB7";
    document.getElementById('titre').appendChild(titre);

//Récup Image
    console.log(data.imageUrl);
    image = document.createElement('img');
    image.classList.add('d-block');
    image.classList.add('w-100');
    image.alt = 'Ours en peluche Orinoco' + data.name;
    image.src += data.imageUrl;
    document.getElementById('image').appendChild(image);

//Récup description
    console.log(data.description);
    description = document.createElement('p');
    description.innerHTML += data.description;
    document.getElementById('description').appendChild(description);

//Récup prix    
    for (let i=0; i < data.colors.length; i++){

        console.log(data.colors[i]);
        couleur = document.createElement('option');
        couleur.innerHTML += data.colors[i];     
        document.getElementById('couleur').appendChild(couleur);
    };
    console.log(formatPrice(data.price));        
    document.getElementById('prix').innerHTML = formatPrice(data.price);
}

//ajout d'un produit et de ses infos dans le localStorage
document.getElementById('ajout__panier').addEventListener('click', function(event) 
{
    console.log('ajout panier');
    console.log(event.target);
    addToBasket(id_num, 'brown');
});

    
