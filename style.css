let currentUser = "";
let tabs = [];

function login() {
    const username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Enter username");
        return;
    }

    currentUser = username;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadSavedNote();
}

function saveNote() {

    const content = document.getElementById("editor").innerHTML;

    localStorage.setItem(currentUser + "_note", content);

    alert("Note saved!");
}

function loadSavedNote() {

    const saved = localStorage.getItem(currentUser + "_note");

    if (saved) {
        document.getElementById("editor").innerHTML = saved;
    }
}

function changeFontSize(size) {
    document.execCommand("fontSize", false, "7");

    let fontElements = document.getElementsByTagName("font");

    for (let i = 0; i < fontElements.length; i++) {
        if (fontElements[i].size == "7") {
            fontElements[i].removeAttribute("size");
            fontElements[i].style.fontSize = size;
        }
    }
}

function changeFontColor(color) {
    document.execCommand("foreColor", false, color);
}

function boldText() {
    document.execCommand("bold");
}

function italicText() {
    document.execCommand("italic");
}

function createTab() {

    const tabName = prompt("Tab name:");

    if (!tabName) return;

    tabs.push(tabName);

    const tab = document.createElement("div");
    tab.className = "tab";
    tab.innerText = tabName;

    tab.onclick = function() {
        document.getElementById("editor").innerHTML =
            localStorage.getItem(currentUser + "_" + tabName) || "";
    };

    tab.ondblclick = function() {
        const color = prompt("Enter tab background color:");
        tab.style.background = color;
    };

    document.getElementById("tabs").appendChild(tab);
}

function searchNotes() {

    const search = document.getElementById("searchBar").value.toLowerCase();

    const content = document.getElementById("editor").innerText.toLowerCase();

    if (content.includes(search)) {
        document.getElementById("editor").style.border =
            "3px solid green";
    } else {
        document.getElementById("editor").style.border =
            "3px solid red";
    }
}

document.getElementById("imageUpload").addEventListener("change", function(event) {

    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {

        const reader = new FileReader();

        reader.onload = function(e) {

            const img = document.createElement("img");
            img.src = e.target.result;

            document.getElementById("images").appendChild(img);

            localStorage.setItem(currentUser + "_image_" + i, e.target.result);
        };

        reader.readAsDataURL(files[i]);
    }
});