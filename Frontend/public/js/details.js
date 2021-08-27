let urlParams 
let id_num;
urlParams = new URLSearchParams(window.location.search);
id_num = urlParams.get('id');
let apiProductListUrl = 'http://localhost:3000/api/teddies/' + id_num.toString();

fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);
            recupTitre(data);
            recupPhoto(data);
            recupDescription(data);
            recupCouleur(data);
            recupPrix(data);
            renderBasketBadge()
        }   
    )


    function recupTitre(data)
    {
        console.log(data.name);
        titre = document.createElement('h1');
        titre.innerHTML +=  data.name;
        titre.style.color = "#4F9FB7";

        document.getElementById('titre').appendChild(titre);
    }


    function recupPhoto(data)
    {
        console.log(data.imageUrl);
        image = document.createElement('img');
        image.classList.add('d-block');
        image.classList.add('w-100');
        image.alt = 'Ours en peluche Orinoco' + data.name;
        image.src +=  data.imageUrl;

        document.getElementById('image').appendChild(image);
    }


    function recupDescription(data)
    {
        console.log(data.description);
        description = document.createElement('p');
        description.innerHTML +=   data.description;

        document.getElementById('description').appendChild(description);
    }


    function recupCouleur(data)
    {

        for (let i=0; i < data.colors.length; i++){

        console.log(data.colors[i]);
        couleur = document.createElement('option');
        couleur.innerHTML += data.colors[i];
        
        document.getElementById('couleur').appendChild(couleur);
        }
    }

    
    function recupPrix(data)
    {
        console.log(formatPrice(data.price));
        prix.innerHTML += '<strong>' + formatPrice(data.price) + '</strong>';
        prix.style.color = "#4F9FB7";
        
        document.getElementById('prix').appendChild(prix);
    }



/*
//programmation d'evenement
    document.addEventListener('click', function (event) {
        console.log('click');
// If the clicked element doesn't have the right selector, bail
        if (!event.target.matches('#ajout__panier')) return;
    
// Don't follow the link
        event.preventDefault();
    
// Log the clicked element in the console
        console.log(event.target);
    
    }, false);
*/



//"idem ligne 79-91"
    document.getElementById('ajout__panier').addEventListener('click', function(event) {
        console.log('click2');
        console.log(event.target);
        addtoBasket(id_num, 'brown');
     });