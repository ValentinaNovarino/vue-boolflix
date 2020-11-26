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
        flags: ['de', 'it', 'fr', 'en', 'es'],
        // chiave per url base
        baseUrlTmdb: "https://image.tmdb.org/t/p/",
        // chiave per dimensione poster
        imgSize: "w342",
        // immagine per poster non trovato
        posterNotFound: "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png",
        // chiave per visializzare poster on hover
        posterHide: false,
        currentCard: false

    },
    methods: {
        search() {
            // eseguo la ricerca che gestisce spazio e stringa vuota
            if (this.query.trim() != '') {
                // porto la ricerca in corso su true
                this.researchInProgress = true;
                // svuoto arrai risultati comuni
                this.films = [];
                // salvo la ricerca nella chiave
                this.textResearch = this.query;
                // chiamata per i film
                axios.get((urlApiKey + 'search/movie'), {params: {
                    api_key: apiKey,
                    query: this.query}
                })
                .then((film) => {
                    // aggiungo all'array films i film
                    this.films = this.films.concat(film.data.results);
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
                    // aggiungo all'array films le serie tv
                    this.films = this.films.concat(serie.data.results);
                    // riporto la ricerca in corso su false
                    this.researchInProgress = false;
                    console.log(this.films);
                });
            }
        },
        getVote(vote) {
            return Math.round(vote / 2);
        },
        showPoster() {
            this.currentCard = false;
            this.posterHide = false;
        },
        showInfo(filmIndex) {
            this.currentCard = filmIndex;
            this.posterHide = true;
        }
    }
})
