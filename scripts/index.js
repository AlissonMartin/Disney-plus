const moviesArray = ['508943', '527774', '277834', '335797', '269149', '150540', '14160', '12', '585', '49013']


function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?language=pt-br&api_key=d6387229f94b0ae820a6b2b8501849cc`
}

// Script para inicializar os dados do movie principal

const moviesList = document.querySelector('.movies__list')

function createMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const title = data.title
        const genre = data.genres[0].name
        const movie = document.createElement('li')
        const image = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        movie.innerHTML = `<span>${genre}</span> <strong>${title}</strong> <button onclick="setFeaturedMovie(${movieId})"> <img src="assets/icon-play-button.png" alt=""></button>`
        movie.style.backgroundImage = `linear-gradient(to top, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%) , url('${image}')`
        moviesList.appendChild(movie)
    })
}

function setFeaturedMovie(movieId) {
    fetch(getUrlMovie(movieId))
    .then(response => response.json())
.   then(json=>{
    const movieTitle = document.querySelector('.movie__title')
    const movieRating = document.querySelector('.rating strong')
    const movieInfo = document.querySelector('.info')
    const movieDesc = document.querySelector('.desc')
    const backgroundImg = document.querySelector('.app')

    const yearRelease = json.release_date.split('-')[0]

    movieTitle.innerHTML = json.original_title
    movieRating.innerHTML = json.vote_average
    movieInfo.innerHTML = yearRelease + ' - ' + json.genres[0].name + ' -  Filme'
    movieDesc.innerHTML = json.overview
    backgroundImg.style.backgroundImage = `linear-gradient(90.18deg, rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url(https://image.tmdb.org/t/p/original${json.backdrop_path})`
})

}

function loadListMovies() {
    moviesArray.map(createMovie)
}

loadListMovies()

setFeaturedMovie(moviesArray[0])