/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=d063b3c3d18e20a287e542d3299b9df0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',addInfo)

function addInfo(event){
    event.preventDefault();
    const zipCode = document.querySelector('#zip').value
    const feelings = document.getElementById('feelings').value
    weatherData(baseURL , zipCode , apiKey)
    .then(function(allData){
        postInfo('/add',{date:newDate,temp:allData.main.temp,feelings})
    }).then(function(newData){
        updateUI()
    })
}

async function weatherData(baseURL, zipCode, apiKey){
    const fullUrl = await fetch(baseURL + zipCode + apiKey);
    console.log(baseURL+zipCode+apiKey)
    try{
        const allData = fullUrl.json();
        return allData
    }catch(error){
        console.log("error",error)
    }
}

async function postInfo(url='', givenData={}){
    const info = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            date: givenData.date,
            temp: givenData.temp,
            content: givenData.feelings
        })
    })
    try{
        const newData = info.json()
        return newData
    }catch(error){
        console.log("error",error)
    }
}

async function updateUI(){
    const newInfo = await fetch('/all')
    try{
        const allData = await newInfo.json()
        document.querySelector('#date').innerHTML = 'Date: <br>'+allData.date
        document.querySelector('#temp').innerHTML = 'Tempreature: <br>'+allData.temp
        document.querySelector('#content').innerHTML = "How you feel: <br>"+allData.content
    }catch(error){
        console.log('error',error);
    }
}