$(document).ready(() => {
  $("#movie-form").on("submit", e => {
    let searchText = $("#search-text").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function movieSelect(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com/?s=" + searchText + "&apikey=4b9203ee")
    .then(response => {
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
        <div class = 'card'>
          <div class = 'text-center movie-poster'>
            <img src = '${movie.Poster}'>
            <h5>${movie.Title}</h5>
            <a onclick=" movieSelect('${
              movie.imdbID
            }');" class= 'btn btn-primary' href ="#">Movie Details</a>
          </div>
        </div>
        
        `;
      });

      $("#search-results").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get("https://www.omdbapi.com/?i=" + movieId + "&apikey=4b9203ee")
    .then(response => {
      let movie = response.data;

      let output = `
      <div class = "card mobile-card">
        <div>
          <img src = "${movie.Poster}">
        </div>
        <div class = "flex">
          <h2 class = 'sub-title'>${movie.Title}</h2>
          <ul class = 'list-group'>
            <li><strong>Genre: </strong> ${movie.Genre}</li>
            <li><strong>Released: </strong> ${movie.Released}</li>
            <li><strong>Rated: </strong> ${movie.Rated}</li>
            <li><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
            <li><strong>Director: </strong> ${movie.Director}</li>
            <li><strong>Cast: </strong> ${movie.Actors}</li>
            
          </ul>
        </div>
      </div>
      <div class = "plot-card">
            <div class = "flex">
              <h3>Plot</h3>
              <p>${movie.Plot}</p>
              <hr>
              <div>
              <a href= "https://imdb.com/title/${
                movie.imdbID
              }" target="_blank" class ="btn">IMDB Page</a>
              <a href= "movies.html" class ="btn">Back to Search</a>
              <a href= "#" class ="btn" onclick = 
              "addToMyList('${movie.imdbID}');">Add to List</a>
              </div>
              <hr>
            </div>
        </div>
      `;

      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function addToMyList(movId) {
  var myMovies =
    JSON.parse(sessionStorage.getItem("myMovies")) != null
      ? JSON.parse(sessionStorage.getItem("myMovies"))
      : [];
  if (Object.values(myMovies).indexOf(movId) > -1) {
  } else {
    myMovies[myMovies.length] = movId;
  }
  var arr = Object.keys(myMovies);
  sessionStorage.setItem("myMovies", JSON.stringify(myMovies));
  sessionStorage.setItem("arr", JSON.stringify(arr));
}

function genPage() {
  let arr =
    JSON.parse(sessionStorage.getItem("arr")) != null
      ? JSON.parse(sessionStorage.getItem("arr"))
      : [];
  let myMovies =
    JSON.parse(sessionStorage.getItem("myMovies")) != null
      ? JSON.parse(sessionStorage.getItem("myMovies"))
      : [];
  let output = "";
  for (const key of arr) {
    let movieId = myMovies[key];
    console.log(movieId);
    if (movieId != null) {
      axios
        .get("https://www.omdbapi.com/?i=" + movieId + "&apikey=4b9203ee")
        .then(response => {
          let movie = response.data;

          output += `
        
        <div class = 'card'>
          <div class = 'text-center movie-poster'>
            <img src = '${movie.Poster}'>
            <h5>${movie.Title}</h5>
            <a onclick=" movieSelect('${
              movie.imdbID
            }');" class= 'btn ' href ="#">Movie Details</a>
            <a onclick=" removeList('${
              movie.imdbID
            }');" class= 'btn btn-primary' href ="#">Remove From List</a>
          </div>
        </div>

        `;
          $("#my-List").html(output);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      $("#my-List").html("");
    }
  }
}
function removeList(movId) {
  let arr =
    JSON.parse(sessionStorage.getItem("arr")) != null
      ? JSON.parse(sessionStorage.getItem("arr"))
      : [];
  let myMovies =
    JSON.parse(sessionStorage.getItem("myMovies")) != null
      ? JSON.parse(sessionStorage.getItem("myMovies"))
      : [];

  let index = myMovies.indexOf(movId);
  console.log(myMovies, "MYMOVIES");
  delete myMovies[index];

  arr = Object.keys(myMovies);
  sessionStorage.removeItem("myMovies");
  sessionStorage.setItem("myMovies", JSON.stringify(myMovies));
  sessionStorage.setItem("arr", JSON.stringify(arr));
  genPage();
}
