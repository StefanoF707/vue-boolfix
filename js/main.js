let app = new Vue (
   {
      el: "#app",
      data: {
         // UTILITIES
         my_api_key: "abe738a72b875634baa4e3568faa8280",
         poster: "https://image.tmdb.org/t/p/w780",
         noImgFound: "img/img-not-available.png",
         pages: 1,
         sectionShower : ["Tutti", "Serie TV", "Film", "Nuovi e popolari", "La mia lista"],
         // /UTILITIES
         results: [],
         genresArray: [],
         genresNames: [],
         userList: [],
         trendMovies: [],
         trendTv: [],
         query: "",
         searchQuery: "",
         openSearchField: false,
         axiosCall: false,
         trendsCall: false,
         indexActive: 0,
         genreSelected: "",
         cascadingMenu: false,
      },
      methods: {

         getQueryByInput: function () {
            this.query = this.searchQuery;

            axios.get("https://api.themoviedb.org/3/search/movie?", {
               params: {
                  api_key: this.my_api_key,
                  query: this.query,
                  page: this.pages,
                  language: "it-IT",
               }
            })
            .then( (moviesResponse) => {

               let movies = moviesResponse.data.results;

               movies.forEach( (movie) => {
                  movie.cast = [];
                  this.getCast(movie, "movie");
               } );

               axios.get("https://api.themoviedb.org/3/search/tv?", {
                  params: {
                     api_key: this.my_api_key,
                     query: this.query,
                     page: this.pages,
                     language: "it-IT",
                  }
               }).then( (seriesResponse) => {

                  let series = seriesResponse.data.results;

                  series.forEach( (tvShow) => {
                     tvShow.cast = [];
                     this.getCast(tvShow, "tv");
                  } );

                  if (this.indexActive == 0) {
                     this.results = [...series, ...movies];
                  } else if (this.indexActive == 1) {
                     this.results = series;
                  } else if (this.indexActive == 2) {
                     this.results = movies;
                  }

                  this.results.sort(function(a, b) {
                     return b.popularity - a.popularity;
                  });

                  while (this.results.length > 20) {
                     this.results.pop();
                  }


                  this.results.forEach( (element) => {
                     this.genresArray.forEach( (el) => {
                        if (element.genre_ids.includes(el.id)) {
                           if (!element.genre_ids.includes(el.name)) {
                              element.genre_ids.push(el.name);
                           }
                        }
                     } );

                  } );

                  this.axiosCall = true;
               } );
            } );

            this.searchQuery = "";
         },

         moveActiveClass: function (i) {
            this.indexActive = i;
            this.axiosCall = false;
            if (this.indexActive == 3 && !this.trendsCall) {
               this.getTrends();
            }
            this.query = "";
         },

         getGenresByAxiosCall: function () {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?", {
               params: {
                  api_key: this.my_api_key,
                  language: "it-IT",
               }
            }).then( (moviesResponse) => {

               axios.get("https://api.themoviedb.org/3/genre/tv/list?", {
                  params: {
                     api_key: this.my_api_key,
                     language: "it-IT",
                  }
               }).then( (tvResponse) => {
                  this.genresArray = [...moviesResponse.data.genres, ...tvResponse.data.genres];

                  this.genresArray.forEach( (element) => {
                     if (!this.genresNames.includes(element.name)) {
                        this.genresNames.push(element.name);
                     }
                  } );

               } );
            } );
         },

         addItemToUserList: function (item) {
            if (this.userList.length == 0) {
               this.userList.push(item);
            } else {
               this.userList.forEach( () => {
                  if (!this.userList.includes(item)) {
                     this.userList.push(item);
                  }
               } );
            }
         },

         removeItemToUserList: function (index) {
            this.userList.splice(index, 1);
         },

         getTrends: function () {

            this.getGenresByAxiosCall();

            axios.get("https://api.themoviedb.org/3/trending/all/week?", {
               params: {
                  api_key: this.my_api_key,
                  language: "it-IT",
               }
            }).then( (trendResponse) => {

               trendResponse.data.results.forEach( (element) => {
                  element.cast = [];
                  this.genresArray.forEach( (el) => {
                     if (element.genre_ids.includes(el.id)) {
                        if (!element.genre_ids.includes(el.name)) {
                           element.genre_ids.push(el.name);
                        }
                     }
                  } );
                  if (element.media_type == "movie") {
                     this.getCast(element, "movie");
                     this.trendMovies.push(element);
                  } else if (element.media_type == "tv") {
                     this.getCast(element, "tv");
                     this.trendTv.push(element);
                  }
               } );

               this.trendsCall = true;

            } );
         },

         getCast: function (el, show) {
            axios.get(`https://api.themoviedb.org/3/${show}/${el.id}/credits?`, {
               params: {
                  api_key: this.my_api_key,
                  language: "it-IT",
               }
            }).then( (response) => {
               let castArray = response.data.cast;
               let castNames = [];
               castArray.slice(0, 5).forEach( (person) => {
                  castNames.push(person.name);
               } );
               el.cast = castNames;
               this.$forceUpdate();
            } )
         },

         cascadingMenuShower: function () {
            if (!this.cascadingMenu) {
               this.cascadingMenu = true;
            } else {
               this.cascadingMenu = false;
            }
         },

      },
      created: function () {
         this.getGenresByAxiosCall();
      },
   }
);

// RESPONSIVE
