
const fetchData = async (phoneName = 13, isClicked) => {
    // ! fetching data
    const fetching = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await fetching.json();
    let phones = await data.data;
    dataDisplay(phones, isClicked)
}

const dataDisplay = (phones, isClicked) => {
    const parentDiv = document.getElementById('parent-container');
    //! clear the before value for get the specific search result
    parentDiv.textContent = '';

    // ! add show more button
    if (phones.length > 12 && !isClicked) {
        document.getElementById('showMore-button').classList.remove('hidden');
    } else {
        document.getElementById('showMore-button').classList.add('hidden');
    }

    // console.log('is clicked', isClicked);
    // ! slice phone
    if (!isClicked) {
        phones = phones.slice(0, 12);
    }

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
                    <div onclick="modalSlug('${phone.slug}'); my_modal.addshowModal();" class="badge badge-outline">Show Details</div>
                    <div class="badge badge-outline">Buy Now</div>
                </div>
            </div>
        `
        parentDiv.appendChild(div);
        document.querySelector('#input-value').value = '';
    });
}

// ? search function
const search = (isClicked) => {
    const phoneName = document.querySelector('#input-value').value;
    fetchData(phoneName, isClicked);
}


// ? showMore function
const showMore = () => {
    search(true);
}

// ! show modals
const modalSlug = async (id) => {
    const fetcing2 = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const modalData = await fetcing2.json();
    callMyModal(modalData.data)
}

const callMyModal = (singlePhonesData) => {
    console.log(singlePhonesData)
    my_modal.showModal();

    document.getElementById('image-div').innerHTML = `
        <figure>
            <img src="${singlePhonesData.image}" alt="image">
        </figure>
        <h3 class="font-bold text-lg">${singlePhonesData.name}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.mainFeatures.storage}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.mainFeatures.displaySize}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.mainFeatures.chipSet}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.mainFeatures.memory}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.slug}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.releaseDate}</h3>
        <h3 class="font-bold text-lg">${singlePhonesData.others.GPS}</h3>
    `

}

fetchData();