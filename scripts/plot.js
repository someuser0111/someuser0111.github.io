
const getQueryParams = ()=>{
  const path = window.location.href.split("?");
  if (path.length == 0) return null;
  const params = new URLSearchParams("?"+path[1]);
  for (const [key, value] of params) {
    if (key == "date"){
      return value;
    }
  }
  return null;
}






let date = getQueryParams();//getDateQueryParam();
if (date == null){
    const scatterContainer = document.getElementById("tester");
    const errorElement = document.createElement("div");
    const errorText = document.createTextNode("You haven't played that day.");
    errorElement.appendChild(errorText);
    document.body.appendChild(errorElement);
}
else{
const defaultDate = "02072023";
date = date == null ? defaultDate : date;

const url = `https://someuser0111.github.io/data/history/${date}.json`;
const currentTrack = "Lynghaug";
const layoutConfig ={
    margin: { t: 0 },
    xaxis:{
      name:"Track number",
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    },
    yaxis:{
      name: "Shots per track",
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    }
  };

const fetchDataAndTransformToCoordinates = async (url) => {
        const response = await fetch(url);
        if (!response.ok){
          throw new Error(`AN ERROR OCCURED FETCHING FROM ${url}.\nStatus code: ${response.status}. Reason: ${response.statusText}`)
        }
        const data = await response.json();  
        return getScoresPerPersonAsCoordinates(data, currentTrack, Object.keys(data));
    }
const getScoresPerPersonAsCoordinates = (data, currentTrack, names) => {
  return names.map((name) => {
    const scores = data[name][currentTrack]["scores"];
    return {
      "name": name,
      "coordinates": {
        "x": Object.keys(scores).map((el) => parseInt(el)),
        "y": Object.values(scores),
      }
    }
  });
}

// personCoordinates object format: Array<{name:string,coordinates:{x:arr<int>,y:arr<int>}}>
const toPlotlyDataFormat = (personCoordinates)=>{
    return personCoordinates.map(personCoords =>{
        return {
            x: personCoords["coordinates"]["x"],
            y: personCoords["coordinates"]["y"],
            mode: 'markers',
            name: personCoords["name"],
            type: 'scatter',
            marker: { size: 12 },
        }
    })
}

document.addEventListener("DOMContentLoaded", async () => {
  const scatter = document.getElementById("tester");
  try{
    const coords = await fetchDataAndTransformToCoordinates(url);
    const plotlyData = await toPlotlyDataFormat(coords);
    Plotly.newPlot(scatter, plotlyData, layoutConfig);
    
    }
  catch(error){
    const errorElement = document.createElement("div");
    const errorText = document.createTextNode("You haven't played that day.");
    errorElement.appendChild(errorText);
    scatter.appendChild(errorElement);
    }
  }
);
}