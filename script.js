document.addEventListener("DOMContentLoaded", () => {
  fetch("stations.json")
    .then(res => res.json())
    .then(data => {
      const dropdown1 = document.getElementById("fromstation");
      const dropdown2 = document.getElementById("tostation");

      dropdown1.innerHTML = '<option value="">Select from Station</option>';
      dropdown2.innerHTML = '<option value="">Select to Station</option>';

      data.stations.forEach(station => {
        const option1 = document.createElement("option");

        // show both name + code (better UI)
        option1.value = station.code;
        option1.textContent = `${station.name} (${station.code})`;
        const option2 = document.createElement("option");

        // show both name + code (better UI)
        option2.value = station.code;
        option2.textContent = `${station.name} (${station.code})`;

        dropdown1.appendChild(option1);
        dropdown2.appendChild(option2);
      });
    })
    .catch(err => console.error("Error:", err));
});
document.getElementById("search-btn").addEventListener("click", () => {
  const from = document.getElementById("fromstation").value;
  const to = document.getElementById("tostation").value;
  
  if (!from || !to) {
    alert("Please select both stations");
    return;
  }
  const selectedDate = document.getElementById("date").value;

 const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dayShort = shortDays[new Date(selectedDate).getDay()];

console.log(dayShort);

  localStorage.setItem("from", from);
  localStorage.setItem("to", to);
  localStorage.setItem("dayShort",dayShort)

window.location.href = "results.html";
  // Redirect with data in URL
  window.location.href = `results.html?from=${from}&to=${to}`;
});