import {getTheme, changeTheme, saveInLocal} from "../js/localStorageManagement.js";

createRequest();

//get the chosen theme from local storage
window.onload = getTheme();

//change theme e salve on local storage
document.querySelector(".theme-btn").addEventListener('click', changeTheme)

function createRequest(){
    fetch("https://restcountries.com/v2/all")
    .then(response => {
        return response.json()
    })
    .then(data => {
        init(data)
    })
    .catch(error => {
        throw new Error(error.message)
    });
}

function init(data){
    let finalItems = data;
    renderMultElements(finalItems, renderDivs);

    //to filter using the select element
    document.getElementById("filter-country").addEventListener('change', filtering);
    function filtering(e){
        let result = [];
        document.querySelector('.main-cont').innerHTML = '';
        if(e.target.value !== ''){
            for(let i = 0; i < finalItems.length; i++){
                if(e.target.value === finalItems[i].continent){
                    result.push(finalItems[i]);
                }
            }
            renderMultElements(result, renderDivs);
        }

        if(e.target.value === ''){
            renderMultElements(finalItems, renderDivs);
            return
        }
    }


    //to filter using the search bar
    document.querySelector('#search-bar').addEventListener("input", (e)=>{
        if(e.target.value.length > 1){
            let obj = finalItems.filter((country) => {
                return (country.name.toLowerCase().includes(e.target.value) || country.nativeName.toLowerCase().includes(e.target.value))
            });
            if(obj){
                document.querySelector(".main-cont").innerHTML = '';
                renderMultElements(obj, renderDivs);
                //before the content be loaded on the details page, all the data about it is saved on local storage
                saveInLocal(obj);
            }
        }else if(e.target.value.length == 0){
            document.querySelector(".main-cont").innerHTML = '';
            renderMultElements(finalItems, renderDivs);
        }
    })
}

function renderDivs(obj){
    let sub = 'Unknown';
    let countryDiv = document.createElement("div");
    countryDiv.classList = "country";
    let flagDiv = document.createElement("div");
    flagDiv.classList = "flag-cont";
    countryDiv.appendChild(flagDiv);
    let flaglink = document.createElement('a');
    flaglink.setAttribute('href', "details.html");
    flaglink.classList = "img-cont";
    flaglink.innerHTML = `<img class="flag" src="${obj.flags[0] || obj.flags.svg || obj.flags.png}" alt="${obj.name} Flag Image">`
    flagDiv.appendChild(flaglink);
    let nameSpan = document.createElement("span");
    nameSpan.classList = "country-name";
    nameSpan.innerHTML = `${obj.name}`;
    countryDiv.appendChild(nameSpan);
    let descDiv = document.createElement('div');
    descDiv.classList = "desc-cont";
    descDiv.innerHTML = 
    `
        <span class="capital"><strong>Capital:</strong> ${obj.capital || sub}</span>    
        <span class="region"><strong>Region:</strong> ${obj.region || sub}</span>
        <p><strong>Population :</strong> ${obj.population.toLocaleString() || sub}</p>
    `
    countryDiv.appendChild(descDiv);
    document.querySelector(".main-cont").appendChild(countryDiv);
};

//all countries will be an array of objects, so we call the for each every time we need to render them
function renderMultElements(arr, cb){
    arr.forEach(element => {
        cb(element)
    })
    updateLinks(document.querySelectorAll('.img-cont'), arr);
}

//to update the a tag, every time that dom is updated
function updateLinks(list, arr){
    let objs = [];
    objs = list;
    objs.forEach(el =>{
        el.addEventListener('click', (e)=>{
            let obj = arr.find(obj => obj.flags.svg === e.target.src);
            saveInLocal(obj);
        })
    })
}