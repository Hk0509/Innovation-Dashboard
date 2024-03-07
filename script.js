// Function For toggle dropdown visibility

let dropDown = function (i) {
  if (i.style.display === "none") {
    i.style.display = "block";
  } else {
    i.style.display = "none";
  }
};

let pressedBtn = document.getElementById("headBtn");
let listElements = document.getElementById("btnElement");

let pressedBtn1 = document.getElementById("headBtn1");
let listElements1 = document.getElementById("btnElement1");

let pressedBtn2 = document.getElementById("headBtn2");
let listElements2 = document.getElementById("btnElement2");

let pressedBtn3 = document.getElementById("headBtn3");
let listElements3 = document.getElementById("btnElement3");

let pressedBtn4 = document.getElementById("headBtn4");
let listElements4 = document.getElementById("btnElement4");

pressedBtn.addEventListener("click", function () {
  dropDown(listElements);
});

pressedBtn1.addEventListener("click", function () {
  dropDown(listElements1);
});

pressedBtn2.addEventListener("click", function () {
  dropDown(listElements2);
});

pressedBtn3.addEventListener("click", function () {
  dropDown(listElements3);
});

pressedBtn4.addEventListener("click", function () {
  dropDown(listElements4);
});

// Search Box

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let searchTerm = document.getElementById("searchInput").value.toLowerCase();

    let rows = document.querySelectorAll(".tableData tbody tr");

    // Loop through each row and hide/show based on search term
    rows.forEach(function (row) {
      let companyName = row
        .querySelector(".brand-Name")
        .textContent.toLowerCase();
      if (companyName.includes(searchTerm)) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  });

// SideBar

