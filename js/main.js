let app = new Vue (
    {
        el: "#app",
        data: {
            // UTILITIES
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            genresUrl: "https://api.themoviedb.org/3/genre/movie/list?",
            moviesUrl: "https://api.themoviedb.org/3/search/movie?",
            tvSeriesUrl: "https://api.themoviedb.org/3/search/tv?",
            multiSearchUrl: "https://api.themoviedb.org/3/search/multi?",
            filterSearch: "https://api.themoviedb.org/3/search/multi?",
            poster: "https://image.tmdb.org/t/p/w780",
            // UTILITIES
            pages: 1,
            noImgFound: "img/img-not-available.png",
            showTypes : ["Tutti", "Serie TV", "Film"],
            movies: [],
            query: "",
            searchQuery: "",
            openSearchField: false,
            noResultsFound: true,
            indexActive: 0,
        },
        methods: {
            getQueryByInput: function () {
                this.query = this.searchQuery;

                axios.get(this.filterSearch, {
                    params: {
                        api_key: this.my_api_key,
                        query: this.query,
                        page: this.pages,
                        language: "it-IT",
                    }
                })
                .then( (response) => {
                    this.movies = response.data.results;
                    if (this.movies.length != 0) {
                        this.noResultsFound = false;
                    } else {
                        this.noResultsFound = true;
                    }
                    console.log(this.movies);
                } );

                this.searchQuery = "";
            },
            moveActiveClass: function (i) {
                this.indexActive = i;
                if (this.indexActive == 1) {
                    this.filterSearch = this.tvSeriesUrl;
                } else if (this.indexActive == 2) {
                    this.filterSearch = this.moviesUrl;
                } else {
                    this.filterSearch = this.multiSearchUrl;
                }
                this.query = "";
            },
        },
    }
);
