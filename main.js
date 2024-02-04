//on loading the window get the ip address from the qparams
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ipValue = urlParams.get("ip"); //ip
  displayUi(ipValue);
  fetchLocation(ipValue);
});

async function fetchLocation(ipValue) {
  try {
    const response = await fetch(`https://ipapi.co/${ipValue}/json`);
    //someTime it is throwing the error ;)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Check if the response has valid data
    if (Object.keys(data).length === 0) {
      console.log("No location information available for this IP address.");
      return;
    }
    console.log("fetch the Location data:", data);
    getFullDetails(data);
  } catch (error) {
    console.log("fetch location part error:", error);
  }
}

const sec1 = document.querySelector(".Top");
function displayUi(ipValue) {
  console.log(ipValue);
  //sec1.innerHTML += `<p><span class="label">IP Address:</span> <span class="value">${ipValue}</span></p>`;
  const pTag = document.createElement("p");
  pTag.innerHTML += `<span class="label">IP Address:</span> <span class="value">${ipValue}</span>`;
  sec1.appendChild(pTag);
}


function getFullDetails(data) {
  console.log("here is the full details :", data);

  // Create the outer div
  const divTag = document.createElement("div");
  divTag.className = "outer-div";

  // Creating three inner divs
  for (let i = 0; i < 3; i++) {
    const innerDiv = document.createElement("div");
    // Customize or add content to each inner div as needed
    innerDiv.innerHTML = `<p>Inner Div ${i + 1}</p>`;
    divTag.appendChild(innerDiv);
  }

  // Add content to the first inner div
  const div1 = divTag.querySelector("div:nth-child(1)");
  div1.innerHTML = `<p>latitude: <span>${data.latitude}</span></p>
                      <p>longitude: <span>${data.longitude}</span></p>`;

  const div2 = divTag.querySelector("div:nth-child(2)");
  div2.innerHTML = `<p>City: <span>${data.city}</span></p>
                      <p>Region: <span>${data.region}</span></p>`;

  const div3 = divTag.querySelector("div:nth-child(3)");
  div3.innerHTML = `<p>Organisation: <span>${data.org}</span></p>
    <p>State code: <span>${data.country_area}</span></p>`;
  // Assuming sec1 is defined somewhere in your code
  const sec1 = document.querySelector(".Top");
  sec1.appendChild(divTag);


  //for section middle we need to display the map
  // let call other function
  displayMap(data);
}

function  displayMap(data){
    const sectionTag2=document.querySelector('.middle');
    sectionTag2.innerHTML=`<iframe
    src="https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&output=embed"
    width="660"
    height="270"
    frameborder="0"
    style="border:0;display:flex; justify-content:center align-items:center"
  ></iframe>`

  displayTime(data);
}

function  displayTime(data){
    let date = new Date().toLocaleString("en-US", { timeZone: data.timezone });
    console.log(date); //date and time
    const div2=document.querySelector('.Time-zone');
    
    div2.innerHTML=`<p>Time Zone: <span>${data.timezone}</span></p>
    <p>Date And Time: <span>${date}</span></p>
    <p>Pincode: <span>${data.postal}</span></p>
    `;

    //pincode 
     fetchPinCode(data.postal);
}

async function fetchPinCode(pincode){
    try{
        console.log("fetch the pincode:",pincode);
        //const pincode=data.postal;
        const response=await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const data=await response.json();
        console.log("the pincodes are :",data);

        const div2=document.querySelector('.Time-zone');
        const pTag=document.createElement('p');
        pTag.innerText=data[0].Message;
        div2.appendChild(pTag);

        displayPinCode(data[0].PostOffice)
    }catch(e){
        console.log("the error in fetch the pincodes are:",e);
    }

}

function displayPinCode(array){
    array.forEach((eleObj) =>{
        console.log()
    })
}