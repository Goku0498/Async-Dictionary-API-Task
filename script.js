document.addEventListener("DOMContentLoaded", function () {
  // Create container for the search area
  let cont1 = document.createElement("div");
  cont1.id = "cont1";

  // Create and append header
  let header = document.createElement("h1");
  header.textContent = "Dictionary";
  cont1.appendChild(header);

  // Create and append search box
  let searchBox = document.createElement("input");
  searchBox.type = "text";
  searchBox.id = "search-box";
  searchBox.placeholder = "Enter a word...";
  cont1.appendChild(searchBox);

  // Create and append radio buttons
  let optionsDiv = document.createElement("div");
  optionsDiv.id = "options";

  let options = [
      { label: "Definitions", value: "definitions" },
      { label: "Synonyms", value: "synonyms" },
      { label: "Examples", value: "examples" },
      { label: "Rhymes", value: "rhymes" }
  ];

  options.forEach(option => {
      let label = document.createElement("label");
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "option";
      radio.value = option.value;
      if (option.value === "definitions") {
          radio.checked = true; // Default checked radio button
      }
      label.appendChild(radio);
      label.appendChild(document.createTextNode(option.label));
      optionsDiv.appendChild(label);
  });

  cont1.appendChild(optionsDiv);

  // Create and append the Get Detail button
  let getDetailButton = document.createElement("button");
  getDetailButton.id = "get-detail";
  getDetailButton.textContent = "Get Detail";
  cont1.appendChild(getDetailButton);

  // Append the container to the body
  document.body.appendChild(cont1);

  // Create the container for the results
  let cont2 = document.createElement("div");
  cont2.id = "cont2";
  document.body.appendChild(cont2);

  // Event listener for button click
  getDetailButton.addEventListener("click", async function () {
      let word = searchBox.value.trim();
      let option = document.querySelector('input[name="option"]:checked').value;

      if (word === '') {
          alert('Please enter a word!');
          return;
      }

      let url = `https://wordsapiv1.p.mashape.com/words/${word}/${option}`;
      let apiKey = 'YOUR_MASHAPE_API_KEY'; // Replace with your API key

      try {
          let response = await fetch(url, {
              method: 'GET',
              headers: {
                  'X-Mashape-Key': apiKey,
                  'X-Mashape-Host': 'wordsapiv1.p.mashape.com'
              }
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          let data = await response.json();
          displayData(data, option);
      } catch (error) {
          alert('Error fetching data. Please try again.');
          console.error('Fetch error:', error);
      }
  });

  function displayData(data, option) {
      cont2.innerHTML = '';

      let tableContainer = document.createElement('div');
      tableContainer.classList.add('table-container');

      let table = document.createElement('table');
      let thead = document.createElement('thead');
      let tbody = document.createElement('tbody');

      let headerRow = document.createElement('tr');
      let th = document.createElement('th');
      th.textContent = capitalizeFirstLetter(option);
      headerRow.appendChild(th);
      thead.appendChild(headerRow);

      data[option].forEach(item => {
          let row = document.createElement('tr');
          let td = document.createElement('td');
          td.textContent = item;
          row.appendChild(td);
          tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      tableContainer.appendChild(table);
      cont2.appendChild(tableContainer);

      cont2.style.display = 'block';
  }

  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
