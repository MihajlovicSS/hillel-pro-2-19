'use strict'

const albums = document.querySelector('#gallery-list_albums')
const thumbs = document.querySelector('#gallery-tumbs')
const bigPhotos = document.querySelector('#gallery-big-photos')
const CLASS_LINK = 'gallery-list_albums__item-link'

galleryAPI.getData(galleryAPI.albumsAPI)
    .then((list) => {
        renderAlbumList(list)
        showPhotosByAlbumId(list[0].id)
    })
    .catch((error) => {
        showError(error)
    })

albums.addEventListener('click', onLinkClick)

function onLinkClick(e){
    const target = e.target

    if(target.classList.contains(CLASS_LINK)){
        showPhotosByAlbumId(Number(target.dataset.id))
    }
}

function showPhotosByAlbumId(id){
    galleryAPI.getData(galleryAPI.photosAPI)
    .then((list)=>{
        const filteredList = filterPhotosList(list, id)
        renderPhotosList(filteredList)
    })
    .catch((error) => {
        showError(error)
    })
}

function renderAlbumList(list){
    const html = list.map(createListItemHTML).join('')

    albums.innerHTML = html
}

function renderPhotosList(list){
    const bigImages = list.splice(list.length-2, 2)
    const htmlTumbs = list.map(createPhotoItemHTML).join('')
    const htmlBigImages = bigImages.map(createBigPhotoItemHTML).join('')
    
    thumbs.innerHTML = htmlTumbs
    bigPhotos.innerHTML = htmlBigImages
}

function filterPhotosList(list, id){
    return list.filter(item => item.albumId === id)
}

function createListItemHTML(item){
    return `
        <p class="gallery-list_albums__item">
            <a href='#' class="gallery-list_albums__item-link" data-id="${item.id}">${item.title}<a>
        </p>
    `
}

function createImageHTML(url, parameter){
    return `
        <div class="gallery-photos__${parameter}photo">
            <img class="${parameter}photo" src="${url}" alt="#">
        </div>
    `
}

function createPhotoItemHTML(item){
    return createImageHTML(item.thumbnailUrl)
}

function createBigPhotoItemHTML(item){
    return createImageHTML(item.url, 'big-')
}

function showError(error){
    alert(error.message)
}