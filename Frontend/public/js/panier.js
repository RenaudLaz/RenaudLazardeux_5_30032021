let totalPrice = 0;
let allBasketItems = getBasketItems();
renderBasketBadge();

for (let i = 0 ; i < allBasketItems.length; i++)
    {
        allBasketItems[i].idx = i;
        const oneBasketItem = allBasketItems[i];
        renderDetailArticle(i);
        fetchProduct(allBasketItems[i].id)

            .then(data => 
                {
                    renderArticle(oneBasketItem, data);
                    totalPrice += data.price ;
                    console.log(totalPrice);
                    renderTotalPrice(totalPrice);
                }
            )    
            .catch(error => console.warn(error));

    }

        /*Création de la ligne par article*/
        function renderDetailArticle(i)
        {
            article = document.createElement('div');
            article.classList.add('row');
            article.classList.add('bloc__ourson');
            article.id = 'commande'+ i.toString();
            document.getElementById('article').appendChild(article);
        }
    

        /*Création de l'article*/
        function renderArticle(oneBasketItem, data)
        {
            image = document.createElement('div');
            image.classList.add('col');
            image.innerHTML += '<img class="img-thumbnail" alt="Ours en peluche' + data.name + '"src="'+data.imageUrl+'">';
        
            document.getElementById('commande'+ oneBasketItem.idx.toString()).appendChild(image);

            nomOurson = document.createElement('div');
            nomOurson.classList.add('col');
            nomOurson.innerHTML += '<h3 class="my-1">' + data.name + '</h3>Quantité : ' + oneBasketItem.qty;

            document.getElementById('commande'+ oneBasketItem.idx.toString()).appendChild(nomOurson);

            prix = document.createElement('div');
            prix.classList.add('col');
            prix.innerHTML += '<div class="col font-weight-bold">'+formatPrice(data.price)+'</div>';
            prix.style.color = "#4F9FB7";

            document.getElementById('commande'+ oneBasketItem.idx.toString()).appendChild(prix);    
        
        }

        function renderTotalPrice(totalPrice)
        {
            total = formatPrice2(totalPrice);
            finalPrice = document.createElement('span');
            finalPrice.innerHTML += total;

//            finalPrice.style.color = "red";
            console.log(finalPrice);
            
            document.getElementById('prix__total').appendChild(finalPrice);
        }

        