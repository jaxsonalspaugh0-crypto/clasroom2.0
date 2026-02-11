const GAMES = [
  {
    id: 'smash-karts',
    name: 'Smash Karts',
    desc: 'Fast multiplayer kart brawling.',
    url: 'https://smashkarts.io/',
    thumb: 'https://smashkarts.io/assets/img/logo.png',
    logo: 'https://smashkarts.io/assets/img/logo.png',
    copyright: '© Smash Karts'
  },
  {
    id: 'retro-bowl',
    name: 'Retro Bowl',
    desc: 'Classic retro-style American football.',
    url: 'https://www.retrorbowl.com/',
    thumb: 'https://www.retrorbowl.com/images/logo.png',
    logo: 'https://www.retrorbowl.com/images/logo.png',
    copyright: '© Retro Bowl'
  },
  {
    id: 'slither-io',
    name: 'Slither.io',
    desc: 'Growing snake multiplayer arcade.',
    url: 'https://slither.io/',
    thumb: 'https://slither.io/images/logo.png',
    logo: 'https://slither.io/images/logo.png',
    copyright: '© Slither.io'
  },
  {
    id: 'krunker',
    name: 'Krunker',
    desc: 'Fast pixel FPS (browser).',
    url: 'https://krunker.io/',
    thumb: 'https://krunker.io/images/krunker-icon.png',
    logo: 'https://krunker.io/images/krunker-icon.png',
    copyright: '© Krunker'
  },
  {
    id: 'bacon-may-die',
    name: 'Bacon May Die',
    desc: 'A frantic survival platformer where bacon must dodge hazards and outrun doom.',
    url: 'https://baconmaydie.com/',
    thumb: 'https://baconmaydie.com/images/logo.png',
    logo: 'https://baconmaydie.com/images/logo.png',
    copyright: '© Bacon May Die'
  },
  // Additional FPS / shooter titles
  {
    id: 'shell-shockers',
    name: 'Shell Shockers',
    desc: 'Egg-themed first-person shooter with fast matches.',
    url: 'https://shellshock.io/',
    thumb: 'https://shellshock.io/static/media/logo.2a9e3f3f.png',
    logo: 'https://shellshock.io/static/media/logo.2a9e3f3f.png',
    copyright: '© Shell Shockers'
  },
  {
    id: 'forward-assault',
    name: 'Forward Assault',
    desc: 'Tactical browser FPS with competitive modes.',
    url: 'https://forwardassault.io/',
    thumb: 'https://forwardassault.io/images/logo.png',
    logo: 'https://forwardassault.io/images/logo.png',
    copyright: '© Forward Assault'
  },
  {
    id: 'bullet-force',
    name: 'Bullet Force',
    desc: 'Modern shooter with large player counts and customization.',
    url: 'https://www.bulletforce.io/',
    thumb: 'https://www.bulletforce.io/images/logo.png',
    logo: 'https://www.bulletforce.io/images/logo.png',
    copyright: '© Bullet Force'
  },
  {
    id: 'war-brokers',
    name: 'War Brokers',
    desc: 'Blocky FPS with vehicles, guns and persistent match action.',
    url: 'https://warbrokers.io/',
    thumb: 'https://warbrokers.io/images/logo.png',
    logo: 'https://warbrokers.io/images/logo.png',
    copyright: '© War Brokers'
  },
  {
    id: 'rush-team',
    name: 'Rush Team',
    desc: 'Classic team-based browser FPS with weapon progression.',
    url: 'https://rushteamplay.com/',
    thumb: 'https://rushteamplay.com/images/logo.png',
    logo: 'https://rushteamplay.com/images/logo.png',
    copyright: '© Rush Team'
  },

  // Car / racing games added
  {
    id: 'madalin-stunt-cars',
    name: 'Madalin Stunt Cars 2',
    desc: 'Open world stunt driving with a large car roster.',
    url: 'https://www.madalinstuntcars.com/',
    thumb: 'https://www.madalinstuntcars.com/img/logo.png',
    logo: 'https://www.madalinstuntcars.com/img/logo.png',
    copyright: '© Madalin Stunt Cars'
  },
  {
    id: 'drift-hunters',
    name: 'Drift Hunters',
    desc: 'Browser drifting simulator with customizable cars and real tracks.',
    url: 'https://drift-hunters.com/',
    thumb: 'https://drift-hunters.com/images/logo.png',
    logo: 'https://drift-hunters.com/images/logo.png',
    copyright: '© Drift Hunters'
  },
  {
    id: 'car-eats-car',
    name: 'Car Eats Car',
    desc: 'Arcade-style car combat and escape challenges.',
    url: 'https://careatscar.com/',
    thumb: 'https://careatscar.com/assets/img/logo.png',
    logo: 'https://careatscar.com/assets/img/logo.png',
    copyright: '© Car Eats Car'
  },
  {
    id: 'supercars-io',
    name: 'Supercars.io',
    desc: 'Top-down multiplayer racer with fast matches.',
    url: 'https://supercars.io/',
    thumb: 'https://supercars.io/static/logo.png',
    logo: 'https://supercars.io/static/logo.png',
    copyright: '© Supercars.io'
  }
];

const grid = document.getElementById('gameGrid');
const tpl = document.getElementById('cardTpl');
const search = document.getElementById('search');
const shuffleBtn = document.getElementById('shuffleBtn');
const favoritesBtn = document.getElementById('favoritesBtn');

const overlay = document.getElementById('playerOverlay');
const playerFrame = document.getElementById('playerFrame');
const closePlayer = document.getElementById('closePlayer');

