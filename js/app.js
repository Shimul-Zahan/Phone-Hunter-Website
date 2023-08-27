
const displayPhones = async (phoneName, searchClicked, showMoreClicked) => {
    if (searchClicked) {
        // !if search then show search result
        const fetching = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
        const data = await fetching.json();
        let phones = await data.data;
        const parentDiv = document.getElementById('parent-container');
        //! clear the before value for get the specific search result
        parentDiv.textContent = '';
        if (phones.length > 12) {
            phones = phones.slice(0, 12);
            document.querySelector('#show-more').parentElement.classList.remove('hidden');
        }else{
            phones = phones.length;
        }
        // ! cheek show more click or not
        // ! if (showMoreClicked) {
        // !    phones = phones.length;
        // ! }
        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList = `card w-96 bg-base-100 shadow-xl md:w-80 border border-slate-300 rounded-md p-4`;
            div.innerHTML = `
            <figure>
                <img src="${phone.image}" />
            </figure>
            <div class="card-body space-y-4">
                <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
                <p class="text-center text-black">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-end cursor-pointer">
                    <div onclick="modalSlug('${phone.slug}')" class="badge badge-outline">Show Details</div>
                    <div class="badge badge-outline">Buy Now</div>
                </div>
            </div>
        `
            parentDiv.appendChild(div);
        });
    } else {
        // ! show the default result without search
        const fetching = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
        const data = await fetching.json();
        const phones = await data.data;
        const parentDiv = document.getElementById('parent-container');
        //! clear the before value for get the specific search result
        parentDiv.textContent = '';
        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList = `card w-96 bg-base-100 shadow-xl md:w-80 border border-slate-300 rounded-md p-4`;
            div.innerHTML = `
            <figure>
                <img src="${phone.image}" />
            </figure>
            <div class="card-body space-y-4">
                <h2 class="text-2xl font-bold text-center">${phone.phone_name}</h2>
                <p class="text-center text-black">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-end cursor-pointer">
                    <div onclick="modalSlug('${phone.slug}')" class="badge badge-outline">Show Details</div>
                    <div class="badge badge-outline">Buy Now</div>
                </div>
            </div>
        `
            parentDiv.appendChild(div);
        });
    }
}

// ? search function
function search(searchClicked) {
    const phoneName = document.querySelector('#input-value').value;
    document.querySelector('#input-value').value = ''; 
    displayPhones(phoneName, searchClicked);
}

// ! show more
function showMore(showMoreClicked) {
    displayPhones(showMoreClicked);
}

// ! show modals
function modalSlug(id) {
    fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
        .then(request => request.json())
        .then(modalData => console.log(modalData));
}

displayPhones();