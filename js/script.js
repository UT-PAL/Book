//oop

// get the ui element 
let form = document.querySelector('#book_form');
let title = document.querySelector('#title');
let author = document.querySelector('#author');
let isbn = document.querySelector('#isbn');
let list = document.querySelector('#book_list');

class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui class

class UI{
 
    static addBooklist(book){
       let list = document.querySelector('#book_list');
       let row = document.createElement('tr');

       row.innerHTML = `<td> ${book.title} </td>
       <td> ${book.author} </td>
       <td> ${book.isbn} </td>
       <td> <a href='#' class='delete'> x </a> </td>`;
       list.appendChild(row);
    }
   static clearfields(){
        title.value='';
        author.value ='';
        isbn.value='';
    }
    
   static showalert(message,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
         div.appendChild(document.createTextNode(message));
         let container = document.querySelector('.container');
         let form = document.querySelector('#book_form');
         container.insertBefore(div,form);
         setTimeout(() => {
            document.querySelector('.alert').remove();
         }, 3000);
    }
   static deleteFromBook(e){
 
    if(e.target.hasAttribute("href")){
        if(confirm("are you sure?")){
            let ele = e.target.parentElement.parentElement;
            ele.remove();
            let isbn=e.target.parentElement.previousElementSibling.textContent.trim();
            Store.removeBook(isbn);
            UI.showalert("Book Removed","error");}
    }
    else{
        console.log("error");
    }
}}

//local storage class

class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[];
        }
        else{
            books= JSON.parse(localStorage.getItem('books'));
        }
        return books;
       

    }

    static addBook(book){
        let books = Store.getbooks();
        books.push(book);
        
        localStorage.setItem('books',JSON.stringify(books));
    }

    static showBook(){
        let books = Store.getbooks();
        books.forEach (book=>{
            UI.addBooklist(book);
        })
    }
    static removeBook(isbn){
        let books = Store.getbooks();
        books.forEach((book ,index) =>{
          if(book.isbn === isbn){
              books.splice(index,1);
          }
    })
    localStorage.setItem('books',JSON.stringify(books));
    }
}




//add eventlistener

form.addEventListener('submit',newbook);
isbn.addEventListener('keyup',check);

list.addEventListener('click',removeBook);
document.addEventListener('DOMcontentLoaded',Store.showBook());


//define functions

function newbook(e){
    
    let book = new Book(title.value,author.value,isbn.value);
    if(title.value === '' || author.value === '' || isbn.value ===''){
        
        UI.showalert("Please fill all the Fields","error");
    }
    else{

    
    UI.addBooklist(book);
    UI.clearfields();
    UI.showalert("Book Added successfully ","success");
    Store.addBook(book);
    //to prevent reload behaviour
    
}
e.preventDefault();
}

// to check isbn no 
function check(e){
    let reg=/[0-9]/;
    let isbn_no = isbn.value;

   if(reg.test(isbn_no) == false){
      alert("enter an int");
   }
}

function removeBook(e){
   
    UI.deleteFromBook(e);
   
    e.preventDefault();
   
    
}


   
