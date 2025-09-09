const plantsAPI = "https://openapi.programming-hero.com/api/plants";
const categoriesAPI = "https://openapi.programming-hero.com/api/categories";
const plantsContainer = document.getElementById("plants-container");
const categoryList = document.getElementById("category-list");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total");
const createdModal = document.getElementById("modal-div");
const spinner = document.getElementById("spinner");

let plants = [];
let categories = [];
let cart = [];

function showLoader() {
    spinner.classList.remove("hidden");
}
function hideLoader() {
    spinner.classList.add("hidden");
}

async function loadPlants() {
    const res = await fetch(plantsAPI);
    const data = await res.json();
    plants = data.plants;
    renderPlants(plants);
}

async function loadCategories() {
    const res = await fetch(categoriesAPI);
    const data = await res.json();
    categories = data.categories;
    categories.forEach(cat => {
        const li = document.createElement("li");
        li.textContent = cat.category_name;
        li.className = "cursor-pointer p-2 rounded hover:bg-green-200";
        li.dataset.category = cat.category_name;
        li.addEventListener("click", () => filterByCategory(cat.category_name));
        categoryList.appendChild(li);
    });
}

function modal(plant) {
    createdModal.innerHTML = `
      <div class="bg-white max-sm:w-[90%] rounded w-[30%] h-auto py-8 px-5 relative">
        <h1 class="font-bold text-2xl mb-4">${plant.name}</h1>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-[200px] object-cover rounded">
        <h1 class="font-bold text-lg my-2">Category: ${plant.category}</h1>
        <h2 class="font-bold text-lg mb-2">Price: ট ${plant.price}</h2>
        <p class="text-gray-700 mb-4">${plant.description}</p>
        <button id="modal-close-button" class="relative right-0 btn px-4 py-2 rounded">Close</button>
      </div>
    `;
    createdModal.classList.remove("hidden");

    document.getElementById("modal-close-button").addEventListener("click", () => {
        createdModal.classList.add("hidden");
    });
}

function renderPlants(plantsDate) {
    showLoader();
    plantsContainer.innerHTML = "";
    setTimeout(() =>{
        plantsDate.forEach(plant => {
            const card = document.createElement("div");
            card.className = "bg-white p-4 rounded shadow flex flex-col  w-[318.94px] h-[296px] max-sm:w-[100%] max-sm:h-auto";
            card.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}" class="h-32 w-full object-cover rounded">
                <h1 class= "font-semibold mt-2">${plant.name}</h1>
                <p class= "text-sm text-gray-700">${plant.description.slice(0, 60)}...</p>
                <p class="text-green-600 text-sm mt-1">${plant.category}</p>
                <div class="flex justify-between items-center mt-auto pt-2">
                    <span class="font-bold">ট ${plant.price}</span>
                    <button class="cursor-pointer bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" data-id="${plant.id}">
                      Add to Cart
                    </button>
                </div>
                `;
            card.querySelector("h1").addEventListener("click", () => {
                modal(plant);
            });
            const btn = card.querySelector("button");
            btn.addEventListener('click', () => {
                alert(`${plant.name} has been added to the card`)
                addTocart(plant)
            });
            plantsContainer.appendChild(card);
        });
    hideLoader();
    }, 100);
}

function renderCard() {
    showLoader();
    setTimeout(() => {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
            const div = document.createElement("div");
            div.className = "flex justify-between items-center mb-2 bg-[#CFF0DC] rounded px-4 py-2"
            div.innerHTML = `
            <div>
                <h2>${item.name}</h2>
                <p class="font-bold pt-1">ট ${item.price} x ${item.qty}</p>
            </div>
            <button class="text-red-600">✕</button>
            `;
            div.querySelector("button").addEventListener('click', () => removeFromCard(item.id));
            cartItems.appendChild(div)
        })
        totalPrice.textContent = total;
    hideLoader();
    }, 0);

}

function filterByCategory(category) {
    document.querySelectorAll("#category-list li").forEach(li => {
        li.classList.remove("bg-green-600", "text-white");
    });
    event.target.classList.add("bg-green-600", "text-white");
    if (category === "All Tress") {
        renderPlants(plants);
    }
    else {
        renderPlants(plants.filter(p => p.category === category));
    }
}

function addTocart(plant) {
    const exists = cart.find(item => item.id === plant.id);
    if (exists) {
        exists.qty += 1;
    }
    else {
        cart.push({ ...plant, qty: 1 });
    }
    renderCard();
}

function removeFromCard(id) {
    cart = cart.filter(item => item.id !== id);
    renderCard()
}

document.getElementById('all-tress-name').addEventListener('click', () => {
    document.querySelectorAll("#category-list li").forEach(li => {
        li.classList.remove("bg-green-600", "text-white");
    });
    event.target.classList.add("bg-green-600", "text-white");
    renderPlants(plants);
})

loadPlants();
loadCategories();