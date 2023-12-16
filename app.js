let playBtn = document.querySelector('.fa-play')
let nextBtn = document.querySelector('.fa-forward-fast');
let prevBtn = document.querySelector('.fa-backward-fast');


let songList = document.querySelector('.songList');
let progress = document.querySelector('input')



let songs = [
    
    {
        name : "songJack-sparrow",
        id : "Jack-sparrow"
    },{
        name:"songJane-Jaa",
        id: "Jane-Jaa",
    },{
        name:"songShauk",
        id:"Shauk"
    },{
        name:"songVillian",
        id: "Villian"
    }


]

 let audio = new Audio('audio/songJack-sparrow.mp3');


 for(let song of songs){
   
    let li = document.createElement('li');
    
    // li.innerText = (song.name)
    li.innerText = (song.id) 
    
    li.setAttribute('id',song.id)
    
    li.classList.add('list')
    
    songList.appendChild(li);



    
 }

 
 //Play and pausing the song and changing button icon 
 playBtn.addEventListener('click',function(){
           
    if(audio.paused){
        audio.play();

        
        playBtn.setAttribute('class' , 'fa-solid  fa-pause') 
    }
    else{
        audio.pause()
        playBtn.setAttribute('class' , 'fa-solid  fa-play')
              
    }
    
    
 })


//adding all songs by targetting there id's and paasing in audio and changing play/pause btn accordingly
 songList.addEventListener('click',function(event){
   
    let id = event.target.getAttribute('id');
     
    audio.src = `audio/song${id}.mp3`

    
    audio.currentTime=0;
    audio.play();

    playBtn.classList.remove('fa-play')
    playBtn.classList.add('fa-pause')


     let playingSong = event.target;
    

// Displaying which song is playing

 let storeAllEle = document.querySelectorAll('.list');
   
 storeAllEle.forEach(element => {

    element.classList.remove('colors')
    
 });

 playingSong.classList.add('colors')

    
     

 })


 
 //to move along the current Time
 audio.addEventListener('timeupdate', function() {
    let currentTime = (audio.currentTime / audio.duration) * 100; // Calculate progress as a percentage
  
    progress.value = currentTime;


  });



 //moving song time by dragging
 progress.addEventListener('change',function(){
     
  
    let updateTime = audio.duration * progress.value / 100;

     audio.currentTime =  updateTime

 })



 //playing next song once current songs ends 
 
 audio.addEventListener('ended', function(event) {

     let currentSongIndex = songs.findIndex( songs => audio.src.includes(songs.id))
     
      currentSongIndex = (currentSongIndex + 1) % songs.length;
 
     // Update the audio source to the next song
     audio.src = `audio/song${songs[currentSongIndex].id}.mp3`;
 
     // Reset the currentTime and play the new song
     audio.currentTime = 0;
     audio.play();
 
     // Update the play/pause button icon
     playBtn.classList.remove('fa-play');
     playBtn.classList.add('fa-pause');


      

    // displying which song is playing 
     let nextSongIndex = document.getElementById(`${songs[currentSongIndex].id}`)

    //  console.log(nextSongIndex)

    let storeAllEle = document.querySelectorAll('.list')

    storeAllEle.forEach(element => {
       
        element.classList.remove('colors')

    })

     nextSongIndex.classList.add('colors')



    

 });
 

//making play next song btn 
nextBtn.addEventListener('click',function(){
    
    //getting the current playing song index
    let currentSongIndex = songs.findIndex(function(song) { 
        
       return audio.src.includes(song.id) 
    })

    currentSongIndex++;

     
    let nextSongIndex = currentSongIndex % songs.length;

    

    audio.setAttribute('src', `audio/song${songs[nextSongIndex].id}.mp3`);

    audio.currentTime = 0;
    audio.play();

    playBtn.classList.remove('fa-play')
    playBtn.classList.add('fa-pause')


 // displaying whcih song is playing 
    let nextSongId  = document.getElementById(songs[nextSongIndex].id)
     
    let storeAllEle = document.querySelectorAll('.list');
     
    storeAllEle.forEach(element => {
        element.classList.remove('colors')
    })

    nextSongId.classList.add('colors')

    


})


prevBtn.addEventListener('click',function(){
    
    //getting the current playing song index
    let currentSongIndex = songs.findIndex(function(song) { 
        
       return audio.src.includes(song.id) 
    })

    currentSongIndex--;

     
    let nextSongIndex = currentSongIndex % songs.length;

    audio.setAttribute('src', `audio/song${songs[nextSongIndex].id}.mp3`);

    audio.currentTime = 0;
    audio.play();

    playBtn.classList.remove('fa-play')
    playBtn.classList.add('fa-pause')
    


  // displaying whcih song is playing  
    let nextSongId  = document.getElementById(songs[nextSongIndex].id)
     
    let storeAllEle = document.querySelectorAll('.list');
     
    storeAllEle.forEach(element => {
        element.classList.remove('colors')
    })

    nextSongId.classList.add('colors')


 

})

