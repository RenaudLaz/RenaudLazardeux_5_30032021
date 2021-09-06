//prix divisé par 100
function formatPrice(price)
{
    return (price / 100 ).toString() + ',00' + '€';
}

//récupération liste ourson en JSON
function getBasketItems() 
{
    let basketItemsData = JSON.parse(localStorage.getItem('basketItems'));
    if (!basketItemsData) basketItemsData=[];
    return basketItemsData    
}


function addToBasket(id_num, color)
{
    let basketItems = getBasketItems();
    let found = false; /*trouver : faux*/
    for (let i = 0 ; i < basketItems.length; i++) {
        if (basketItems[i].id == id_num) { /*si id=id */
            found = true;
            basketItems[i].qty += 1;
            console.log('id ' + basketItems[i].id + ' quantity changed to ' + basketItems[i].qty);
            break;
        }
    }
    if (!found) { /*! not : valeur inverse d'un boolean*/
        let item =
        {
            id:id_num,
            qty:1,
            color: color,
        }        
        basketItems.push(item);  

    }
    storeBasketItems(basketItems);
} 
function storeBasketItems(basketItems) {
    localStorage.setItem('basketItems', JSON.stringify(basketItems))
}

function fetchProduct(id)
{
    console.log('start fetchProduct');
    let apiProductListUrl = 'http://localhost:3000/api/teddies/' + id.toString();
    console.log('let fetchProduct');
    return fetch(apiProductListUrl)
    .then(response => response.json())
    .then(data =>
        {
            return data
        }
    )
    .catch(error => console.warn(error));
}

function renderBasketBadge ()
{
    let i=0;
    let basketItemsData = getBasketItems();
    console.log(basketItemsData);
    console.log(basketItems[i].qty)
    document.getElementById('badge').innerHTML = basketItemsData.length * basketItems[i].qty;
//bon pour 1 seul ourson    document.getElementById('badge').innerHTML = basketItems[i].qty;

}

//réinitialiser ourson localStorage
// localStorage.setItem('basketItems', null);
function formatPrice2(price)
{
    let i=0;
    return (basketItems[i].qty * price)/100 + ',00€ ';
}