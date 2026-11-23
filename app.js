const $=id=>document.getElementById(id);let answers=Array(15).fill(null),at=0,record=null,send=true,records=[],cursor=null;const key='wit-draft-v1';
function show(id){['intro','quiz','result','admin'].forEach(x=>$(x).hidden=x!==id);window.scrollTo({top:0,behavior:'smooth'});}
function draft(){try{sessionStorage.setItem(key,JSON.stringify({answers,at,group:$('group').value,send}));}catch{}}
function render(){show('quiz');$('counter').textContent=`Pergunta ${at+1} de 15`;$('progress').value=answers.filter(Boolean).length;$('qtitle').textContent=QUESTIONS[at].title;$('options').replaceChildren();const opts=[['a',QUESTIONS[at].options[0]],['b',QUESTIONS[at].options[1]],['both','As duas me interessam'],['none','Nenhuma me interessa por enquanto']];for(const[v,t]of opts){let l=document.createElement('label');l.className='choice'+(['both','none'].includes(v)?' minor':'');let r=document.createElement('input');r.type='radio';r.name='answer';r.value=v;r.checked=answers[at]===v;r.addEventListener('change',()=>{answers[at]=v;$('next').disabled=false;draft();});let s=document.createElement('span');s.textContent=t;l.append(r,s);$('options').append(l);}$('next').textContent=at===14?'Ver meu resultado →':'Continuar →';$('next').disabled=!answers[at];$('back').textContent=at===0?'← Início':'← Voltar';$('qtitle').focus();draft();}
function start(collect){send=collect;render();}
$('start').onclick=()=>start(true);$('privateStart').onclick=()=>start(false);$('back').onclick=()=>{if(at===0)show('intro');else{at--;render();}};
$('next').onclick=()=>{if(!answers[at])return;if(at<14){at++;render();}else finish();};
function courseCard(i){const c=COURSES[i];let el=document.createElement('article');el.className='course'+(c.id==='maker'?' maker':'');for(const[tag,txt,cl]of [['p',c.group,'eyebrow'],['h2',c.name,''],['p',c.desc,''],['p','Uma experiência para começar: '+c.project,''],['p','Áreas para conhecer: '+c.areas,'sub']]){let x=document.createElement(tag);x.textContent=txt;x.className=cl;el.append(x);}return el;}
function resultView(){show('result');const rank=rankAnswers(answers),max=rank[0].score,tops=rank.filter(x=>x.score===max);$('resultTitle').textContent=max===0?'Seu caminho ainda está aberto.':tops.length===6?'Você quer explorar muitos caminhos.':tops.length>1?'Você tem mais de uma afinidade.':COURSES[tops[0].index].name+' pode ser seu próximo passo.';$('resultIntro').textContent=max===0?'Nenhuma opção chamou sua atenção agora. Conheça as demonstrações e converse com o professor antes de escolher.':tops.length>1?'Os cursos abaixo empataram nas suas escolhas. Experimente uma atividade de cada um antes de decidir.':'Este curso reuniu mais escolhas suas. Conheça também as outras afinidades: gostar de várias áreas é possível.';$('resultCards').replaceChildren(...(max===0?[]:tops).map(x=>courseCard(x.index)));$('ranking').replaceChildren();let pos=0,prev=-1;rank.forEach((x,i)=>{if(x.score!==prev){pos=i+1;prev=x.score;}let row=document.createElement('div');row.className='rankingrow';let b=document.createElement('button');b.textContent=`${max===0?'':pos+'. '}${COURSES[x.index].name}`;b.onclick=()=>{$('resultCards').replaceChildren(courseCard(x.index));$('resultCards').scrollIntoView({behavior:'smooth'});};let track=document.createElement('div');track.className='track';let bar=document.createElement('div');bar.className='bar';bar.style.width=(x.score/5*100)+'%';track.append(bar);let v=document.createElement('span');v.textContent=x.score+' de 5';row.append(b,track,v);$('ranking').append(row);});$('resultTitle').focus();}
async function finish(){const id=crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2);record={id,group:$('group').value.trim(),answers:[...answers],version:'1',createdAt:new Date().toISOString()};resultView();try{sessionStorage.removeItem(key);}catch{}if(!send){$('saveStatus').textContent='Modo sem envio: suas respostas não foram registradas com o professor. Baixe o resultado se quiser guardá-lo.';return;}await submit();}
let submitting=false;
async function submit(){
 if(submitting||!record)return;
 submitting=true;
 const current=record;
 $('newStudent').disabled=true;
 $('saveStatus').textContent='Enviando suas respostas à planilha… Aguarde a confirmação.';
 try{
  await saveToSheets(current);
  $('saveStatus').textContent='Recebimento confirmado pela planilha. Identificador: '+current.id+'. Guarde este código para localizar seu registro com o professor.';
 }catch{
  $('saveStatus').replaceChildren(document.createTextNode('Não foi possível confirmar o recebimento. Suas respostas podem ter chegado; tente novamente para confirmar, sem criar outro registro. '));
  const b=document.createElement('button');b.textContent='Tentar novamente';b.className='secondary';b.onclick=submit;$('saveStatus').append(b);
 }finally{submitting=false;$('newStudent').disabled=false;}
}

function download(name,text,type='text/plain;charset=utf-8'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
$('download').onclick=()=>{const r=rankAnswers(answers);download('meus-interesses.txt','Mapa de interesses — WIT e TechLab Maker\nIdentificador: '+record.id+'\n\n'+r.map(x=>COURSES[x.index].name+': '+x.score+' de 5').join('\n')+'\n\n'+QUESTIONS.map((q,i)=>(i+1)+'. '+q.title+'\nResposta: '+({a:q.options[0],b:q.options[1],both:'As duas',none:'Nenhuma'}[answers[i]])).join('\n\n')+'\n\nIndicação de interesses; não é teste vocacional validado.');};
$('newStudent').onclick=()=>{answers=Array(15).fill(null);at=0;record=null;try{sessionStorage.removeItem(key);}catch{}$('resultCards').replaceChildren();$('ranking').replaceChildren();$('saveStatus').textContent='';show('intro');$('start').focus();};
$('exportLegacy').onclick=()=>{try{
 const old=JSON.parse(localStorage.getItem('wit-records-v1')||'[]');
 if(!old.length){$('legacyStatus').textContent='Nenhum registro antigo neste navegador.';return;}
 download('registros-locais-antigos.json',JSON.stringify(old,null,2),'application/json');
 $('legacyStatus').textContent=old.length+' registros antigos exportados. Esta ação não os envia à planilha.';
 }catch{$('legacyStatus').textContent='Não foi possível ler os registros locais.';}};
if(new URLSearchParams(location.search).has('professor')){show('admin');}else{try{const s=JSON.parse(sessionStorage.getItem(key)||'null');if(s&&s.answers?.length===15&&s.answers.every(x=>x===null||['a','b','both','none'].includes(x))){answers=s.answers;at=Math.min(14,Math.max(0,s.at||0));$('group').value=s.group||'';$('resumeHint').textContent='Há um questionário em andamento nesta aba. Ao começar, você continua de onde parou.';let clear=document.createElement('button');clear.className='secondary';clear.textContent='Descartar e começar do zero';clear.onclick=()=>{answers=Array(15).fill(null);at=0;sessionStorage.removeItem(key);$('resumeHint').replaceChildren();};$('resumeHint').append(clear);}}catch{}}
