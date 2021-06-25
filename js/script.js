/*
Treehouse Techdegree:
FSJS Project 2 - list Pagination and Filtering
*/
const header = document.querySelector('.header');
header.insertAdjacentHTML('beforeend',
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button" id="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`
)

//This function will create and insert/append the elements needed to display a "page" of nine students
function showPage(list, page) {
   //Calculate and store first and last indexes for each page and access UL with class 'student-list'
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   //Clear any pre-existing page results 
   studentList.innerHTML = '';
   //Access each student object and create a 'studentItem' card with student data that is inserted into 'studentList'
   for (let i = 0; i < list.length; i++) {
       if (i >= startIndex && i < endIndex) { 
         const studentName = `${list[i].name.first} ${list[i].name.last}`;
         const studentPic = list[i].picture.large;
         const studentEmail = list[i].email;
         const joinedDate = list[i].registered.date;
         let studentItem = `<li class="student-item cf">
                                 <div class="student-details">
                                    <img class="avatar" src=${studentPic} alt="Profile Picture">
                                    <h3>${studentName}</h3>
                                    <span class="email">${studentEmail}</span>
                                 </div>
                                 <div class="joined-details">
                                    <span class="date">Joined ${joinedDate}</span>
                                 </div>
                              </li>`
         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}


// This function will create and insert/append the elements needed for the pagination buttons
function addPagination(list) {
   //Stores number of pages needed for dataset and accesses DOM element for page buttons
   const numOfPages = Math.ceil(list.length/9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   //Creates apporpriate number of page buttons and inserts them into DOM
   for(let i = 1; i <= numOfPages; i++) {
      if (numOfPages > 0) {
         let pageButton = document.createElement('button'); 
             pageButton =`<li>
                        <button type='button'>${pageButton.textContent = i}</button>
                        </li>`
      linkList.insertAdjacentHTML('beforeend', pageButton);
      }
   }
      //Set first page as default 'active' page
      let defaultActivePage = linkList.firstElementChild.firstElementChild;
      defaultActivePage.className = 'active';
      //Listen for page button clicks to change page results and 'active' status
      linkList.addEventListener('click', (e)=> {
         if (e.target.tagName === 'BUTTON') {
            let currentActiveButton = document.querySelector('.active');
                currentActiveButton.className = '';
                e.target.className = 'active';
               showPage(list, e.target.textContent);
         }
      })
}

const search = document.querySelector('#search');
const searchButton = document.querySelector('#search-button');


const searchFunction= (searchInput, list)=> {
   let filteredList = [];
   
   for (let i=0; i < list.length; i++) {
     let student = list[i];
      searchInput = search.value;
     let studentName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
      if (searchInput.length !== 0 && studentName.includes(searchInput.toLowerCase())) {
         filteredList.push(student);
      } else if (searchInput.length === 0) {
         filteredList = data;
      } else if (searchInput.length !== 0 && !studentName.includes(searchInput.toLowerCase())){
         let studentList = document.querySelector('.student-list');
         let errorMessage = document.createElement('p');
         errorMessage.className = 'no-results';
         errorMessage.innerHTML = '<p>Sorry, there are no students with that name.<p>';
         studentList.insertAdjacentHTML('beforeend', errorMessage);
       }
      }
   
      showPage(filteredList, 1);
      console.log(searchInput);
      addPagination(filteredList);
   }



search.addEventListener('keyup', (e)=> {
   e.preventDefault();
   searchFunction(e.target.value, data);
});

searchButton.addEventListener('click', (e)=> {
   e.preventDefault();
   searchFunction(search.value, data);
});



// // // Call functions
showPage(data, 1);
addPagination(data);
