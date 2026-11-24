(function(){
var g=document.getElementById('glow');
addEventListener('pointermove',function(e){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
document.querySelectorAll('.card').forEach(function(c){
c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
if(e.pointerType==='mouse'&&c.clientHeight<420){c.style.transform='perspective(800px) rotateX('+((y/r.height-.5)*-8)+'deg) rotateY('+((x/r.width-.5)*8)+'deg) translateY(-4px)'}});
c.addEventListener('pointerleave',function(){c.style.transform=''})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.08});
document.querySelectorAll('.rv-in').forEach(function(el){io.observe(el)});
document.querySelectorAll('[data-n]').forEach(function(el){var t=+el.dataset.n,s=el.dataset.s,d=t%1,st=performance.now();
(function f(n){var p=Math.min((n-st)/1600,1),v=t*(1-Math.pow(1-p,3));el.textContent=(d?v.toFixed(1):Math.round(v))+s;if(p<1)requestAnimationFrame(f)})(st)});
})();
(function(){var b=document.getElementById('tgl'),r=document.documentElement;
function s(){b.textContent=r.getAttribute('data-theme')==='light'?'🌙':'☀️'}
s();b.addEventListener('click',function(){var t=r.getAttribute('data-theme')==='light'?'dark':'light';r.setAttribute('data-theme',t);try{localStorage.setItem('pim-theme',t)}catch(e){}s()})})();

(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
/* progress + header hide */
var pr=document.getElementById('prog'),hd=document.querySelector('header'),ly=0;
addEventListener('scroll',function(){var y=scrollY,m=document.documentElement.scrollHeight-innerHeight;pr.style.transform='scaleX('+(m>0?y/m:0)+')';
if(y>ly+8&&y>240)hd.classList.add('hide');else if(y<ly-8||y<120)hd.classList.remove('hide');ly=y},{passive:true});
/* stagger */
document.querySelectorAll('.rv-in').forEach(function(s){
s.querySelectorAll('.grid,.seo,.rv,.contact').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty('--i',i%6)})});
s.querySelectorAll('details').forEach(function(d,i){d.style.setProperty('--i',i)});
var o=new MutationObserver(function(){if(s.classList.contains('on')){setTimeout(function(){s.classList.add('done')},1900);o.disconnect()}});o.observe(s,{attributes:true,attributeFilter:['class']})});
if(rm)return;
/* cursor ring + magnetic buttons */
if(fine){var ring=document.getElementById('ring'),tx=0,ty=0,x=0,y=0;
addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;ring.classList.add('on')});
(function L(){x+=(tx-x)*.18;y+=(ty-y)*.18;ring.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(L)})();
document.querySelectorAll('a,button,summary,input,textarea').forEach(function(el){el.addEventListener('pointerenter',function(){ring.classList.add('big')});el.addEventListener('pointerleave',function(){ring.classList.remove('big')})});
document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})}
/* particle network */
var cv=document.getElementById('net'),cx=cv.getContext('2d'),W,H,P=[],mx=-999,my=-999,vis=true;
function size(){var r=cv.getBoundingClientRect();W=cv.width=r.width;H=cv.height=r.height;var n=Math.min(70,Math.floor(W/20));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:Math.random()*1.6+.8})}
size();addEventListener('resize',size);
cv.parentNode.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
cv.parentNode.addEventListener('pointerleave',function(){mx=my=-999});
new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(cv);
(function T(){requestAnimationFrame(T);if(!vis||document.hidden)return;
var light=document.documentElement.getAttribute('data-theme')==='light',c=light?'37,99,235':'120,170,255';
cx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var a=P[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
cx.beginPath();cx.arc(a.x,a.y,a.r,0,6.283);cx.fillStyle='rgba('+c+',.75)';cx.fill();
for(var j=i+1;j<P.length;j++){var b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<120){cx.strokeStyle='rgba('+c+','+(.22*(1-d/120))+')';cx.lineWidth=1;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}
var dm=Math.hypot(a.x-mx,a.y-my);if(dm<160){cx.strokeStyle='rgba('+c+','+(.5*(1-dm/160))+')';cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(mx,my);cx.stroke()}}})();
})();

