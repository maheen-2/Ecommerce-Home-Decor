// TO MAKE NAVBAR RESPONSIVE ON DIFF. SCREEN SIZES:
const toggleButton = document.getElementsByClassName('toggle-btn')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
})



// TO OPEN & CLOSE THE CART:
let cart = document.querySelector(".cart");
// OPEN CART:
function showCart() {
    cart.style.right = "0";
}
// CLOSE CART:
function closeCart() {
    cart.style.right = "-100%";
}


// The Document.readyState property describes the loading state of the document.
// The readyState of a document can be one of following:
// loading: The doc is still loading.
// interactive: The doc has finished loading & the doc has been parsed but sub-resources such as scripts, images, stylesheets & frames are still loading.
// complete: The doc & all sub-resources have finished loading. The state indicates that the load event is about to fire.

// The DOMContentLoaded event fires when the HTML doc has been completely parsed, & all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. 
// It doesn't wait for other things like images, subframes, and async scripts to finish loading.
// Syntax:
// addEventListener('DOMContentLoaded', (event) => {});
// onDOMContentLoaded = (event) => { };

// CART WORKING:
if (document.readyState === "loading") { // If the page is loading it will run the code in here
    addEventListener("DOMContentLoaded", ready);
} else { // But if the page is already loaded, we want to run the ready() no matter what.
    ready();
}

// MAKING FUNCTIONS:

function ready() {
    // 🟥 ADDING EVENT LISTENER TO EACH .cart-remove btn:
    let removeCartBtns = document.querySelectorAll(".cart-remove"); // Must use querySelectorAll otherwise addEventListener won't work.
    for (let i = 0; i < removeCartBtns.length; i++) { // Loop over all the .cart-remove btns.
        let button = removeCartBtns[i]; // Selecting each .cart-remove btn. 
        button.addEventListener("click", removeCartItems); // When each btn clicked, removeCartItems() passed.
    }

    // 🟩 ADDING EVENT LISTENER TO EACH .cart-quantity btn:
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged); // The change event is fired for <input>, <select>, and <textarea> elements when the user modifies the element's value. 
    }

    // 🟪 ADDING EVENT LISTENER TO EACH .add-cart btn:
    var addCart = document.querySelectorAll(".add-cart");
    for (let i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addToCartClicked);
    }
}


// event.target = element that triggered event (e.g., the user clicked on).
// event.currentTarget = element that has the event listener.

// The target property can only be obtained if the event of an element is being listened to.

// 🟥 REMOVE ITEMS FROM CART:
function removeCartItems(event) {
    let buttonClicked = event.target; // target is the remove button.
    buttonClicked.parentElement.remove(); // Here we're removing the parent div of the .cart-remove
    // UPDATE CART TOTAL IF AN ITEM IS DELETED OR NOT:
    updateCartTotal();
}

// 🟩 CHANGE INPUT CART QUANTITY:
function quantityChanged(event) {
    var input = event.target; // Target is the input element.
    if (isNaN(input.value) || input.value <= 0) { //To mek sure if the input value is not a number or if it's less than 0 than input value will automatically be set to 1.
        input.value = 1;
    }
    // UPDATE CART TOTAL IF AN ITEM'S QUANTITY IS CHANGED OR NOT:
    updateCartTotal();
}

// 🟪 ADD PRODUCTS TO CART:
function addToCartClicked(event) {
    let button = event.target; // Target is the add to cart element.
    let shopItem = button.parentElement; // Selecting the parent div of .add-cart btn i.e. .product-box.
    let title = shopItem.querySelectorAll(".product-title")[0].innerText; // Selecting titl & price from each shopItem div & must specify their index value 0 to get each 
    let price = shopItem.querySelectorAll(".price")[0].innerText; // product's price & title correctly.
    let image = shopItem.querySelectorAll(".product-img")[0].src; // For img selecting its src whereas for title & price, selecting their innerText to be displayed.
    console.log(title, price, image);
    // Now we neeed to actually add the row of each product's title, price, img into the cart & display it so we'll create a seperate function for that:
    addItemToCart(title, price, image);
    updateCartTotal();
}

function addItemToCart(title, price, image) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.querySelectorAll(".cart-content")[0];
    let cartItemsNames = cartItems.querySelectorAll(".cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item is already added in the cart.");
            return;
        }
    }
    let cartBoxContent = `
    <img src="${image}" alt="">
                <div class="detail-box">
                    <div class="cart-product-title"> ${title}</div>
                    <div class="cart-product-price"> ${price}</div>
                    <input type="number" class="cart-quantity" value="1">
                </div>
                <!-- REMOVE CART-->
                <i class="cart-remove fas fa-trash"></i>
            </div>
    `
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.querySelectorAll(".cart-remove")[0].addEventListener("click", removeCartItems);
    cartShopBox.querySelectorAll(".cart-quantity")[0].addEventListener("change", quantityChanged);
}

// UPDATE CART TOTAL IF AN ITEM IS DELETED OR NOT:
function updateCartTotal() {
    let cartContent = document.getElementsByClassName("cart-content")[0]; // The .cart-content returns an array of .cart-boxe s but we want to select only the first row.
    let cartBoxes = cartContent.getElementsByClassName("cart-box"); // Inside the .cart-content, we're selecting all .cart-box s.
    let total = 0; // Setting initial total to 0.
    for (let i = 0; i < cartBoxes.length; i++) { // Looping over all cartBox s.
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName("cart-product-price")[0]; // Selecting the first cart item's price.
        let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]; // Selecting the first cart item's quantity.
        let price = parseFloat(priceElement.innerText.replace("$", "")); // Convert string to no., replace innerText by the actual price, replace $ by nothing.
        let quantity = quantityElement.value; // .value bcuz input element doesn't hev innerText. INstead they hev value.
        total = total + (price * quantity); // Everytime I goes thru the loop of cartBoxes, it adds new total of the new cartBox into the previous cartBox one.
        total = Math.round(total * 100) / 100; // Sometimes u get a bunch of decimal nos (e.g. 100.999999), so to avoid it we'll use Math.round method & we'll specify
        // to how many digits we want to round off to (e.g. here we r rounding to 2 decimal places so we * 100) & divide it by 100.
        document.getElementsByClassName("total-price")[0].innerText = "$ " + total;
    }

}

