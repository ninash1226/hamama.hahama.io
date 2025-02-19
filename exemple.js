const apiKey = "sk-DG8967b5993dee1008427";
const resultsContainer = document.getElementById("resultsContainer");


// חיפוש צמח
async function searchPlant() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!query) return;

    const response = await fetch(`https://perenual.com/api/species-list?key=${apiKey}&q=${query}`);
    const data = await response.json();
    console.log(data.data)
    flower = undefined
    data.data.forEach(element => {
        if(element.common_name == query){
            if(!flower)
            flower = element
            
        }
    });
    console.log(flower.id)

    fetch(`https://perenual.com/api/v2/species/details/${flower.id}?key=sk-DG8967b5993dee1008427`)
  .then(response => response.text())
  .then(result =>addToGallery(result))
  .catch(error => console.log('error', error));
  
   
}

// הוספת כרטיס חדש עם צמח
function addToGallery(plant) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${plant.default_image ? plant.default_image.original_url : 'https://via.placeholder.com/250'}" alt="${plant.common_name}">
        <div class="card-body">
            <h4>${plant.common_name}</h4>
        </div>
    `;

    // אירוע לחיצה לפתיחת מודל
    card.addEventListener("click", () => openModal(plant));

    resultsContainer.appendChild(card);
}

// פתיחת המודל
function openModal(plant) {
    document.getElementById("modalImage").src = plant.default_image ? plant.default_image.original_url : 'https://via.placeholder.com/250';
    document.getElementById("modalName").innerText = plant.common_name;

    const modalList = document.getElementById("modalList");
    modalList.innerHTML = `
        <li><strong>Temperature:</strong> ${plant.temperature_minimum ? plant.temperature_minimum.celsius + "°C" : "Unknown"}</li>
        <li><strong>Watering:</strong> ${plant.watering || "Unknown"}</li>
    `;

    document.getElementById("plantModal").style.display = "flex";
}

// סגירת המודל
function closeModal() {
    document.getElementById("plantModal").style.display = "none";
}

// חיפוש בלחיצה על Enter
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchPlant();
    }
});
// הוספת כרטיס חדש עם צמח
function addToGallery(plant) {
    // בדיקה אם הצמח כבר קיים בגלריה
    const existingCards = document.querySelectorAll(".card h4");
    for (let card of existingCards) {
        if (card.innerText.toLowerCase() === plant.common_name.toLowerCase()) {
            alert("This plant is already in the list!");
            card.parentElement.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
            card.parentElement.parentElement.style.border = "2px solid red"; // הדגשה זמנית
            setTimeout(() => {
                card.parentElement.parentElement.style.border = "none";
            }, 2000);
            return;
        }
    }

    // יצירת כרטיס חדש
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${plant.default_image ? plant.default_image.original_url : 'https://via.placeholder.com/250'}" alt="${plant.common_name}">
        <div class="card-body">
            <h4>${plant.common_name}</h4>
        </div>
    `;

    // אירוע לחיצה לפתיחת מודל
    card.addEventListener("click", () => openModal(plant));

    resultsContainer.appendChild(card);
}
