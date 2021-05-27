const autoritation = 'ts=1&apikey=36d3a6e6f8f5c240e4b2c91ddbf5c7d7&hash=a7a66139110702f093f8b91f7b3984cf'
const baseUrl = 'https://gateway.marvel.com/v1/public'

const charactersContainer = document.getElementById('charactersContainer');
const loadingWrapCharacters = document.getElementById('loadingWrapCharacters')

const fetchApi = (path, search, searchValue, offset, orderBy) => {
    const newUrl = `${baseUrl}/${path}?${autoritation}&${search}=${searchValue}&limit=20&offset=${offset}&orderBy=${orderBy}`

    return fetch(newUrl)
    .then(res => res.json())
    .catch(err => console.log(err))
}

// GET ALL THE CHARACTERS
const printCharacter = async () => {
    const personajes = await fetchApi(`characters`, '', '', 0, 'name')
    const { count, limit, offset, results } = personajes.data
    const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
    const pathNonFoundWanted = "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";

    results.forEach((personaje) => {
        console.log(personaje)
        const a = document.createElement('a');
        a.innerHTML =
                    `<article class="card-character max-h-72">
                        <header class="p-2 pb-16 bg-black border-t-4 border-red-500 card-character-header">
                            <h3 class="text-white">${personaje.name}</h3>
                        </header>
                        <figure class="overflow-hidden">
                            <img class="card-character_image" src="${personaje.thumbnail.path === pathNonFoundNowanted ? pathNonFoundWanted : personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                        </figure>
                    </article>`
        loadingWrapCharacters.style.display = 'none'
        charactersContainer.appendChild(a);
    });
}

printCharacter()