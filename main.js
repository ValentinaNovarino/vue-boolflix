const apiKey = '5b23704b41ce9ad797a67a023b27566c';
const urlApiKey = 'https://api.themoviedb.org/3/';

var app = new Vue ( {
    el: '#root',
    data: {
        // array films
        films: [],
        // input di ricerca
        query: "",
        // chiave per salvare la ricerca nell'input
        textResearch: '',
        // chiave per ricerca in corso
        researchInProgress: false,
        // voto massimo in base 5
        maxVote: 5,
        // array bandiere disponibili
        flags: ['de', 'it', 'fr', 'en', 'es']
    },
    methods: {
        search() {
            // eseguo la ricerca che gestisce spazio e stringa vuota
            if (this.query.trim() != '') {
                // porto la ricerca in corso su true
                this.researchInProgress = true;
                // salvo la ricerca nella chiave
                this.textResearch = this.query;
                // chiamata per i film
                axios.get(urlApiKey + 'search/movie', {params: {
                    api_key: apiKey,
                    query: this.query}
                })
                .then((film) => {
                    this.films = film.data.results;
                    // console.log(this.films);
                    // ciclo array film e porto voto in base 5 senza modificare valore iniziale
                    this.films.forEach((film) => {
                        Math.round(film.vote_average / 2);
                    });
                    // riporto la ricerca in corso su false
                    this.researchInProgress = false
                    // ripulisco input
                    this.query = "";
                });
            }
        },
    }
})
