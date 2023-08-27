
const displayPhones = async () => {
    const fetching = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`);
    const data = await fetching.json();
    const phones = await data.data;
    
    const parentDiv = document.getElementById('parent-container');
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl md:w-80 border border-slate-300 rounded-md p-4`;
        div.innerHTML = `
            <figure>
                <img src="${phone.image}" />
            </figure>
            <div class="card-body space-y-4">
                <h2 class="card-title">
                    ${phone.phone_name}
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end cursor-pointer">
                    <div class="badge badge-outline">Show Details</div>
                    <div class="badge badge-outline">Buy Now</div>
                </div>
            </div>
        `
        parentDiv.appendChild(div);
    });


}
displayPhones();