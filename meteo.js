function afficherMeteo(data) {
  console.log(data)
  document.getElementById("ville").textContent = `${data.location.name}, ${data.location.country}`
  document.getElementById("temperature").textContent = `${data.current.temp_c} °C`
  document.getElementById("condition").textContent = data.current.condition.text
  document.getElementById("icone").src = "https:" + data.current.condition.icon
}

function afficherErreur(message){
  document.getElementById("ville").textContent = `${message}`
}

function chargerMeteo() {
  fetch("config.json")
    .then(response => response.json())
    .then(config => {
      const apiKey = config.apiKey
      const ville = config.ville

      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ville}&lang=fr`

      fetch(url)
        .then(response => response.json()) 
        .then(data => {
          afficherMeteo(data)
        })
        .catch(error => {
          console.error("Erreur de récupération météo :", error)
          afficherErreur("Erreur")})
    })
  }

// Lancer une première fois au chargement
chargerMeteo()

// Mise à jour des données météo toutes les heures
setInterval(chargerMeteo, 3600000) // 3600000 ms = 1h
