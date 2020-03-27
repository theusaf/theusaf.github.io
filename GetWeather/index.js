function StardateThis(year,month,date,hour,minute) {

  var StardateOrigin = new Date("July 5, 2318 12:00:00");
  var StardateInput = new Date();

  StardateInput.setYear(year)
  StardateInput.setMonth(month)
  StardateInput.setDate(date)
  StardateInput.setHours(hour)
  StardateInput.setMinutes(minute)
  StardateInput.setSeconds(0)
  StardateInput.toGMTString(0)

  var findMilliseconds = StardateInput.getTime() - StardateOrigin.getTime();

  // 34367056.4 milliseconds = 1.0 Stardate

  var findStarYear = findMilliseconds / (34367056.4);

  findStarYear = Math.floor(findStarYear * 100);
  findStarYear = findStarYear / 100

  return Number(findStarYear.toFixed(1));
}

function CalendarizeThis(StardateIn) {

  var StardateOrigin = new Date("July 5, 2318 12:00:00");

  var DateOut = StardateIn * 34367056.4 ;

  var ResultMilliseconds = StardateOrigin.getTime() + DateOut;

  var ResultDate = new Date();

  ResultDate.setTime(ResultMilliseconds);

  return ResultDate;
}

function Deg2Rad(deg){
  return Number(deg) * (Math.PI / 180);
}

async function GetWeatherInformation(Location) {
  const URL = "http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=DEGREE&culture=en-US&weasearchstr=SEARCH";
  const Degree = (Math.random() > 0.5 && 'C') || 'F';
  try{
    Location = `${Location.coords.latitude},${Location.coords.longitude}`;
  }catch(err){
    Location = (typeof(Location) == "string" && Location) || "USA";
  }
  const WeatherInformation = await RequestWeather(URL.replace("DEGREE",Degree).replace("SEARCH",encodeURIComponent(Location)));
}

function GetLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(GetWeatherInformation,GetWeatherInformation);
  }
}

function RequestWeather(url){
  return new Promise(function(resolve, reject) {
    const Request = new XMLHttpRequest();
    Request.open("GET","https://cors-anywhere.herokuapp.com/" + url);
    Request.send();
    Request.addEventListener("load",()=>{
      resolve(ParseXML(Request.responseText));
    });
  });
}

function JSONIFY(XML_ARRAY){
  const ARRAY = [];
  for(XML of XML_ARRAY){
    ARRAY.push({
      low: XML.getAttribute("low"),
      high: XML.getAttribute("high"),
      text: XML.getAttribute("skytextday"),
      date: new Date(XML.getAttribute("date")),
      day: XML.getAttribute("day"),
      precipitation: XML.getAttribute("precip")
    });
  }
  return ARRAY;
}

function ParseXML(XML){
  const Parser = new DOMParser();
  Document = Parser.parseFromString(XML,"text/xml");
  const WD = Document.querySelector("weatherdata");
  const WR = WD.querySelector("weather");
  const FC = WR.querySelectorAll("forecast");
  const NW = WR.querySelector("current");
  return {
    forecast: JSONIFY(Array.from(FC)),
    now: {
      name: WR.getAttribute("weatherlocationname"),
      timezone: WR.getAttribute("timezone"),
      temperature: NW.getAttribute("temperature"),
      text: NW.getAttribute("skytext"),
      speed: NW.getAttribute("windspeed"),
      direction: NW.getAttribute("winddisplay").split("h ")[1],
      humidity: NW.getAttribute("humidity"),
      day: NW.getAttribute("day"),
      date: new Date(`${NW.getAttribute("date")}T${NW.getAttribute("observationtime")}${(Number(NW.getAttribute("timezone")) >= 0 && "+") || ""}${(String(Math.abs(Number(NW.getAttribute("timezone")))).length >= 2 && "") || "0"}${NW.getAttribute("timezone")}:00`)
    }
  };
}
