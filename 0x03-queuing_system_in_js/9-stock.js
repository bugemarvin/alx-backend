const express = require("express");
const redis = require("redis");
const { promisify } = require("util");

const app = express();
const client = redis.createClient();

// Array of products
const listProducts = [
  {
    itemId: 1,
    itemName: "Suitcase 250",
    price: 50,
    initialAvailableQuantity: 4,
  },
  {
    itemId: 2,
    itemName: "Suitcase 450",
    price: 100,
    initialAvailableQuantity: 10,
  },
  {
    itemId: 3,
    itemName: "Suitcase 650",
    price: 350,
    initialAvailableQuantity: 2,
  },
  {
    itemId: 4,
    itemName: "Suitcase 1050",
    price: 550,
    initialAvailableQuantity: 5,
  },
];

// Function to get a product by its ID
function getItemById(id) {
  return listProducts.find((product) => product.itemId === id);
}

// Reserve stock for an item
function reserveStockById(itemId, stock) {
  const key = `item.${itemId}`;
  return client.set(key, stock);
}

// Get the current reserved stock for an item
const getAsync = promisify(client.get).bind(client);
async function getCurrentReservedStockById(itemId) {
  const key = `item.${itemId}`;
  const reservedStock = await getAsync(key);
  return parseInt(reservedStock) || 0;
}

// Route to list all products
app.get("/list_products", (req, res) => {
  res.json(listProducts);
});

// Route to get a specific product
app.get("/list_products/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(parseInt(itemId));
  if (!product) {
    res.json({ status: "Product not found" });
    return;
  }
  const currentQuantity =
    product.initialAvailableQuantity -
    (await getCurrentReservedStockById(itemId));
  res.json({ ...product, currentQuantity });
});

// Route to reserve a product
app.get("/reserve_product/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(parseInt(itemId));
  if (!product) {
    res.json({ status: "Product not found" });
    return;
  }
  const currentReservedStock = await getCurrentReservedStockById(itemId);
  if (currentReservedStock >= product.initialAvailableQuantity) {
    res.json({ status: "Not enough stock available", itemId: product.itemId });
    return;
  }
  await reserveStockById(itemId, currentReservedStock + 1);
  res.json({ status: "Reservation confirmed", itemId: product.itemId });
});

// Start the server
app.listen(1245, () => console.log("Server listening on port 1245"));
