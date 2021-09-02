/*de localStorage à teddies*/
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
                    total += (data.price /100);
                    console.log(total);
                }
            );
    }


        /*Création de la ligne par article*/
        function prepareArticleHTML(i)
        {
            article = document.createElement('div');
            article.classList.add('row');
            article.id = 'commande'+ i.toString();
            document.getElementById('article').appendChild(article);
        }
    

        /*Création de l'article*/
        function renderArticle(basketItem, data)
        {
            container = document.createElement('div');
            container.classList.add('row');
            container.innerHTML += ' <div class="list-group mb-3"></div>'

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(container);

            bloc = document.createElement('span');
            bloc.classList.add('row');
            bloc.innerHTML += ' <span class="list-group-item d-flex justify-content-between"></span>'

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(bloc);





            image = document.createElement('div');
            image.classList.add('col');
            image.innerHTML += '<img class="img-thumbnail" alt="Ours en peluche' + data.name + '"src="'+data.imageUrl+'">';
        
            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(image);

            nomOurson = document.createElement('div');
            nomOurson.classList.add('col');
            nomOurson.innerHTML += '<h4 class="my-1">'+data.name+'</h4><span class="text-muted">Quantité : '+ basketItem.qty  +'</span>';

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(nomOurson);

            prix = document.createElement('div');
            prix.classList.add('col');
            prix.innerHTML += '<div class="col mt-3 font-weight-bold">'+formatPrice(data.price)+'</div>';
            prix.style.color = "#4F9FB7";

            document.getElementById('commande'+ basketItem.idx.toString()).appendChild(prix);      
        }