document.querySelectorAll("#Delete").forEach((button) => {
  button.addEventListener("click", function () {
    // Find the closest table row (parentElement) and remove it
    const row = this.closest("tr");
    if (row) {
      row.remove();
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('tbody tr td:first-child');
  const selectedCount = document.getElementById('selectedCount');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', updateSelectedCount);
  });

  function updateSelectedCount() {
    const selectedRows = document.querySelectorAll('tbody tr td:first-child input:checked');
    selectedCount.textContent = selectedRows.length;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to update the count in the last row
  function updateRowCount() {
    var table = document.querySelector("table");
    var rowCount = table.rows.length - 1; // Exclude the header row

    // Update the count in the last row
    var lastRow = table.rows[rowCount];
    var cell = lastRow.cells[0];
    cell.textContent = rowCount + " Count";

    // Update the count in the bottom button area
    var rowCount = document.getElementById("rowCount");
    rowCount.textContent = rowCount;
  }
  
  // Call the updateRowCount function initially
  updateRowCount();
});

  document.addEventListener("DOMContentLoaded", function () {
    const categoryDropdown = document.querySelector('.dropdown-options .option:nth-child(1)');
    const tagsDropdown = document.querySelector('.dropdown-options .option:nth-child(2)');

    categoryDropdown.addEventListener('click', function (event) {
      event.preventDefault();
      filterTable('Category', event.target.textContent.trim());
    });

    tagsDropdown.addEventListener('click', function (event) {
      event.preventDefault();
      filterTable('Tags', event.target.textContent.trim());
    });

    function filterTable(filterType, filterValue) {
      const rows = document.querySelectorAll('.tableData tbody tr');

      rows.forEach(row => {
        const category = row.querySelector('.table-category').textContent.trim();
        const tags = Array.from(row.querySelectorAll('.tag')).map(tag => tag.textContent.trim());

        if ((filterType === 'Category' && category === filterValue) ||
            (filterType === 'Tags' && tags.includes(filterValue))) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    }
  });


  //Filter Functionality
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-options .sub-options a").forEach(function (option) {
      option.addEventListener("click", function (event) {
        event.preventDefault();
        var selectedOption = event.target.textContent.trim();
        filterTable(selectedOption);
      });
    });
  });
 document.addEventListener('DOMContentLoaded', function () {
    const categoryOptions = document.querySelectorAll('.dropdown-options .option-dropdown .sub-options a');
    const tagsOptions = document.querySelectorAll('.dropdown-options .option-dropdown:nth-child(2) .sub-options a');
    const tableRows = document.querySelectorAll('.tableData tbody tr');

    function filterTableRows(selectedCategory, selectedTags) {
      tableRows.forEach(row => {
        const categoryCell = row.querySelector('.table-category');
        const tagsCell = row.querySelector('.tag');
        const showRow = (!selectedCategory || categoryCell.textContent.includes(selectedCategory)) &&
                        (!selectedTags.length || Array.from(tagsCell).some(tag => selectedTags.includes(tag.textContent)));

        row.style.display = showRow ? '' : 'none';
      });
    }

    function resetTableRows() {
      tableRows.forEach(row => {
        row.style.display = '';
      });
    }

    //Filter based on category
    categoryOptions.forEach(option => {
      option.addEventListener('click', function () {
        const selectedCategory = this.textContent;
        const selectedTags = Array.from(document.querySelectorAll('.option:nth-child(2) .selected')).map(tag => tag.textContent);

        resetTableRows();
        filterTableRows(selectedCategory, selectedTags);
      });
    });

    //Filter based on tags
    tagsOptions.forEach(option => {
      option.addEventListener('click', function () {
        const selectedTags = Array.from(this.parentNode.querySelectorAll('.selected')).map(tag => tag.textContent);
        const selectedCategory = document.querySelector('.option-dropdown .sub-options .selected').textContent;

        resetTableRows();
        filterTableRows(selectedCategory, selectedTags);
      });
    });
  });

  //Sorting
  document.addEventListener("DOMContentLoaded", function () {
    const sortButton = document.getElementById("sortButton");
    let isAscending = true;
    const tableBody = document.querySelector('.tableData tbody');
    let lastRow = document.getElementById('lastRow');
  
    sortButton.addEventListener("click", function () {
      sortTableData(isAscending);
      isAscending = !isAscending;
    });
  
    function sortTableData(ascending) {
      const rows = Array.from(tableBody.querySelectorAll('tr:not(#lastRow)'));
  
      rows.sort((rowA, rowB) => {
        const brandNameA = rowA.querySelector('.brand-Name').textContent.trim();
        const brandNameB = rowB.querySelector('.brand-Name').textContent.trim();
  
        if (ascending) {
          return brandNameA.localeCompare(brandNameB);
        } else {
          return brandNameB.localeCompare(brandNameA);
        }
      });
  
      while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
  
      //Handling last row
      rows.forEach(row => {
        tableBody.appendChild(row);
      });
  
      tableBody.appendChild(lastRow);
    }
  });

  //Search bar
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
        filterBrands(searchInput.value.trim().toLowerCase());
    });

    function filterBrands(searchText) {
        const tableBody = document.querySelector('.tableData tbody');
        const rows = Array.from(tableBody.querySelectorAll('tr:not(#lastRow)'));

        rows.forEach(row => {
            const brandName = row.querySelector('.brand-Name').textContent.trim().toLowerCase();
            const isMatch = brandName.includes(searchText);

            row.style.display = isMatch ? '' : 'none';
        });
    }
});

//Import Export
document.addEventListener("DOMContentLoaded", function () {
  const importExportBtn = document.getElementById("importExportBtn");
  const importExportOptions = document.getElementById("importExportOptions");
  const importOption = document.getElementById("importOption");
  const exportOption = document.getElementById("exportOption");

  importExportBtn.addEventListener("click", function () {
    importExportOptions.classList.toggle("show");
  });


  exportOption.addEventListener("click", function () {
    exportTableToExcel();
    importExportOptions.classList.remove("show");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches("#importExportBtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-options");
      for (const dropdown of dropdowns) {
        if (dropdown.classList.contains("show")) {
          dropdown.classList.remove("show");
        }
      }
    }
  });

  function exportTableToExcel() {
    const table = document.querySelector(".tableData");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  }
});
