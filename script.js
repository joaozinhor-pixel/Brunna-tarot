// ===== EDITE AQUI =====
const TELEFONE='5582999642470'; // WhatsApp com código do país e DDD, só números
const PIX_CODIGO='00020126330014BR.GOV.BCB.PIX0111132329814295204000053039865802BR5923Rayssa Honorio da Silva6009SAO PAULO62140510Oa1Swp86Xr63047895'; // código Pix copia e cola (deixe '' para esconder)
// ======================

const TIRAGENS=[['Uma pergunta objetiva (cada)','2,00'],['Três perguntas','5,00'],['Seis perguntas','10,00'],['Nove perguntas','15,00']];
const ESPECIFICAS=[
  ['Leitura de gravidez','10,00','Sobre maternidade, fertilidade e questões relacionadas à gravidez.'],
  ['Leitura de financeiro','15,00','Analisa sua vida financeira, oportunidades, desafios, prosperidade e possibilidades de crescimento.'],
  ['Leitura templo do diabo','20,00','Aprofunda traições, desejos, tentações, atração, segredos e intenções ocultas em um relacionamento.'],
  ['Leitura templo de Afrodite','20,00','Aprofunda sentimentos, pensamentos, desejos, intenções e caminhos amorosos entre duas pessoas.']
];
const CARTAS=[['Uma página','5'],['Duas páginas','10'],['Três páginas','15'],['Cinco páginas','20']];
const PASSOS=[
  'Escolha sua tiragem ou carta canalizada.',
  'Envie suas perguntas e os nomes necessários (de preferência completos).',
  'Realize o pagamento.',
  'Envie o comprovante.',
  'Aguarde, e sua tiragem ou carta chegará. 🧡'
];

function wa(msg){return 'https://wa.me/'+TELEFONE+'?text='+encodeURIComponent(msg);}
function linha(nome,preco,pedido){
  return '<li><span class="nome">'+nome+'</span><b>R$ '+preco+'</b><a href="'+wa(pedido)+'" target="_blank" rel="noopener">Quero</a></li>';
}

const SECOES=[
  {id:'valores',rotulo:'✨ Valores e tipos de tiragens',html:()=>
    '<h2>Valores e tipos de tiragens</h2><h3>Tiragens de tarot</h3><ul class="lista">'+
    TIRAGENS.map(([n,p])=>linha(n,p,'Olá! Quero a tiragem: '+n+' (R$ '+p+').')).join('')+'</ul>'+
    '<h3>Tiragens específicas</h3>'+
    ESPECIFICAS.map(([n,p,d])=>'<ul class="lista">'+linha(n,p,'Olá! Quero a '+n.toLowerCase()+' (R$ '+p+').')+'</ul><p class="desc">'+d+'</p>').join('')},
  {id:'pix',rotulo:'💳 Pagamento via Pix',html:()=>
    '<h2>Pagamento via Pix</h2>'+
    (PIX_CODIGO?'<p>Use o Pix copia e cola:</p><textarea id="pixcodigo" rows="4" readonly>'+PIX_CODIGO+'</textarea><p><button class="btn" id="copiar">Copiar código Pix</button> <span id="copiado"></span></p>'
               :'<p>Peça a minha chave Pix pelo WhatsApp que eu envio para você.</p><p><a class="btn" href="'+wa('Olá! Pode me enviar a chave Pix?')+'" target="_blank" rel="noopener">Pedir a chave Pix</a></p>')+
    '<p class="destaque">Após efetuar o pagamento, me envie o comprovante.</p>',
   depois:()=>{
    const b=document.getElementById('copiar');if(!b)return;
    b.onclick=()=>{
      const ok=()=>{document.getElementById('copiado').textContent='Copiado! ✅';};
      const velho=()=>{document.getElementById('pixcodigo').select();document.execCommand('copy');ok();};
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(PIX_CODIGO).then(ok,velho);else velho();
    };
   }},
  {id:'cartas',rotulo:'📜 Cartas canalizadas',html:()=>
    '<h2>Cartas canalizadas</h2>'+
    '<p>Cartas canalizadas são um texto intuitivo que escrevo a partir das tiragens de tarot, de acordo com a energia que as cartas passam da pessoa que vai enviar a carta.</p>'+
    '<h3>Valores das cartas</h3><ul class="lista">'+
    CARTAS.map(([n,p])=>linha(n,p+',00','Olá! Quero uma carta canalizada de '+n.toLowerCase()+' (R$ '+p+').')).join('')+'</ul>'},
  {id:'horarios',rotulo:'🕐 Horários',html:()=>
    '<h2>Horários</h2><h3>Segunda a sexta</h3><p>Das 14h às 21h.</p><h3>Sábado e domingo</h3><p>Sem atendimentos.</p>'},
  {id:'como',rotulo:'🔮 Como fazer sua consulta',html:()=>
    '<h2>Como fazer sua consulta</h2><ol class="passos">'+PASSOS.map(p=>'<li>'+p+'</li>').join('')+'</ol>'}
];

const botoes=document.getElementById('botoes'),painel=document.getElementById('painel');
let aberta=null;
SECOES.forEach(s=>{
  const b=document.createElement('button');
  b.textContent=s.rotulo;b.setAttribute('aria-expanded','false');b.dataset.id=s.id;
  b.onclick=()=>{
    if(aberta===s.id){aberta=null;painel.hidden=true;}
    else{aberta=s.id;painel.innerHTML=s.html();if(s.depois)s.depois();painel.hidden=false;painel.scrollIntoView({behavior:'smooth',block:'nearest'});}
    botoes.querySelectorAll('button').forEach(x=>x.setAttribute('aria-expanded',String(x.dataset.id===aberta)));
  };
  botoes.appendChild(b);
});
document.getElementById('agendar').href=wa('Olá! Gostaria de agendar uma leitura de tarot.');
