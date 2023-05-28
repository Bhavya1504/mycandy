

document.addEventListener("DOMContentLoaded", async () => {
  await displayCandyItems();

  const addCandyForm = document.getElementById("add-candy-form");
  addCandyForm.addEventListener("submit", addCandyItem);
});

async function displayCandyItems() {
  const candyList = document.getElementById("candy-list");
  candyList.innerHTML = "";

  const candyItems = await getCandyItems();

  if (candyItems.length === 0) {
    candyList.innerHTML = "<p>No candy items found.</p>";
    return;
  }

  candyItems.forEach((candy) => {
    const candyItem = createCandyItemElement(candy);
    candyList.appendChild(candyItem);
  });
}

function createCandyItemElement(candy) {
  const candyItem = document.createElement("div");
  candyItem.className = "candy-item";

  const name = document.createElement("h3");
  name.textContent = candy.name;
  candyItem.appendChild(name);

  const description = document.createElement("p");
  description.textContent = candy.description;
  candyItem.appendChild(description);

  const price = document.createElement("p");
  price.textContent = "Price: " + candy.price;
  candyItem.appendChild(price);

  const quantity = document.createElement("p");
  quantity.textContent = "Quantity: " + candy.quantity;
  candyItem.appendChild(quantity);

  const buyButtons = document.createElement("div");
  buyButtons.className = "buy-buttons";

  for (let i = 1; i <= 3; i++) {
    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy " + i;
    buyButton.addEventListener("click", async () => await decreaseQuantity(candy._id, i));
    buyButtons.appendChild(buyButton);
  }

  candyItem.appendChild(buyButtons);

  return candyItem;
}

async function getCandyItems() {
  try {
    const response = await axios.get(`"https://crudcrud.com/api/a3d4539a91f24ed698239330ef1062f7"/candyItems`);
    return response.data;
  } catch (error) {
    console.log("Error getting candy items:", error);
    return [];
  }
}

async function createCandyItem(candyItem) {
  try {
    const response = await axios.post(`"https://crudcrud.com/api/a3d4539a91f24ed698239330ef1062f7"/candyItems`, candyItem);
    return response.data;
  } catch (error) {
    console.log("Error creating candy item:", error);
    return null;
  }
}

async function addCandyItem(event) {
  event.preventDefault();

  const candyName = document.getElementById("candy-name").value;
  const candyDescription = document.getElementById("candy-description").value;
  const candyPrice = document.getElementById("candy-price").value;
  const candyQuantity = document.getElementById("candy-quantity").value;

  const candyItem = {
    name: candyName,
    description: candyDescription,
    price: candyPrice,
    quantity: candyQuantity,
  };

  try {
    const createdItem = await createCandyItem(candyItem);
    console.log("Created candy item:", createdItem);

  
    await displayCandyItems();

  
    addCandyForm.reset();

    
    const updatedCandyItems = await getCandyItems();
    console.log("Updated candy items:", updatedCandyItems);
  } catch (error) {
    console.error("Error adding candy item:", error);
  }
}

async function decreaseQuantity(candyId, amount) {
  try {
    const candyItem = await getCandyItem(candyId);

    if (candyItem) {
      candyItem.quantity -= amount;

      if (candyItem.quantity <= 0) {
        candyItem.quantity = "Quantity is low";
      }

      await updateCandyItem(candyId, candyItem);
      await displayCandyItems();
    }
  } catch (error) {
    console.error("Error decreasing quantity:", error);
  }
}

async function getCandyItem(candyId) {
  try {
    const response = await axios.get(`"https://crudcrud.com/api/a3d4539a91f24ed698239330ef1062f7"/candyItems/{candyId}`);
    return response.data;
  } catch (error) {
    console.log("Error getting candy item:", error);
    return null;
  }
}

async function updateCandyItem(candyId, candyItem) {
  try {
    await axios.put(`"https://crudcrud.com/api/a3d4539a91f24ed698239330ef1062f7"/candyItems/${candyId}`, candyItem);
  } catch (error) {
    console.log("Error updating candy item:", error);
  }
}
