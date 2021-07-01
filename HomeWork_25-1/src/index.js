class StarwarsLib {
    static BASE_URL = 'https://swapi.dev/api/starships';

    state = {
        next: StarwarsLib.BASE_URL,
        starships: [],
        films: new Map(),
    }

    constructor(loadBtn, parentMainList) {
        this.loadBtn = loadBtn;
        this.parentMainList = parentMainList;
        this.loadStarships();
        this.loadFilms();
    }

    getData = async function(url) {
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
    }

    loadStarships() {
        this.loadBtn.addEventListener('click', async () => {
            const data = await this.getData(this.state.next);
            const { results: starships, next } = data;
            this.state.starships = [...this.state.starships, ...starships];
            this.state.next = next;

            if(!next) {
                this.loadBtn.setAttribute('disabled', 'disabled');
            }

            this.renderMainList(this.state.starships);
        });
    }

    loadFilms() {
        this.parentMainList.addEventListener('click', async ({ target }) => {
            if(target.classList.contains('list__item')) {
                const starshipsName = target.innerText;
                const { films } = this.state.starships.find(starship => starship.name === starshipsName);
                const filmTitles = await this.getFilms(films);
                this.renderInnerList(filmTitles, target);
            }
        });
    }

    getFilms = async function(urls) {
        const diff = [...new Set(urls.filter(url => !this.state.films.has(url)))];
        const films = await Promise.all(diff.map(this.getData));
        this.filmsCache(urls, films);
        const cache = urls.filter(x => !diff.includes(x));
        const cacheFilms = cache.map(url => this.state.films.get(url));
        return [...films, ...cacheFilms];
    }

    filmsCache(urls, data) {
        urls.forEach(url => {
            if(!this.state.films.has(url)) {
                this.state.films.set(url, data.find(x => x.url === url));
            }
        });
    }

    renderMainList(data) {
        const fragment = document.createDocumentFragment();
        data.forEach(ship => {
            const li = document.createElement('li');
            li.classList.add('list__item');
            li.textContent = ship.name;
            fragment.appendChild(li);
        });
        this.parentMainList.innerHTML = '';
        this.parentMainList.prepend(fragment);
    }

    renderInnerList = function(data, parent) {
        const innerUl = document.createElement('ul');
        data.forEach(film => {
            const innerLi = document.createElement('li');
            innerLi.textContent = film.title;
            innerUl.append(innerLi);
        });
        parent.append(innerUl);
    }
}



// eslint-disable-next-line no-unused-vars
const test = new StarwarsLib(
    document.querySelector('.btn'),
    document.querySelector('.main-list')
);
