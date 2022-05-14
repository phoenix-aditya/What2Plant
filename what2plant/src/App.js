import {useState,useEffect} from 'react'
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import { weatherApiKey } from './credentials.js';
import axios from 'axios'
import './App.css';

import temp from './assets/temp.svg'
import hum from './assets/humidity.png'
import phmeter from './assets/ph-meter.png'
import rainfallsymbol from './assets/rainfallsymbol.svg'

function App() {

  const [latitude, setLatitude] = useState('30.35');
  const [longitude,setLongitude] = useState('76.37');
  const [weatherData, setWeatherData] = useState();

  const [nitrogen,setNitrogen] = useState(0);
  const [phosphorus,setPhosphorus] = useState(5);
  const [potassium,setPotassium] = useState(5);

  const [currentTemperature, setCurrentTemperature] = useState(25);

  const [temperature,setTemperature] = useState(25); 
  // 5 to 50 
  const [humidity,setHumidity] = useState(0);
  // 0 to 100
  const [pH,setPH] = useState(7);
  // 3 10
  const [rainfall,setRainfall] = useState(20);
  // 10 300

  const [predictedCrop, setPredictedCrop] = useState('')
  const [predictedCropImage, setPredictedCropImage] = useState('https://chefsmandala.com/wp-content/uploads/2018/04/Cooked-Rice-Dish-400x400.jpg')

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [])

  useEffect(() => {
    const getNewImage =  (predCrop) => {
      if (predCrop === "rice") setPredictedCropImage('https://chefsmandala.com/wp-content/uploads/2018/04/Cooked-Rice-Dish-400x400.jpg/');
      else if(predCrop === "maize") setPredictedCropImage('https://is1.ecplaza.com/m_9v-5PZg66GFCLMxPy35PCF79A=/fit-in/400x400/filters:fill(white,1)/is2.ecplaza.com/ecplaza2/products/c/cb/cbf/1135319779/4592856.jpg/');
      else if(predCrop === "chickpea") setPredictedCropImage('https://cdn.tridge.com/image/original/0d/a3/89/0da389af988f9a193f852db9c26a6e10d2b20bbc.jpg')
      else if(predCrop === "kidneybeans") setPredictedCropImage('https://cpimg.tistatic.com/07379662/b/4/Kidney-Bean.jpg');
      else if(predCrop === "pigeonpeas") setPredictedCropImage('https://i.ebayimg.com/images/g/Sa4AAOSwmDhhJTDg/s-l400.jpg');
      else if(predCrop === "mothbeans") setPredictedCropImage('https://sc04.alicdn.com/kf/U67dfc18ca4364bb28abde81e7544d58fE.jpg');
      else if(predCrop === "mungbean") setPredictedCropImage('https://3.imimg.com/data3/UR/LR/MY-9099080/green-moong-beans-500x500.jpg');
      else if(predCrop === "blackgram") setPredictedCropImage('https://cpimg.tistatic.com/04749954/b/4/Urad-whole-black-gram-.jpg');
      else if(predCrop === "lentil") setPredictedCropImage('https://img1.exportersindia.com/product_images/bc-full/2020/5/7328732/best-quality-green-lentils-red-lentils-brown-1590829023-5458623.jpeg');
      else if(predCrop === "pomegranate") setPredictedCropImage('https://i0.wp.com/briskbasket.com/wp-content/uploads/2020/06/pomegranate.jpg?fit=400%2C400&ssl=1');
      else if(predCrop === "banana") setPredictedCropImage('https://www.colinstuart.net/wp-content/webpc-passthru.php?src=https://www.colinstuart.net/wp-content/uploads/2017/10/bananas.jpg&nocache=1');
      else if(predCrop === "mango") setPredictedCropImage('https://felixinstruments.com/static/media/uploads/newsletter/.thumbnails/mango.jpg/mango-400x400.jpg');
      else if(predCrop === "grapes") setPredictedCropImage('http://sc04.alicdn.com/kf/U5af9ed03a39843799028fd880920f008o.jpg');
      else if(predCrop === "watermelon") setPredictedCropImage('https://5.imimg.com/data5/WF/AH/MY-14521890/fresh-watermelon-500x500.jpg');
      else if(predCrop === "muskmelon") setPredictedCropImage('https://ashokavanam.com/uploads/product/photo/17/muskmelon-yellow_400x400.jpg');
      else if(predCrop === "apple") setPredictedCropImage('https://everfreshfruit.com/wp-content/uploads/2018/05/Fuji-Apple_1000-400x400.jpg');
      else if(predCrop === "orange") setPredictedCropImage('http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c16c.png');
      else if(predCrop === "papaya") setPredictedCropImage('https://muvs.org/media/filer_public/ab/d4/abd4acfa-2d7c-4af9-8801-feabb7b12f4b/papaya_00_ma_verhuetung.jpg');
      else if(predCrop === "coconut") setPredictedCropImage('https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=400,h=400/app/images/products/sliding_image/4943a.jpg');
      else if(predCrop === "cotton") setPredictedCropImage('https://www.gooseberrypink.com/wp-content/uploads/2019/10/why-should-i-buy-organic-cotton-5-400x400.jpg');
      else if(predCrop === "jute") setPredictedCropImage('https://www.agroexporters.net/uploaded-files/thumb-cache/member_127/thumb-400-400-jute_5001.jpg');
      else setPredictedCropImage('https://hips.hearstapps.com/del.h-cdn.co/assets/cm/15/10/54f63d2d884ab_-_coffee-xl.jpg');
    } 
    getNewImage(predictedCrop);
    return () => {
      getNewImage(predictedCrop);
    }
  }, [predictedCrop])
  

  const getDataFromApi = async () => {
    const {data} = await axios.post('https://what2plant.herokuapp.com/suggest_crop/',{
      "N":nitrogen,
      "P":phosphorus,
      "K":potassium,
      "temp":temperature,
      "humidity":humidity,
      "ph":pH,
      "rainfall":rainfall
    });
    setPredictedCrop(data.data.suggested_crop);
  }

  useEffect(()=>{
    const getWeatherData = async () => {
      var weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}&aqi=yes`;
      const {data} = await axios.get(weatherApiUrl).catch((err)=>{
        console.log(err);
      })
      setWeatherData(data);
      setTemperature(data.current.temp_c);
      setCurrentTemperature(data.current.temp_c);
      console.log(weatherData);
    }
    getWeatherData();
  },[latitude,longitude])

  return (
    <div className="App">

    <div className="formContainer">
      <div className="formHeading">
        What2Plant
      </div>
      <div className="inputsContainer">
        <div className="inputHeadingContainer">
          <div className='inputHeading'>Nitrogen</div>
          <div className='inputHeading'>Phosphorus</div>
          <div className='inputHeading'>Potassium</div>
        </div>
        <div className="inputFormContainer">
          <div className='sliderForm'>          
            <input 
              type="range" 
              min="0" 
              max="140" 
              value={nitrogen} 
              onChange = {(e) => {
                setNitrogen(e.target.value)
              }}
              class="slider" 
              id="myRange"
            />
            {nitrogen}
          </div>
          <div className='sliderForm'>   
            <input 
              type="range" 
              min="5" 
              max="145" 
              value={phosphorus} 
              onChange = {(e) => {
                setPhosphorus(e.target.value)
              }}
              class="slider" 
              id="myRange"
            />
            {phosphorus}
          </div>
          <div className='sliderForm'>   
            <input 
              type="range" 
              min="5" 
              max="205" 
              value={potassium} 
              onChange = {(e) => {
                setPotassium(e.target.value)
              }}
              class="slider" 
              id="myRange"
            />
            {potassium}
          </div>
        </div>
      </div>
      <div className="verticalFormContainer">
        <div className="verticalFormItem">
          {/* svg */}
          <div className="verticalFormItemSvg">
            <img src={temp} alt="" />
          </div>
          {/* inputbox */}
          <span>Temperature (&#8451;)</span>
          <input 
            type="number"
            value={temperature}
            onChange={(e) => {
              if(e.target.value >=0 && e.target.value <= 50){
                setTemperature(e.target.value)
              }else{
                setTemperature(currentTemperature)
              }
            }}
          />
        </div>
        <div className="verticalFormItem">
          {/* svg */}
          {/* inputbox */}
          <div className="verticalFormItemSvg">
            <img src={hum} alt="" />
          </div>
          {/* inputbox */}
          <span>Humidity (%)</span>
          <input 
            type="number"
            value={humidity}
            onChange={(e) => {
              if(e.target.value >=0 && e.target.value <= 100){
                setHumidity(e.target.value)
              }else{
                setHumidity(0)
              }
            }}
          />
        </div>
        <div className="verticalFormItem">
          <div className="verticalFormItemSvg">
            <img src={phmeter} alt="" />
          </div>
          {/* inputbox */}
          <span>pH</span>
          <input 
            type="number"
            value={pH}
            onChange={(e) => {
              if(e.target.value >=0 && e.target.value <= 10){
                setPH(e.target.value)
              }else{
                setPH(7)
              }
            }}
          />
        </div>
        <div className="verticalFormItem">
          <div className="verticalFormItemSvg">
            <img src={rainfallsymbol} alt="" />
          </div>
          {/* inputbox */}
          <span>Rainfall (mm)</span>
          <input 
            type="number"
            value={rainfall}
            onChange={(e) => {
              if(e.target.value >=0 && e.target.value <= 300){
                setRainfall(e.target.value)
              }else{
                setRainfall(10);
              }
            }}
          />
        </div>
      </div>
      <div 
        className='predictButton' 
        onClick={async () => {
          setIsLoading(true);
          await getDataFromApi();
          setIsLoading(false);
        }
      }
      >Predict Crop</div>

      {(isLoading === true)?(
        <div className="predictedDataContainer">
          <div class="loader"></div>
        </div>
      ):('')}
      {
        (predictedCrop!=='' && isLoading === false)?(
          <>
            <div className="predictedDataContainer">
              <div className="predictedData">
                <div className="predictedDataImage">
                    <img 
                      src={predictedCropImage}
                      alt="" />
                </div>
                <div className="predictedDataName">
                  You should plant <b>{predictedCrop}.</b>
                </div>
              </div>
            </div>
            </>
        ):('')
      }
    </div>
    </div>
  );
}

export default App;
