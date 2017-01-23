//the searchType could be spotify search, movie search, tweet search

searchType = process.argv[2];
searchItem = process.argv[3];


// Possible type of commands:

switch (searchType) {
    case 'movie-this':
        movieThis(searchItem);
        return;
    case 'spotify-this-song':
        spotifyThis(searchItem);
        return;
    case 'my-tweets':
        myTweets();
        return;
    case 'do-as-it-says':
        doAsSays();
        return;
    default:
        console.log('Invalid command');
}


///HERE WE DEFINE THE MOVIE-THIS FUNCTION///
function movieThis(searchType) {

    // in case the title of the movie is not provided, as default set movie title as "Mr Nobody"

    if (searchItem === undefined) {

        var moveTitle = "Mr+Nobody";

        //Then run a request to the OMDB API with movie title specified
        var queryUrl = "http://www.omdbapi.com/?t=" + moveTitle + "&y=&plot=short&tomatoes=true&r=json";

        //Include the request npm package

        var movieRequest = require("request");

        // run the a request 

        movieRequest(queryUrl, function(error, response, body) {

            // if the request is sucessful (the status.Code is equal to 200)
            if (!error && response.statusCode === 200) {

                // Title of the movie.
                console.log("The movie's title is: " + JSON.parse(body).Title);
                // Year the movie came out.
                console.log("The movie came out in: " + JSON.parse(body).Released);
                // IMDB Rating of the movie.
                console.log("The IMBD rating of the movie was: " + JSON.parse(body).imdbRating);
                // Country where the movie was produced.
                console.log("The country where the movie was produced was: " + JSON.parse(body).Country);
                // Language of the movie.
                console.log("The language of the movie is: " + JSON.parse(body).Language);
                // Plot of the movie.
                console.log("The plot of the movie is: " + JSON.parse(body).Plot);
                // Actors in the movie.
                console.log("The actors in the movie are: " + JSON.parse(body).Actors);
                // Rotten Tomatoes Rating.
                console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).tomatoUserRating);
                // Rotten Tomatoes URL.
                console.log("The Rotten Tomatoes URL is: " + JSON.parse(body).tomatoURL);
            }

        })
    } else {

        // in case the movie title is more than word and if the user doesn't set the title in quotations

        var moveTitle = searchItem.split(' ').join('+');;

        //Then run a request to the OMDB API with movie title specified
        var queryUrl = "http://www.omdbapi.com/?t=" + moveTitle + "&y=&plot=short&tomatoes=true&r=json";

        //Include the request npm package

        var movieRequest = require("request");

        // run the a request 

        movieRequest(queryUrl, function(error, response, body) {

            // if the request is sucessful (the status.Code is equal to 200)
            if (!error && response.statusCode === 200) {

                // Title of the movie.
                console.log("The movie's title is: " + JSON.parse(body).Title);
                // Year the movie came out.
                console.log("The movie came out in: " + JSON.parse(body).Released);
                // IMDB Rating of the movie.
                console.log("The IMBD rating of the movie was: " + JSON.parse(body).imdbRating);
                // Country where the movie was produced.
                console.log("The country where the movie was produced was: " + JSON.parse(body).Country);
                // Language of the movie.
                console.log("The language of the movie is: " + JSON.parse(body).Language);
                // Plot of the movie.
                console.log("The plot of the movie is: " + JSON.parse(body).Plot);
                // Actors in the movie.
                console.log("The actors in the movie are: " + JSON.parse(body).Actors);
                // Rotten Tomatoes Rating.
                console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).tomatoUserRating);
                // Rotten Tomatoes URL.
                console.log("The Rotten Tomatoes URL is: " + JSON.parse(body).tomatoURL);
            }

        })

    }
};

/// HERE WE DEFINE THE SPOTITY FUNCTION //////

function spotifyThis(searchItem) {

    var spotify = require('spotify');

    if (searchItem === undefined) {

        // if no song is provided then your program will default to

        // "The Sign" by Ace of Base

        var songTitle = "The+Sign";

        spotify.search({ type: 'track', query: songTitle, limit: 1 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            //Eventhough I set the limit of search to one, it doesn't work for some reason
            //that is why I only chose the first element in the data object

            console.log(data.tracks.items.artists);

            var result = data.tracks.items[0];


            // Artist(s)
            console.log('The name of the group: ' + result.artists[0].name);

            // The song's name
            console.log('The name of the song: ' + result.name);

            // A preview link of the song from Spotify

            console.log('The preview link from Spotify: ' + result.external_urls.spotify);


            // The album that the song is from

            console.log('The name of the album: ' + result.album.name);


        })

    } else {

        // in case the title of the movie is more than one word, let's concatenate each word
        // with + symbols

        var songTitle = searchItem.split(' ').join('+');

        spotify.search({ type: 'track', query: songTitle, limit: 1 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }


            //Eventhough I set the limit of search to one, it doesn't work for some reason
            //that is why I only chose the first element in the data object

            var result = data.tracks.items[0];


            // Artist(s)
            console.log('The name of the group: ' + result.artists[0].name);

            // The song's name
            console.log('The name of the song: ' + result.name);

            // A preview link of the song from Spotify

            console.log('The preview link from Spotify: ' + result.external_urls.spotify);


            // The album that the song is from

            console.log('The name of the album: ' + result.album.name);

        })
    }
};


/// HERE WE DEFINE THE TWITTER FUNCTION //////

function myTweets() {

    var keys = require("./keys.js");

    var Twitter = require('twitter');

    var client = new Twitter(keys);

    var params = { screen_name: 'nodejs' };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            console.log('These are my tweets: ' + tweets);
        }
    });



};

/// HERE WE DEFINE THE DO-AS-SAYS FUNCTION///

function doAsSays() {

    var fs = require("fs")

    fs.readFile("random.txt", "utf8", function(error, data) {

        var dataArray = data.split(",");

        // in the random.txt file could be different type of search types 
        //and search types, depending on the search type, do different functions
        //defined outside this function

        searchType = dataArray[0];
        searchItem = dataArray[1];


        // Possible type of commands:

        switch (searchType) {
            case 'movie-this':
                movieThis(searchItem);
                return;
            case 'spotify-this-song':
                spotifyThis(searchItem);
                return;
            case 'my-tweets':
                myTweets();
                return;
            default:
                console.log('Invalid command');
        }

    })
};
