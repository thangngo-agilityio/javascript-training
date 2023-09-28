export const productTemplate = (delIcon, products) => {
  return `${products.length !== 0 ? products.map(data => `<button class="btn-del"><img src="${delIcon}" alt="Cross Icon" class="icon-del"/></button>
  <div class="product-wrapper">
    <div class="product-img">
      <img src="${data.image}" alt="${data.name}" class="img-item" />
    </div>
    <div class="product-content">
      <p class="product-name">${data.name}</p>
      <div class="product-detail">
        $ ${data.price}
        <div class="separate"></div>
        ${data.quantity} Bowls
      </div>
    </div>
  </div>

  <button class="btn-edit" data-id="${data.id}">
    <p class="edit-text" data-id="${data.id}">Edit dish</p>
  </button>`).join('') : `<p>Data empty</p>`}`
}
