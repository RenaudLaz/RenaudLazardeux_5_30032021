let totalPrice = 0;
let allBasketItems = getBasketItems();

for (let i = 0 ; i < allBasketItems.length; i++)
{
    allBasketItems[i].idx = i;
    const oneBasketItem = allBasketItems[i];
    renderDetailArticle(i);
    fetchProduct(oneBasketItem.id)

        .then(data => 
            {
                renderArticle(oneBasketItem, data);
                totalPrice += (data.price * oneBasketItem.qty) ;
                console.log(totalPrice);
                if (oneBasketItem.idx + 1 >= allBasketItems.length){
                renderTotalPrice(totalPrice);
                }
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
    total = formatPrice(totalPrice);
    finalPrice = document.createElement('span');
    finalPrice.innerHTML += total;
    console.log(finalPrice);
    
    document.getElementById('prix__total').appendChild(finalPrice);
}

function initPageEvents()
    {
        document.getElementById('commande__validation').addEventListener('submit', async function(event) {
        // disable button to prevent multiple clicks by error
        event.target.disabled = true;
        event.stopPropagation();
        event.preventDefault();
        console.log("we test async/await syntax, here we are before the call to submit order")
        const order = await submitOrder();
        console.log("we test async/await syntax, here we are after the call to submit order")
        console.log(order.orderId);
    })
}

initPageEvents();

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
        products: ['5beaabe91c9d440000a57d96']
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
        console.log(order.contact.firstName)


        document.getElementById('clientName').innerHTML = order.contact.firstName;
        document.getElementById('total').innerHTML = (totalPrice /100) + ',00€';
        document.getElementById('identifiant').innerHTML = order.orderId;

        document.getElementsByClassName("paiementInfo").style.display = "none";

    } else {
        console.log('ERROR')
        document.getElementById('btn-primary').disabled = false;
       
    }
    console.log('submitorder ends')
 
    return order;

}

