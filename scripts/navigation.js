const isFirefox = () => navigator.userAgent.toLowerCase().includes("firefox")

const notFirefox = () => navigator.userAgent.toLowerCase().includes("chrome") || navigator.userAgent.toLowerCase().includes("edg");

// const isChrome = () => navigator.userAgent.toLowerCase().includes("chrome")

// const isEdge = () => navigator.userAgent.toLowerCase().includes("edg")

let queryParams = {
    "track":null,
    "date":null
}

const addÅsane = ()=>{
    // console.log("før",queryParams)
    const åsane = document.querySelector("#åsane");
    åsane.parentElement.setAttribute("class","Åsane");
    document.querySelector("#lynghaug").removeAttribute("class");
    queryParams["track"] = "Åsane";
    // console.log("etter",queryParams)
  }
  const addLynghaug = ()=>{
    // console.log("før",queryParams)
    const lynghaug = document.querySelector("#lynghaug");
    lynghaug.parentElement.setAttribute("class","Lynghaug");
    document.querySelector("#åsane").removeAttribute("class");
    queryParams["track"] = "Lynghaug";
    // console.log("etter",queryParams)

}


/////////////////////////////////////////////
/////////////////////////////////////////////
//////////     DATE INPUT LISTENER  /////////
/////////////////////////////////////////////
/////////////////////////////////////////////

const datepickerId = "datepicker";
const dateInput = document.querySelector("#"+datepickerId);
dateInput.addEventListener("change",e=>{
    sentToDefaultDate = false;
    // chrome and edge returns input in the same format. Firefox has different format on return. Double check. Not sure if correct.
    if (isFirefox()){
        const yyyymmdd = e.target.value.split("-");
        const yyyy = yyyymmdd[0];
        const mm = yyyymmdd[1];
        const dd = yyyymmdd[2];
        dateInput.setAttribute("class",dd+mm+yyyy);
    }
    else{
        const yyyymmdd = e.target.value.split("-");
        const yyyy = yyyymmdd[0];
        const mm = yyyymmdd[1];
        const dd = yyyymmdd[2]
        dateInput.setAttribute("class",dd+mm+yyyy);
    }
  })

/////////////////////////////////////////////
/////////////////////////////////////////////
//////////    END DATE INPUT LISTENER  //////
/////////////////////////////////////////////
/////////////////////////////////////////////

/////////////////////////////////////////////
/////////////////////////////////////////////
//////////     GO TO LINK ///////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
document.querySelector("#goToLink").addEventListener("click",e=>{
    const params = makeQueryParams();
    if (params == null) {
        alert("Pick a date and track");
        return;
    }
    let plotUrl = getPlotUrlWithQueryParams(params);
    console.log(plotUrl);
    window.location.href = plotUrl;
});
/////////////////////////////////////////////
/////////////////////////////////////////////
//////////     END GO TO LINK ///////////////
/////////////////////////////////////////////
/////////////////////////////////////////////



const makeQueryParams = ()=>{
    const date = document.querySelector("#datepicker");
    let dateValue = date.getAttribute("class");
    if (dateValue == null) return 
    const track = document.querySelector("#trackselecter").getAttribute("class");
    if (date == null || track == null) {
        return null;
    }
    return {
        "date":dateValue,
        "track":track
    }
}


const check = ()=>{
    const date = document.querySelector("#datepicker");
    console.log(date);
    console.log(date.getAttribute("class"));

    const track = document.querySelector("#trackselecter");
    console.log(track);
    console.log(track.getAttribute("class"));
}

//queryParams object shaep: {date:ddmmyyyy,track:string}
const getPlotUrlWithQueryParams =(queryParams, originSite ="index.html")=>{
    let plotUrl = window.location.href.split(originSite)[0];
    plotUrl += "plot.html";
    let firstParam = true;
    for (const [key,value] of Object.entries(queryParams)){
        if (firstParam){
            plotUrl += `?${key}=${value}`;
        }
        else{
            plotUrl += `&?${key}=${value}`;
        }
    }
    return plotUrl;
  }