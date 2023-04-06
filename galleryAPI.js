class galleryAPI{
    static photosAPI = 'https://jsonplaceholder.typicode.com/photos/'
    static albumsAPI = 'https://jsonplaceholder.typicode.com/albums/'

    static getData(url){
        return galleryAPI.request('GET', url)
    }

    static request(method, url, body){
        return fetch(url, {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
              'Content-type': 'application/json',
            }
        })
        .then((response) => {
            if (response.ok) return response.json()
            throw new Error("Can't load data from server!")
        })
    }
}