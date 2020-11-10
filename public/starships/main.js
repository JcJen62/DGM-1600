import { starships } from '../data/starships.js'

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.main')

const dialog = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')

closeButton.addEventListener('click', () => {
    dialog.classList.toggle("is-active")
})

modalBackground.addEventListener('click', () => {
    dialog.classList.toggle("is-active")
})

function populateNav(starships) {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', event => {
            let shipName = event.target.textContent
            const foundShip = starships.find(ship => ship.name === shipName)
            populateShipView(foundShip)
        })

        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
        nav.appendChild(navList)
    })
}

function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
}

function populateShipView(shipData) {
    removeChildren(shipView)
    let shipImage = document.createElement('img')
    let shipNum = getLastNumber(shipData.url)
    let shipUrl = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    shipImage.src = shipUrl
    shipImage.addEventListener('error', () => {
        console.log('error event listner')
        shipImage.hidden = true
        if (dialog.classList.contains('is-active')){
            dialog.classList.toggle("is-active")
        }
    }) 
    if (!dialog.classList.contains('is-active')){
        dialog.classList.toggle("is-active")
    }
    shipView.appendChild(shipImage)
}

populateNav(starships)
