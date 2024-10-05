// create load catagory
const loadcatagory = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displaycatagory(data.categories))
        .catch(error => console.log(error))

};
// create load video cetagory
const loadvideo = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data =>displayvideo(data.videos))
        .catch(error => console.log(error))

};
// display video cetagory
const displayvideo =(videos)=>{
    const videoContainer = document.getElementById('video');
    videos.forEach((video) => {

        // create cards
        const cards = document.createElement('div');
        cards.classList = ` card-compact `;
        cards.innerHTML = `
        <figure class="h-[180px]">
             <img
                    src=${video.thumbnail}
                     alt="" class="h-full object-cover w-full" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
        </div>
        `;
        


        // add cards
        videoContainer.append(cards);

    });
};
// create display catagory
const displaycatagory =(categories)=>{
    categories.forEach((item) => {
        const cetegoryContainer = document.getElementById("cetegory-container");
        // create buttons
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        // add buttons
        cetegoryContainer.append(button);

    });
};
loadcatagory();
loadvideo();

