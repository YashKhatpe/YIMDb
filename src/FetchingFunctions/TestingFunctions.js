const fetchMovieDetails = require('./MovieDetails');


const fetchData = async ()=> {

    const parsedData = await fetchMovieDetails('https://api.themoviedb.org/3/movie/872585?api_key=f9c8168ed027bcef24dd5c46a213e522');
    
    return parsedData;
}

const resultPromise = fetchData();
// Use the result when the promise is resolved
resultPromise.then(result => {
    console.log("Result outside the function:", result.title);
}).catch(error => {
    console.error("Error outside the function:", error);
});



