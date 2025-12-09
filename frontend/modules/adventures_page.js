
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //console.log(search);
  const cityStr = search.split("=");
  //console.log(cityStr[1]);
  const city = cityStr[1];
  //console.log(city);
  return city

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let cityURL = config.backendEndpoint + `/adventures?city=${city}`;
  try{
    let url = await fetch(cityURL);
    if(!url.ok){
      throw new Error(`Response Status: ${url.status}`);
    }

    const jsonCity = await url.json();
    //console.log(jsonCity);
    return jsonCity;

  }catch(error){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //console.log(adventures[0].category);
  const cityCard = document.getElementById("data");
  cityCard.innerHTML="";
  if(adventures){
    adventures.forEach((key) => {
      //console.log(key.category);
      const card = document.createElement("div");
      card.setAttribute("class", `col-6 col-lg-3 mt-3 position-relative`);
      card.innerHTML=
      `
      <a href="detail/?adventure=${key.id}" id="${key.id}">
      <div class="category-banner">${key.category}</div>
        <div class="activity-card">
          <img src=${key.image} alt="image"/>
          <div class="w-100 mt-2 px-3">
            <div class="d-flex justify-content-between">
              <h5>${key.name}</h5>
              <h5>₹${key.costPerHead}</h5>
            </div>
          <div class="d-flex justify-content-between">
            <h5>Duration</h5>
            <h5>${key.duration} Hours</h5>
          </div>
        </div>
      </div>
      </a>`;
      cityCard.append(card);
    });
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log(list, low, high);
  let filteredlist = list.filter(function(adv){
    if(high >= adv.duration && low <= adv.duration){
      return true;
    }else{
      return false;
    }
  });

  console.log(filteredlist);
  return filteredlist

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.



function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredlist = list.filter(function(adv){
    if(categoryList.includes(adv.category)){
      return true;
    }else{
      return false;
    }
  });

  return filteredlist

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list = [], filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // Place holder for functionality to work in the Stubs
  const {duration = "", category = []} = filters;

  const filterDuration = String(duration);
  const filterDurationArray = filterDuration.split("-");
  const low = filterDurationArray[0];
  const high = filterDurationArray[1];

  

  if(duration && category.length){
    
    const durationFilterAdventure = filterByDuration(list, low, high);
    const categoryDurationFilter = filterByCategory(durationFilterAdventure, category);

    //console.log(categoryDurationFilter);

    return categoryDurationFilter;
    

  }else if(category.length){

    const categoryFilter = filterByCategory(list, category);
    return categoryFilter;

  }else if(duration){

    const durationFilter = filterByDuration(list, low, high);
    return durationFilter;

  }else{
    return list;
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  //console.log(JSON.parse(window.localStorage.getItem("filters")));
  return JSON.parse(window.localStorage.getItem("filters"));
  
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const catogoryFilter = filters["category"];
  catogoryFilter.forEach(key => {
    let newElement = document.createElement("div");
    newElement.className = "category-filter";
    newElement.innerHTML = `<div> ${key} </div>`
    //console.log(key);
    document.getElementById("category-list").appendChild(newElement);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
