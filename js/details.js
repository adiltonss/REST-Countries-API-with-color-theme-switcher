import {getTheme, changeTheme, replaceLocal} from "../js/localStorageManagement.js";
//change theme color and salve preferences
document.querySelector(".theme-btn").addEventListener('click', changeTheme);

//turn the user back to index page
document.querySelector('.back').addEventListener('click', () =>{
    return location.replace("index.html")
})

//there's only one country, and his data will be loaded from the local storage
window.onload = function(){
    let arrObj;
    if(localStorage.getItem("country") === null){
        return
    }else{
        arrObj = JSON.parse(localStorage.getItem("country"));
    }
    createContent(arrObj);
    //will load the theme color preference
    getTheme();

    //will make all the border countries buttons visible
    document.querySelectorAll(".border-btn").forEach(button =>{
        button.addEventListener("click", createR)
    })
}

//will create a new request after the border country button be clicked, and save his data on local storage and reload the page to show the data
function createR(e){
    fetch(`https://restcountries.com/v2/alpha/${e.target.textContent}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            replaceLocal(data);
        })
        .catch(error => {
            throw new Error(error.message)
        });
}

function createContent(obj){
    document.querySelector(".flag-cont").innerHTML = '';
    document.querySelector(".sub-details-1").innerHTML = '';
    document.querySelector(".sub-details-2").innerHTML = '';
    document.querySelector(".border-countries").innerHTML = '';

    document.querySelector(".flag-cont").innerHTML = `<img class="flag" src="${obj[0].flags[0]}" alt="${obj[0].name} Flag Image">`;

    document.querySelector(".sub-details-1").innerHTML =
    `
        <h2 class="contry-name-h2"> ${obj[0].name}</h2>
        <p><strong>Native Name:</strong> ${obj[0].nativeName}</p>
        <p><strong>Population:</strong> ${obj[0].population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${obj[0].region}</p>
        <p><strong>Capital:</strong> ${obj[0].capital}</p>
        <p><strong>Continent:</strong> ${obj[0].continent}</p>
    `;

    document.querySelector(".sub-details-2").innerHTML = `
        <p><strong>Currency:</strong> ${obj[0].currencies[0].name} (${obj[0].currencies[0].symbol})</p>
        <p><strong>Languages:</strong> ${obj[0].languages[0].name}</p>                
        <p><strong>Calling Code:</strong> ${obj[0].callingCodes[0]}</p>                
        <p><strong>Numeric Code:</strong> ${obj[0].numericCode}</p>                
        <p><strong>Top Level Domain: </strong> ${obj[0].topLevelDomain[0]}</p>
    `;

    let buttonsCont = document.querySelector(".border-countries")
    if(obj[0].borders){
        obj[0].borders.forEach(element => {
            const button = document.createElement('button');
            button.classList = "border-btn";
            button.innerHTML = element;
            buttonsCont.appendChild(button)
        });
    }else{
        return
    }

}