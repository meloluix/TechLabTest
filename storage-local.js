// Versão portátil: registros somente neste navegador, sem servidor.
const LOCAL_KEY='wit-records-v1';
window.fetch=async function(url,options={}){
 const u=new URL(url,'https://local.test');if(!u.pathname.startsWith('/api/responses'))throw new Error('Sem servidor nesta versão');
 try{let records=JSON.parse(localStorage.getItem(LOCAL_KEY)||'[]');const method=options.method||'GET';
 if(method==='POST'){const data=JSON.parse(options.body);if(!records.some(r=>r.id===data.id)){records.push(data);localStorage.setItem(LOCAL_KEY,JSON.stringify(records));}return new Response(JSON.stringify({saved:true}),{status:201});}
 if(method==='DELETE'){const id=decodeURIComponent(u.pathname.split('/').pop());records=records.filter(r=>r.id!==id);localStorage.setItem(LOCAL_KEY,JSON.stringify(records));return new Response('{}',{status:200});}
 return new Response(JSON.stringify({records,cursor:null}),{status:200});
 }catch{return new Response('{}',{status:503});}
};
