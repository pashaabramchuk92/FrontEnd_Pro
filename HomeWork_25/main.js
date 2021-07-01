void function renderLib(url = 'https://swapi.dev/api/starships') {
    Promise.all([
        fetch(url),
        fetch('https://swapi.dev/api/films')
    ])
    .then(responses => {
        return Promise.all(responses.map(response => response.json()))
        .then(data => {
            filmsUrl = data[1].results.map(film => film.url);
            filmsTitle = data[1].results.map(film => film.title);

            const ships = data[0];

            if(ships.next) {
                renderLib(ships.next)
            }

            return ships.results;
        })
    })
    .then((ships) => {
        const $ul = document.createElement('ul');

        ships.forEach(ship => {
            const $li = document.createElement('li');
            $li.style.cssText = 'font-size: 20px; font-weight: 700;'
            
            if(ship.films) {
                $li.addEventListener('click', () => {
                    const $innerUl = document.createElement('ul');

                    ship.films.forEach(film => {
                        if(filmsUrl.indexOf(film) > -1) {
                            const $innerLi = document.createElement('li');
                            $innerLi.style.cssText = 'color: red; font-size: 16px';

                            $innerLi.append(filmsTitle[filmsUrl.indexOf(film)]);
                            $innerUl.append($innerLi);
                            $li.append($innerUl);
                        }
                    });
                });
            }

            $li.prepend(ship.name);
            $ul.append($li);

        });

        document.body.prepend($ul);
    })
}();
