'use strict';
const QUESTIONS=[
 {image:10,title:'平常聚會時，你第一杯通常會點？',options:['濃度高的烈酒（威士忌、龍舌蘭等）','調酒／長島／高酒精啤酒','啤酒／沙瓦／梅酒','無酒精飲料或只小酌一杯']},
 {image:11,title:'聚會一開始，你喝酒的速度是？',options:['很快，常常先乾一杯再說','普通，氣氛起來就越喝越快','慢慢喝，會間隔配食物','超級慢，常常喝到最後才喝']},
 {image:9,title:'當大家越喝越嗨時，你通常會？',options:['繼續加碼，越喝越有精神','跟著再喝幾杯，通常沒問題','開始放緩，注意自己的狀態','超前停手，切換成旁觀者']},
 {image:6,title:'隔天早上醒來，你通常的狀態是？',options:['幾乎沒事，照常上班上課','有點宿醉，但休息一下就好','頭痛噁心，需要一整天恢復','超級痛苦，發誓再也不喝']},
 {image:8,title:'面對別人敬酒時，你通常會？',options:['來者不拒，直接乾了','看對象，熟的就乾，不熟就意思意思','會喝，但通常會控制量','能推就推，用其他方式代替']},
 {image:5,title:'你可以持續喝多久才會想停下來？',options:['整晚都沒問題，越晚越好','大約 6～8 小時左右','3～5 小時差不多','1～2 小時就想收工']}
];
const RESULTS=[{min:15,image:1,name:'巨蟒',label:'喉嚨借過・吞噬巨蟒'},{min:10,image:2,name:'鱷魚',label:'死亡翻滾・杯底兇鱷'},{min:5,image:4,name:'老虎',label:'醉後躺地・小酒量虎'},{min:0,image:3,name:'水豚',label:'佛系飲酒・溫和水豚'}];
const answers=Array(6).fill(null),app=document.querySelector('#app'),status=document.querySelector('#status');
function getResult(score){return RESULTS.find(r=>score>=r.min)}
function img(n,alt){return `<img class="poster" src="assets/${n}.png" alt="${alt}" fetchpriority="high">`}
function go(hash){if(location.hash===hash)render();else location.hash=hash}
function reset(){answers.fill(null);go('#q1')}
function render(){
 status.textContent='';let route=location.hash||'#home';
 if(route==='#result'&&answers.some(a=>a===null)){go('#q'+(answers.indexOf(null)+1));return}
 if(route==='#home'){
 app.innerHTML=img(7,'酒量心理測驗首頁與規則：共六題，每題單選。A 三分、B 二分、C 一分、D 零分。')+`<section class="intro"><div class="eyebrow">BAR千手 · YOUR SPIRIT ANIMAL</div><h1>今晚，你是哪一種酒量動物？</h1><p>依照平常的真實情況回答 6 道題目，揭曉你的專屬動物。</p><button id="start" class="primary wide">開始測驗 →</button></section>`;
 document.querySelector('#start').onclick=reset;
 }else if(/^#q[1-6]$/.test(route)){
 const i=Number(route.slice(2))-1,q=QUESTIONS[i];
 app.innerHTML=`<div class="eyebrow">QUESTION ${i+1} / 6</div><div class="progress" aria-label="第 ${i+1} 題，共六題"><div style="width:${(i+1)/6*100}%"></div></div>`+img(q.image,`QUESTION ${i+1}：${q.title}`)+`<section class="panel"><h1>${q.title}</h1><p class="muted">點選下方一個答案，再繼續下一題。</p><div class="choices">${q.options.map((t,j)=>`<button class="choice" data-choice="${j}" aria-pressed="${answers[i]===j}"><strong>${'ABCD'[j]}</strong><span>${t}</span></button>`).join('')}</div><div class="actions"><button id="back">← ${i?'上一題':'首頁'}</button><button id="next" class="primary" ${answers[i]===null?'disabled':''}>${i===5?'查看結果':'下一題'} →</button></div></section>`;
 app.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{answers[i]=Number(b.dataset.choice);app.querySelectorAll('[data-choice]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)));document.querySelector('#next').disabled=false});
 document.querySelector('#back').onclick=()=>go(i?'#q'+i:'#home');
 document.querySelector('#next').onclick=()=>{if(answers[i]!==null)go(i===5?'#result':'#q'+(i+2))};
 }else if(route==='#result'){
 const score=answers.reduce((sum,a)=>sum+3-a,0),r=getResult(score);
 app.innerHTML=`<section class="panel"><div class="eyebrow">YOUR RESULT · 你的酒量動物</div><h1>${r.label}</h1><div class="score">${score} <small>/ 18 分</small></div><p class="muted">A＝3 分 · B＝2 分 · C＝1 分 · D＝0 分</p></section>`+img(r.image,`${r.name}原始結果圖`)+`<div class="actions"><a class="button primary" href="assets/${r.image}.png" download="Bar千手-${r.name}.png">下載結果圖片</a><button id="share">分享圖片</button></div><p class="muted">下載的是原始結果圖，個人總分顯示於上方。手機若開啟圖片，可長按儲存。</p><div class="actions"><button id="back">← 返回修改</button><button id="restart">重新測驗 ↻</button></div><a class="button wide" style="display:block" href="#home">返回首頁</a>`;
 document.querySelector('#back').onclick=()=>go('#q6');document.querySelector('#restart').onclick=reset;
 document.querySelector('#share').onclick=async()=>{
 const b=document.querySelector('#share');b.disabled=true;
 try{if(!navigator.share){status.textContent='此瀏覽器未提供分享選單，請下載結果圖片後分享。';return}
 const blob=await(await fetch(`assets/${r.image}.png`)).blob(),file=new File([blob],`Bar千手-${r.name}.png`,{type:'image/png'});
 if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title:'Bar千手酒量心理測驗',text:`我的結果是${r.name}，總分 ${score}/18！`})}
 else{status.textContent='此瀏覽器不支援分享圖片，請下載圖片後分享。'}
 }catch(e){if(e.name!=='AbortError')status.textContent='圖片分享未完成，請使用下載結果圖片。'}finally{b.disabled=false}
 };
 }else{go('#home');return}
 window.scrollTo(0,0);const heading=app.querySelector('h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true})}
}
addEventListener('hashchange',render);render();
