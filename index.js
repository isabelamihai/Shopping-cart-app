import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
    ref,
    push,
    onValue,
    remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
databaseURL: "https://shopping-cart-app-4f62a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "shopping items")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("add-btn")
const ulEl = document.getElementById("list-el")
const deleteBtn = document.getElementById("delete-btn")

function render(items) {
    let listItems = ""
    for (let i = 0; i < items.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${items[i]}'>
                    ${items[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const items= Object.values(snapshotValues)
        render(items)
    }
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})