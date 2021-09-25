let totalPrice = 0;
let allBasketItems = getBasketItems();

for (let i = 0 ; i < allBasketItems.length; i++)
{
    allBasketItems[i].idx = i;
    const oneBasketItem = allBasketItems[i];
    fetchProduct(oneBasketItem.id)
        .then(data => 
            {
                renderArticle(oneBasketItem, data);
                totalPrice += (data.price * oneBasketItem.qty) ;
                console.log(totalPrice);
                renderTotalPrice(totalPrice);
            }
        )    
        .catch(error => console.warn(error));
}

//Création de l'article
function renderArticle(oneBasketItem, data)
{
    article = document.createElement('div');
    article.classList.add('row');
    article.classList.add('bloc__ourson');
    article.id = 'commande'+ oneBasketItem.idx.toString();
    document.getElementById('article').appendChild(article);

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

//Rendu visuel du total des prix 
function renderTotalPrice(totalPrice)
{
    total = formatPrice(totalPrice);   
    document.getElementById('prix__total').innerHTML = total;
}

//Validation de la commande
const url = 'http://localhost:3000/api/teddies/order';
async function submitOrder() {
    console.log('submitorder starts')
    const data = {
        contact: {
            firstName: document.getElementsByName('firstName')[0].value,
            lastName: document.getElementsByName('lastName')[0].value,
            address: document.getElementsByName('address')[0].value,
            codePostal: document.getElementsByName('codePostal')[0].value,
            city: document.getElementsByName('city')[0].value,
            email: document.getElementsByName('email')[0].value,
        },
        products: getBasketItemIds()
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    let order = null;
    if (response.status === 201) {
        order = await response.json()
        console.log("Commande passée avec succès")
        console.log("Order ID :" + order.orderId)
        console.log(order)

        //création des noms à récupérer pour le html
        document.getElementById('clientName').innerHTML = order.contact.firstName;
        document.getElementById('total').innerHTML = formatPrice(totalPrice);
        document.getElementById('identifiant').innerHTML = order.orderId;

        //Modification du formulaire en validation
        document.getElementsByClassName("paiementInfo")[0].style.display = "none";
        document.getElementsByClassName("orderConfirmation")[0].style.display = "block";
        localStorage.setItem('allBasketItems', null);
        
    } else {
        console.log('ERROR')
        document.getElementById('btn-primary').disabled = false;
    }
    console.log('submitorder ends')
    return order;
}

//Récupération du numéro de commande, à la validation du formulaire
function initPageEvents()
    {
        document.getElementById('commande__validation').addEventListener('submit', async function(event) {
//désactive le bouton pour éviter le multiclic
        event.target.disabled = true;
//empecher le comportement par défault de submit         
        event.preventDefault();
        console.log("Avant submitOrder")
        const order = await submitOrder();
        console.log("Après dubmitOrder")
        console.log(order.orderId);
    })
}
initPageEvents();


//Bouton pour vider le panier
document.getElementById('commande__annulation').addEventListener('click', function(event) 
{
    let resultat = confirm('Etes vous sûr(e) de vouloir supprimer ?  Cette action est irreversible. Cliquez sur OK pour supprimer cet article du panier, sinon, cliquez sur annuler.');
        if (resultat) {
            localStorage.setItem('allBasketItems', null);
            document.getElementById('article').innerHTML = '';
            renderTotalPrice(0);
            renderBasketBadge();
        } else {

        } 
    console.log(event.target);
});
