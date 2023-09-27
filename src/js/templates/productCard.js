export const productTemplate = (delIcon, editIcon, products) => {
  return `${products.length !== 0 ? products.map(data => `<img src="${delIcon}" alt="Cross Icon" class="secondary-icon delete-btn" data-id="${data.id}" />
  <div class="d-flex-col product-wrapper">
    <img src="${data.image}" alt="${data.name}" class="primary-product" />
    <div class="d-flex-col product-content-wrapper">
      <p class="product-name">${data.name}</p>
      <div class="d-flex-center product-detail">
        $ ${data.price}
        <div class="separate"></div>
        ${data.quantity} Bowls
      </div>
    </div>
  </div>

  <button class="d-flex-center product-mutation mutation" data-id="${data.id}">
    <img src="${editIcon}" alt="Edit Icon" class="primary-icon mutation" data-id="${data.id}"/>
    <p class="mutation-content mutation" data-id="${data.id}">Edit dish</p>
  </button>`).join('') : `<p>Data empty</p>`}`
}
