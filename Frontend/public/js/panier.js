let apiProductListUrl = 'http://localhost:3000/api/teddies';
fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);
            renderBasketBadge();
     
        }   
    )

    function panierResume(data, qty, color)
    {
        console.log(data);

        resume = document.createElement('div');
        resume.innerHTML += '<h2>'+data.name+'</h2>';
        resume.innerHTML += '<spam>'+color+'</spam>';

        document.getElementById('resume').appendChild(resume);
    }

    //récuper getbascketitems le panier ou récupérer tout les ours (API)
    //calculer prix
    let data = null;
    let basketItemsData = getBasketItems();
    console.log(basketItemsData);
    for (var i = 0 ; i < basketItems.length; i++) 
    {
        data = fetchProduct(basketItems[i].id);
        panierResume(data, basketItemsData[i].qty, basketItemsData[i].color);
    }