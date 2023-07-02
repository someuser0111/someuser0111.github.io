//////////////////////////////////////////////////////////////////////
// ALL QUERY PARAM HANDLING FOR GOING TO THE PLOTS
//////////////////////////////////////////////////////////////////////
document.querySelector("#"+"linkToPlot").href = "plot.html?date=02072023";

function formatDateAsDdmmyyyy(date) {
    // thanks chatgtp
    
    // Create a Date object from the input date string
    const inputDate = new Date(date);
    // Extract day, month, and year from the Date object
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // January is 0, so we need to add 1
    const year = inputDate.getFullYear();
    // Format day and month to have leading zeros if necessary
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    // Concatenate day, month, and year in the desired order
    const formattedDate = `${formattedDay}${formattedMonth}${year}`;
    return formattedDate;
   }

let sentToDefaultDate = true;

var currentHrefToPlot = "";
// newKeyValuePair is of shape {key:string,value:string}
const updateQueryParamsForHref = (newKeyValuePair)=>{
    currentHrefToPlot = "";
    const addedFirstQueryParam = false;
    const queryParams = document.querySelector("#"+"linkToPlot").href.split("?");
    if (queryParams.length == 0) return null;
    const params = new URLSearchParams("?"+queryParams);
    for (const [key, value] of params) {
      if (!addedFirstQueryParam){
        if (newKeyValuePair.key == key){
            currentHrefToPlot += `?${key}=${value}`
        }
        else{
            currentHrefToPlot += `&?${key}=${value}`
        }
      }
    }
    alert(currentHrefToPlot);
  }
  
  // setting default href
  
  const trackSelecter = document.querySelector("#"+"trackSelecter");
  trackSelecter.addEventListener("change",e=>{
    sentToDefaultDate = false;
    updateQueryParamsForHref({"key":"track","value":e.target.value})
    document.querySelector("#"+"linkToPlot").href = currentHrefToPlot;
  });
  
  const datepickerId = "datepicker";
  const dateInput = document.querySelector("#"+datepickerId);
  dateInput.addEventListener("change",e=>{
    sentToDefaultDate = false;
    const date =formatDateAsDdmmyyyy(e.target.value);
    updateQueryParamsForHref({"key":"date","value":date})
    document.querySelector("#"+"linkToPlot").href = currentHrefToPlot;
  })
  
  
  
  document.querySelector("#"+"linkToPlot").addEventListener("click",e=>{
    console.log(currentHrefToPlot);
    if (sentToDefaultDate){alert("Du valgte ingen konkret dato og sendes til første spilte: 2 juli 2023");}
    else{
    //   const dateInputValue = document.querySelector("#"+datepickerId).value;
    //   const trackSelecterValue = document.querySelector("#"+"trackSelecter").value;
    //   document.querySelector("#"+"linkToPlot").href = `plot.html?date=${dateInputValue}&track=${trackSelecterValue}`;
    }
  });
  
  //////////////////////////////////////////////////////////////////////
  // END QUERY PARAM HANDLING FOR GOING TO THE PLOTS
  //////////////////////////////////////////////////////////////////////
  