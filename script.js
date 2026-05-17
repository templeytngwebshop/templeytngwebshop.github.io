let currentUser = "";
let currentTab = "";

function registerUser() {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  if (!username || !password) {
    alert("Enter username/password");
    return;
  }

  localStorage.setItem(
    "user_" + username,
    password
  );

  alert("Account created!");
}

function loginUser() {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  const saved =
    localStorage.getItem(
      "user_" + username
    );

  if (saved === password) {

    currentUser = username;

    document.getElementById("loginPage")
      .style.display = "none";

    document.getElementById("app")
      .style.display = "block";

    loadTabs();

  } else {
    alert("Wrong password");
  }
}

function createNotebook() {

  const name =
    prompt("Notebook name");

  if (!name) return;

  const tabs =
    JSON.parse(
      localStorage.getItem(
        currentUser + "_tabs"
      )
    ) || [];

  tabs.push(name);

  localStorage.setItem(
    currentUser + "_tabs",
    JSON.stringify(tabs)
  );

  renderTab(name);
}

function renderTab(name) {

  const tab =
    document.createElement("div");

  tab.className = "tab";
  tab.innerText = name;

  tab.onclick = () => openTab(name);

  tab.ondblclick = () => {

    const color =
      prompt("Tab color");

    tab.style.background = color;
  };

  document.getElementById("tabs")
    .appendChild(tab);
}

function openTab(name) {

  currentTab = name;

  document.getElementById("noteTitle")
    .value = name;

  const content =
    localStorage.getItem(
      currentUser + "_note_" + name
    );

  document.getElementById("editor")
    .innerHTML = content || "";

  loadImages();
}

function saveNote() {

  if (!currentTab) {
    alert("Create notebook first");
    return;
  }

  const content =
    document.getElementById("editor")
    .innerHTML;

  localStorage.setItem(
    currentUser + "_note_" + currentTab,
    content
  );

  alert("Saved");
}

function loadTabs() {

  const tabs =
    JSON.parse(
      localStorage.getItem(
        currentUser + "_tabs"
      )
    ) || [];

  tabs.forEach(tab => renderTab(tab));
}

function setFontColor(color) {

  document.execCommand(
    "foreColor",
    false,
    color
  );
}

function formatText(command) {

  document.execCommand(
    command,
    false,
    null
  );
}

function setFontSize(size) {

  document.execCommand(
    "fontSize",
    false,
    "7"
  );

  const fonts =
    document.getElementsByTagName("font");

  for (let i = 0; i < fonts.length; i++) {

    if (fonts[i].size == "7") {

      fonts[i].removeAttribute("size");

      fonts[i].style.fontSize = size;
    }
  }
}

function searchNotes() {

  const search =
    document.getElementById("search")
    .value.toLowerCase();

  const text =
    document.getElementById("editor")
    .innerText.toLowerCase();

  if (text.includes(search)) {

    document.getElementById("editor")
      .style.border =
      "3px solid green";

  } else {

    document.getElementById("editor")
      .style.border =
      "3px solid red";
  }
}

function changeTheme(color) {

  document.body.style.background =
    color;
}

document.getElementById("imageUpload")
.addEventListener("change", function(e) {

  const file = e.target.files[0];

  if (!file || !currentTab) return;

  const reader =
    new FileReader();

  reader.onload = function(event) {

    const imageData =
      event.target.result;

    const images =
      JSON.parse(
        localStorage.getItem(
          currentUser +
          "_images_" +
          currentTab
        )
      ) || [];

    images.push(imageData);

    localStorage.setItem(
      currentUser +
      "_images_" +
      currentTab,

      JSON.stringify(images)
    );

    loadImages();
  };

  reader.readAsDataURL(file);
});

function loadImages() {

  const container =
    document.getElementById(
      "imageContainer"
    );

  container.innerHTML = "";

  const images =
    JSON.parse(
      localStorage.getItem(
        currentUser +
        "_images_" +
        currentTab
      )
    ) || [];

  images.forEach(image => {

    const img =
      document.createElement("img");

    img.src = image;

    container.appendChild(img);
  });
}