(function(){
if(matchMedia('(prefers-reduced-motion:reduce)').matches){var c0=document.getElementById('chat');}
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var E=['❤️','👍','🔥','😍','🎉','💯','📈','🚀'];
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function pop(x,y,t){var s=document.createElement('span');s.className='fx';s.textContent=t||pick(E);s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',(Math.random()*90-45)+'px');s.style.setProperty('--rot',(Math.random()*60-30)+'deg');document.body.appendChild(s);setTimeout(function(){s.remove()},1400)}
function confetti(x,y){var C=['#4f8cff','#38bdf8','#f5c26b','#ff6b8b','#7ee787','#c084fc'];for(var i=0;i<36;i++){var d=document.createElement('i');d.className='cf';d.style.left=x+'px';d.style.top=y+'px';d.style.background=pick(C);d.style.setProperty('--x',(Math.random()*420-210)+'px');d.style.setProperty('--y',(-Math.random()*220-40)+'px');d.style.setProperty('--r',(Math.random()*900-450)+'deg');document.body.appendChild(d);setTimeout(function(n){return function(){n.remove()}}(d),1600)}}
function toast(t){var d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},3800)}
/* chat bubble (always shown, gentle) */
var chat=document.getElementById('chat'),ct=document.getElementById('chtxt'),wa='https://wa.me/917228853849';
setTimeout(function(){chat.hidden=false;ct.innerHTML='<span class="dots"><i></i><i></i><i></i></span>';
setTimeout(function(){ct.textContent='Namaste! 👋 Apna business ya campaign grow karna hai? WhatsApp pe baat karein 😄'},1600)},3500);
chat.addEventListener('click',function(){window.open(wa,'_blank','noopener')});
chat.querySelector('.x').addEventListener('click',function(e){e.stopPropagation();chat.hidden=true});
if(rm)return;
/* click reactions + confetti */
addEventListener('pointerdown',function(e){if(e.target.closest('input,textarea,summary,.chat,#gcv'))return;
if(document.querySelectorAll('.fx').length<24)pop(e.clientX,e.clientY);
var b=e.target.closest('.btn.pri,.cta-big .btn,.social a');if(b){var h=b.getAttribute('href')||'#';if(h.charAt(0)==='#'||b.tagName==='BUTTON')confetti(e.clientX,e.clientY)}});
/* live reactions in hero */
var hero=document.querySelector('.hero'),hv=true;
new IntersectionObserver(function(e){hv=e[0].isIntersecting}).observe(hero);
setInterval(function(){if(!hv||document.hidden)return;var s=document.createElement('span');s.className='live';s.textContent=pick(E);s.style.left=(8+Math.random()*84)+'%';s.style.setProperty('--dx',(Math.random()*120-60)+'px');hero.appendChild(s);setTimeout(function(){s.remove()},4700)},1100);
/* logo easter egg: 5 taps */
var n=0,lg=document.querySelector('.logo'),tm;
lg.addEventListener('click',function(){n++;clearTimeout(tm);tm=setTimeout(function(){n=0},1500);
if(n>=5){n=0;toast('🎉 Secret mil gaya! Aap pakke digital marketing wale ho 😄');for(var i=0;i<28;i++)(function(i){setTimeout(function(){pop(Math.random()*innerWidth,innerHeight*.7+Math.random()*60)},i*70)})(i);confetti(innerWidth/2,innerHeight/3)}});
})();

