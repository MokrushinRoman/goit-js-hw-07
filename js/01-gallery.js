import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
const refs = {
  galleryContainer: document.querySelector(".gallery"),
};

// create gallary markup
function createGalleryElements(images) {
  return images
    .map(({ preview, description, original }) => {
      return `
  <div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" data-src="${original}" alt="${description}">
    </a>  
  </div>
  `;
    })
    .join("");
}

// rendering gallary markup into div.gallary
refs.galleryContainer.insertAdjacentHTML(
  "beforeend",
  createGalleryElements(galleryItems)
);

// Реализация делегирования на div.gallery и получение url большого изображения.

//---------------------- ACTIONS

// make a deligation parent click event
refs.galleryContainer.addEventListener("click", onGalleryModalOpen);

//---------------------- ACTION FUNCTIONS

function onGalleryModalOpen(e) {
  e.preventDefault();
  // reacting only click on image
  // if (!e.target.classList.contains("gallery__image")) {
  //   return;
  // }
  if (e.target.nodeName !== "IMG") {
    return;
  }

  // closing modal by "escape" button
  window.addEventListener("keydown", onModalCloseByEscBtn);

  // Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.src}" width="800" height="600">
`);

  instance.show();

  function onModalCloseByEscBtn(e) {
    console.log(e.code);

    if (basicLightbox.visible() && e.code === "Escape") {
      window.removeEventListener("keydown", onModalCloseByEscBtn);
      instance.close();
    }
  }
}
