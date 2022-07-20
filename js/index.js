// getElement ID
function getEle(id) {
  return document.getElementById(id);
}

// getListProduct
let listProduct = [];

function getListProduct() {
  // Pending
  getEle("lds-roller").style.display = "block";

  axios({
    url: "https://62c2438e2af60be89ed4b593.mockapi.io/productAPI/Products",
    method: "GET",
  })
    .then((result) => {
      setTimeout(() => {
        getEle("lds-roller").style.display = "none";
        renderProduct(result.data);
      }, 1000);
    })
    .catch((error) => {
      getEle("lds-roller").style.display = "none";
      console.log(error);
    });
}

getListProduct(renderProduct);

// renderProduct
function renderProduct(data) {
  let contentHTML = "";

  for (let i = 0; i < data.length; i++) {
    let productImg = data[i].img.includes("https")
      ? data[i].img
      : `./../../assets/img/${data[i].img}`;

    contentHTML += `
    <tr>
        <th scope="row"><b>${i + 1}</b></th>
        <td>${data[i].name}</td>
        <td>
            <img width="50px" 
            src="${productImg}" 
            alt="${data[i].name}"
            >
        </td>
        <td>${data[i].price}$</td>
        <td>
            <p>${data[i].desc}</p>
            <p>Screen: ${data[i].screen} inch</p>
            <p>Back Camera: ${data[i].backCamera}</p>
            <p>Front Camera: ${data[i].frontCamera}</p>
        </td>
        <td>${data[i].type}</td>
        <td>
        <button onclick="getProduct('${
          data[i].id
        }')" class="btn btn-primary btn-block text-uppercase">
          Edit
        </button>
      </td>
      <td>
        <button onclick="deleteProduct('${
          data[i].id
        }')" class="btn btn-primary btn-block text-uppercase">
          Delete
        </button>
      </td>
  </tr>
      `;
  }
  getEle("tblProducts").innerHTML = contentHTML;
}

function handleAddButton() {
  document.getElementById("prName").value = "";
  document.getElementById("prPrice").value = "";
  document.getElementById("prScreen").value = "";
  document.getElementById("prBackCamera").value = "";
  document.getElementById("prFrontCamera").value = "";

  document.getElementById("prImg").value = "";
  document.getElementById("prDesc").value = "";
  document.getElementById("prId").value = "";

  document.getElementById("btnUpdateProduct").style.display = "none";
  document.getElementById("btnAddProduct").style.display = "inline";
}

