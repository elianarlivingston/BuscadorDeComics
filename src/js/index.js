const autoritation = 'ts=1&apikey=36d3a6e6f8f5c240e4b2c91ddbf5c7d7&hash=a7a66139110702f093f8b91f7b3984cf'
const baseUrl = 'https://gateway.marvel.com/v1/public'

const charactersContainer = document.getElementById('charactersContainer');
const loadingWrapCharacters = document.getElementById('loadingWrapCharacters')
const comicsContainer = document.getElementById('comicsContainer');
const loadingWrapComic = document.getElementById('loadingWrapComic');

const charactersView = document.getElementById('characters-view');
const comicsView = document.getElementById('comics-view');

// const paginationContainer = document.getElementById('pagination-container');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const firstPageBtn = document.getElementById('first-page');
const lastPageBtn = document.getElementById('last-page');

const comicsResultsHTML = document.getElementById('comicsResultsHTML');
const charactersResultsHTML = document.getElementById('charactersResultsHTML');

let offset = 0;
let totalResults = 0;


const fetchApi = (path, search, searchValue, offset, orderBy) => {
    const newUrl = `${baseUrl}/${path}?${autoritation}&${searchValue ? `${search}=${searchValue}`: ''}&limit=20&offset=${offset}&orderBy=${orderBy}`

    return fetch(newUrl)
    .then(res => res.json())
    .catch(err => console.log(err))
}

// GET ALL THE CHARACTERS
const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
const pathNonFoundWanted = "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";

const printCharacter = async (search, searchValue, orderBy) => {
    try {
        const personajes = await fetchApi(`characters`, search, searchValue, offset, orderBy);
        const {results, total} = personajes.data;

        charactersContainer.innerHTML = ''

        if(results.length > 0) {
            results.forEach((personaje) => {
                const personajeCard = document.createElement('a');
                personajeCard.innerHTML =
                            `<article class="card-character max-h-72">
                                <header class="p-2 pb-16 bg-black border-t-4 border-red-500 card-character-header">
                                    <h3 class="text-white">${personaje.name}</h3>
                                </header>
                                <figure class="overflow-hidden">
                                    <img class="card-character_image" src="${personaje.thumbnail.path === pathNonFoundNowanted ? pathNonFoundWanted : personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="${personaje.name}">
                                </figure>
                            </article>`
                loadingWrapCharacters.style.display = 'none'
                charactersContainer.appendChild(personajeCard);
            });
          totalResults = total;
          printResults(totalResults)
          disableButtons()
        } else {
            const emptyResults = document.createElement('article')
            emptyResults.innerHTML = `
                <header>
                    <h2>No hay resultados</h2>
                </header>
            `
            charactersContainer.appendChild(emptyResults);
        }
    } catch (error) {
        console.log(error)
    }
}

// GET ALL THE COMICS
const printComics = async (search, searchValue, orderBy) => {
    try {
        const comics = await fetchApi(`comics`, search, searchValue, offset, orderBy);
        const {results, total} = comics.data;

        comicsContainer.innerHTML = ''

        if(results.length > 0) {
            results.forEach((comic) => {
                const comicCard = document.createElement('a');
                comicCard.innerHTML =
                `<a>
                    <article class="card-comic">
                        <header class="p-2">
                            <h3>${comic.title}</h3>
                        </header>
                        <figure class="card-comic__image">
                            <img src="${comic.thumbnail.path === pathNonFoundNowanted ? pathNonFoundWanted : comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                        </figure>
                    </article>
                </a>`
                loadingWrapComic.style.display = 'none';
                comicsContainer.appendChild(comicCard);
            })
          totalResults = total;
          printResults(totalResults)
          disableButtons()
        } else {
            const emptyResults = document.createElement('article')
            emptyResults.innerHTML = `
                <header>
                    <h2>No hay resultados</h2>
                </header>
                <figure class="card-comic__image">
                    <img src="${comic.thumbnail.path === pathNonFoundNowanted ? pathNonFoundWanted : comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}">
                </figure>`
        loadingWrapComic.style.display = 'none';
        comicsContainer.appendChild(comicCard);
        comicsContainer.appendChild(emptyResults);
        }
    } catch (error) {
        console.log(error)
    }
}

printComics('', '', 'title');

// FILTERS, FILL SELECT AND CHANGE VIEW

const formSearch = document.getElementById('form-search')
const searchText = document.getElementById('search-text')
const searchType = document.getElementById('search-type')
const searchOrder = document.getElementById('search-order')


// fill select
const fillSelect = (event) => {
    const element = event.target.value

    if(element === 'comics') {
        offset = 0;

        searchOrder.innerHTML = `
            <option value="title">A/Z</option>
            <option value="-title">Z/A</option>
            <option value="focDate">Más nuevo</option>
            <option value="-focDate">Menos nuevo</option>
        `
    } else {
        offset = 0;

        searchOrder.innerHTML = `
            <option value="name">A/Z</option>
            <option value="-name">Z/A</option>
        `
    }
};

searchType.addEventListener('input', fillSelect);

// change view
const changeView = (viewSelect, totalViews) => {
    const viewSelectId = viewSelect.id

    totalViews.forEach((el) => {
        if(el.id === viewSelectId) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    })
    return viewSelectId
}

formSearch.addEventListener('submit', (event) => {
    event.preventDefault()

    const type = searchType.value
    const searchValue = searchText.value
    const order = searchOrder.value

    if(type === 'comics') {
        offset = 0;
        changeView(comicsView, [comicsView, charactersView])
      
        printComics('title', searchValue, order)
        disableButtons()
    } else {
        offset = 0;
        changeView(charactersView, [charactersView, comicsView])

        printCharacter('nameStartsWith', searchValue, order)
        disableButtons()
    }
})

// RESULTS

const printResults = () => {
    const type = searchType.value
    
    if(type === 'comics'){
        comicsResultsHTML.innerText = totalResults
    } else{
        charactersResultsHTML.innerText = totalResults
    }
}

// PAGINATION

const disableButtons = () => {
    // const type = searchType.value
    if(offset === 0){
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
    } else {
        firstPageBtn.disabled = false;
        prevPageBtn.disabled = false;
    }
    if(offset + 20 >= totalResults) {
        nextPageBtn.disabled = true;
        lastPageBtn.disabled = true;
    } else {
        nextPageBtn.disabled = false;
        lastPageBtn.disabled = false;
    }
}

const updatePagination = () => {
    const type = searchType.value
    const searchValue = searchText.value
    const order = searchOrder.value

    if(type === 'comics'){
        printComics('nameStartsWith', searchValue, order)
    } else{
        printCharacter('nameStartsWith', searchValue, order)
    }

    disableButtons()
}

nextPageBtn.onclick = () => {
    offset += 20;
    updatePagination()
} 
prevPageBtn.onclick = () => {
    offset -= 20;
    if (offset < 0) {
        offset = 0
    }
    updatePagination()    
}
firstPageBtn.onclick = () => {
    offset = 0;
    updatePagination()
} 
lastPageBtn.onclick = () => {
    const isExact = totalResults % 20 === 0
    const pages = Math.floor(totalResults / 20)
    offset = (isExact ? pages - 1 : pages) * 20
    
    updatePagination()
}
