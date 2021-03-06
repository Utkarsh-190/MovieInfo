$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com/?apikey=12b235ec&s=" + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="card text-center">
              <img class="card-img-top" src="${movie.Poster}" >
              <div class="card-body">
                <h5>${movie.Title}</h5>
                <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
            </div>
          </div> 
        `;
      });

      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieID", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieID = sessionStorage.getItem("movieID");

  axios
    .get("https://www.omdbapi.com/?apikey=12b235ec&i=" + movieID)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="img-thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="card-body">
            <h3 class="card-title">Plot</h3>
            ${movie.Plot}
            <hr/>

            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-secondary">Go back to search</a>
          </div>
        </div>
      `;
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