(function(){
var cv=document.getElementById('gcv');if(!cv)return;
var cx=cv.getContext('2d'),W,H,dpr,wrap=document.getElementById('gwrap'),ov=document.getElementById('gov'),oc=document.getElementById('govc'),
gs=document.getElementById('gs'),gt=document.getElementById('gt'),gb=document.getElementById('gb'),gc=document.getElementById('gcombo'),bar=document.getElementById('gbar');
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function fit(){dpr=Math.min(devicePixelRatio||1,2);var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
fit();addEventListener('resize',fit);
var GOOD=[{e:'❤️',p:1},{e:'👍',p:1},{e:'🔥',p:2},{e:'🎉',p:2}],GOLD={e:'💎',p:5},BAD=[{e:'🤖',p:-5,l:'Bot!'},{e:'😡',p:-3,l:'Troll!'}];
var items=[],floats=[],score=0,time=30,combo=0,playing=false,last=0,sp=0,best=0,DUR=30;
try{best=+localStorage.getItem('pim-best')||0}catch(e){}gb.textContent=best;
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function spawn(){var r=Math.random(),t=r<.22?pick(BAD):r<.27?GOLD:pick(GOOD),el=DUR-time;
items.push({t:t,x:34+Math.random()*(W-68),y:-30,vy:(95+Math.random()*80+el*4)*(t===GOLD?1.5:1),ph:Math.random()*6,rot:0})}
function hud(){gs.textContent=score;gt.textContent=Math.max(0,Math.ceil(time));bar.style.transform='scaleX('+Math.max(0,time/DUR)+')';gc.textContent=combo>=5?'🔥 Combo x2':''}
function loop(t){if(!playing)return;requestAnimationFrame(loop);var dt=Math.min((t-last)/1000,.05);last=t;time-=dt;
if(time<=0){time=0;hud();end();return}
sp-=dt;if(sp<=0){spawn();sp=Math.max(.26,.72-(DUR-time)*.015)}
cx.clearRect(0,0,W,H);cx.textAlign='center';cx.textBaseline='middle';cx.font='38px "Apple Color Emoji","Segoe UI Emoji",sans-serif';
for(var i=items.length-1;i>=0;i--){var it=items[i];it.y+=it.vy*dt;it.ph+=dt*2.2;it.x+=Math.sin(it.ph)*30*dt;it.rot=Math.sin(it.ph)*.35;
if(it.y>H+40){items.splice(i,1);continue}
cx.save();cx.translate(it.x,it.y);cx.rotate(it.rot);if(it.t===GOLD){cx.shadowColor='#38bdf8';cx.shadowBlur=18}cx.fillText(it.t.e,0,0);cx.restore()}
cx.font='800 20px Manrope,Inter,sans-serif';
for(var j=floats.length-1;j>=0;j--){var f=floats[j];f.l-=dt;f.y-=50*dt;if(f.l<=0){floats.splice(j,1);continue}cx.globalAlpha=Math.min(1,f.l*2);cx.fillStyle=f.c;cx.fillText(f.s,f.x,f.y)}cx.globalAlpha=1;hud()}
cv.addEventListener('pointerdown',function(e){if(!playing)return;var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
for(var i=items.length-1;i>=0;i--){var it=items[i];if(Math.hypot(it.x-x,it.y-y)<38){hit(it);items.splice(i,1);break}}});
function hit(it){var p=it.t.p,g=p;if(p>0){combo++;if(combo>=5)g=p*2}else{combo=0;wrap.classList.remove('shake');void wrap.offsetWidth;wrap.classList.add('shake')}
score=Math.max(0,score+g);floats.push({x:it.x,y:it.y-24,l:.9,s:p>0?'+'+g:g+' '+it.t.l,c:p>0?'#7ee787':'#ff6b8b'})}
function rank(s){return s<20?'Intern 🐣':s<45?'Social Media Executive 📱':s<80?'Growth Hacker 🚀':'Viral King/Queen 👑'}
function confetti(){if(rm)return;var C=['#4f8cff','#38bdf8','#f5c26b','#ff6b8b','#7ee787','#c084fc'],r=cv.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
for(var i=0;i<40;i++){var d=document.createElement('i');d.className='cf';d.style.left=x+'px';d.style.top=y+'px';d.style.background=pick(C);d.style.setProperty('--x',(Math.random()*500-250)+'px');d.style.setProperty('--y',(-Math.random()*220-40)+'px');d.style.setProperty('--r',(Math.random()*900-450)+'deg');document.body.appendChild(d);setTimeout(function(n){return function(){n.remove()}}(d),1600)}}
function intro(){oc.innerHTML='<h3>🎮 Catch the Likes!</h3><p>❤️ 👍 🔥 🎉 💎 pe tap karke followers badhao. 🤖 bots aur 😡 trolls se bachna! 5 lagataar catch = Combo x2.</p><div class="row"><button class="btn pri" id="gstart" type="button">Start Game ▶</button></div>';ov.hidden=false;document.getElementById('gstart').onclick=start}
function start(){items=[];floats=[];score=0;time=DUR;combo=0;sp=0;playing=true;ov.hidden=true;hud();last=performance.now();requestAnimationFrame(loop)}
function end(){playing=false;var nb=score>best;if(nb){best=score;try{localStorage.setItem('pim-best',best)}catch(e){}gb.textContent=best}
var msg=encodeURIComponent('Hi! Maine aapki website ke game mein '+score+' followers kamaye 😄 ('+rank(score)+'). Mujhe apna digital marketing campaign discuss karna hai.');
oc.innerHTML='<h3>⏱️ Time’s up!</h3><p><b style="font-size:1.6rem;color:var(--c3)">'+score+'</b> followers kamaye<br>Rank: <b>'+rank(score)+'</b>'+(nb&&score>0?'<br>🏆 New best score!':'')+'<br>Asli campaign mein is se bhi tez growth ho sakti hai 😉</p><div class="row"><button class="btn" id="gagain" type="button">Play again ↻</button><a class="btn pri" target="_blank" rel="noopener" href="https://wa.me/917228853849?text='+msg+'">Score ke saath WhatsApp karein ↗</a></div>';
ov.hidden=false;document.getElementById('gagain').onclick=start;if(score>=45)confetti()}
intro();hud();
})();

(function(){
var b=document.getElementById('totop');if(!b)return;
var p=document.getElementById('tprg'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
function upd(){var y=scrollY,m=document.documentElement.scrollHeight-innerHeight;b.classList.toggle('show',y>600);p.style.strokeDashoffset=151*(1-(m>0?Math.min(1,y/m):0))}
addEventListener('scroll',upd,{passive:true});upd();
b.addEventListener('click',function(){
if(rm){scrollTo(0,0);return}
var r=b.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
for(var i=0;i<9;i++){var d=document.createElement('i');d.className='puff';d.style.left=x+'px';d.style.top=(y+10)+'px';d.style.setProperty('--dx',(Math.random()*90-45)+'px');d.style.setProperty('--dy',(20+Math.random()*60)+'px');d.style.animationDelay=(i*40)+'ms';document.body.appendChild(d);setTimeout(function(n){return function(){n.remove()}}(d),1300)}
b.classList.add('launch');scrollTo({top:0,behavior:'smooth'});
setTimeout(function(){b.classList.remove('launch')},1150);
var t0=Date.now(),c=setInterval(function(){if(scrollY<4||Date.now()-t0>7000){clearInterval(c);if(scrollY<4){var t=document.createElement('div');t.className='toast';t.textContent='🚀 Dosto, hum top pe pahunch gaye!';document.body.appendChild(t);setTimeout(function(){t.remove()},2800)}}},120)})
})();
