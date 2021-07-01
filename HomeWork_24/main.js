function getData(url = 'https://swapi.dev/api/films') {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function() {
        const films = xhr.response.results;
        console.log(films);
    
        const $ul = document.createElement('ul');

        films.forEach((film, i) => {
            const $li = document.createElement('li');
            const $a = document.createElement('a');

            $a.prepend(film.title);
            $li.prepend($a);
            $ul.append($li);
            
            $li.addEventListener('click', (e) => {
                const $container = document.createElement('ul');
                film.starships.forEach(ship => {
                    
                    const xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', ship);
                    xhr2.responseType = 'json';
                    xhr2.send();
    
                    xhr2.onload = function() {
                        const $ship = document.createElement('li');
    
                        $ship.append(xhr2.response.name);
                        $container.append($ship);
                    };
                    $li.append($container);
                });
            });
            
        });

        document.body.prepend($ul);
    };
}
getData();
