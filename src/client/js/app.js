const timeStamp = (Date.now())/1000

/* Geonames variables */
const geoURL = 'http://api.geonames.org/searchJSON?q=';
const username = 'Addy01';
/*Weatherbit variables */
const weather_url = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const api_key = '75c546c9349f49cea5e9223a0627a59e'
/*Pixalbay variables */
const pixalbay_url = 'https://pixabay.com/api/?key=';
const pixal_api = '17225786-17049b550a4e03d9af4f903d7';

// Create a new date instance dynamically with JS
const result = document.getElementById('result')
const submit = document.getElementById('submit')

submit.addEventListener('click',callFunctions)
console.log('its working')

function callFunctions(event){
    event.preventDefault();
    const place = document.getElementById('destination').value
    const userdate = document.getElementById('date').value
    const time = (new Date(userdate).getTime())/1000;
    geoLocation(geoURL,username,place).then((geoData)=>{
            let lat = geoData.geonames[0].lat;
            console.log(lat)
            let long = geoData.geonames[0].lng;
            console.log(long)
            const weatherInfo = weatherForecast(lat,long)
            return(weatherInfo)
        })
        .then((weatherInfo)=>{
            console.log(weatherInfo)
            const min_temp = weatherInfo.data[0].min_temp;
            const max_temp = weatherInfo.data[0].max_temp;
            const description = weatherInfo.data[0].weather.description;
            const daysLeft = Math.round((time-timeStamp)/(60*60*24));
            const userdata = postInfo('http://localhost:3000/add',{place,userdate,min_temp,max_temp,description,daysLeft})
            return userdata
        })
        .then((userdata)=>{
            updateUI(userdata)
        })
}

const geoLocation = async(geoUrl,username,place)=>{
    console.log(place)
    const fullUrl = geoUrl+place+"&maxRows=10&" + "username=" + username;
    console.log(fullUrl)

    const rest = await fetch(fullUrl)
    try{
        const data = await rest.json()
        return data
    } catch(error){
        console.log('error:',error)
    }
}

const weatherForecast = async(lat,long)=>{
    console.log(lat,long)
    let depart = document.getElementById('date').value
    console.log(depart)
    let tempTime = new Date(depart);
    let departTime = (tempTime.getTime())/1000;
    let days = Math.round((departTime-timeStamp)/(60*60*24));
    console.log(days)
    tempTime.setFullYear(tempTime.getFullYear()-1)
    let new_Date = tempTime.toISOString().substring(0, 10);
    console.log(new_Date)

    let weatherbitUrl = 'lajlkajk'
    if(days<16){
        weatherbitUrl = weather_url+'lat='+lat+'&lon='+long+'&days='+days+'&key='+api_key
    }
    else{
        weatherbitUrl = `${weather_url}lat=${lat}&lon=${long}&key=${api_key}&start_date=${new_Date}&end_date=${new_Date}`
    }
    console.log(weatherbitUrl)

    const rest = await fetch(weatherbitUrl)
    try{
        const body = await rest.json()
        return body    
    }catch(error){
        console.log(error)
    }
    
}


const postInfo = async(url='', givenData={})=>{
    const info = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            city:givenData.place,
            min_temp:givenData.min_temp,
            max_temp:givenData.max_temp,
            days:givenData.daysLeft,
            date:givenData.userdate,
            description:givenData.description
        })
    })
    try{
        const newData = info.json()
        return newData
    }catch(error){
        console.log("error",error)
    }
}

async function updateUI(userdata){
    /*const newInfo = await fetch('/all')
    console.log(newInfo)*/
    const res = await fetch(pixalbay_url + pixal_api + "&q=" + userdata.city + "+&image_type=photo");
    try{
        const allData = await res.json()
        console.log(allData)
        document.getElementById("photo").innerHTML = '<img src='+allData.hits[0].webformatURL+'alt="destination>'
        console.log(document.getElementById("photo"))
        document.getElementById("place").innerHTML = '<u>'+userdata.city+'</u>'
        document.getElementById("temp").innerHTML = 'The tempreature ranges between '+userdata.min_temp+' to '+userdata.max_temp+'.';
        document.getElementById("days").innerHTML = 'There is '+userdata.days+' days left for the Trip.'
        document.getElementById("detail").innerHTML = 'Day will be '+userdata.description+'.'
        document.getElementById("button").innerHTML = '<button type="submit">remove trip</button>'

        document.getElementById('result').scrollIntoView({behavior:"smooth"})

        let remove = document.getElementById("button")
        remove.addEventListener('click',function(){
            window.location.reload();
        });
    }catch(error){
        console.log('error',error);
    }
}

export{updateUI,callFunctions,postInfo,weatherForecast,geoLocation}
