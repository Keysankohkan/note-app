const addBtn = document.getElementById("add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
    <div class="tools">
        <button class="edit hidden"><i class="fas fa-edit"></i></button>
        <button class="checked"><i class="fas fa-check"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector(".edit");
    const checkBtn = note.querySelector(".checked");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textarea = note.querySelector("textarea");
    textarea.value = text;
    main.innerHTML = marked(text);
    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLS();
    });
    checkBtn.addEventListener("click", () => {
        checkBtn.classList.toggle("hidden")
        editBtn.classList.toggle("hidden")
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });
    editBtn.addEventListener("click", () => {
        checkBtn.classList.toggle("hidden")
        editBtn.classList.toggle("hidden")
        main.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
    });
    textarea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });
    document.body.appendChild(note);
}

function updateLS() {
    const noteText = document.querySelectorAll("textarea");
    const notes = [];
    noteText.forEach((note) => note.push(note.value));
    localStorage.setItem("notes", JSON.stringify(notes));
}