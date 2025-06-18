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
const listEl = document.getElementById("list-el")
const deleteBtn = document.getElementById("delete-btn")

function render(items) {
    listEl.innerHTML = "";
    for (let key in items) {
        const value = items[key]
        const li = document.createElement("li")
        li.textContent = value

        li.addEventListener("click", function() {
            const itemRef = ref(database, `shopping items/${key}`)
            remove(itemRef)  // șterge din Firebase
        })

        listEl.appendChild(li)
    }
}

    // let listItems = ""
    // for (let i = 0; i < items.length; i++) {
    //     listItems += `
    //         <li>
    //                 ${items[i]}
    //         </li>
    //     `
    // }
    // listEl.innerHTML = listItems

    onValue(referenceInDB, function(snapshot) {
        if (snapshot.exists()) {
            const snapshotValues = snapshot.val()
            render(snapshotValues)  // păstrăm cheia + valoarea
        } else {
            listEl.innerHTML = "" // dacă nu mai există date, curățăm lista
        }
    })

// onValue(referenceInDB, function(snapshot) {
//     const snapshotDoesExist = snapshot.exists()
//     if (snapshotDoesExist) {
//         const snapshotValues = snapshot.val()
//         const items = Object.values(snapshotValues)
//         render(items)
//     }
// })

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    listEl.innerHTML = ""
})

inputBtn.addEventListener("click", function () {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})

inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    push(referenceInDB, inputEl.value)
        inputEl.value = "";
    }
})

listEl.addEventListener("click", function(event) {
    if (event.target && event.target.nodeName === "LI") {
        event.target.remove();
    }
});