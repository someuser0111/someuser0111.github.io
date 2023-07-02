

export const 
fetchDataAndTransformToCoordinates = async (url) => {
    try{
        const response = await fetch(url);
        const data = await response.json();  
        return getScoresPerPersonAsCoordinates(data, currentTrack, Object.keys(data));
    }
    catch (error) {
        console.error(`An error occured when fetching from ${this.url}. Message: ${error}`)
    }
  }
  export const 
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
export const toPlotlyDataFormat = (personCoordinates)=>{
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