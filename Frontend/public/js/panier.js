let total = 0;
let basketItems = getBasketItems();
renderBasketBadge();

for (let i = 0 ; i < basketItems.length; i++)
    {
        basketItems[i].idx = i;
        const basketItem = basketItems[i];
        prepareArticleHTML(i);
        fetchProduct(basketItems[i].id)

            .then(data => 
                {
                    renderArticle(basketItem, data);
                    total += data.price ;
                    console.log(total);
                    totalBasketPrice(total);
                }
            )    
            .catch(error => console.warn(error));

    }

        /*Création de la ligne par article*/
        function prepareArticleHTML(i)
        {
            article = document.createElement('div');
            article.classList.add('row');
            article.classList.add('bloc__ourson');
            article.id = 'commande'+ i.toString();
            document.getElementById('article').appendChild(article);
        }
    

        /*Création de l'article*/
        function renderArticle(basketItem, data)
        {
            image = document.createElement('div');
            image.classList.add('col');
            image.innerHTML += '<img class="img-thumbnail" alt="Ours en peluche' + data.name + '"src="'+data.imageUrl+'">';
        
            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(image);

            nomOurson = document.createElement('div');
            nomOurson.classList.add('col');
            nomOurson.innerHTML += '<h3 class="my-1">' + data.name + '</h3>Quantité : ' + basketItem.qty;

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(nomOurson);

            prix = document.createElement('div');
            prix.classList.add('col');
            prix.innerHTML += '<div class="col font-weight-bold">'+formatPrice(data.price)+'</div>';
            prix.style.color = "#4F9FB7";

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(prix);    
        
        }

        function totalBasketPrice(total)
        {
            totalPrice = formatPrice(total);
            finalPrice = document.createElement('span');
            finalPrice.innerHTML += totalPrice;
            finalPrice.style.color = "red";

            console.log(finalPrice);
            
            document.getElementById('prix__total').appendChild(finalPrice);
        }

        