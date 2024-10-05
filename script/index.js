function getTime(time){
    // gethour and rest seconds
    const hour = parseInt(time/3600);
     remainingsecond = time%3600;
    const minute =parseInt(remainingsecond/60);
     remainingsecond = remainingsecond % 60;
    return `${hour} hour ${minute} minute ${remainingsecond} second ago`;
};

const loadbutton =(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data =>displayvideo(data.category))
        .catch(error => console.log(error))

};

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
                <p></p>
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
         <button onclick="loadbutton(${item.category_id})" class="btn">
          ${item.category}
         </button> `;
        // add buttons
        cetegoryContainer.append(buttoncontainer);
    });
};
loadcatagory();
loadvideo();


// {
//     "status": true,
//     "message": "Successfully fetched all the videos with category id '1001'",
//     "category": [
//       {
//         "category_id": "1001",
//         "video_id": "aaaa",
//         "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//         "title": "Shape of You",
//         "authors": [
//           {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//           }
//         ],
//         "others": {
//           "views": "100K",
//           "posted_date": "16278"
//         },
//         "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//       },