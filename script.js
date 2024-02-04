/**FETCH Internet Protocol(IP) address from the user
 *step 1: on loading the document we need to fetch the respon using the API call
 * step 2:after the response extract data using response.json() which return a promise
 * step 3:using that promise data console.log(data) once check typeof(data)
 * step 4:get the ip address :)
 *
 */

//  document.addEventListener("DOMContentLoaded", (event) => {
//    fetch("https://api.ipify.org?format=json")
// 	 .then((response) => response.json())
// 	 .then((data) => {
// 	   console.log("the data is:", data);
// 	   // Displaying IP address on screen
// 	   ipAddress.textContent = data.ip;
// 	   console.log("the ipAddress is:", ipAddress.textContent);
// 	 })
// 	 .catch((e) => {
// 	   console.log("The Error is:", e);
// 	 });
//  });
const ipaddress = document.getElementById("Address"); // consistent naming

document.addEventListener("DOMContentLoaded", (event) => {
  ipAddress(); // calling the function
});

async function ipAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log("the data is ", data);
    console.log("the ipAddress is:", data.ip);
    // Build the UI
    buildUi(data.ip); // consistent naming
  } catch (error) {
    console.error("the error fetching the ip Address:", error);
  }
}

const getStartedButton = document.getElementById("getIpValue");

function buildUi(ip_Address) {
  ipaddress.innerText = ip_Address; // consistent naming
  // add the HTML part
  getStartedButton.addEventListener("click", () => {
    const ip = ipaddress.textContent; // consistent naming
    window.location.href = `main.html?ip=${ip}`;
  });
}
