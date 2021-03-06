
let apidataListUrl = 'http://localhost:3000/api/teddies';
fetch(apidataListUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        renderList(data);
        renderBasketBadge();
    });

//Créations des éléments de la page index.html
function renderList(data) {
    let item = null;
    for (let i=0; i < data.length; i++){
     
//création de liens
        item = document.createElement('a');
//création de bloc
        item.classList.add('card');
//création colonnes de tailles 4 (1/3)
        item.classList.add('col-md-4');
//suppression décoration de liens
        item.classList.add('text-decoration-none');
//lien chemin page détails
        item.href='../Frontend/public/html/details.html' + '?id=' + data[i]._id; 
//ajout nom photo descr
        item.innerHTML += '<div class="card-body">' + '<h2 class="card-title">' + data[i].name + '</h2>' + '<img src="' + data[i].imageUrl + '" alt="Ours en peluche ' + data[i].name + '" class="card-img-top">' + '<p class="card-text">' + data[i].description + '</p>' + '</div>';
        item.style.color = "#fff";
        item.style.backgroundColor  = "#4F9FB7";
//envoie des éléments dans Id 
        document.getElementById("list_teddy").appendChild(item);
    }
}