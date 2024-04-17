let fullName = prompt("Adınız Nedir ?")

let myName = document.querySelector("#myName")
document.getElementById("myName").innerText = fullName;


function time() {
    let dateArea = document.querySelector("#myClock");
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
  
    let day = new Date().getDay();
  
    switch (day) {
      case 0:
        day = "Pazar";
        break;
      case 1:
        day = "Pazartesi";
        break;
      case 2:
        day = "Salı";
        break;
      case 3:
        day = "Çarşamba";
        break;
      case 4:
        day = "Perşembe";
        break;
      case 5:
        day = "Cuma";
        break;
      case 6:
        day = "Cumartesi";
        break;
    }
  
    dateArea.innerHTML = `${hours}:${minutes}:${seconds} ${day}`;
  }
  setInterval(time, 1000);
  showTime();