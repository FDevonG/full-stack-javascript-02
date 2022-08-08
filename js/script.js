const itemsPerPage = 9;

/**
 * Retrieves a user by email.
 * @method
 * @param {Array} list - list of the users to display the information of onto the page
 * @param {Number} page - the current pages of users to display
 */
function showPage(list, page){
	const startIndex = (page * itemsPerPage) - itemsPerPage;
	const endIndex = page * itemsPerPage;
	
	const htmlList = document.querySelector('.student-list');
	htmlList.innerHTML = '';
	for(let i = 0; i < list.length; i++){
		if(i >= startIndex && i < endIndex){
			let li = document.createElement('li');
			li.className="student-item cf";
			li.innerHTML = `<div class="student-details">
								<img class="avatar" src="${list[i].picture.large}" alt="${list[i].name.first} ${list[i].name.last}">
								<h3>${list[i].name.first} ${list[i].name.last}</h3>
								<span class="email">${list[i].email}</span>
							</div>
							<div class="joined-details">
								<span class="date">Joined ${list[i].registered.date}</span>
							</div>`;
			htmlList.appendChild(li);
		}
	}
}


/**
 * figures out how many pages are needed to display the users, then builds that many buttons
 * @method
 * @param {Array} list - list of the users
 */
function addPagination(list){
	const buttonsNeeded = list.length / itemsPerPage;
	const linkList = document.querySelector('.link-list');
	linkList.innerHTML = '';
	for(let i = 0; i < buttonsNeeded; i++){
		const li = document.createElement('li');
		
		if(i === 0){
			li.innerHTML = `<button type="button" class="active">${i + 1}</button>`;
		} else {
			li.innerHTML = `<button type="button">${i + 1}</button>`;
		}
		linkList.appendChild(li);
	}
	linkList.addEventListener('click', e => {
		if(e.target.tagName === 'BUTTON'){
			document.querySelector('.active').classList.remove('active');
			e.target.classList.add('active');
			showPage(data, +e.target.textContent);
		}
	})
}

function addSearch(){
	let html = `<label for="search" class="student-search">
					<span>Search by name</span>
					<input id="search" placeholder="Search by name...">
					<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
				</label>`;
	document.querySelector('.header').insertAdjacentHTML("beforeEnd", html);
	document.querySelector('.student-search').addEventListener('input', e => searchUsers(e));
}

/**
 * checks the value in the search field against the names in the users array to check for a match
 * @method
 * @param {event} e - the event from the input, is required to get the value to search
 */
function searchUsers(e){
	let searchResults = [];
	if(e.target.value.trim() != ''){
		searchResults = data.filter(user => {
			const name = `${user.name.first} ${user.name.last}`.toLowerCase();
			if(name.includes(e.target.value.toLowerCase().trim())){
				return user;
			}
		});
		if(searchResults.length > 0){
			showPage(searchResults, 1);
			addPagination(searchResults);
		} else {
			document.querySelector('.link-list').innerHTML = '';
			document.querySelector('.student-list').innerHTML = `<h2>No Users Found</h2>`;
		}
	} else {
		showPage(data, 1);
		addPagination(data);
	}
}

showPage(data, 1);
addPagination(data);
addSearch();