const candyname = document.querySelector(".candy-input");
const candydescription = document.querySelector(".candy-description");
const candyprice = document.querySelector(".candy-price");
const candyquantity = document.querySelector(".candy-quantity");

const api =
  "https://crudcrud.com/api/a7fcdd93e8844296a870df57ea676e0a/appointmentData";

async function addcandies(event) {
  event.preventDefault();

  const obj = {
    candyName: candyname.value,
    candyDescription: candydescription.value,
    candyPrice: candyprice.value,
    candyQuantity: candyquantity.value,
  };
  console.log(obj);
  try {
    const response = await axios.post(api, obj);
    showcandies(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    await axios.get(api).then((response) => {
      console.log(response);

      response.data.forEach((element) => {
        showcandies(element);
      });
    });
  } catch (error) {
    console.log(error);
  }
});
function showcandies(obj) {
  console.log("shosw candies obhect");
  console.log(obj);
  candyname.value = "";
  candydescription.value = "";
  candyprice.value = "";
  candyquantity.value = "";

  const parentNode = document.querySelector(".candy-information");

  const childHTML = `
  <tr class="item" id=${obj._id}>
    <td>${obj.candyName}</td>
    <td>${obj.candyDescription}</td>
    <td>${obj.candyPrice}</td>
    <td>${obj.candyQuantity}</td>
    <td><button onclick="updateCandy(event, '${obj._id}',1)">Buy 1</button></td>
    <td><button onclick="updateCandy(event,'${obj._id}', 2)">Buy 2</button></td>
    <td><button onclick="updateCandy(event,'${obj._id}', 3)">Buy 3</button></td>
  </tr>
`;

  parentNode.innerHTML += childHTML;
}

async function updateCandy(event, userId, number) {
  console.log(`${api}/${userId}`);
  axios
    .get(`${api}/${userId}`)
    .then((res) => {
      update(res.data);
    })
    .catch((e) => console.log(e));

  function update(obj) {
    const num = Number(number);
    const quantityElement =
      event.target.parentElement.parentElement.children[3];
    if (num === 1 && obj.candyQuantity > 0) {
      const newQuantity = Number(quantityElement.innerText) - 1;
      updateQuantity(obj, newQuantity);

      quantityElement.innerText = newQuantity;
    } else if (num === 2 && obj.candyQuantity > 0) {
      const newQuantity = Number(quantityElement.innerHTML) - 2;
      updateQuantity(obj, newQuantity);
      quantityElement.innerText = newQuantity;
    } else if (num === 3 && obj.candyQuantity > 0) {
      const newQuantity = Number(quantityElement.innerHTML) - 3;
      updateQuantity(obj, newQuantity);
      quantityElement.innerText = newQuantity;
    } else {
      alert("The candy you want to buy is no more");
    }
  }
}

async function updateQuantity(user, newQuantity) {
  console.log(user);
  const newObj = {
    candyName: user.candyName,
    candyDescription: user.candyDescription,
    candyPrice: user.candyPrice,
    candyQuantity: `${newQuantity}`,
  };
  console.log(newObj);
  try {
    await axios.put(`${api}/${user._id}`, newObj);
    console.log("updated");
  } catch (error) {
    console.log(error);
  }
}
