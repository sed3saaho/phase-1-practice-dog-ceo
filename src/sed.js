let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
    loadImages();
    loadBreedOptions();
});

function loadImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(image => addImage(image));
        });
}

function addImage(imageUrl) {
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = imageUrl;
    container.appendChild(newImageEl);
}

function loadBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
        .then(res => res.json())
        .then(data => {
            breeds = Object.keys(data.message);
            updateBreedList(breeds);
            addBreedSelectListener();
        });
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.textContent = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', function () {
        li.style.color = 'green';
    });
}