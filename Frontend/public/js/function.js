//format du prix
function formatPrice(price)
{
    return (price / 100 ).toString() + ',00' + '€';
}

function formatPrice2(price)
{
    let i = 0;
    console.log(allBasketItems.length);

    return (allBasketItems[i].qty * price)/100 + ',00€ ';
}


//Initialisation du localStorage
function getBasketItems() 
{
    let allBasketItems = JSON.parse(localStorage.getItem('allBasketItems'));
    if (!allBasketItems) allBasketItems=[];
    return allBasketItems    
}

//Items du localStorage
function addToBasket(id_num, color)
{
    let allBasketItems = getBasketItems();
    let found = false; /*trouver : faux*/
    for (let i = 0 ; i < allBasketItems.length; i++) {
        if (allBasketItems[i].id == id_num) { /*si id=id */
            found = true;
            allBasketItems[i].qty += 1;
            console.log('id ' + allBasketItems[i].id + ' quantité passe à ' + allBasketItems[i].qty + ' Oursons dans le panier ');
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
        allBasketItems.push(item);  

    }
    storeBasketItems(allBasketItems);
    renderBasketBadge();
} 

function storeBasketItems(allBasketItems) {
    localStorage.setItem('allBasketItems', JSON.stringify(allBasketItems))
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

//Rendu du badge
function renderBasketBadge()
{
    let allBasketItems = getBasketItems();
    console.log(allBasketItems);

    for (let i = 0 ; i < allBasketItems.length; i++) {
        totalTemp = allBasketItems[i].qty;
        console.log(totalTemp)
    }
    document.getElementById('badge').innerHTML = totalTemp;
    
//bon pour 1 seul ourson    document.getElementById('badge').innerHTML = allBasketItems[i].qty;

}

//réinitialiser ourson localStorage
// localStorage.setItem('allBasketItems', null);

