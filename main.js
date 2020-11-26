const apiKey = '5b23704b41ce9ad797a67a023b27566c';
const urlApiKey = 'https://api.themoviedb.org/3/';

var app = new Vue ( {
    el: '#root',
    data: {
        // array comune film e serie
        allResults: [],
        // array serie tv
        serie: [],
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
        flags: ['de', 'it', 'fr', 'en', 'es'],
        // chiave per url base
        baseUrlTmdb: "https://image.tmdb.org/t/p/​",
        // chiave per dimensione poster
        imgSize: "w342",
        // immagine per poster non trovato
        posterNotFound: "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png"

    },
    methods: {
        search() {
            // eseguo la ricerca che gestisce spazio e stringa vuota
            if (this.query.trim() != '') {
                // porto la ricerca in corso su true
                this.researchInProgress = true;
                // svuoto arrai risultati comuni
                this.allResults = [];
                // salvo la ricerca nella chiave
                this.textResearch = this.query;
                // chiamata per i film
                axios.get((urlApiKey + 'search/movie'), {params: {
                    api_key: apiKey,
                    query: this.query}
                })
                .then((film) => {
                    this.films = film.data.results;
                    // console.log(this.films);
                    // unisco l'array film e l'array serie in un unico array
                    this.allResults = this.serie.concat(this.films);
                    // riporto la ricerca in corso su false
                    this.researchInProgress = false
                    // ripulisco input
                    this.query = "";
                });
                // chiamata per le serie tv
                axios.get((urlApiKey + 'search/tv'),
                {params: {
                    api_key: apiKey,
                    query: this.query}
                })
                .then((serie) => {
                    this.serie = serie.data.results;
                    // unisco l'array film e l'array serie in un unico array
                    this.allResults = this.films.concat(this.serie);
                    // riporto la ricerca in corso su false
                    this.researchInProgress = false;
                    console.log(this.allResults);
                });
            }
        },
        getVote (vote) {
            return Math.round(vote / 2);
        }
    }
})
