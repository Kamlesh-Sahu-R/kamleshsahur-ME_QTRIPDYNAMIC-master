//import { response } from "express";
import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  //console.log('From init()');
  //console.log(config);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let citiesURL = config.backendEndpoint + '/' + 'cities';
  //console.log(citiesURL);

  try{
    const url = await fetch(citiesURL);
    
    if(!url.ok){
      throw new Error(`Response status: ${url.status}`);
    }

    const jsonCities = await url.json();
    console.log(jsonCities);
    return jsonCities;

  }catch(error){
    //console.error(error.message);
    return null;
  }

}

//Implementation of DOM manipulation to add cities


function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCard = document.getElementById("data");

  const colDiv = document.createElement("div");
  colDiv.setAttribute("class", `col-12 col-sm-6 col-lg-3 mb-4`)
  const linkElement = document.createElement("a");

  linkElement.setAttribute("href", `pages/adventures/?city=${id}`);
  linkElement.setAttribute("id", id);

  const divElement = document.createElement("div");
  divElement.setAttribute("class", `tile`);

  const imgElement = document.createElement("img");
  imgElement.setAttribute("src", image);

  const cityDisc = document.createElement("div");
  cityDisc.setAttribute("class", `tile-text text-center`);
  const cityName = document.createElement("h5");
  cityName.innerText = city;
  const disc = document.createElement("p");
  disc.innerText = description;
  cityDisc.append(cityName);
  cityDisc.append(disc);

  divElement.append(imgElement);
  divElement.append(cityDisc);
  linkElement.append(divElement);
  colDiv.append(linkElement);
  cityCard.append(colDiv);
}
/*function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

}*/

export { init, fetchCities, addCityToDOM };
