
let favLists = document.getElementById('favLists');


let list = [];

// getting hero id from localstorage to the list
list = JSON.parse(localStorage.getItem('favHeros'));

//console.log(list);


//if list is empty
if (list.length == 0) {
    console.log("listLength", list.length);

    favLists.innerText = "No Favourite Hero";
    favLists.style.color = "cyan";
    favLists.style.margin = "10% 40%";
    favLists.style.fontSize = "30px"

}
// fetch the heros that is present in the list
function fetchHeros(list) {

    for (var i of list) {
        displayHero(i);
    }
}


// display heroes
async function displayHero(id_hero) {

    let res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id_hero}?ts=1&apikey=161e9ba5d08aef3062e80cd740493f4b&hash=e3084ccb3331b5724ae4d7616d3079ad`
    )
    let data = await res.json();


    if (data) {
        heroList(data);
    }

}
async function heroList(data) {

    console.log(data.data.results[0].id)

    let listItem = document.createElement('div');
    listItem.id = data.data.results[0].id;
    listItem.innerHTML = "";
    listItem.innerHTML = `
    <div id="container">
    <div id = "innerContainer">
    <img src="${data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension}" id="favimg">
    </div>
     <h5>${data.data.results[0].name}</h5>
     <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${data.data.results[0].id}>Remove</button>

     </div>
   `;
    favLists.appendChild(listItem)


}
// to remove the item from the list
function remove(value) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === value) {
            list.splice(i, 1);
        }
    }

    localStorage.setItem('favHeros', JSON.stringify(list));
    let MovieEle = document.getElementById(`${value}`)
    MovieEle.remove();

}

fetchHeros(list);