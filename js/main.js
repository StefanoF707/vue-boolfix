let app = new Vue (
    {
        el: "#app",
        data: {
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            poster: "https://image.tmdb.org/t/p/w780",
            pages: 1,
            noImgFound: "img/img-not-available.png",
            movies: [],
            query: "",
            searchQuery: "",
            openSearchField: false,
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
                .then( (response) => {
                    this.movies = response.data.results;
                    console.log(this.movies);
                } );

                this.searchQuery = '';
            },

        },
    }
);
