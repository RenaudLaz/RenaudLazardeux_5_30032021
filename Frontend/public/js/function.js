//formatage du prix
function formatPrice(price)
{
    return Math.round(price/100).toFixed(2) + '€';
}

//Création du localStorage
function getBasketItems() 
{
    let allBasketItems = JSON.parse(localStorage.getItem('allBasketItems'));
    if (!allBasketItems) allBasketItems=[];
    return allBasketItems    
}

//Récupère ids des oursons dans le panier
function getBasketItemIds() 
{   
    let basketItems = getBasketItems();
    let basketItemIds = [];
    for (let i = 0 ; i < basketItems.length; i++){
        basketItemIds.push(basketItems[i].id) 
    }
    return basketItemIds
}

//Création des infos des items du localStorage
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

//Sauvegarde le panier dans le localStorage
function storeBasketItems(allBasketItems) {
    localStorage.setItem('allBasketItems', JSON.stringify(allBasketItems))
}

//Permet le passage du localStorage au données de l'ourson par l'id
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
    let totalTemp=0;
    for (let i = 0 ; i < allBasketItems.length; i++) {
        totalTemp += allBasketItems[i].qty;
        console.log(totalTemp)
    }
    document.getElementById('badge').innerHTML = totalTemp;
}

//init global de toutes les pages
renderBasketBadge();