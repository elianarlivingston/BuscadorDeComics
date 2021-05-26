const autoritation = 'ts=1&apikey=36d3a6e6f8f5c240e4b2c91ddbf5c7d7&hash=a7a66139110702f093f8b91f7b3984cf'
const baseUrl = 'https://gateway.marvel.com/v1/public'

const fetchApi = (path, search, searchValue, offset, orderBy) => {
    const newUrl = `${baseUrl}/${path}?${autoritation}&${search}=${searchValue}&limit=20&offset=${offset}&orderBy=${orderBy}`

    return fetch(newUrl)
    .then(res => res.json())
    .catch(err => console.log(err))
}

// fetchApi(`characters`, 'nameStartsWith', 'Spider', 0, '-name')
// fetchApi('comics', 'titleStartsWith', 'Spider', 0, '-title')

const printCharacter = async () => {
    const result = await fetchApi(`characters`, 'nameStartsWith', 'Spider', 0, '-name')
    const { count, limit, offset, results } = result.data

    results.forEach((el) => {
        console.log(el)
    });
}

printCharacter()