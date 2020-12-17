import { senators } from '../data/senators.js'

const senatorGrid = document.querySelector('.senatorGrid')
const ageSortButton = document.querySelector('#ageSort')
const nextElectionSortButton = document.querySelector('#nextElectionSort')
const showRepublicansButton = document.querySelector('#showRepublicans')
const showDemocratsButton = document.querySelector('#showDemocrats')
const showOldestButton = document.querySelector('#showOldest')
const showNextElectionYearButton = document.querySelector('#showNextElectionYear')

ageSortButton.addEventListener('click', () => {
    ageSort()
})

nextElectionSortButton.addEventListener('click', () => {
    nextElectionSort()
})

showRepublicansButton.addEventListener('click', () => {
    showRepublicans()
})

showDemocratsButton.addEventListener('click', () => {
    showDemocrats()
})

showOldestButton.addEventListener('click', () => {
    showOldestSenator()
})

showNextElectionYearButton.addEventListener('click', () => {
    showNextElectionYearSenator()
})

function populateSenatorDiv(simpleSenators) {
    removeChildren(senatorGrid)
    simpleSenators.forEach(senator => {
        let senDiv = document.createElement('div')
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
        let age = document.createElement('div')
        if (senator.party === 'R') partyIcon.className = 'fas fa-republican'
        if (senator.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (senator.party === 'ID') partyIcon.className = 'fas fa-star'
        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        figCaption.appendChild(partyIcon)
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senDiv.appendChild(senFigure)
        senatorGrid.appendChild(senDiv)
    })
}

function getMySenatorData(senatorArray) {
    return senatorArray.map(senator => {
        let middleName = senator.middleName ? ` ${senator.middleName} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
            seniority: parseInt(senator.seniority, 10),
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
            party: senator.party,
            age: getAge(senator.date_of_birth),
            nextElection: senator.next_election
        }
    })
}

function getAge(birthDateString) 
{
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

const filterSenators = (prop, value) => {
    return getMySenatorData(senators).filter(senator => {
        return senator[prop] === value
    })
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')

const oldestSenator = getMySenatorData(senators).reduce((acc, senator) => acc.age > senator.age ? acc : senator)

const nextElection = getMySenatorData(senators).reduce((acc, senator) => acc.nextElection > senator.nextElection ? acc : senator)

function showRepublicans(){
    populateSenatorDiv(republicans)
}

function showDemocrats(){
    populateSenatorDiv(democrats)
}

function showOldestSenator(){
    let temp = []
    temp.push(oldestSenator)
    populateSenatorDiv(temp)
}

function showNextElectionYearSenator(){
    let temp = []
    temp.push(nextElection)
    populateSenatorDiv(temp)
}

function ageSort() {
    populateSenatorDiv(getMySenatorData(senators).sort((a, b) => {
        return a.age - b.age
    }))
}

function nextElectionSort() {
    populateSenatorDiv(getMySenatorData(senators).sort((a, b) => {
        return a.nextElection - b.nextElection
    }))
}

console.log(oldestSenator)
console.log(nextElection)

populateSenatorDiv(getMySenatorData(senators))

function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}