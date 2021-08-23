let apiProductListUrl = 'http://localhost:3000/api/teddies';
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
        }   
    )

    function recupTitre(data)
    {
        let i=0
        console.log(data[i].name);

        titre = document.createElement('h1');
        titre.innerHTML +=  data[i].name;

        document.getElementById('detail_teddy').appendChild(titre);
    }

    function recupPhoto(data)
    {
        let i=0
        console.log(data[i].imageUrl);

        image = document.createElement('img');
        image.src +=  data[i].imageUrl;

        document.getElementById('detail_teddy').appendChild(image);
    }

    function recupDescription(data)
    {
        let i=0
        console.log(data[i].description);

        description = document.createElement('p');
        description.innerHTML +=  data[i].description;

        document.getElementById('detail_teddy').appendChild(description);
    }

    function recupCouleur(data)
    {
        let i=0
        console.log(data[i].colors);

        couleur = document.createElement('li');
        couleur.innerHTML += data[i].colors;

        document.getElementById('detail_teddy').appendChild(couleur);
    }

    function recupPrix(data)
    {
        let i=0
        console.log(data[i].price);

        prix = document.createElement('div');
        prix.innerHTML +=  '<p class="price">' + (data[i].price / 100) + '€' + '</p>';

        document.getElementById('detail_teddy').appendChild(prix);
    }

