const apiWeather = "5bafa3f4228be24a8b367a321c069646";
const temps = document.getElementById("temps");
let apiCall = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let isEventListenerAdded = false;

async function checkWeather(ville){
    try {
        const reponse = await fetch(apiCall+ville+"&appid="+apiWeather );
        const data = await reponse.json();
        if(isEventListenerAdded){
            if(reponse.status === 400 ){
                document.querySelector("#corps").style.display = "none";
            }
            else if(reponse.status === 404){
                document.querySelector(".error").style.display = "block";
            }else{
                document.querySelector("#corps").style.display = "block";
                document.querySelector(".error").style.display = "none";
                document.getElementById("ville").innerHTML = `${data.name}`;
                document.getElementById("pays").innerHTML = `${data?.sys?.country}`;
                document.getElementById("temperature").innerHTML = `${data?.main?.temp} ° C`;
                document.getElementById("vitesse").innerHTML = `${data?.wind?.speed} Km/h`;
                document.getElementById("humidite").innerHTML = `${data?.main?.humidity} %`;
                console.log(data)
                if(data.weather[0].main === "Clouds"){
                    temps.src = "images/clouds.png";
                }else if(data.weather[0].main === "Clear"){
                    temps.src = "images/clear.png";
                }else if(data.weather[0].main === "Dizzle"){
                    temps.src = "images/dizzle.png";
                }else if(data.weather[0].main === "Rain"){
                    temps.src = "images/rain.png";
                }else if(data.weather[0].main === "Mist"){
                    temps.src = "images/mist.png";
                }
            }      
        }
    } catch (error) {
        console.error("Une erreur est arrivé", error);  
    }
}


let recherche = document.getElementById("navRecherche")
let btnRecherche = document.getElementById("btnRecherche")
btnRecherche.addEventListener("click", () =>{
    isEventListenerAdded = true;
    checkWeather(recherche.value)
})