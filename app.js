const { json } = require('body-parser');
const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res){
 res.sendFile("C:/weatherProject/index.html")
   
})
app.post("/",function(req,res){

const query = req.body.CityName;
const apiKey="3173739b7e1e3f1595b24e39b2e03a4e"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" +apiKey+ "&units=" + unit;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on('data',function(data){
  const weatherData=  JSON.parse(data)
 const temp=weatherData.main.temp;
 const description=weatherData.weather[0].description
 const icon=weatherData.weather[0].icon;
 const imageUrl="http://openweathermap.org/img/wn/" + icon +"@2x.png";
res.write("The Weather is currently"+ description)
 res.write(" The Temperature in"+query+" is "+temp +" degrees Celcius.")
 res.write("<img src="+imageUrl+">");
 res.send()
})


    })
})






app.listen(3000,function(){
    console.log('Server is running');
})