// CreateProduct
function createProduct() {
  let isValid = validateForm();

  if (!isValid) return;

  let productName = document.getElementById("prName").value;
  let productPrice = document.getElementById("prPrice").value;
  let productScreen = document.getElementById("prScreen").value;
  let productBackCamera = document.getElementById("prBackCamera").value;
  let productFrontCamera = document.getElementById("prFrontCamera").value;

  let productImg = document.getElementById("prImg").value;
  let productDesc = document.getElementById("prDesc").value;
  let productTpye = document.getElementById("prType").value;

  let product = new Product(
    productName,
    productPrice,
    productScreen,
    productBackCamera,
    productFrontCamera,
    productImg,
    productDesc,
    productTpye
  );

  axios({
    url: "https://62c2438e2af60be89ed4b593.mockapi.io/productAPI/Products",
    method: "POST",
    data: product,
  })
    .then((res) => {
      getListProduct();
      document.getElementById("btnCloseModal").click();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Delete Product
function deleteProduct(id) {
  axios({
    url: "https://62c2438e2af60be89ed4b593.mockapi.io/productAPI/Products/" + id,
    method: "DELETE",
  })
    .then((res) => {
      alert("Delete");
      getListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Get Product
function getProduct(id) {
  axios({
    url: "https://62c2438e2af60be89ed4b593.mockapi.io/productAPI/Products/" + id,
    method: "GET",
  })
    .then((res) => {
      document.getElementById("btnAddNewProduct").click();

      if (id) {
        document.getElementById("prName").value = res.data.name;
        document.getElementById("prPrice").value = res.data.price;
        document.getElementById("prScreen").value = res.data.screen;
        document.getElementById("prBackCamera").value = res.data.backCamera;
        document.getElementById("prFrontCamera").value = res.data.frontCamera;
        document.getElementById("prImg").value = res.data.img;
        document.getElementById("prDesc").value = res.data.desc;
        document.getElementById("prId").value = res.data.id;
      }

      document.getElementById("btnAddProduct").style.display = "none";
      document.getElementById("btnUpdateProduct").style.display = "inline";
    })
    .catch((err) => {
      console.log(err);
    });
}

// Update Product
function updateProduct() {
  let productName = document.getElementById("prName").value;
  let productPrice = document.getElementById("prPrice").value;
  let productScreen = document.getElementById("prScreen").value;
  let productBackCamera = document.getElementById("prBackCamera").value;
  let productFrontCamera = document.getElementById("prFrontCamera").value;

  let productImg = document.getElementById("prImg").value;
  let productDesc = document.getElementById("prDesc").value;
  let productTpye = document.getElementById("prType").value;
  let productId = document.getElementById("prId").value;

  let product = new Product(
    productName,
    productPrice,
    productScreen,
    productBackCamera,
    productFrontCamera,
    productImg,
    productDesc,
    productTpye
  );

  axios({
    url: "https://62c2438e2af60be89ed4b593.mockapi.io/productAPI/Products/" + productId,
    method: "PUT",
    data: product,
  })
    .then((res) => {
      getListProduct();
      document.getElementById("btnCloseModal").click();

      // Reset
      productName = "";
      productPrice = "";
      productScreen = "";
      productBackCamera = "";
      productFrontCamera = "";
      productImg = "";
      productDesc = "";
    })
    .catch((err) => {
      console.log(err);
    });
}

document.getElementById("btnCloseModal").addEventListener("click", function () {
  document.getElementById("prName").value = "";
  document.getElementById("prPrice").value = "";
  document.getElementById("prScreen").value = "";
  document.getElementById("prBackCamera").value = "";
  document.getElementById("prFrontCamera").value = "";

  document.getElementById("prImg").value = "";
  document.getElementById("prDesc").value = "";
  document.getElementById("prId").value = "";

  document.getElementById("btnAddProduct").style.display = "inline";
  document.getElementById("btnUpdateProduct").style.display = "none";
});

// Validation form
function validateForm() {
  let isValid = true;

  let prId = document.getElementById("prId").value;
  let productName = document.getElementById("prName").value;
  let productPrice = document.getElementById("prPrice").value;
  let productImg = document.getElementById("prImg").value;
  let productScreen = document.getElementById("prScreen").value;
  let productBackCamera = document.getElementById("prBackCamera").value;
  let productFrontCamera = document.getElementById("prFrontCamera").value;
  let productDesc = document.getElementById("prDesc").value;

  isValid &= checkReuired(productName, "spanName");

  isValid &=
    checkReuired(productPrice, "spanPrice") && checkNumber(productPrice, "spanPrice");

  isValid &= checkReuired(productScreen, "spanScreen");

  isValid &= checkReuired(productBackCamera, "spanBackCam");

  isValid &= checkReuired(productFrontCamera, "spanFrontCam");

  isValid &= checkReuired(productImg, "spanImg");

  //   isValid &= checkType(prId, "spanType");

  return isValid;
}

// checkReuired
function checkReuired(val, spanId) {
  if (val.length > 0) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = "* Trường này bắt buộc nhập";
  return false;
}

// check number
function checkNumber(val, spanId) {
  let letter = /^[0-9]+$/;
  if (val.match(letter)) {
    // true
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  // false
  document.getElementById(spanId).innerHTML = "* Vui lòng nhập số";
  return true;
}
