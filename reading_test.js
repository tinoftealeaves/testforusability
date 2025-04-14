function loadBookText(filename) {
  fetch(filename)
    .then(response => response.text())
    .then(data => {
      document.getElementById("book-text").innerHTML = data;
    })
    .catch(error => {
      document.getElementById("book-text").textContent = "Failed to load book text.";
      console.error(error);
    });
}

const bookData = JSON.parse(localStorage.getItem("currentBook"));

if (bookData) {
  document.getElementById("book-title").textContent = bookData.title;
  document.getElementById("book-image").src = bookData.image;

  const bookFiles = {
    "Romeo and Juliet": "romeoandjuliet.txt",
    "Sense and Sensibility": "senseandsensibility.txt"
  };

  const filename = bookFiles[bookData.title];

  if (filename) {
    loadBookText(filename);
  } else {
    document.getElementById("book-text").textContent = "No book text available.";
  }
} else {
  document.getElementById("book-title").textContent = "No book selected.";
}

let selectedWord ="";

document.getElementById("book-text").addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const word = selection.toString().trim();

  if (word.length > 0) {
   selectedWord=word;
   fetchDefinition(word);
  }
});


function showDefinition(message) {
  const popup = document.getElementById("dictionary-popup");
  const defText = document.getElementById("definition-text");

  defText.textContent = message;
  popup.classList.remove("hidden");
}


function closeDefinition() {
  document.getElementById("dictionary-popup").classList.add("hidden");
}

function fetchDefinition(word) {
  console.log("Looking up:", word); // ✅ NEW LINE

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(data => {
      console.log("API response:", data); // ✅ NEW LINE

      const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
      if (definition) {
        showDefinition(`${word}: ${definition}`);
      } else {
        showDefinition(`${word}: No definition found.`);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error); // ✅ NEW LINE
      showDefinition(`${word}: No definition found.`);
    });
}

function highlightSelectedWord() {
  if (!selectedWord) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
  
    const span = document.createElement("span");
    span.className = "highlighted";
    span.textContent = selectedWord;

    range.deleteContents();
    range.insertNode(span);

  selectedWord = ""; // Reset after highlight
}

