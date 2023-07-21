var bookName = document.getElementById("bookName");
var website = document.getElementById("website");
var bookContainer;
var z;
var y;
var x;

if (localStorage.getItem('myBook') != null)
{
    bookContainer = JSON.parse(localStorage.getItem('myBook'));
    displayBook(bookContainer);
}
else {
    bookContainer = [];
}
    

function addBook() {
        search();
        if (z == "2" || y == "2" || x == "2") {
                alert("Enter valid book");
        }
        
        else {
                var book = {
                        name: bookName.value,
                        website: website.value,
                }
                bookContainer.push(book);
                localStorage.setItem('myBook', JSON.stringify(bookContainer));
                displayBook(bookContainer);
                
        }
}

function displayBook(data)
{
    var listTable = "";
    for (var i = 0; i < data.length; i++)
    {
            listTable +=`<tr>
        <td>${i+1}</td>
        <td>${data[i].name}</td>
        <td><button class="btn btn-visit px-4 text-white"><a href="${data[i].website}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
        <td><button class="btn px-4 btn-danger" onclick="deleteBook(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`
    }
        document.getElementById("tableItem").innerHTML = listTable;
        reset();
    
}


function reset()
{
        bookName.value = "";
     website.value = "";
}

console.log(bookContainer);
function deleteBook(index)
{
    bookContainer.splice(index, 1);
    localStorage.setItem('myBook', JSON.stringify(bookContainer));
    displayBook(bookContainer);
}


function validateWebsite()
{
        var regx = /^(http|https):\/\/.{1,}\.com$/gm;
        if (regx.test(website.value))
        { 
                document.getElementById("valid-website").innerHTML = `<span class="text-success ps-2"><i class="fa-regular fa-circle-check"></i></span>`
                y = 1;
                return z;
        }
        else {
                document.getElementById("valid-website").innerHTML=`<span class="text-danger ps-2"><i class="fa-regular fa-circle-xmark"></i></span>`
                y = 2;
                return y;
        }

        
}


function validateName()
{
        
        var regx = /^\w{3,}$/gm;
        if (regx.test(bookName.value))
        {        
                document.getElementById("valid-name").innerHTML = `<span class="text-success ps-2"><i class="fa-regular fa-circle-check"></i></span>`
                z = 1;
                return z;
        }
        else {
                document.getElementById("valid-name").innerHTML = `<span class="text-danger ps-2"><i class="fa-regular fa-circle-xmark"></i></span>`
                z = 2;
                return z;
        }

        
}




function search() {
        for (var i = 0; i < bookContainer.length; i++) {
                if (bookContainer[i].name == bookName.value) {
                        console.log(bookContainer[i]);
                        x = 2;
                        return x;
                }
                else {
                        console.log("not equal");
                        x = 1;
                        return x;
                }
        

        }
      
}
