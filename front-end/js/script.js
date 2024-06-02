// get the form and search field
const form = document.getElementById("uploadForm");
const searchInput = document.getElementById("searchInput");

/** handle file upload request with the file data, 
    update table with the response data */
const uploadFile = async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById("jsonFile");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please choose a file first.");
    return;
  }

  const formData = new FormData();
  // add the selected file with the key "file"
  formData.append("file", file);
  try {
    const response = await fetch("/upload-file", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      updateTable(data);
      // clear the form after successful upload
      form.reset();
    } else {
      alert("File upload failed.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred.");
  }
};

// Event listener for submit event
form.addEventListener("submit", uploadFile);

// maps specific keys to corresponding values for header of Table
const headerMapping = {
  model_year: "Year",
  make: "Make",
  model: "Model",
  rejection_percentage: "Rejection%",
  reason_1: "Rejection reason #1",
  reason_2: "Rejection reason #2",
  reason_3: "Rejection reason #3",
};

// generate table header elements based on headerMapping
const createTableHeaders = (tableHeader, headers = []) => {
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = headerMapping[header] || header;
    tableHeader.appendChild(th);
  });
};

// generate table rows based on data and headers
const createTableRows = (tableBody, data = [], headers = []) => {
  data.forEach((row) => {
    const tr = document.createElement("tr");
    headers.forEach((header) => {
      const td = document.createElement("td");
      td.textContent = row[header];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
};

// update table headers and rows based on data
const updateTable = (data = []) => {
  const tableHeader = document.getElementById("tableHeader");
  const tableBody = document.getElementById("tableBody");
  // clear existing table header and rows
  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  if (Array.isArray(data) && data.length > 0) {
    const headers = Object.keys(data[0]).filter(
      (h) => h.toLowerCase() !== "id"
    );
    // create table headers and rows
    createTableHeaders(tableHeader, headers);
    createTableRows(tableBody, data, headers);
  } else {
    // handle if no data
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = "No results found";
    td.colSpan = 7;
    tr.appendChild(td);
    tableBody.appendChild(tr);
  }
};

/** handle fetching of vehicles data based on query parameter
    and updates table with the retrieved data */
const fetchVehicles = async (query = "") => {
  try {
    const response = await fetch(`/vehicles?q=${query}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    updateTable(data);
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
  }
};

// Event listener for fetching when DOM loads
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  fetchVehicles();
});

// debounced handler for search with 500ms delay
const debounce = (callback, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

// Event listener for search input
const debouncedSearchHandler = debounce(fetchVehicles);
searchInput.addEventListener("input", (event) => {
  const query = searchInput.value.trim();
  event.preventDefault();
  debouncedSearchHandler(query);
});
