

const plotter = new TrackScatterPlotter();
plotter.plot();




class TrackScatterPlotter{

constructor(url = null, layoutConfig = null, htmlElementId= null, currentTrack = null){
    this.url = url != null ? "https://someuser0111.github.io/data/secondJuli.json" : url;
    this.layoutConfig = layoutConfig != null ? {
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
      }: layoutConfig
    this.htmlElementId = htmlElementId != null ? 'tester' : htmlElementId
    
    this.currentTrack = currentTrack != null ?  "Lynghaug" : currentTrack;
    this.date = new Date();
}

plot = async ()=>{

document.addEventListener("DOMContentLoaded", async () => {
  const coords = await this.fetchDataAndTransformToCoordinates();
  const plotlyData = this.toPlotlyDataFormat(coords);
 
  const scatter = document.getElementById(htmlElementId);
  Plotly.newPlot(scatter, plotlyData, this.layoutConfig);
    });
}

fetchDataAndTransformToCoordinates = async (url = null) => {
    try{
        const response = url != null ? await fetch(this.url) : await fetch(url);
        const data = await response.json();  
        return getScoresPerPersonAsCoordinates(data, currentTrack, Object.keys(data));
    }
    catch (error) {
        console.error(`An error occured when fetching from ${this.url}. Message: ${error}`)
    }
  }

  getScoresPerPersonAsCoordinates = (data, currentTrack, names) => {
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
toPlotlyDataFormat = (personCoordinates)=>{
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
}