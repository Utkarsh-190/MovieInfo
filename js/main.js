$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=12b235ec&s=" + searchText)
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
      console.log(new Error(err));
    });
}
