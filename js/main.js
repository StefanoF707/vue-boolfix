let app = new Vue (
    {
        el: "#app",
        data: {
            movies: [],
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            query: "interstellar",
            poster: "https://image.tmdb.org/t/p/w220_and_h330_face/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
            pages: 1,
        },
        methods: {

        },
        mounted: function () {
            axios.get("https://api.themoviedb.org/3/search/movie", {
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
            } )
        }
    }
);
