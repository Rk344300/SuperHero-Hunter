

const MD5 = CryptoJS.MD5("1c03b18a19935b22ccc01d47515e673e8cfd67a6e161e9ba5d08aef3062e80cd740493f4b").toString();
console.log(MD5);

//api
let API_URL = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=161e9ba5d08aef3062e80cd740493f4b&hash=e3084ccb3331b5724ae4d7616d3079ad"

let hero = [];
let favHeros = [];
let id_hero = 0;
let id_fav = 0;

var detailsContainer = document.getElementById('detail_container');

let searchBtn = document.getElementById('search');
let list = document.getElementById('list');

//when we write in search input tag

searchBtn.onkeyup = async function () {
    var searchVal = searchBtn.value;
    // console.log(searchVal);

    //if the value in search is not empty , we fetch all the data related to value  what we write in search tag
    if (searchVal !== "") {
        let res = await fetch(
            `${API_URL}&nameStartsWith=` + searchVal.trim()
        );
        let data = await res.json();
        //console.log(data);
        //displaying all the data in the form of list 
        function displayHero() {
            var hero_names = data.data.results;
            console.log(hero_names);
            list.innerText = " ";

            for (let i of hero_names) {
                var li = document.createElement('li');

                var ImgDiv = document.createElement("div");
                var img = document.createElement("img");
                img.style.height = "45px";
                img.style.width = "40px";
                img.setAttribute("src", i.thumbnail.path + '.' + i.thumbnail.extension);
                ImgDiv.appendChild(img);


                li.appendChild(ImgDiv);

                var text = document.createTextNode(i.name);
                li.appendChild(text);

                li.id = i.id;


                //  creating the fav button inside the li
                let Fbtn = document.createElement('i');
                Fbtn.classList = "fas fa-heart";

                //after clicking the fbtn ,the event listerner will run  and the superhero is added in the favhero list
                Fbtn.addEventListener('click', function (e) {

                    //console.log("enter fbtn");
                    Fbtn.style.color = 'black';
                    e.stopPropagation();

                    fpush((i.id + ''));
                    console.log((i.id + ''));
                });

                li.appendChild(Fbtn);

                //when we click the list ,we get the details of the particular superhero

                li.addEventListener('click', function () {

                    id_hero = this.id;

                    detailsContainer.style.display = "flex";

                    console.log("this is id" + id_hero);
                    displayDetails(id_hero);
                    list.innerText = " ";

                });

                list.appendChild(li);
            }
        }
        displayHero();
    }

    //this function is used to display the details of particular hero
    async function displayDetails(id_hero) {

        let res = await fetch(
            `https://gateway.marvel.com:443/v1/public/characters/${id_hero}?ts=1&apikey=161e9ba5d08aef3062e80cd740493f4b&hash=e3084ccb3331b5724ae4d7616d3079ad`
        )
        let data = await res.json();
        // console.log(data.data.results[0]);


        var img = document.getElementById('img');
        img.setAttribute("src", data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension);

        var heroDetails = document.getElementById('heroDetails');
        heroDetails.setAttribute("style", "background-color:rgba(0,0,0,0.8);")


        var name = document.getElementById('name');
        name.innerHTML = data.data.results[0].name;

        var bio = document.getElementById('bio');
        bio.innerHTML = data.data.results[0].description;

        var comics = document.getElementById('comics');
        comics.innerHTML = "Comics : " + data.data.results[0].comics.available;

        var events = document.getElementById('events');
        events.innerHTML = "Events : " + data.data.results[0].events.available;

        var series = document.getElementById('series');
        series.innerHTML = "Series : " + data.data.results[0].series.available;

        var stories = document.getElementById('stories');
        stories.innerHTML = "Stories : " + data.data.results[0].stories.available;

        var fbtn = document.getElementById('fbtn');
        fbtn.setAttribute("style", "display:flex;");
        fbtn.setAttribute("value", data.data.results[0].id)

    }

}
// this function help to add the favHero id to the favHero list
function fpush(fid) {
    console.log(fid);
    if (favHeros.includes(fid)) {
        alert("Already Added");
        return;
    }
    favHeros.push(fid);
    console.log(favHeros);
    localStorage.setItem('favHeros', JSON.stringify(favHeros));
}


