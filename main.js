var app = new Vue ( {
    el: '#root',
    data: {
        films: [],
        query: ""
    },
    methods: {
        search() {
            axios.get('https://api.themoviedb.org/3/search/movie', {params: {
                api_key: '5b23704b41ce9ad797a67a023b27566c',
                query: this.query}
            })
            .then((film) => {
                this.films = film.data.results;
                console.log(this.films);
                this.query = "";
            });

        }
    }
})
