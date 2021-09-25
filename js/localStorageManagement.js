export function getTheme(){
    let theme;
    if(localStorage.getItem('theme') !== null){
        theme = JSON.parse(localStorage.getItem('theme'));
    }else{
        return
    }
    document.querySelector("html").classList = theme[0];
}


//change theme e save the new theme on local storage
export function changeTheme(){
    let cont = document.querySelector('html').className;
    if(cont === 'light-mode'){
        cont = "dark-mode";
        document.querySelector(".theme-btn").innerHTML = '<i class="fas fa-sun"></i>Light Mode';
    }else{
        cont = "light-mode";
        document.querySelector(".theme-btn").innerHTML = '<i class="far fa-moon"></i>Dark Mode';
    }
    document.querySelector('html').classList = cont;
    saveTheme(cont);

    function saveTheme(newTheme){
        let theme;
        if(localStorage.getItem("theme") === null){
            theme = [];
        }else{
            theme = JSON.parse(localStorage.getItem("theme"));
            theme.length = 0;
            }
        theme.push(newTheme);
        localStorage.setItem("theme", JSON.stringify(theme));    
    }
};

//replace the data on local storage adding the new request content
export function replaceLocal(obj){
    let arrObj;
    if(localStorage.getItem("country") === null){
        arrObj = [];
    }else{
        arrObj = JSON.parse(localStorage.getItem("country"));
    }
    if(arrObj.length != 0){
        arrObj.length = 0;
    }
    arrObj.push(obj);
    localStorage.setItem("country", JSON.stringify(arrObj));
    window.location.reload(true);
};

//all the content will be loaded from the api just for the main page, on details page, only one country will be displayed, so all the data of this country will be loaded from local storage
export function saveInLocal(obj){
    let arrObj;
    if(localStorage.getItem("country") === null){
        arrObj = [];
    }else{
        arrObj = JSON.parse(localStorage.getItem("country"));
    }
    if(arrObj.length != 0){
        arrObj.length = 0;
    }
    arrObj.push(obj);
    localStorage.setItem("country", JSON.stringify(arrObj));
};