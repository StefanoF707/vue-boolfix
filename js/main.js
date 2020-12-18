let app = new Vue (
    {
        el: "#app",
        data: {
            movies: [],
            query: "",
            searchQuery: "",
            my_api_key: "abe738a72b875634baa4e3568faa8280",
            poster: "https://image.tmdb.org/t/p/w220_and_h330_face",
            pages: 1,
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
            }
        },
    }
);



// "adult": false,
//             "backdrop_path": "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
//             "genre_ids": [
//                 12,
//                 18,
//                 878
//             ],
//             "id": 157336,
//             "original_language": "en",
//             "original_title": "Interstellar",
//             "overview": "In seguito alla scoperta di un cunicolo spazio-temporale, un gruppo di esploratori si avventura in una eroica missione per tentare di superare i limiti della conquista spaziale e oltrepassare le distanze che fino a quel momento avevano reso impraticabili i viaggi interstellari. L'obiettivo è quello di trovare nuovi luoghi dove coltivare il granoturco, l'unica coltivazione rimasta dopo un drastico cambiamento climatico che ha colpito soprattutto l'agricoltura.",
//             "popularity": 80.378,
//             "poster_path": "/bMKiLh0mES4Uiococ240lbbTGXQ.jpg",
//             "release_date": "2014-11-05",
//             "title": "Interstellar",
//             "video": false,
//             "vote_average": 8.3,
//             "vote_count": 24453
