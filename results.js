const from = localStorage.getItem("from");
const to = localStorage.getItem("to");
const dayName = localStorage.getItem("dayShort")
console.log(from, to);
console.log(dayName);
 function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("trains.json")
    .then(res => res.json())
    .then(data => {

      const filtered = data.trains.filter(train => {
        const stops = train.schedule.map(s => s.station_code);

        const fromIndex = stops.indexOf(from);
        const toIndex = stops.indexOf(to);

        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
      });

      const filtered2 = data.trains.filter(train => {

        return train.runs_on.includes(dayName);
        
      });

      const final = data.trains.filter(train =>{

        return filtered.includes(train) && filtered2.includes(train);
      });
      final.forEach(train => {
  if (!train.schedule) {
    console.log("Missing schedule:", train);
  }
});
      const duration = final.map(train => {


  const fromStop = train.schedule.find(s => s.station_code === from);
  const toStop = train.schedule.find(s => s.station_code === to);
  if (!fromStop || !toStop) return null;

  const timefromStop = fromStop.time;
  const timetoStop = toStop.time;
  const start = timeToMinutes(timefromStop);
  console.log("Start:" + timeToMinutes(timefromStop));
  const end = timeToMinutes(timetoStop);
  console.log("Stop" + timeToMinutes(timetoStop));

  
  const totalTime = end - start;
  console.log("Total " + totalTime);

  if (totalTime < 0) {
   const totalTime2 = totalTime + 24 * 60;
   return totalTime2;
  }

  return totalTime;
}).filter(item => item !== null); 
      const farecalculation = data.trains.map(train => {
  const fromStop = train.schedule.find(s => s.station_code === from);
  const toStop = train.schedule.find(s => s.station_code === to);

  if (!fromStop || !toStop) return null;

  const totalDistance = toStop.distance - fromStop.distance;
  if (totalDistance < 0) return null;
  const price = train.price_per_km;
  const fare = Number((price * totalDistance).toFixed(2));

  return fare;
}).filter(item => item !== null); // remove invalid ones
   console.log("FROM:", from);
console.log("TO:", to);


 

   
 
  

      const container = document.getElementById("trainResults");

container.innerHTML = ""; // clear previous results

final.forEach((train,index) => {
  const card = document.createElement("div");
  const fare = farecalculation[index];
  const timee = duration[index];
  card.classList.add("train-card");

   card.innerHTML = `
          <div class="train-info">
            <div class="train-name">${train.train_name}</div>
            <div>${train.train_id}</div>
          </div>

          <div class="train-route">
            <div class="route">${from} → ${to}</div>
            <div class = "duration">Duration:${timee} minutes</div>
          </div>

          <div class="train-action">
            <div>₹${fare}</div>
            <button>Book</button>
          </div>
        `;
  container.appendChild(card);
});

    })
    .catch(err => console.error("Error:", err));
});