const publishBtn = document.getElementById('publishBtn');
const publishModal = document.getElementById('publishModal');
const closePublish = document.getElementById('closePublish');
const copyUrlBtn = document.getElementById('copyUrl');
const publishUrlInput = document.getElementById('publishUrl');

function loadFavs(){
  try{ return JSON.parse(localStorage.getItem('arcade_favs')||'[]') }catch(e){return []}
}
function saveFavs(list){ localStorage.setItem('arcade_favs', JSON.stringify(list)) }

let favs = new Set(loadFavs());

function render(list){
  grid.innerHTML = '';
  list.forEach(g=>{
    const node = tpl.content.cloneNode(true);
    node.querySelector('.title').textContent = g.name;
    node.querySelector('.desc').textContent = g.desc;

    const thumb = node.querySelector('.thumb');
    if(g.thumb) {
      thumb.style.backgroundImage = `url(${g.thumb})`;
      thumb.style.backgroundSize = 'cover';
    } else {
      thumb.style.backgroundImage = '';
    }

    // signature area: logo + copyright
    const sigImg = node.querySelector('.sig-logo');
    const sigText = node.querySelector('.sig-text');
    if(g.logo){
      sigImg.src = g.logo;
      sigImg.alt = `${g.name} logo`;
      sigImg.style.display = '';
    } else {
      sigImg.style.display = 'none';
    }
    sigText.textContent = g.copyright || '';

    const play = node.querySelector('.play');
    play.dataset.url = g.url;
    play.href = '#';
    play.textContent = 'Play';
    play.addEventListener('click', (ev)=>{
      ev.preventDefault();
      const url = play.dataset.url;
      if(!url) return;
      openPlayer(url);
    });
    const favBtn = node.querySelector('.fav');
    const updateFavUI = ()=>{
      favBtn.textContent = favs.has(g.id)?'★':'☆';
      favBtn.style.borderColor = favs.has(g.id)?'#ffd54a':'#e6e9ef';
    }
    updateFavUI();
    favBtn.addEventListener('click', ()=>{
      if(favs.has(g.id)) favs.delete(g.id); else favs.add(g.id);
      saveFavs([...favs]);
      updateFavUI();
    });
    grid.appendChild(node);
  });
}

function filter(q){
  q = q.trim().toLowerCase();
  if(!q) return GAMES;
  return GAMES.filter(g=> (g.name + ' ' + g.desc).toLowerCase().includes(q));
}

search.addEventListener('input', ()=> render(filter(search.value)));

shuffleBtn.addEventListener('click', ()=>{
  const shuffled = [...GAMES].sort(()=>Math.random()-0.5);
  render(shuffled);
});

favoritesBtn.addEventListener('click', ()=>{
  const favList = GAMES.filter(g=> favs.has(g.id));
  if(favList.length === 0){
    alert('No favorites yet. Tap the ☆ on a game to favorite it.');
    return;
  }
  render(favList);
});

function openPlayer(url){
  // set iframe src and show overlay
  // ensure iframe allows fullscreen and autoplay
  playerFrame.setAttribute('allow', 'fullscreen; autoplay; clipboard-read; clipboard-write');
  playerFrame.setAttribute('allowfullscreen', '');
  playerFrame.src = url;
  overlay.setAttribute('aria-hidden','false');

  // attempt to request fullscreen on the iframe for immersive view (better cross-origin support)
  // fall back to overlay if iframe fullscreen isn't available
  const requestFs = (el)=>{
    try{
      if(el.requestFullscreen) return el.requestFullscreen();
      if(el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      if(el.msRequestFullscreen) return el.msRequestFullscreen();
    }catch(e){ return Promise.reject(e); }
    return Promise.reject(new Error('No fullscreen API'));
  };

  // try iframe first, then overlay
  requestFs(playerFrame).catch(()=>{
    try{ return requestFs(overlay); }catch(e){ /* ignore */ }
  }).catch(()=>{/* ignore final failures */});
}

function closePlayerFn(){
  // exit fullscreen if active
  try{
    if(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement){
      if(document.exitFullscreen) document.exitFullscreen();
      else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if(document.msExitFullscreen) document.msExitFullscreen();
    }
  }catch(e){}
  // hide overlay and clear iframe
  overlay.setAttribute('aria-hidden','true');
  // unload iframe to stop audio/runtime
  playerFrame.src = 'about:blank';
}

closePlayer.addEventListener('click', closePlayerFn);
overlay.addEventListener('click', (e)=>{
  if(e.target === overlay) closePlayerFn();
});

// keyboard: Esc closes
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false'){
    closePlayerFn();
  }
});

/* Publish modal actions (safe guidance only) */
if (publishBtn) {
  publishBtn.addEventListener('click', () => {
    publishModal.setAttribute('aria-hidden', 'false');
    publishModal.querySelector('input')?.focus();
  });
}
if (closePublish) {
  closePublish.addEventListener('click', () => {
    publishModal.setAttribute('aria-hidden', 'true');
  });
}
if (copyUrlBtn && publishUrlInput) {
  copyUrlBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(publishUrlInput.value);
      copyUrlBtn.textContent = 'Copied';
      setTimeout(()=> copyUrlBtn.textContent = 'Copy', 1500);
    } catch (e) {
      publishUrlInput.select();
      document.execCommand('copy');
      copyUrlBtn.textContent = 'Copied';
      setTimeout(()=> copyUrlBtn.textContent = 'Copy', 1500);
    }
  });
}

/* initial render */
render(GAMES);

/* accessibility: enable Enter on card Play when focused via keyboard */
grid.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') {
    const a = e.target.closest('.card')?.querySelector('.play');
    if(a) window.open(a.href, '_blank', 'noopener');
  }
});