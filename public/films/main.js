import { films } from '../data/films.js'

const main = document.querySelector('main')

function getImageId(episode_id){
    if (episode_id >= 1 && episode_id <= 3){
        return episode_id + 3
    } else if (episode_id >=4 && episode_id <= 6) {
        return episode_id - 3
    } else {
        return episode_id
    }
}

for (let i = 0; i < films.length; i++) {
    let film = films[i]
    let elementFigure = document.createElement('figure')
    let figImg = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${getImageId(film.episode_id)}.jpg`
    figCaption.textContent = film.title

    elementFigure.appendChild(figImg)
    elementFigure.appendChild(figCaption)

    main.appendChild(elementFigure)
}

