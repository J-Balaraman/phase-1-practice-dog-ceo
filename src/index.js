console.log('%c HI', 'color: firebrick');
let listItemCounter = 1;
let allBreeds = {};

function dogPics() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => renderImg(json));
}

function dogBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => {
            allBreeds = json.message;
            renderList(allBreeds);
        });

    const breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', () => {
        const selectedLetter = breedDropdown.value;
        filterBreedsByLetter(selectedLetter);
    });
}

function renderImg(images) {
    const loc = document.getElementById('dog-image-container');
    loc.innerHTML = '';
    images.message.forEach(Image => {
        const img = document.createElement('img');
        img.src = Image;
        loc.appendChild(img);
    });
}

function renderList(breeds) {
    const what = document.getElementById('dog-breeds');
    what.innerHTML = '';
    for (const breed in breeds) {
        const breedItem = document.createElement('li');
        breedItem.textContent = breed;
        breedItem.id = 'list-item-' + listItemCounter++;
        what.appendChild(breedItem);
        breedItem.addEventListener('click', colorSwitch);
    }
}

function filterBreedsByLetter(letter) {
    const filteredBreeds = Object.keys(allBreeds).filter(breed =>
        breed.toLowerCase().startsWith(letter.toLowerCase())
    );

    const what = document.getElementById('dog-breeds');
    what.innerHTML = '';
    filteredBreeds.forEach(breed => {
        const breedItem = document.createElement('li');
        breedItem.textContent = breed;
        breedItem.id = 'list-item-' + listItemCounter++;
        what.appendChild(breedItem);
        breedItem.addEventListener('click', colorSwitch);
    });
}

function colorSwitch() {
    this.style.color = 'orange';
}

document.addEventListener('DOMContentLoaded', () => {
    dogPics();
    dogBreeds();
});