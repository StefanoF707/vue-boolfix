let app = new Vue (
    {
        el: "#app",
        data: {
            // UTILITIES
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            movieGenresUrl: "https://api.themoviedb.org/3/genre/movie/list?",
            moviesUrl: "https://api.themoviedb.org/3/search/movie?",
            tvSeriesUrl: "https://api.themoviedb.org/3/search/tv?",
            poster: "https://image.tmdb.org/t/p/w780",
            noImgFound: "img/img-not-available.png",
            pages: 1,
            // /UTILITIES
            showTypes : ["Tutti", "Serie TV", "Film", "Nuovi e popolari", "La mia lista"],
            results: [],
            genresArray: [],
            userList: [],
            query: "",
            searchQuery: "",
            openSearchField: false,
            axiosCall: false,
            indexActive: 0,
            genreSelected: "",
        },
        methods: {

            getQueryByInput: function () {
                this.query = this.searchQuery;

                axios.get(this.moviesUrl, {
                    params: {
                        api_key: this.my_api_key,
                        query: this.query,
                        page: this.pages,
                        language: "it-IT",
                    }
                })
                .then( (moviesResponse) => {

                    axios.get(this.tvSeriesUrl, {
                        params: {
                            api_key: this.my_api_key,
                            query: this.query,
                            page: this.pages,
                            language: "it-IT",
                        }
                    }).then( (seriesResponse) => {

                        if (this.indexActive == 0) {
                            this.results = [...seriesResponse.data.results, ...moviesResponse.data.results];
                        } else if (this.indexActive == 1) {
                            this.results = seriesResponse.data.results;
                        } else if (this.indexActive == 2) {
                            this.results = moviesResponse.data.results;
                        }

                        this.results.sort(function(a, b) {
                            return b.popularity - a.popularity;
                        });

                        while (this.results.length > 20) {
                            this.results.pop();
                        }

                        this.axiosCall = true;

                        this.results.forEach( (element) => {
                            this.genresArray.forEach( (el) => {
                                if (element.genre_ids.includes(el.id)) {
                                    element.genre_ids.push(el.name);
                                }
                            } );
                        } );
                    } );
                } );

                this.searchQuery = "";
            },

            moveActiveClass: function (i) {
                this.indexActive = i;
                this.axiosCall = false;
                this.query = "";
            },

            getGenresByAxiosCall: function () {
                axios.get(this.movieGenresUrl, {
                    params: {
                        api_key: this.my_api_key,
                        language: "it-IT",
                    }
                })
                .then( (response) => {
                    this.genresArray = response.data.genres;
                } );
            },

            addItemToUserList: function (item) {
                this.userList.push(item);
                console.log(this.userList);
            },

            removeItemToUserList: function (item) {

            }

        },
        created: function () {
            this.getGenresByAxiosCall();
        },
    }
);
