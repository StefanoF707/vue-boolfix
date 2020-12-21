let app = new Vue (
    {
        el: "#app",
        data: {
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            poster: "https://image.tmdb.org/t/p/w780",
            pages: 1,
            noImgFound: "img/img-not-available.png",
            showTypes : ["Tutti", "Serie TV", "Film"],
            movies: [],
            query: "",
            searchQuery: "",
            openSearchField: false,
            moviesApi: "https://api.themoviedb.org/3/search/movie?",
            tvSeriesApi: "https://api.themoviedb.org/3/search/tv?",
            multiSearchApi: "https://api.themoviedb.org/3/search/multi?",
            filterSearch: "https://api.themoviedb.org/3/search/multi?",
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
                    this.movies.forEach( (element) => {
                        switch (element.original_language) {
                            case "en":
                                element.original_language = "img/icons/usa.png";
                                break;
                            case "it":
                                element.original_language = "img/icons/italy.png";
                                break;
                            case "de":
                                element.original_language = "img/icons/germany.png";
                                break;
                            case "fr":
                                element.original_language = "img/icons/france.png";
                                break;
                        }
                    } );
                    console.log(this.movies);
                } );

                this.searchQuery = "";
            },
            moveActiveClass: function (i) {
                this.indexActive = i;
                if (this.indexActive == 1) {
                    this.filterSearch = this.tvSeriesApi;
                } else if (this.indexActive == 2) {
                    this.filterSearch = this.moviesApi;
                } else {
                    this.filterSearch = this.multiSearchApi;
                }
            },
        },
    }
);
