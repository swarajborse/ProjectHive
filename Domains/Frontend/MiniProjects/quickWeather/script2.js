const City=document.querySelector('.city');
const Temp=document.querySelector('.temp');
const Humidity=document.querySelector('.humidity');
const Wind=document.querySelector(".wind");
const Searchbox=document.querySelector('.search input')
const Searchbtn=document.querySelector('.search button')
const imagechange=document.querySelector('.weatherimg')


const apikey="a50203f62c5ba6a8f4b1dd5d3622cf41";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


async function checkWeather(city){
    const response=await fetch(apiUrl +city+`&appid=${apikey}`);
    var data=await response.json();//it will contain all the data of the city
    console.log(data);
  City.innerHTML=data["name"];
   Temp.innerHTML=Math.round(data.main["temp"]) + "°C";
    Humidity.innerHTML=data.main["humidity"] +"%";
    Wind.innerHTML=data.wind["speed"] +"Km/h";
        const Weather=data.weather[0].main;
        console.log(Weather);
        switch (Weather) {
            case "Clear":
                imagechange.src="images/clear.png"
                break;
                case "Clouds":
                    imagechange.src="images/clouds.png"
                    break;
                case "Drizzle":
                    imagechange.src="images/drizzle.png"
                    break;
                case "Humidity":
                    imagechange.src="images/humidity.png"
                    break;
                case "Mist":
                    imagechange.src="images/mist.png"
                    break;
                case "Rain":
                    imagechange.src="images/rain.png"
                    break;
                case "Snow":
                    imagechange.src="images/snow.png"
                    break;
                case "Wind":
                    imagechange.src="images/wind.png"
                    break;

        
            default:
                break;
        }

}
Searchbtn.addEventListener('click',()=>{
    checkWeather(Searchbox.value);
})


