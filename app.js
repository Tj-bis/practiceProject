//header element
const headerElement = document.querySelector('header');

//addMovie button
const startAddMovieButton = document.querySelector('#add_movie'); //via custom ID
//const startAddMovieButton = headerElement.lastElementChild; //via lastChild

//modal selection
const addMovieModal = document.getElementById('add-modal');
//const addMovieModal = document.querySelector('#add-modal');

//backdrop
const backDrop = document.getElementById('backdrop');

//cancel Button
const cancelButton = document.querySelector('#cancelButton');

//add Button
const addButton = addMovieModal.querySelector('.btn--success');
//addButton = cancelButton.nextElementSibling;

//select user inputs
const userInputs = addMovieModal.querySelectorAll('input');
//movie section
const movieSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUi = () => {

    if (movies.length > 0) {
        movieSection.style.display = 'none';
    }
    else {
        movieSection.style.display = 'block';
    }
};

//toggle backdrop
const toggleBackdrop = () => {
    backDrop.classList.toggle('visible');
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};
//toggle modal Visibility
const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};
//click off backdrop
const backDropClickHandler = () => {
    closeMovieModal();
    cancelMovieDeletion();
    clearInputs();
};

//cancel adding modal
const cancelModalHandler = () => {
    closeMovieModal();
    toggleBackdrop();
    clearInputs();
};
//clear user inputs
const clearInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const cancelMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};



const deleteMovie = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    //delete movie from array
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    deleteMovieModal.classList.remove('visible');
    cancelMovieDeletion();
    updateUi();
    //listRoot.removeChild(listRoot.children[movieIndex]);
};


const deleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletion = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletion = deleteMovieModal.querySelector('.btn--danger');

    //workaround for errors for an already existing event listener. Cloning it and calling it again (not very practical)
    confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
    confirmDeletion = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletion.removeEventListener('click', cancelMovieDeletion);
    cancelDeletion.addEventListener('click', cancelMovieDeletion);
    confirmDeletion.addEventListener('click', deleteMovie.bind(null, movieId));

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    //create a new element as a list item
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element'; //add class to element
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}"></img>
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
};

const addMovieHandler = () => {

    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (titleValue.trim() === '' || imgUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
        alert('Please enter valid values (rating between 1 and 5).');
        return;
    }

    const newMovie = {
        id: Math.random().toString(), //generate an ID
        title: titleValue,
        image: imgUrlValue,
        rating: ratingValue
    }
    movies.push(newMovie);
    closeMovieModal();
    toggleBackdrop();
    clearInputs();
    renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUi();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backDrop.addEventListener('click', backDropClickHandler);
cancelButton.addEventListener('click', cancelModalHandler);
addButton.addEventListener('click', addMovieHandler);
//toggle modal visibility
// startAddMovieButton.addEventListener('click', () => {
//     addMovieModal.classList.toggle('visible');
// })

