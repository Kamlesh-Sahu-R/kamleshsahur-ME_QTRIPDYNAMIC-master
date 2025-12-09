import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // const adventureStr = search.split("=");
  // const adventureId = adventureStr[1];
  // console.log(adventureId);
  // return adventureId;
  const queryStr = search;
  const urlParams = new URLSearchParams(queryStr);
  //console.log(urlParams);
  const adv_id = urlParams.get('adventure');
  //console.log(adv_id);
  return adv_id;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let adventureIdURL = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
  //console.log(adventureIdURL);
  try{
    let url = await fetch(adventureIdURL);
    //console.log(url);
    if(!url.ok){
      throw new Error(`Response Status: ${url.status}`);
    }
    const jsonAdventureIdURL = await url.json();
    //console.log( jsonAdventureIdURL);
    return jsonAdventureIdURL;

  }catch(error){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);

  if (adventure) {
    document.querySelector('#adventure-name').innerHTML=adventure.name;
    document.querySelector('#adventure-subtitle').innerHTML=adventure.subtitle;
    document.querySelector('#adventure-content').innerHTML=adventure.content;

    adventure.images.forEach((key) => {
      let new_img = document.createElement('img');
      new_img.src = key;
      new_img.className = 'activity-card-image';
      document.querySelector('#photo-gallery').append(new_img);
    })
  };
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //let photoGallery = document.getElementById(photo-gallery);
  let carouselIndicators = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">`;

  let photoGallerySlider = "";
  images.forEach((key,index) => {
    
    let status='';
    if(index==0){
      status='active';
    }                          
    photoGallerySlider += `<div class="carousel-item ${status}"> 
                              <img src=${key} class="d-block w-100 activity-card-image" alt="..."> 
                            </div>`;                        
    })

  let button = `</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>`;
              
  document.querySelector('#photo-gallery').innerHTML = carouselIndicators + photoGallerySlider + button;

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure.available === true);
  if(adventure.available === true){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  let cost_PerHead = adventure.costPerHead;
  let total_Cost = cost_PerHead * persons;
  document.getElementById("reservation-cost").innerHTML = total_Cost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const {id} = adventure;
  const form = document.getElementById("myForm");

  const nameElement = form.elements["name"];
  const personElement = form.elements["person"];
  const dateElement = form.elements["date"];

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = nameElement.value;
    const person = personElement.value;
    const date = dateElement.value;

    const payload = {
      name,
      person,
      date,
      adventure: id
    };
    const url = config.backendEndpoint + "/reservations/new";
    const response = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });

    const status = response.status;

    if(status >= 200 && status <= 299){
      alert ("Succcess");
    }else{
      alert ("Failed!");
    }

    //const data = await response.json();
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const {reserved} = adventure;
  const banner = document.getElementById("reserved-banner");

  if(reserved){
    banner.style.display = "block";
  }else{
    banner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
