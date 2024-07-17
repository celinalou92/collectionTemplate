fetch("https://dummyjson.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const products = data.products;
    const templateSource =
      document.getElementById("gallery-template").innerHTML;

    const template = Handlebars.compile(templateSource);

    const renderedHtml = template({ products });

    document.getElementById("gallery-item-component").innerHTML = renderedHtml;


    const addToBagButtons = document.querySelectorAll(".add-to-bag-btn");
    addToBagButtons.forEach((button) => {
      button.addEventListener("click", function addToCart(event) {
        event.preventDefault()
        const bag = document.getElementById("bag-item-count");
        
        //product id can be used to add products to bag and view bag
        const productId = event.target.getAttribute("data-id");
        
        let bagAmount = Number(bag.innerHTML);
        bagAmount++
        bag.innerHTML = `${bagAmount}` 
      });
    });
  });

Handlebars.registerHelper("roundUp", function (rating) {
  const starSVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="solid" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="starSVG size-4 fill-yellow-400 stroke-yellow-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>`;

  let stars = "";

  for (let i = 0; i <= rating; i++) {
    stars += `<span>${starSVG}</span>`;
  }
  return new Handlebars.SafeString(stars);
});

Handlebars.registerHelper("calcDiscount", function (price, discountPercentage) {
  const discount = price * (discountPercentage / 100);
  const discountedPrice = price - discount;
  return discountedPrice.toFixed(2);
});

Handlebars.registerHelper('notInStock', function (availabilityStatus) {
  return availabilityStatus !== "In Stock";
});


