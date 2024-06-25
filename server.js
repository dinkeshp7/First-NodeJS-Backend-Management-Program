const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let products = [];

app.get("/", (req, res) => {
  res.render("index", { products });
});

app.post("/add-product", (req, res) => {
  const {
    productname,
    productcategory,
    productdiscount,
    productcostprice,
    productsellprice,
  } = req.body;
  if (
    productname &&
    productcategory &&
    productdiscount &&
    productcostprice &&
    productsellprice
  ) {
    products.push({
      productname,
      productcategory,
      productdiscount,
      productcostprice,
      productsellprice,
    });
  }
  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
