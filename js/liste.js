const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const listContainer = document.querySelector("#ProductListContainer");
const categoryHeader = document.querySelector("#CategoryHeader");
const filterButtons = document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

document.getElementById("logo").addEventListener("click", Home);

function Home() {
  window.location.href = "index.html";
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=40&category=${category}`)
  .then((response) => response.json())
  .then((json) => {
    allData = json;
    showProducts(allData);
  });

function showProducts(data) {
  let markup = "";
  data.forEach((product) => {
    markup += `<div class="ProductCard ${product.discount && "Nedsat"} ${product.soldout && "SoldOut"}">
          <div>
            <div class="ImgContainer">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Et produkt" />
              <div class="SoldOutOverlay">
                <p>Sold Out</p>
              </div>
            </div>
            <h3>${product.productdisplayname}</h3>
          </div>
          <div class="ProductInfo">
            <p class="Categories">${product.articletype} | ${product.brandname}</p>
            <p class="PrevPrice">Prev. DKK ${product.price},-</p>
            <div class="PriceDisc">
              <p class="Price"><span> Now&nbsp;</span>DKK ${Math.round(product.price - (product.price * product.discount) / 100)},-</p>
              <p class="Discount">-${product.discount}%</p>
            </div>
            <a class="SeMere" href="produkt.html?id=${product.id}">Read More</a>
          </div>
        </div>`;
  });
  listContainer.innerHTML += markup;
  categoryHeader.innerHTML = `${category}`;
}

function showFiltered() {
  listContainer.innerHTML = ``;
  const filter = this.dataset.gender;
  if (filter == "All") {
    showProducts(allData);
  } else {
    fraction = allData.filter((product) => product.gender === filter);
    showProducts(fraction);
  }
}
