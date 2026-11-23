// Endpoint público de recebimento. Nenhuma senha ou credencial fica no site.
const SHEETS_ENDPOINT='https://script.google.com/macros/s/AKfycbwrIlEfp2WonjoWazaJDZsybRCF3UOwshxGpZdWHPXQp2H-bLDFA3NjUJoESOmCuthK/exec';
function sheetPayload(record){
 const ranking=rankAnswers(record.answers), maximum=ranking[0].score;
 const winners=maximum>0?ranking.filter(c=>c.score===maximum).map(c=>COURSES[c.index].name):[];
 return {id:record.id,aluno:'',turma:record.group,curso:winners.length?winners.join(' / '):'Em exploração',pontuacao:maximum,empates:winners.length>1?winners:[],
 respostas:record.answers.map((answer,i)=>({pergunta:i+1,codigo:answer,resposta:({a:QUESTIONS[i].options[0],b:QUESTIONS[i].options[1],both:'As duas',none:'Nenhuma'})[answer]})),
 pontuacoes:Object.fromEntries(ranking.map(c=>[COURSES[c.index].name,c.score]))};
}
async function saveToSheets(record){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),30000);
 try{
  // text/plain permite um POST simples entre origens, sem preflight JSON.
  // Não usar no-cors: uma resposta opaca não confirma a gravação.
  const response=await fetch(SHEETS_ENDPOINT,{method:'POST',mode:'cors',credentials:'omit',redirect:'follow',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify(sheetPayload(record)),signal:controller.signal});
  if(!response.ok)throw new Error('Falha HTTP');
  const receipt=await response.json();
  if(receipt.ok!==true||receipt.id!==record.id)throw new Error('Recebimento não confirmado');
  return receipt;
 }finally{clearTimeout(timer);}
}
