class SWAPI {
  init () {
    this.baseUrl = 'https://swapi.co/api/'
    this.get = {
      roots: () => this.roots(),
      allPeople: (page) => this.allSource(page, 'people'),
      allFilms: (page) => this.allSource(page, 'films'),
      allStarships: (page) => this.allSource(page, 'starships'),
      allVehicles: (page) => this.allSource(page, 'vehicles'),
      allSpecies: (page) => this.allSource(page, 'species'),
      allPlanets: (page) => this.allSource(page, 'planets')
    }
    this.XHR = function XHR (method, url, data = null, callback = function () {}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'text/plain')
        xhr.send(data)
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return
          if (xhr.status === 200) {
            callback(xhr.responseText)
            return resolve(xhr.responseText)
          }
        }
      })
    }
  }
  roots (callback = function () {}) {
    return new Promise((resolve, reject) => {
      this.XHR('GET', this.baseUrl).then((response) => {
        const result = JSON.parse(response)
        callback(result)
        return resolve(result)
      })
    })
  }
  allSource (page = 1, source, callback = function () {}) {
    return new Promise((resolve, reject) => {
      this.XHR('GET', this.baseUrl + `${source}/?page=${page}`).then((response) => {
        const result = JSON.parse(response)
        callback(result)
        return resolve(result)
      })
    })
  }
}
const swapi = new SWAPI()

export default swapi
