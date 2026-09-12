const TOTAL=8, book=document.getElementById('book'), counter=document.getElementById('counter'), dots=document.getElementById('dots');
const prev=document.getElementById('prev'), next=document.getElementById('next'); let current=0, startX=null, busy=false;
const pages=[];
for(let i=0;i<TOTAL;i++){
  const p=document.createElement('div'); p.className='page'; p.style.zIndex=TOTAL-i;
  p.innerHTML=`<img src="assets/pages/page_${i+1}.webp" alt="निमंत्रण पृष्ठ ${i+1}" draggable="false"><div class="back"></div>`;
  book.appendChild(p); pages.push(p);
  const d=document.createElement('button'); d.className='dot'; d.setAttribute('aria-label',`पृष्ठ ${i+1}`); d.onclick=()=>go(i); dots.appendChild(d);
}
function update(){
  pages.forEach((p,i)=>{p.classList.toggle('turned',i<current);p.style.zIndex=i<current?i+1:TOTAL-i});
  counter.textContent=`${current+1} / ${TOTAL}`; [...dots.children].forEach((d,i)=>d.classList.toggle('active',i===current));
  prev.disabled=current===0; next.disabled=current===TOTAL-1;
}
function flip(dir){ if(busy)return; const target=current+dir;if(target<0||target>=TOTAL)return;busy=true;
  const p=dir>0?pages[current]:pages[current-1];p.classList.add('turning');current=target;update();setTimeout(()=>{p.classList.remove('turning');busy=false},920);
}
function go(n){ if(n===current)return; const step=()=>{if(current===n)return;flip(n>current?1:-1);setTimeout(step,960)};step() }
prev.onclick=()=>flip(-1);next.onclick=()=>flip(1);
book.addEventListener('pointerdown',e=>{startX=e.clientX});book.addEventListener('pointerup',e=>{if(startX===null)return;const dx=e.clientX-startX; if(Math.abs(dx)>35) flip(dx<0?1:-1); else flip(e.clientX<book.getBoundingClientRect().left+book.clientWidth/2?-1:1); startX=null});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='PageDown')flip(1);if(e.key==='ArrowLeft'||e.key==='PageUp')flip(-1)});
update();
