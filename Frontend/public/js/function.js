function formatPrice(price)
{
    return (price / 100 ).toString() + ',00' + '€';
}

function getBasketItems() 
{
    let basketItemsData = JSON.parse(localStorage.getItem('basketItems'));
    if (!basketItemsData) basketItemsData=[];
    return basketItemsData    
}


function addtoBasket(id_num, color) 
{
    let item = {
        id:id_num,
        qty:1,
        color:color
    }

    let basketItemsData = getBasketItems();
    basketItemsData.push(item);
    localStorage.setItem('basketItems', JSON.stringify(basketItemsData))
}

function renderBasketBadge ()
{

    let totalOurs;
    if (getBasketItems.lenght == 0) {
        return 0;
    } else {
        return getBasketItems.Lenght;
    }

}

//  Appeler à toutes les pages
//  Appeler getBasketItems et afficher dans le badge (getBasketItems.lenght)