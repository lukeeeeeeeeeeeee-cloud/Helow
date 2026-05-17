const intro=document.getElementById('intro');
const main=document.getElementById('main');
const startBtn=document.getElementById('startBtn');
const music=document.getElementById('bgMusic');
const musicBtn=document.getElementById('musicBtn');
const typeText=document.getElementById('typeText');
const modal=document.getElementById('modal');
const modalText=document.getElementById('modalText');
const closeModal=document.getElementById('closeModal');

const phrase="You're my favorite pahinga.";
let i=0;

function typeWriter(){
  if(i<=phrase.length){
    typeText.textContent=phrase.slice(0,i);
    i++;
    setTimeout(typeWriter,85);
  }
}

function fadeMusic(){
  music.volume=0;
  music.play().catch(()=>{});
  let v=0;
  const fade=setInterval(()=>{
    v+=0.035;
    music.volume=Math.min(v,.72);
    if(v>=.72) clearInterval(fade);
  },120);
}

startBtn.onclick=()=>{
  intro.classList.add('hide');
  main.classList.remove('hidden');
  fadeMusic();
  setTimeout(typeWriter,650);
};

musicBtn.onclick=()=>{
  if(music.paused){
    music.play();
    musicBtn.textContent='Pause';
  }else{
    music.pause();
    musicBtn.textContent='Play';
  }
};

function showModal(msg,title='Surprise message ♡'){
  modal.querySelector('h2').textContent=title;
  modalText.textContent=msg;
  modal.classList.remove('hidden');
}

document.getElementById('surpriseBtn').onclick=()=>{
  showModal("If naa man gani koy favorite place aris world… murag ikaw man siguro, cringe kaayo paminawon pero legit hahaaaaaaays hahahah 🌷");
};

document.querySelectorAll('.polaroid').forEach(card=>{
  card.addEventListener('click',()=>{
    showModal(card.dataset.msg,'Memory unlocked ♡');
  });
});

document.querySelectorAll('.memory-btn,.envelopes button').forEach(btn=>{
  btn.addEventListener('click',()=>showModal(btn.dataset.msg,'For you ♡'));
});

closeModal.onclick=()=>modal.classList.add('hidden');
modal.onclick=(e)=>{if(e.target===modal)modal.classList.add('hidden')};

function createPetal(){
  const p=document.createElement('div');
  p.className='petal';
  p.textContent=Math.random()>.52?'🌹':'🌷';
  p.style.left=Math.random()*100+'vw';
  p.style.animationDuration=(5+Math.random()*6)+'s';
  p.style.fontSize=(20+Math.random()*18)+'px';
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),11500);
}
setInterval(createPetal,430);

let clicks=0;
document.body.addEventListener('click',()=>{
  clicks++;
  if(clicks===7){
    showModal('Secret unlocked: imong presence.','Secret unlocked ♡');
    clicks=0;
  }
});

// Godly camera flash every few seconds
const flash = document.getElementById('flash');
function cameraFlash(){
  if(!flash) return;
  flash.classList.add('on');
  setTimeout(()=>flash.classList.remove('on'),450);
}
setInterval(cameraFlash, 9500);

// Floating memory words
const words = ['pretty','safe place','favorite person','calm','home','pahinga','always you','soft memory'];
const floatingWords = document.getElementById('floatingWords');

function spawnWord(){
  if(!floatingWords) return;
  const w = document.createElement('div');
  w.className = 'float-word';
  w.textContent = words[Math.floor(Math.random()*words.length)];
  w.style.left = Math.random()*85 + 5 + 'vw';
  w.style.top = Math.random()*75 + 15 + 'vh';
  floatingWords.appendChild(w);
  setTimeout(()=>w.remove(),7200);
}
setInterval(spawnWord, 1700);

// Premium music progress
const progressBar = document.getElementById('progressBar');
setInterval(()=>{
  if(music && progressBar && music.duration){
    progressBar.style.width = ((music.currentTime / music.duration) * 100) + '%';
  }
}, 500);

// Movie chapter buttons
document.querySelectorAll('.chapter').forEach(btn=>{
  btn.addEventListener('click',()=>{
    showModal(btn.dataset.msg, btn.dataset.title);
  });
});

// 3D secret letter
const secretLetter = document.getElementById('secretLetter');
if(secretLetter){
  secretLetter.addEventListener('click',()=>{
    secretLetter.classList.add('opened');
    showModal('Dili man ko perfect, pero one thing I can promise is genuine akong intentions sa imoa — calm, soft, and real ganurn hihihi.', 'Secret love letter ♡');
  });
}

// Teddy interaction from 4th polaroid
const teddyCard = document.querySelectorAll('.polaroid')[3];
if(teddyCard){
  teddyCard.addEventListener('dblclick',()=>{
    showModal('Teddy hug mode unlocked: You looked cute beside the teddy, but ikaw gihapon ang pinaka cute. ♡', 'Teddy bear interaction 🧸');
  });
}

// Weather mode change while scrolling
window.addEventListener('scroll',()=>{
  const y = window.scrollY;
  const h = document.body.scrollHeight - window.innerHeight;
  const pct = h > 0 ? y / h : 0;
  document.body.classList.remove('sunset','galaxy');
  if(pct > .72) document.body.classList.add('galaxy');
  else if(pct > .38) document.body.classList.add('sunset');
});

// Hidden ending: click all polaroids
const clickedMemories = new Set();
document.querySelectorAll('.polaroid').forEach((card, index)=>{
  card.addEventListener('click',()=>{
    clickedMemories.add(index);
    if(clickedMemories.size === document.querySelectorAll('.polaroid').length){
      setTimeout(()=>{
        showModal('Not because perfect ka, but because peaceful ka.', 'God tier ending unlocked ♡');
      }, 700);
    }
  });
});

// Stay timer secret
setTimeout(()=>{
  if(!intro.classList.contains('hide')) return;
  showModal('Thank you for making ordinary moments feel cinematic.', 'Secret timer unlocked ♡');
}, 120000);
