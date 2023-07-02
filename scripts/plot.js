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

const currentTrack = "Lynghaug";
const date = new Date();
const ToCoordinates = async () => {
  const response = await fetch("https://someuser0111.github.io/data/secondJuli.json");
  const data = await response.json();  
  return getScoresPerPersonAsCoordinates(data, currentTrack, Object.keys(data));
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
  const coords = await ToCoordinates();
  
const plotlyData = toPlotlyDataFormat(coords);
 const layoutConfig = {
    title: currentTrack,
    margin: { t: 0 },
    xaxis:{
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    },
    yaxis:{
        tickmode: "linear",
        // start of xaxis
        tick0 : 0,
        // axis step
        dtick: 1
    }
  }
  const scatter = document.getElementById('tester');
  Plotly.newPlot(scatter, plotlyData, layoutConfig);
});









//     var trace1 = {
//     x: [1, 2, 3, 4, 5],
//     y: [1, 6, 3, 6, 1],
//     mode: 'markers',
//     type: 'scatter',
//     name: 'Team A',
     
//   };
  
//   var trace2 = {
//     x: [1.5, 2.5, 3.5, 4.5, 5.5],
//     y: [4, 1, 7, 1, 4],
//     mode: 'markers',
//     type: 'scatter',
//     name: 'Team B',
//     text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
//     marker: { size: 12 }
//   };
  
//   var data = [ trace1, trace2 ];
  
//   var layout = {
//     xaxis: {
//       range: [ 0.75, 5.25 ]
//     },
//     yaxis: {
//       range: [0, 8]
//     },
//     title:'Data Labels Hover'
//   };
  
//   Plotly.newPlot('myDiv', data, layout);
  