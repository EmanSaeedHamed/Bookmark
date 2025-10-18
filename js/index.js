var siteNameInput = document.getElementById("siteName");
var siteLinkInput = document.getElementById("siteLink");
var card = document.getElementById("card");
var books = [];
var regex = {
        siteName : {
            value : /.{3}/,
            isValid : false
        },
        siteLink : {
            value : /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            isValid : false
        }
    };

if(localStorage.getItem("books") !== null){
    books = JSON.parse(localStorage.getItem("books"));
    displayBook();
}

function addBook() {
    validateBook(siteLinkInput)
    validateBook(siteNameInput)
    if(regex.siteName.isValid == false || regex.siteLink.isValid == false) {
        card.classList.add("d-block");
        card.classList.remove("d-none")
        clearForm();
        return;
    }
    var book = {
        bookName : siteNameInput.value,
        bookLink : siteLinkInput.value,
    };

    books.push(book);
    displayBook();
    localStorage.setItem("books",JSON.stringify(books));
    clearForm();
}

function displayBook() {
    var cartona = "";
    for (let i = 0; i < books.length; i++) {
        cartona += `
               <tr>
              <td scope="row">${i+1}</td>
              <td>${books[i].bookName}</td>
              <td>
  <a href="${books[i].bookLink}" target="_blank"
     class="btn visit-btn text-white text-nowrap">
    <i class="fa-solid fa-eye"></i> Visit
  </a>
</td>

              <td><button onclick="deleteBook(${i})" class="btn delete-btn text-white text-nowrap"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `
    }  
    
    document.getElementById("formBody").innerHTML = cartona;
}

function deleteBook(i) {
    books.splice(i,1);
    displayBook();
    localStorage.setItem("books",JSON.stringify(books));
}

function clearForm() {
    siteNameInput.value = "";
    siteLinkInput.value = "";
    siteNameInput.classList.remove("is-valid");
    siteLinkInput.classList.remove("is-valid");
    siteLinkInput.classList.remove("is-invalid");
    siteNameInput.classList.remove("is-invalid");
    
}

function validateBook(element) {

    if(regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        regex[element.id].isValid = true;
    }
    else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        regex[element.id].isValid = false;
    }

    if(element.value == "") {
        element.classList.remove("is-invalid");
        regex[element.id].isValid = false;
    }
}


function closeCard() {
    card.classList.add("d-none");
    card.classList.remove("d-block")
}