function getTime(time){
    // gethour and rest seconds
    const hour = parseInt(time/3600);
     remainingsecond = time%3600;
    const minute =parseInt(remainingsecond/60);
     remainingsecond = remainingsecond % 60;
    return `${hour} hour ${minute} minute ${remainingsecond} second ago`;
};

const removeActiveClass =()=>{
    const button = document.getElementsByClassName('category-btn')
    for(btn of button){
        btn.classList.remove('active')
    }
};

const loadbutton =(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data =>{
            // remove active class
            removeActiveClass();
            // create active class
            const activebtn =document.getElementById(`btn-${id}`);
            activebtn.classList.add('active');
            displayvideo(data.category);
        })
        .catch(error => console.log(error))

};

const loaddetails= async(videoId)=>{
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displaydetails(data.video)
};
const displaydetails = (video)=>{
    const modalcontainer = document.getElementById('modal-content');
    modalcontainer.innerHTML=`
    <img src=${video.thumbnail} alt="">
    <p>${video.description}</p>
    `;
    // show modal
    document.getElementById("customModal").showModal();
}

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
    videoContainer.innerHTML = "";

    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
                <img src="./assets/Icon.png" alt="">
                <h2 class="font-bold text-center text-xl">NO CONTAIN HERE IN THIS CATEGORY!</h2>
            </div>`;
        return;
    }else{
        videoContainer.classList.add("grid");
    };

    videos.forEach((video) => {

        // create cards
        const cards = document.createElement('div');
        cards.classList = ` card-compact `;
        cards.innerHTML = `
        <figure class="h-[200px] relative">
             <img src=${video.thumbnail} alt="" class="h-full object-cover w-full" />
             ${video.others.posted_date?.length === 0? "":`<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white ">${getTime(video.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2 ">
            <div>
                <img src=${video.authors[0].profile_picture} alt="" class="rounded-full w-10 h-10 object-cover">
            </div>     
            <div>
                <h2 class="font-bold">${video.title}</h2> 
                <div class="flex items-center gap-1">
                 <p class="text-gray-400">${video.authors[0].profile_name}</p>
                  ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png" alt="">':''}
                </div>
                <p> <button onclick="loaddetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
            </div>
        </div>
        `;
     // add cards
        videoContainer.append(cards);

    });
};

// create display catagory
const displaycatagory =(categories)=>{
    const cetegoryContainer = document.getElementById("cetegory-container");

    categories.forEach((item) => {       
        // create div
        const buttoncontainer = document.createElement("div");
        buttoncontainer.innerHTML = `
         <button id="btn-${item.category_id}" onclick="loadbutton(${item.category_id})" class="btn category-btn">
          ${item.category}
         </button> `;
        // add buttons
        cetegoryContainer.append(buttoncontainer);
    });
};
loadcatagory();
loadvideo();

