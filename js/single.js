const productContainer = document.querySelector("#BigProductCard");
const productPath = document.querySelector("#path");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  productContainer.innerHTML = `
            <div class="ImgContainer">
                <img src="https://kea-alt-del.dk/t7/images/webp/1000/${id}.webp">
                <div class="SoldOutOverlay">
                    <p>Sold Out</p>
                </div>
                <div class="NedsatOverlay">
                    <p>-34%</p>
                </div>
            </div>
            <div class="Column2">
                <div>
                <h1>Product Information</h1>
                    <dl>
                        <dt>Model Name</dt>
                        <dd>${product.productdisplayname}</dd>
                        <dt>Color</dt>
                        <dd>${product.basecolour}</dd>
                        <dt>Inventory Number</dt>
                        <dd>${product.relid}</dd>
                    </dl>
                    </div>
                    <div>
                        <h1>${product.brandname}</h1>
                        <p>${product.description}</p>
                    </div>
            </div>
            <div class="Column3">
                <div class="descriptor">
                    <h1>${product.productdisplayname}</h1>
                    <p>${product.brandname} | ${product.articletype}</p>
                </div>
                    <form>
                        <label for="size">Choose a size</label>
                        <select name="size" id="size">
                            <option value="Small">S</option>
                            <option value="Medium">M</option>
                            <option value="Large">L</option>
                            <option value="Extra Large">XL</option>
                        </select>
                        <input class="basketbutton" type="submit" value="Add to basket"></input>
                    </form>
            </div>
        `;
  productPath.innerHTML = `<p>
            <a href="index.html">Home</a> >
            <a>Brands</a> >
            <a>${product.brandname}</a> >
            ${product.variantname}</p>`;
}
