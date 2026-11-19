(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=(n,d=1)=>Number(n).toLocaleString('it-IT',{maximumFractionDigits:d});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const P='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const I={
  home:`<svg viewBox="0 0 24 24" ${P}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>`,
  food:`<svg viewBox="0 0 24 24" ${P}><path d="M7 3v8a2 2 0 0 0 4 0V3M9 11v10M17 3c-2 1.5-3 4-3 7h3v11"/></svg>`,
  gym:`<svg viewBox="0 0 24 24" ${P}><path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12"/></svg>`,
  spark:`<svg viewBox="0 0 24 24" ${P}><path d="M12 3l1.9 4.6 4.6 1.9-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M18 15l.8 2.2 2.2.8-2.2.8L18 21l-.8-2.2-2.2-.8 2.2-.8z"/></svg>`,
  user:`<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>`,
  plus:`<svg viewBox="0 0 24 24" ${P} stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>`,
  check:`<svg viewBox="0 0 24 24" ${P} stroke-width="3"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  chev:`<svg viewBox="0 0 24 24" width="20" height="20" ${P}><path d="M9 6l6 6-6 6"/></svg>`,
  cam:`<svg viewBox="0 0 24 24" ${P}><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>`,
  link:`<svg viewBox="0 0 24 24" ${P}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>`,
  play:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>`,
  x:`<svg viewBox="0 0 24 24" ${P} stroke-width="2.4"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  wand:`<svg viewBox="0 0 24 24" ${P}><path d="M15 4V2M15 10V8M11 6h2M17 6h2M4 20 14 10"/><path d="M18 14l.7 1.6 1.6.4-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.4z"/></svg>`,
  refresh:`<svg viewBox="0 0 24 24" ${P}><path d="M20 12a8 8 0 1 1-2.3-5.7L20 8.5M20 4v4.5h-4.5"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" width="13" height="13" ${P}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>`,
  target:`<svg viewBox="0 0 24 24" width="14" height="14" ${P}><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/></svg>`,
  edit:`<svg viewBox="0 0 24 24" ${P}><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>`,
  sun:`<svg viewBox="0 0 24 24" ${P}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  moon:`<svg viewBox="0 0 24 24" ${P}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
  cup:`<svg viewBox="0 0 24 24" ${P}><path d="M5 8h12v5a6 6 0 0 1-12 0zM17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5c-.6 1 .6 1.5 0 2.5M12 2.5c-.6 1 .6 1.5 0 2.5"/></svg>`,
  bowl:`<svg viewBox="0 0 24 24" ${P}><path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1-2 2-2M14 4c-1 1.5 0 2.5 1 3"/></svg>`,
  apple:`<svg viewBox="0 0 24 24" ${P}><path d="M12 7c-2-2-7-1.5-7 4 0 4 3 9 5 9 1 0 1.3-.5 2-.5s1 .5 2 .5c2 0 5-5 5-9 0-5.5-5-6-7-4z"/><path d="M12 7c0-2 1-3.5 3-4"/></svg>`,
  trash:`<svg viewBox="0 0 24 24" ${P}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`,
  cart:`<svg viewBox="0 0 24 24" ${P}><path d="M3 4h2l2.4 11h10.2L20 7H6.2"/><circle cx="9" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/></svg>`
};
const MEAL_ICON={col:I.cup,pra:I.bowl,spu:I.apple,cen:I.moon};

const KEY='tempra-v2';
let saved=window.__SF_STATE||null;if(!saved){try{saved=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(_){saved={}}}
function persist(){try{const media={};for(const k in S.media)media[k]=S.media[k].filter(m=>m.type!=='video');const data={profile:S.profile,goal:S.goal,media,custom:S.custom,photos:S.photos,shop:S.shop,weights:SERIES.peso.v,hkWDay};if(window.SF)window.SF.save(data);localStorage.setItem(KEY,JSON.stringify(data))}catch(_){toast('Memoria del browser piena: alcune foto non verranno ricordate')}}

const now=new Date();
const todayIdx=(now.getDay()+6)%7;
const monday=new Date(now);monday.setDate(now.getDate()-todayIdx);
const DN=['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
const SHARE={col:.25,pra:.35,spu:.1,cen:.3};
const MEALS=[['col','Colazione','07:30'],['pra','Pranzo','13:00'],['spu','Spuntino','16:30'],['cen','Cena','20:30']];
const MEAL_NAME={col:'Colazione',pra:'Pranzo',spu:'Spuntino',cen:'Cena'};

const S={
  profile:Object.assign({name:'Giuliano',sex:'M',age:30,height:180,weight:79.1,start:84,target:75,activity:1.55,photo:null},saved.profile||{}),
  goal:Object.assign({
    type:'Ricomposizione',
    title:'Scendere a 75 kg mantenendo la forza',
    what:'Allenarmi 5 volte a settimana con la scheda Push / Pull / Gambe.\nCamminare almeno 8.000 passi al giorno.\nPesare il cibo e segnare tutti i pasti.\nDormire 7 ore e bere 2,5 L d’acqua.',
    diet:['Deficit moderato','Alto proteico','Mediterranea'],
    train:['Push / Pull / Gambe','Sovraccarico progressivo'],
    deadline:'2027-03-31',manual:false,k:null,p:null,c:null,f:null,prefs:[]
  },saved.goal||{}),
  days:{},plan:{},gen:{},selDay:todayIdx,water:5,
  shop:saved.shop||[
    {g:'Frutta e verdura',items:[{n:'Zucchine',q:'1 kg',d:false},{n:'Spinaci freschi',q:'2 buste',d:false},{n:'Mirtilli',q:'250 g',d:true},{n:'Banane',q:'6',d:false}]},
    {g:'Proteine',items:[{n:'Petto di pollo',q:'1 kg',d:false},{n:'Salmone',q:'2 filetti',d:false},{n:'Uova',q:'12',d:true},{n:'Yogurt greco 0%',q:'4 vasetti',d:false}]},
    {g:'Dispensa',items:[{n:'Fiocchi d’avena',q:'500 g',d:false},{n:'Riso basmati',q:'1 kg',d:true},{n:'Mandorle',q:'200 g',d:false}]}
  ],
  photos:saved.photos||[],custom:saved.custom||[],media:saved.media||{},
  nutTab:'diario',gymTab:'scheda',profTab:'dati',exFilter:'Tutti',recFilter:'Tutte',chart:'peso',
  done:{},rpe:{},lastSet:null,chat:null,editGoal:false,o9:false,photo:null,bc:null
};
S.days[todayIdx]={
  col:[{n:'Yogurt greco 0%',q:'170 g',k:97,p:17,c:6,f:0},{n:'Fiocchi d’avena',q:'50 g',k:189,p:6.5,c:33,f:3.5},{n:'Mirtilli',q:'80 g',k:46,p:0.6,c:11,f:0.3}],
  pra:[{n:'Riso basmati',q:'80 g',k:280,p:6,c:62,f:0.6},{n:'Petto di pollo',q:'150 g',k:165,p:35,c:0,f:2.5},{n:'Zucchine grigliate',q:'200 g',k:34,p:2.4,c:6,f:0.4},{n:'Olio extravergine',q:'10 g',k:90,p:0,c:0,f:10}],
  spu:[{n:'Mela',q:'180 g',k:94,p:0.5,c:25,f:0.3},{n:'Mandorle',q:'20 g',k:116,p:4.2,c:4.4,f:10}],
  cen:[]
};
if(!S.media['Panca piana con bilanciere'])S.media['Panca piana con bilanciere']=[{type:'link',url:'https://www.youtube.com/results?search_query=panca+piana+tecnica+corretta'}];
if(!S.media['Squat con bilanciere'])S.media['Squat con bilanciere']=[{type:'link',url:'https://www.tiktok.com/search?q=squat%20tecnica'}];

const FOODS=[
  {n:'Salmone al forno',q:'150 g',k:312,p:30,c:0,f:20},{n:'Patate al forno',q:'200 g',k:154,p:4,c:35,f:0.2},
  {n:'Uova',q:'2 medie',k:140,p:12,c:1,f:10},{n:'Pane integrale',q:'60 g',k:148,p:7,c:25,f:2},
  {n:'Bresaola',q:'70 g',k:106,p:23,c:0,f:1.8},{n:'Ricotta vaccina',q:'100 g',k:138,p:11,c:3,f:10},
  {n:'Banana',q:'120 g',k:107,p:1.3,c:27,f:0.4},{n:'Pasta integrale',q:'80 g',k:270,p:11,c:52,f:2},
  {n:'Insalata mista',q:'150 g',k:25,p:2,c:4,f:0.3},{n:'Whey protein',q:'30 g',k:118,p:24,c:2,f:1.5}
];
const RECIPES=[
  {id:'r1',m:'col',n:'Overnight oats proteici',k:410,p:32,c:52,f:8,min:5,t:['veg','veloce'],ing:[['Fiocchi d’avena',50,'g'],['Yogurt greco 0%',150,'g'],['Latte parz. scremato',100,'ml'],['Mirtilli',60,'g'],['Semi di chia',5,'g']],steps:['La sera prima mescola in un barattolo avena, yogurt, latte e semi di chia.','Chiudi e lascia in frigo per almeno 6 ore.','Al mattino mescola, aggiungi i mirtilli e mangia freddo.']},
  {id:'r2',m:'col',n:'Pancake banana e avena',k:380,p:24,c:55,f:6,min:10,t:['veg','veloce','nolatt'],ing:[['Banana matura',120,'g'],['Fiocchi d’avena',40,'g'],['Albumi',120,'g'],['Cannella',null,'']],steps:['Frulla banana, avena, albumi e cannella fino a ottenere una pastella liscia.','Scalda una padella antiaderente a fuoco medio, senza grassi.','Versa un mestolino per pancake e gira quando compaiono le bollicine, circa 2 minuti per lato.']},
  {id:'r3',m:'col',n:'Toast integrale con uova e avocado',k:430,p:22,c:34,f:22,min:10,t:['veg','veloce','nolatt'],ing:[['Pane integrale',70,'g'],['Uova',2,'pz'],['Avocado',50,'g'],['Pomodorini',60,'g'],['Sale e pepe',null,'']],steps:['Tosta il pane.','Cuoci le uova in padella o in camicia per 3 minuti.','Schiaccia l’avocado sul pane, aggiungi uova, pomodorini a metà, sale e pepe.']},
  {id:'r4',m:'col',n:'Skyr bowl con granola e fragole',k:360,p:30,c:45,f:6,min:3,t:['veg','veloce'],ing:[['Skyr',200,'g'],['Granola',30,'g'],['Fragole',100,'g'],['Miele',5,'g']],steps:['Versa lo skyr in una ciotola.','Aggiungi le fragole a pezzi e la granola.','Completa con un filo di miele.']},
  {id:'r5',m:'pra',n:'Bowl di pollo, riso e avocado',k:620,p:48,c:62,f:18,min:20,t:['nolatt'],ing:[['Riso basmati',70,'g'],['Petto di pollo',150,'g'],['Avocado',50,'g'],['Pomodorini',100,'g'],['Salsa di soia',10,'ml']],steps:['Cuoci il riso in acqua salata per 12 minuti e scolalo.','Taglia il pollo a strisce e cuocilo in padella antiaderente per 6–7 minuti.','Componi la bowl con riso, pollo, avocado a fette e pomodorini.','Condisci con la salsa di soia.']},
  {id:'r6',m:'pra',n:'Pasta integrale con tonno e pomodorini',k:560,p:36,c:70,f:12,min:15,t:['veloce','nolatt'],ing:[['Pasta integrale',80,'g'],['Tonno al naturale',120,'g'],['Pomodorini',150,'g'],['Olio extravergine',5,'g'],['Basilico',null,'']],steps:['Metti a cuocere la pasta.','In padella scalda l’olio e salta i pomodorini tagliati per 4 minuti.','Aggiungi il tonno sgocciolato e un mestolo d’acqua di cottura.','Scola la pasta, saltala nel sugo e finisci con il basilico.']},
  {id:'r7',m:'pra',n:'Insalata di farro, ceci e feta',k:590,p:26,c:78,f:18,min:25,t:['veg'],ing:[['Farro',70,'g'],['Ceci lessati',120,'g'],['Feta',40,'g'],['Cetrioli',100,'g'],['Olio extravergine',8,'g']],steps:['Lessa il farro per 20 minuti, scolalo e lascialo intiepidire.','Taglia cetrioli e feta a cubetti.','Unisci farro, ceci, cetrioli e feta, condisci con olio e sale.']},
  {id:'r8',m:'pra',n:'Wrap di tacchino e hummus',k:520,p:40,c:50,f:16,min:8,t:['veloce','nolatt'],ing:[['Piadina integrale',70,'g'],['Fesa di tacchino',120,'g'],['Hummus',40,'g'],['Rucola',30,'g']],steps:['Scalda la piadina in padella 30 secondi per lato.','Spalma l’hummus, aggiungi tacchino e rucola.','Arrotola stretto e taglia a metà.']},
  {id:'r9',m:'spu',n:'Yogurt greco, noci e miele',k:240,p:20,c:16,f:10,min:2,t:['veg','veloce'],ing:[['Yogurt greco 0%',170,'g'],['Noci',15,'g'],['Miele',5,'g']],steps:['Versa lo yogurt in una ciotola.','Aggiungi le noci spezzettate e il miele.']},
  {id:'r10',m:'spu',n:'Gallette con bresaola e rucola',k:210,p:24,c:22,f:3,min:3,t:['veloce','nolatt'],ing:[['Gallette di riso',25,'g'],['Bresaola',60,'g'],['Rucola',20,'g'],['Limone',null,'']],steps:['Disponi bresaola e rucola sulle gallette.','Finisci con qualche goccia di limone.']},
  {id:'r11',m:'spu',n:'Shake proteico alla banana',k:250,p:27,c:30,f:3,min:2,t:['veg','veloce','nolatt'],ing:[['Whey protein',30,'g'],['Banana',100,'g'],['Acqua fredda',250,'ml']],steps:['Metti tutto nel frullatore.','Frulla 30 secondi e bevi subito.']},
  {id:'r12',m:'cen',n:'Salmone al forno con patate',k:680,p:38,c:52,f:32,min:35,t:['nolatt'],ing:[['Salmone',150,'g'],['Patate',250,'g'],['Olio extravergine',5,'g'],['Limone',null,''],['Rosmarino',null,'']],steps:['Taglia le patate a spicchi, condiscile con olio e rosmarino e inforna a 200 °C per 15 minuti.','Aggiungi il salmone sulla stessa teglia e cuoci altri 15 minuti.','Servi con limone spremuto sopra.']},
  {id:'r13',m:'cen',n:'Frittata di albumi e spinaci',k:290,p:34,c:8,f:12,min:12,t:['veg','veloce'],ing:[['Albumi',250,'g'],['Uova',1,'pz'],['Spinaci',150,'g'],['Parmigiano',10,'g']],steps:['Salta gli spinaci in padella finché appassiscono.','Sbatti albumi, uovo e parmigiano e versali sugli spinaci.','Cuoci coperto a fuoco basso per 6–7 minuti.']},
  {id:'r14',m:'cen',n:'Merluzzo in crosta con verdure',k:480,p:40,c:40,f:16,min:25,t:['nolatt'],ing:[['Merluzzo',200,'g'],['Pangrattato',25,'g'],['Zucchine',200,'g'],['Patate',150,'g'],['Olio extravergine',10,'g']],steps:['Taglia patate e zucchine a dadini e inforna a 200 °C con metà dell’olio per 10 minuti.','Passa il merluzzo nel pangrattato con il resto dell’olio.','Aggiungi il pesce in teglia e cuoci altri 12–15 minuti.']},
  {id:'r15',m:'cen',n:'Tofu saltato con verdure e riso',k:540,p:30,c:64,f:16,min:20,t:['veg','nolatt'],ing:[['Tofu',180,'g'],['Riso basmati',60,'g'],['Broccoli',150,'g'],['Peperoni',100,'g'],['Salsa di soia',10,'ml']],steps:['Cuoci il riso.','Taglia il tofu a cubi e rosolalo in padella finché è dorato.','Aggiungi broccoli e peperoni e salta per 6 minuti.','Sfuma con la soia e servi sul riso.']}
];
const PREFS=[['veloce','Veloce'],['veg','Vegetariano'],['nolatt','Senza lattosio']];
const SPLIT=['Push A','Pull A','Gambe A','Push B','Pull B','Gambe B','Riposo'];
const WORKOUT={name:'Push B',focus:'Petto · Spalle · Tricipiti',min:55,ex:[
  {n:'Panca piana con bilanciere',sets:[[80,6],[80,6],[80,6],[80,5]],prev:'78 × 6',rest:120},
  {n:'Military press con manubri',sets:[[22,8],[22,8],[22,8]],prev:'20 × 8',rest:90},
  {n:'Panca inclinata manubri',sets:[[28,10],[28,10],[28,9]],prev:'26 × 10',rest:90},
  {n:'Croci ai cavi',sets:[[15,12],[15,12],[15,12]],prev:'15 × 11',rest:60},
  {n:'Alzate laterali',sets:[[10,12],[10,12],[10,12],[10,12]],prev:'10 × 12',rest:60},
  {n:'Pushdown alla corda',sets:[[25,12],[25,12],[25,12]],prev:'22,5 × 12',rest:60}
]};
const LIB=[
  {n:'Panca piana con bilanciere',m:'Petto',a:'Bilanciere',pr:'85 kg × 3',cues:['Scapole addotte e depresse','Bilanciere sulla linea dei capezzoli','Piedi fermi, spinta dalle gambe']},
  {n:'Panca inclinata manubri',m:'Petto',a:'Manubri',pr:'30 kg × 8',cues:['Panca a 30°','Gomiti a circa 45°','Discesa controllata in 2 secondi']},
  {n:'Croci ai cavi',m:'Petto',a:'Cavi',pr:'17,5 kg × 12',cues:['Gomiti leggermente flessi','Chiudi stringendo il petto','Spalle basse']},
  {n:'Trazioni alla sbarra',m:'Schiena',a:'Corpo libero',pr:'+10 kg × 6',cues:['Parti a braccia distese','Petto verso la sbarra','Niente slancio']},
  {n:'Rematore con bilanciere',m:'Schiena',a:'Bilanciere',pr:'75 kg × 8',cues:['Busto a circa 45°','Tira verso l’ombelico','Schiena neutra']},
  {n:'Lat machine',m:'Schiena',a:'Macchina',pr:'70 kg × 10',cues:['Presa poco più larga delle spalle','Gomiti verso i fianchi','Ritorno lento']},
  {n:'Squat con bilanciere',m:'Gambe',a:'Bilanciere',pr:'110 kg × 5',cues:['Respira e blocca il core','Ginocchia in linea con le punte','Scendi almeno al parallelo']},
  {n:'Stacco rumeno',m:'Gambe',a:'Bilanciere',pr:'100 kg × 8',cues:['Anche indietro, ginocchia morbide','Bilanciere vicino alle gambe','Senti l’allungamento dei femorali']},
  {n:'Leg press',m:'Gambe',a:'Macchina',pr:'220 kg × 10',cues:['Piedi a larghezza spalle','Bacino sempre appoggiato','Non bloccare le ginocchia']},
  {n:'Military press con manubri',m:'Spalle',a:'Manubri',pr:'24 kg × 6',cues:['Core contratto','Manubri all’altezza delle orecchie','Spingi in verticale']},
  {n:'Alzate laterali',m:'Spalle',a:'Manubri',pr:'12 kg × 12',cues:['I gomiti guidano il movimento','Fermati all’altezza delle spalle','Niente slancio']},
  {n:'Curl con bilanciere EZ',m:'Braccia',a:'Bilanciere',pr:'35 kg × 10',cues:['Gomiti fermi ai fianchi','Contrai in alto','Scendi fino in fondo']},
  {n:'Pushdown alla corda',m:'Braccia',a:'Cavi',pr:'27,5 kg × 12',cues:['Gomiti attaccati al busto','Apri la corda in basso','Ritorno controllato']},
  {n:'Plank',m:'Core',a:'Corpo libero',pr:'2:10 min',cues:['Linea dritta testa-talloni','Glutei contratti','Respira normalmente']},
  {n:'Ab wheel',m:'Core',a:'Attrezzo',pr:'3 × 12',cues:['Bacino in retroversione','Vai solo fin dove controlli','Rientra con gli addominali']}
];
const allEx=()=>LIB.concat(S.custom);
const HK_REAL=!!(window.__SF_HEALTH&&Object.keys(window.__SF_HEALTH).length);
const HEALTH=HK_REAL?Object.assign({steps:0,active:0,sleep:0,hr:'–'},window.__SF_HEALTH):{steps:7450,active:540,sleep:7.2,hr:58};
const hkDay=()=>{if(!HEALTH.day)return '';const d=new Date(HEALTH.day+'T12:00:00'),t=new Date();t.setHours(12,0,0,0);const n=Math.round((t-d)/864e5);return n<=0?'oggi':n===1?'ieri':d.toLocaleDateString('it-IT',{day:'numeric',month:'short'})};
const PER100={'Yogurt greco 0%':[57,10,3.6,0.2],'Granola':[450,10,64,15],'Frutti di bosco':[45,0.8,9,0.3],'Petto di pollo':[110,23,0,1.5],'Riso basmati cotto':[130,2.7,28,0.3],'Verdure grigliate':[35,1.5,5,0.8],'Olio extravergine':[899,0,0,100],'Mela':[52,0.3,14,0.2],'Mandorle':[580,21,22,50]};
const DETECT={col:[['Yogurt greco 0%',170],['Granola',30],['Frutti di bosco',80]],pra:[['Petto di pollo',160],['Riso basmati cotto',180],['Verdure grigliate',150],['Olio extravergine',10]],spu:[['Mela',180],['Mandorle',20]],cen:[['Petto di pollo',160],['Riso basmati cotto',180],['Verdure grigliate',150],['Olio extravergine',10]]};
const BARCODES={'8001234567890':['Skyr naturale',150,[63,11,4,0.2]],'8009876543210':['Barretta proteica cioccolato',55,[360,36,30,10]],'8005551112223':['Gallette di riso integrale',25,[380,8,80,3]],'8007778889990':['Fesa di tacchino a fette',100,[100,22,1,1]]};
const SUGG=['Oggi 80 kg × 6. La volta scorsa hai chiuso 4 × 6 a 78 kg con RPE 8, quindi +2,5 kg.','22 kg × 8. Da due sedute ti restano 2 ripetizioni di riserva: sali di un manubrio.','28 kg × 10. Chiudi 3 × 10 pulite prima di passare a 30 kg.','15 kg × 12. L’ultima volta 11 ripetizioni: oggi completa le 12, poi sali.','10 kg × 12. Resta su questo carico e porta le ripetizioni a 15: per le spalle conta il volume.','25 kg × 12. +2,5 kg rispetto all’ultima volta, recupero di 60 secondi.'];
const RPE_FB={6:'Margine ampio: nella prossima serie aggiungi 2,5 kg.',7:'Ti restano 3 ripetizioni: nella prossima serie puoi aggiungere 2,5 kg.',8:'Perfetto, 2 ripetizioni di riserva: tieni il carico.',9:'Vicino al limite: tieni il carico e cura la tecnica.',10:'Cedimento: nella prossima serie togli 2,5 kg per proteggere il volume totale.'};
function power(){const t=totals(todayIdx),TT=T();const parts=[['Allenamento',setsDone()/setsTotal(),3000],['Proteine',Math.min(1,t.p/TT.p),2500],['Passi',Math.min(1,HEALTH.steps/10000),1500],['Sonno',Math.min(1,HEALTH.sleep/8),1200],['Acqua',Math.min(1,S.water/10),800]];return{total:1000+Math.round(parts.reduce((a,p)=>a+p[1]*p[2],0)),parts}}
const per=(n,g)=>{const v=PER100[n]||[0,0,0,0];return{k:Math.round(v[0]*g/100),p:v[1]*g/100,c:v[2]*g/100,f:v[3]*g/100}};
const SERIES={
  peso:{label:'Peso corporeo',unit:'kg',v:saved.weights||[84,83.4,82.9,82.4,82.0,81.7,81.2,80.9,80.6,80.1,79.5,79.1]},
  panca:{label:'Panca piana · 1RM stimato',unit:'kg',v:[88,88,90,90,91,92,92,93,94,94,95,96]},
  squat:{label:'Squat · 1RM stimato',unit:'kg',v:[112,114,114,116,117,118,120,120,122,123,124,126]}
};
// Peso arrivato da Salute: lo aggiungo una volta per giorno
let hkWDay=saved.hkWDay||null;
if(HK_REAL&&HEALTH.weight&&HEALTH.day&&hkWDay!==HEALTH.day){SERIES.peso.v.push(+HEALTH.weight);if(SERIES.peso.v.length>30)SERIES.peso.v.shift();S.profile.weight=+HEALTH.weight;hkWDay=HEALTH.day;setTimeout(()=>persist(),0)}

/* calcoli */
const bmr=()=>{const p=S.profile;return 10*p.weight+6.25*p.height-5*p.age+(p.sex==='M'?5:-161)};
const tdee=()=>bmr()*(Number(S.profile.activity)||1.2);
const ADJ={'Definizione':-0.2,'Ricomposizione':-0.1,'Mantenimento':0,'Massa pulita':0.1};
function autoTargets(){const k=Math.round(tdee()*(1+(ADJ[S.goal.type]??0))/10)*10,w=S.profile.weight,p=Math.round(w*2),f=Math.round(w*0.9);return{k,p,f,c:Math.max(0,Math.round((k-p*4-f*9)/4))}}
function T(){if(S.goal.manual&&S.goal.k)return{k:+S.goal.k,p:+S.goal.p,c:+S.goal.c,f:+S.goal.f};return autoTargets()}
const bmi=()=>{const h=S.profile.height/100;return S.profile.weight/(h*h)};
const bmiLabel=b=>b<18.5?'Sottopeso':b<25?'Normopeso':b<30?'Sovrappeso':'Obesità';
function dayItems(d){return S.days[d]||(S.days[d]={col:[],pra:[],spu:[],cen:[]})}
function totals(d){const t={k:0,p:0,c:0,f:0},D=dayItems(d);for(const m in D)D[m].forEach(i=>{t.k+=i.k;t.p+=i.p;t.c+=i.c;t.f+=i.f});return t}
const pct=(a,b)=>b?clamp(Math.round(a/b*100),0,100):0;
const setsTotal=()=>WORKOUT.ex.reduce((a,e)=>a+e.sets.length,0);
const setsDone=()=>Object.values(S.done).filter(Boolean).length;
function weeksLeft(){const d=new Date(S.goal.deadline);if(isNaN(d))return null;return Math.max(0,Math.round((d-now)/6048e5))}
const LEVELS=['Base','Super Saiyan','Super Saiyan 2','Super Saiyan Blue','Ultra Ego'];
function level(){const g=goalPct();return Math.min(4,Math.floor(g/20))}
function lvlHTML(){const l=level();return `<div class="row between" style="gap:8px"><span class="pill gold">Livello · ${LEVELS[l]}</span><span class="tiny" style="color:inherit;opacity:.75">${l<4?'Prossimo: '+LEVELS[l+1]+' al '+((l+1)*20)+'%':'Livello massimo'}</span></div><div class="lvls" aria-hidden="true">${LEVELS.map((_,i)=>`<span class="lvl ${i<=l?'on':''}"></span>`).join('')}</div>`}
function goalPct(){const p=S.profile,span=p.start-p.target;if(!span)return 0;return clamp(Math.round((p.start-p.weight)/span*100),0,100)}

/* porzioni adattate al budget del pasto */
function scaled(rid,f){const r=RECIPES.find(x=>x.id===rid);f=f||1;
  const q=(v,u)=>v==null?'q.b.':u==='pz'?fmt(Math.max(1,Math.round(v*f*2)/2))+' pz':fmt(v*f>=20?Math.round(v*f/5)*5:Math.round(v*f))+' '+u;
  return Object.assign({},r,{sf:f,k:Math.round(r.k*f),p:Math.round(r.p*f),c:Math.round(r.c*f),g:Math.round(r.f*f),ingS:r.ing.map(i=>[i[0],q(i[1],i[2])])})}
function generate(meal,exclude){
  const budget=T().k*SHARE[meal];
  let pool=RECIPES.filter(r=>r.m===meal&&S.goal.prefs.every(p=>r.t.includes(p)));
  if(!pool.length)pool=RECIPES.filter(r=>r.m===meal);
  if(pool.length>1&&exclude)pool=pool.filter(r=>r.id!==exclude);
  const r=pool[Math.floor(Math.random()*pool.length)];
  return{rid:r.id,f:clamp(Math.round(budget/r.k*20)/20,0.7,1.4)};
}

function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2200)}
function avaHTML(){return S.profile.photo?`<img src="${S.profile.photo}" alt="">`:esc((S.profile.name||'?').trim().charAt(0).toUpperCase())}
function ring(val,max){
  const r=56,C=2*Math.PI*r,p=clamp(val/max,0,1);
  return `<div class="ring"><svg viewBox="0 0 136 136" aria-hidden="true"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--food)"/><stop offset="1" style="stop-color:var(--food-2)"/></linearGradient></defs><circle cx="68" cy="68" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="13"/><circle cx="68" cy="68" r="${r}" fill="none" stroke="url(#rg)" stroke-width="13" stroke-linecap="round" stroke-dasharray="${(C*p).toFixed(1)} ${C.toFixed(1)}"/></svg><div class="center"><span class="big">${fmt(Math.max(0,Math.round(max-val)),0)}</span><span class="tiny">kcal rimaste</span></div></div>`;
}
const macroBar=(lbl,v,t,col)=>`<div class="macro"><div class="lbl"><b>${lbl}</b><span class="num muted">${Math.round(v)}<span class="tiny"> / ${t} g</span></span></div><div class="bar"><i style="width:${pct(v,t)}%;background:${col}"></i></div></div>`;
function lineChart(vals,unit,color,id){
  const W=340,H=180,pl=34,pr=14,pt=14,pb=26;
  let mn=Math.min(...vals),mx=Math.max(...vals);const span=mx-mn||1;
  const step=span>8?Math.ceil(span/4/2)*2:Math.max(0.5,Math.ceil(span/4*2)/2);
  mn=Math.floor(mn/step)*step;mx=Math.ceil(mx/step)*step;if(mx===mn)mx=mn+step;
  const n=vals.length,x=i=>pl+i*(W-pl-pr)/(n-1),y=v=>pt+(mx-v)*(H-pt-pb)/(mx-mn);
  let g='';for(let v=mn;v<=mx+1e-9;v+=step){g+=`<line class="grid" x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}"/><text class="lbl" x="${pl-7}" y="${y(v)+3.5}" text-anchor="end">${fmt(v)}</text>`}
  [0,Math.round((n-1)/3),Math.round(2*(n-1)/3),n-1].forEach(i=>{g+=`<text class="lbl" x="${x(i)}" y="${H-7}" text-anchor="${i===0?'start':i===n-1?'end':'middle'}">${i===n-1?'ora':'sett. '+(i+1)}</text>`});
  const pts=vals.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Andamento in ${unit}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${color};stop-opacity:.3"/><stop offset="1" style="stop-color:${color};stop-opacity:0"/></linearGradient></defs>${g}<path d="M${x(0)},${H-pb} L${pts.join(' L')} L${x(n-1)},${H-pb} Z" fill="url(#${id})"/><polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${x(n-1)}" cy="${y(vals[n-1])}" r="6" fill="${color}" stroke="var(--surface)" stroke-width="3"/></svg>`;
}
function spark(vals,color){const W=120,H=36,mn=Math.min(...vals),mx=Math.max(...vals);const pts=vals.map((v,i)=>`${(i*W/(vals.length-1)).toFixed(1)},${(4+(mx-v)/(mx-mn||1)*(H-8)).toFixed(1)}`);return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:36px" aria-hidden="true"><polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`}
const COL={col:['var(--gym)','var(--gym-soft)'],pra:['var(--food)','var(--food-soft)'],spu:['var(--ai)','var(--ai-soft)'],cen:['var(--food)','var(--food-soft)']};
function art(m,i){const c=COL[m][0],bg=COL[m][1];const sh=[
    `<circle cx="50" cy="54" r="32" fill="${c}" opacity=".18"/><path d="M20 52h60a30 30 0 0 1-60 0z" fill="${c}"/><circle cx="38" cy="44" r="7" fill="${c}" opacity=".6"/><circle cx="56" cy="40" r="9" fill="${c}" opacity=".8"/>`,
    `<circle cx="50" cy="50" r="34" fill="none" stroke="${c}" stroke-width="5"/><circle cx="40" cy="44" r="8" fill="${c}"/><circle cx="60" cy="42" r="6" fill="${c}" opacity=".6"/><circle cx="54" cy="62" r="10" fill="${c}" opacity=".85"/>`,
    `<path d="M16 54c10-18 40-24 62-6-9 4-9 9 0 13-22 18-52 11-62-7z" fill="${c}"/><circle cx="30" cy="52" r="3.5" fill="${bg}"/>`,
    `<ellipse cx="50" cy="68" rx="32" ry="8" fill="${c}" opacity=".35"/><ellipse cx="50" cy="57" rx="28" ry="7.5" fill="${c}" opacity=".65"/><ellipse cx="50" cy="46" rx="24" ry="7" fill="${c}"/>`];
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${sh[i%sh.length]}</svg>`}
function platform(url){try{const h=new URL(url).hostname.replace(/^www\./,'');if(/(^|\.)youtube\.com$|^youtu\.be$/.test(h))return['yt','YouTube'];if(/(^|\.)tiktok\.com$/.test(h))return['tt','TikTok'];if(/(^|\.)instagram\.com$/.test(h))return['ig','Instagram'];return['web','il sito']}catch(_){return null}}
const tab=(attr,cur,list)=>`<div class="seg" role="tablist">${list.map(([k,l])=>`<button role="tab" aria-selected="${cur===k}" data-${attr}="${k}">${l}</button>`).join('')}</div>`;

/* ---------- OGGI ---------- */
function scouterHTML(){const pw=power();return `<div class="scouter" role="group" aria-label="Scouter, livello di combattimento ${pw.total}"><span class="reticle" aria-hidden="true"></span><span class="eyebrow">Scouter · livello di combattimento</span><div><div class="pw num">${fmt(pw.total,0)}</div><div class="hint">${pw.total>9000?'È più di 9.000!':'Supera 9.000 chiudendo allenamento, proteine, passi e acqua'}</div></div><div class="parts">${pw.parts.map(p=>`<div class="part"><span>${p[0]}</span><span class="b"><i style="width:${Math.round(p[1]*100)}%"></i></span><span class="n">${fmt(Math.round(p[1]*p[2]),0)}</span></div>`).join('')}</div></div>`}
function vOggi(){
  const t=totals(todayIdx),TT=T(),sd=setsDone(),st=setsTotal(),p=S.profile,wl=weeksLeft(),split=SPLIT[todayIdx],w=SERIES.peso.v;
  const next=MEALS.find(([id])=>!dayItems(todayIdx)[id].length)||MEALS[3];
  const pl=(S.plan[todayIdx]||{})[next[0]],pr=pl?scaled(pl.rid,pl.f):null;
  return `<section class="view stack">
    <div><p class="eyebrow">${esc(now.toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long'}))}</p><h1>Ciao ${esc(p.name)}</h1></div>
    <a href="#profilo" class="goal-hero" data-goto-prof="obiettivo">
      <div class="row between"><span class="eyebrow">Obiettivo · ${esc(S.goal.type)}</span>${wl!=null?`<span class="pill" style="background:rgba(127,140,150,.22);color:inherit">${wl} settimane</span>`:''}</div>
      <h2>${esc(S.goal.title)}</h2>
      ${lvlHTML()}
      <div class="stack s8"><div class="gbar"><i style="width:${goalPct()}%"></i></div>
      <div class="gscale"><span class="num">${fmt(p.start)} kg</span><span class="num"><b>${fmt(p.weight)} kg</b> · ${goalPct()}%</span><span class="num">${fmt(p.target)} kg</span></div></div>
    </a>
    <span class="example">Dati di esempio</span>
    ${scouterHTML()}
    <a href="#alimentazione" class="card cal-card">
      ${ring(t.k,TT.k)}
      <div class="macros">
        <div class="row between"><span class="eyebrow">Calorie</span><span class="num tiny">${fmt(Math.round(t.k),0)} / ${fmt(TT.k,0)}</span></div>
        ${macroBar('Proteine',t.p,TT.p,'var(--food)')}${macroBar('Carboidrati',t.c,TT.c,'var(--gym)')}${macroBar('Grassi',t.f,TT.f,'var(--ai)')}
      </div>
    </a>
    ${split==='Riposo'?`<div class="card"><span class="eyebrow">Palestra</span><h2 style="margin-top:4px">Oggi riposo</h2><p class="sub">Recupera, cammina e cura il sonno.</p></div>`:`
    <div class="workout">
      <svg class="deco" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M3 9v6M6 6v12M18 6v12M21 9v6M6 12h12"/></svg>
      <span class="eyebrow">Allenamento di oggi</span>
      <div><h2 style="font-size:28px">${WORKOUT.name}</h2><div style="opacity:.9">${WORKOUT.focus}</div></div>
      <div class="meta"><span>${WORKOUT.ex.length} esercizi</span><span>~${WORKOUT.min} min</span><span class="num">${sd}/${st} serie</span></div>
      <a class="btn" href="#palestra">${sd?'Continua l’allenamento':'Inizia l’allenamento'}</a>
    </div>`}
    <div class="bento">
      <a href="#profilo" class="tile"><span class="eyebrow">Peso</span><div class="v num">${fmt(p.weight)} <small>kg</small></div>${spark(w,'var(--food)')}<span class="tiny" style="color:var(--ok)">${fmt(w[w.length-1]-w[w.length-2])} kg ultima settimana</span></a>
      <div class="tile"><span class="eyebrow">Acqua</span><div class="v num">${fmt(S.water*0.25,2)} <small>/ 2,5 L</small></div>
        <div class="water" role="group" aria-label="Bicchieri d’acqua da 250 ml">${Array.from({length:10},(_,i)=>`<button class="${i<S.water?'on':''}" data-water="${i}" aria-label="${i+1} bicchieri"></button>`).join('')}</div></div>
    </div>
    <div class="stack s8"><div class="src"><span class="hk"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.3-9.5C1.4 7.9 3.8 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.7 1.1-1.6 2.7-2.7 4.7-2.7 3.5 0 5.9 3.4 4.6 7-1.8 4.9-9.3 9.5-9.3 9.5z"/></svg>Da Salute · Apple Watch</span>${HK_REAL?`<span class="tiny">Aggiornato ${hkDay()}</span>`:`<button class="example" data-hk="1" style="cursor:pointer">Esempio · Collega</button>`}</div>
      <div class="bento3"><div class="tile"><span class="tiny">Passi</span><div class="v num">${fmt(HEALTH.steps,0)}</div><div class="bar"><i style="width:${pct(HEALTH.steps,10000)}%;background:var(--food)"></i></div></div><div class="tile"><span class="tiny">Calorie attive</span><div class="v num">${HEALTH.active}</div><span class="tiny">kcal</span></div><div class="tile"><span class="tiny">Sonno</span><div class="v num">${Math.floor(HEALTH.sleep)}h ${String(Math.round(HEALTH.sleep%1*60)).padStart(2,'0')}</div><span class="tiny">FC riposo ${HEALTH.hr}</span></div></div></div>
    <div class="card next-meal">
      <div class="thumb" style="background:${COL[next[0]][1]};color:${COL[next[0]][0]}">${MEAL_ICON[next[0]]}</div>
      <div class="stack s8" style="min-width:0">
        <div><span class="eyebrow">Prossimo pasto · ${next[1]}</span><h3 style="margin-top:2px">${pr?esc(pr.n):'Nessuna ricetta ancora'}</h3><span class="tiny">${pr?`${pr.k} kcal · ${pr.p} g proteine · ${pr.min} min`:`Budget circa ${Math.round(TT.k*SHARE[next[0]])} kcal`}</span></div>
        ${pr?`<button class="link" data-plan-open="${todayIdx}:${next[0]}" style="justify-self:start">Vedi la preparazione ${I.chev}</button>`:`<button class="btn food sm" data-gen-go="${next[0]}" style="align-self:flex-start">${I.wand}Genera una ricetta</button>`}
      </div>
    </div>
    <button class="card checkin" id="openCheckin" style="text-align:left;width:100%"><div class="ai-dot">${I.target.replace('width="14" height="14"','')}</div><div><span class="eyebrow">Check-in settimanale</span><h3 style="margin-top:2px">Whis ha analizzato la tua settimana</h3><span class="tiny">Peso −0,6 kg · proposta: +200 kcal</span></div></button>
    <div class="ai-tip">
      <div class="ai-dot">${I.spark}</div>
      <div class="stack s8"><div><h3>Whis dice</h3><p class="sub" style="font-size:15px">Ti mancano <b>${Math.max(0,Math.round(TT.p-t.p))} g di proteine</b>. Una cena da 35–40 g più uno yogurt greco ti fa chiudere la giornata.</p></div>
      <a class="link" href="#coach">Chiedi a Whis ${I.chev}</a></div>
    </div>
  </section>`;
}

/* ---------- ALIMENTAZIONE ---------- */
function vNutrition(){
  const tb=S.nutTab;let body='';
  if(tb==='diario'){
    const d=S.selDay,t=totals(d),TT=T(),D=dayItems(d),plan=S.plan[d]||{};
    const date=new Date(monday);date.setDate(monday.getDate()+d);
    body=`<div class="days">${DN.map((n,i)=>{const dd=new Date(monday);dd.setDate(monday.getDate()+i);const has=(S.plan[i]&&Object.keys(S.plan[i]).length)||Object.values(dayItems(i)).some(a=>a.length);return `<button class="dayb ${i===todayIdx?'today':''} ${has?'has':''}" aria-pressed="${i===d}" data-day="${i}" aria-label="${n} ${dd.getDate()}"><span>${n}</span><b>${dd.getDate()}</b><span class="dt"></span></button>`}).join('')}</div>
      <div class="card">
        <div class="row between" style="margin-bottom:10px"><span class="eyebrow">${d===todayIdx?'Oggi':esc(date.toLocaleDateString('it-IT',{weekday:'long',day:'numeric'}))}</span><span class="num"><b style="font-size:18px">${fmt(Math.round(t.k),0)}</b> <span class="tiny">/ ${fmt(TT.k,0)} kcal</span></span></div>
        <div class="bar" style="margin-bottom:14px"><i style="width:${pct(t.k,TT.k)}%;background:linear-gradient(90deg,var(--food),var(--food-2))"></i></div>
        <div class="sum-strip"><div><div class="v">${Math.round(t.p)}</div><div class="t">Proteine g</div></div><div><div class="v">${Math.round(t.c)}</div><div class="t">Carbo g</div></div><div><div class="v">${Math.round(t.f)}</div><div class="t">Grassi g</div></div><div><div class="v">${fmt(Math.max(0,Math.round(TT.k-t.k)),0)}</div><div class="t">Rimaste</div></div></div>
      </div>
      <div class="gen-card stack s12">
        <div class="row" style="gap:12px"><div class="ai-dot">${I.wand}</div><div><h3>Ricette per ${d===todayIdx?'oggi':'questo giorno'}</h3><p class="tiny" style="color:var(--ink-2)">Porzioni calcolate sul tuo obiettivo di ${fmt(TT.k,0)} kcal</p></div></div>
        <div class="chips wrap" role="group" aria-label="Preferenze">${PREFS.map(([k,l])=>`<button class="chip food" aria-pressed="${S.goal.prefs.includes(k)}" data-pref="${k}">${l}</button>`).join('')}</div>
        <button class="btn ai block" data-gen-day="${d}">${I.spark}Genera tutta la giornata</button>
      </div>
      ${MEALS.map(([id,name,time])=>{const items=D[id],kc=items.reduce((a,i)=>a+i.k,0),p=plan[id],loading=S.gen[d+':'+id],r=p?scaled(p.rid,p.f):null;
        return `<div class="card meal">
          <div class="meal-head"><div class="mi"><span class="meal-ico" style="background:${COL[id][1]};color:${COL[id][0]}">${MEAL_ICON[id]}</span><div><h3>${name}</h3><span class="tiny">${time} · budget ${Math.round(TT.k*SHARE[id])} kcal</span></div></div><span class="num muted" style="font-weight:600">${Math.round(kc)} kcal</span></div>
          ${items.length?`<div>${items.map(i=>`<div class="food-row"><span>${esc(i.n)} <span class="tiny">· ${esc(i.q)}</span></span><span class="k">${Math.round(i.k)}</span><span class="m">P ${fmt(i.p)} · C ${fmt(i.c)} · G ${fmt(i.f)}</span></div>`).join('')}</div>`:''}
          ${loading?`<div class="gen" aria-live="polite"><span class="top-l">${I.spark}Sto preparando la ricetta…</span><div class="skel" style="width:70%;height:18px"></div><div class="skel" style="width:45%"></div></div>`:
            r?`<div class="gen"><span class="top-l">${I.spark}Ricetta proposta</span><div><div class="nm">${esc(r.n)}</div><span class="tiny" style="color:var(--ink-2)">${r.k} kcal · P ${r.p} g · C ${r.c} g · G ${r.g} g · ${r.min} min</span></div>
              <div class="acts"><button class="btn main" data-plan-open="${d}:${id}">Preparazione</button><button class="btn" data-regen="${d}:${id}">${I.refresh}Un’altra</button><button class="btn" data-eat="${d}:${id}">${I.check}Mangiato</button></div></div>`:''}
          <div class="meal-actions"><button class="btn soft sm" data-add="${id}">${I.plus}Alimento</button><label class="btn soft sm" style="position:relative;cursor:pointer">${I.cam}Foto<input type="file" accept="image/*" class="vh" data-mealphoto="${id}" aria-label="Foto del piatto per ${name}"></label><button class="btn soft sm" data-barcode="${id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6v12M7 6v12M10 6v12M14 6v12M17 6v12M20 6v12"/></svg>Codice</button>${!r&&!loading?`<button class="btn soft sm" data-gen-meal="${d}:${id}" style="color:var(--ai-ink)">${I.wand}Genera ricetta</button>`:''}</div>
        </div>`}).join('')}`;
  } else if(tb==='ricette'){
    const f=S.recFilter,cats=[['Tutte','Tutte'],['col','Colazione'],['pra','Pranzo'],['spu','Spuntino'],['cen','Cena']];
    const list=RECIPES.filter(r=>f==='Tutte'||r.m===f);
    body=`<div class="gen-card stack s12"><div class="row" style="gap:12px"><div class="ai-dot">${I.wand}</div><div><h3>Cosa hai in frigo?</h3><p class="tiny" style="color:var(--ink-2)">Scrivi un ingrediente e Whis ti propone una ricetta</p></div></div>
      <form class="fridge" id="fridgeForm"><label for="fridgeIn" class="vh">Ingrediente</label><input id="fridgeIn" class="input" placeholder="Es. pollo, uova, tonno" autocomplete="off"><button class="btn ai" style="padding:0 18px">Genera</button></form></div>
      <div class="chips">${cats.map(([k,l])=>`<button class="chip" aria-pressed="${f===k}" data-recf="${k}">${l}</button>`).join('')}</div>
      <div class="recipes">${list.map(r=>`<button class="recipe" data-recipe="${r.id}"><div class="ph" style="background:${COL[r.m][1]}">${art(r.m,RECIPES.indexOf(r))}<span class="pill">${MEAL_NAME[r.m]}</span></div><div class="body"><span class="name">${esc(r.n)}</span><span class="tiny">${r.k} kcal · ${r.p} g P · ${r.min} min</span></div></button>`).join('')}</div>`;
  } else {
    const left=S.shop.reduce((a,g)=>a+g.items.filter(i=>!i.d).length,0);
    body=`<div class="row between"><p class="sub">${left} prodotti da prendere</p><button class="link" id="clearShop">Togli i presi</button></div>
      <form class="fridge" id="shopForm"><label for="shopIn" class="vh">Nuovo prodotto</label><input id="shopIn" class="input" placeholder="Aggiungi prodotto, es. Ricotta" autocomplete="off"><button class="btn food" style="width:48px;padding:0" aria-label="Aggiungi prodotto">${I.plus}</button></form>
      ${S.shop.filter(g=>g.items.length).map(g=>`<div class="card"><span class="eyebrow">${esc(g.g)}</span>${g.items.map((it,ii)=>`<button class="shop-item ${it.d?'done':''}" data-shop="${S.shop.indexOf(g)}:${ii}" aria-pressed="${it.d}"><span class="check">${I.check}</span><span class="nm">${esc(it.n)}</span><span class="qty">${esc(it.q)}</span></button>`).join('')}</div>`).join('')}`;
  }
  return `<section class="view stack"><div><p class="eyebrow" style="color:var(--food)">Senzu · Alimentazione</p><h1>${tb==='ricette'?'Ricette':tb==='spesa'?'Lista della spesa':'Diario e piano'}</h1></div>${tab('nut',tb,[['diario','Diario'],['ricette','Ricette'],['spesa','Spesa']])}${body}</section>`;
}

/* ---------- PALESTRA ---------- */
function rpeRow(ei){const k=S.lastSet;if(!k||!k.startsWith(ei+'-')||!S.done[k])return '';const si=+k.split('-')[1],v=S.rpe[k];return `<div class="rpe"><span class="tiny" style="color:var(--ink-2)">Quanto era dura la serie ${si+1}? (RPE, 10 = cedimento)</span><div class="chips">${[6,7,8,9,10].map(n=>`<button class="chip gym" aria-pressed="${v===n}" data-rpe="${k}:${n}">${n}</button>`).join('')}</div>${v?`<div class="whis-tip" style="background:var(--surface)">${I.spark}<span>${RPE_FB[v]}</span></div>`:''}</div>`}
function mthumb(name){const m=S.media[name]||[],img=m.find(x=>x.type==='image');return `<span class="mthumb">${img?`<img src="${img.src}" alt="">`:I.gym}${m.length?`<span class="badge">${m.length}</span>`:''}</span>`}
function vGym(){
  const tb=S.gymTab;let body='';
  if(tb==='scheda'){
    const sd=setsDone(),st=setsTotal();
    body=`<div class="card"><div class="row between" style="margin-bottom:12px"><h3>Push / Pull / Gambe</h3><span class="pill gym">Settimana 6 di 8</span></div>
      <div class="week">${DN.map((n,i)=>`<div class="day ${i===todayIdx?'today':''} ${i<todayIdx&&SPLIT[i]!=='Riposo'?'done':''}"><span>${n}</span><b>${SPLIT[i]==='Riposo'?'—':SPLIT[i].split(' ')[0]}</b><span class="dot"></span></div>`).join('')}</div><p class="tiny" style="margin-top:10px">La settimana 8 è di scarico: stessi esercizi con il 40% di serie in meno, per recuperare e ripartire più forte.</p></div>
      <div class="stack s8"><div class="row between"><div><h2>${WORKOUT.name}</h2><span class="tiny">${WORKOUT.focus} · ~${WORKOUT.min} min</span></div><span class="num muted" style="font-size:18px;font-weight:600">${sd}/${st}</span></div>
      <div class="prog"><i style="width:${pct(sd,st)}%"></i></div></div>
      ${WORKOUT.ex.map((e,ei)=>`<div class="card ex"><button class="ex-head" data-exname="${esc(e.n)}"><span class="l">${mthumb(e.n)}<span style="min-width:0"><h3>${esc(e.n)}</h3><span class="tiny">${e.sets.length} serie · recupero ${Math.floor(e.rest/60)}:${String(e.rest%60).padStart(2,'0')} · ultima ${esc(e.prev)}</span></span></span><span class="muted">${I.chev}</span></button>
        <div class="whis-tip">${I.spark}<span><b>Whis:</b> ${SUGG[ei]||'Tieni il carico dell’ultima volta e cura la tecnica.'}</span></div>
        <div class="sets">${e.sets.map((s,si)=>{const k=ei+'-'+si;return `<button class="set ${S.done[k]?'done':''}" data-set="${k}" data-rest="${e.rest}" aria-pressed="${!!S.done[k]}" aria-label="Serie ${si+1}: ${fmt(s[0])} kg per ${s[1]} ripetizioni"><span class="n">${si+1}</span><span class="val">${fmt(s[0])} <span class="u">kg</span></span><span class="val">${s[1]} <span class="u">rip.${S.rpe[k]?' · RPE '+S.rpe[k]:''}</span></span><span class="tick">${I.check}</span></button>`}).join('')}</div>${rpeRow(ei)}</div>`).join('')}
      ${sd===st?`<div class="card" style="text-align:center"><h2>Allenamento completato</h2><p class="sub">Volume totale <span class="num">${fmt(WORKOUT.ex.reduce((a,e)=>a+e.sets.reduce((b,s)=>b+s[0]*s[1],0),0),0)}</span> kg</p></div>`:''}`;
  } else if(tb==='esercizi'){
    const groups=['Tutti','Petto','Schiena','Gambe','Spalle','Braccia','Core'];
    const list=allEx().filter(x=>S.exFilter==='Tutti'||x.m===S.exFilter);
    body=`<div class="chips">${groups.map(g=>`<button class="chip gym" aria-pressed="${S.exFilter===g}" data-exf="${g}">${g}</button>`).join('')}</div>
      <button class="btn gym block" id="newEx">${I.plus}Nuovo esercizio</button>
      <div class="card" style="padding-block:6px">${list.map(x=>{const mc=(S.media[x.n]||[]).length;return `<button class="ex-item" data-exname="${esc(x.n)}">${mthumb(x.n)}<span style="min-width:0"><b style="font-weight:600">${esc(x.n)}</b><br><span class="tiny">${esc(x.m)} · ${esc(x.a)}${mc?` · ${mc} ${mc>1?'contenuti':'contenuto'}`:''}</span></span><span class="muted">${I.chev}</span></button>`}).join('')}</div>`;
  } else {
    const s=SERIES[S.chart],col=S.chart==='peso'?'var(--food)':'var(--gym)',v=s.v,last=v[v.length-1],diff=last-v[0];
    body=`<div class="chips">${[['peso','Peso'],['panca','Panca'],['squat','Squat']].map(([k,l])=>`<button class="chip" aria-pressed="${S.chart===k}" data-chart="${k}">${l}</button>`).join('')}</div>
      <div class="card"><div class="row between"><span class="eyebrow">${s.label}</span><span class="example">Esempio</span></div>
        <div class="row wrap" style="align-items:baseline;gap:8px;margin:6px 0 4px"><span class="num" style="font-size:40px;font-weight:700;letter-spacing:-.03em">${fmt(last)}</span><span class="muted">${s.unit}</span><span class="pill ${S.chart==='peso'?'food':'gym'}">${diff>0?'+':''}${fmt(diff)} kg in ${v.length} settimane</span></div>
        ${lineChart(v,s.unit,col,'cg')}</div>
      <div class="card"><h3 style="margin-bottom:4px">Record personali</h3>
        ${[['Panca piana','85 kg × 3','12 nov'],['Squat','110 kg × 5','10 nov'],['Stacco rumeno','100 kg × 8','4 nov'],['Trazioni','+10 kg × 6','29 ott']].map(p=>`<div class="pr"><span><b style="font-weight:600">${p[0]}</b><br><span class="tiny">${p[2]}</span></span><span class="num" style="font-weight:600">${p[1]}</span><span class="pill ok">PR</span></div>`).join('')}</div>`;
  }
  return `<section class="view stack"><div><p class="eyebrow" style="color:var(--gym)">Gravity Room · Palestra</p><h1>${tb==='progressi'?'I tuoi progressi':tb==='esercizi'?'Libreria esercizi':'Scheda di oggi'}</h1></div>${tab('gym',tb,[['scheda','Scheda'],['esercizi','Esercizi'],['progressi','Progressi']])}${body}</section>`;
}

/* ---------- PROFILO ---------- */
const metricsHTML=()=>{const b=bmi();return `<div class="metric"><span class="tiny">BMI</span><span class="v">${fmt(b)}</span><span class="tiny">${bmiLabel(b)}</span></div><div class="metric"><span class="tiny">Metabolismo</span><span class="v">${fmt(Math.round(bmr()),0)}</span><span class="tiny">kcal a riposo</span></div><div class="metric"><span class="tiny">Fabbisogno</span><span class="v">${fmt(Math.round(tdee()),0)}</span><span class="tiny">kcal al giorno</span></div>`};
const DIET=['Deficit moderato','Alto proteico','Mediterranea','Flessibile (IIFYM)','Digiuno 16:8','Low carb','Ricarica nel weekend','Vegetariana'];
const TRAIN=['Push / Pull / Gambe','Upper / Lower','Full body','Forza 5×5','Ipertrofia','Sovraccarico progressivo','Cardio 3 volte a settimana'];
function vProfile(){
  const tb=S.profTab,p=S.profile;let body='';
  if(tb==='dati'){
    body=`<div class="card"><div class="metrics" id="metrics">${metricsHTML()}</div></div>
      <div class="card stack">
        <h3>Dati personali</h3>
        <div class="field"><label for="pf-name">Nome</label><input id="pf-name" data-pf="name" value="${esc(p.name)}" autocomplete="given-name"></div>
        <div class="field"><span class="flabel" id="sexL">Sesso</span><div class="seg" role="radiogroup" aria-labelledby="sexL">${[['M','Uomo'],['F','Donna']].map(([k,l])=>`<button type="button" role="radio" aria-checked="${p.sex===k}" aria-selected="${p.sex===k}" data-sex="${k}">${l}</button>`).join('')}</div></div>
        <div class="fgrid">
          <div class="field"><label for="pf-age">Età</label><div class="unit"><input id="pf-age" data-pf="age" type="number" inputmode="numeric" min="14" max="99" value="${p.age}"><span>anni</span></div></div>
          <div class="field"><label for="pf-height">Altezza</label><div class="unit"><input id="pf-height" data-pf="height" type="number" inputmode="numeric" min="120" max="230" value="${p.height}"><span>cm</span></div></div>
          <div class="field"><label for="pf-start">Peso di partenza</label><div class="unit"><input id="pf-start" data-pf="start" type="number" inputmode="decimal" step="0.1" value="${p.start}"><span>kg</span></div></div>
          <div class="field"><label for="pf-target">Peso obiettivo</label><div class="unit"><input id="pf-target" data-pf="target" type="number" inputmode="decimal" step="0.1" value="${p.target}"><span>kg</span></div></div>
        </div>
        <div class="field"><label for="pf-activity">Livello di attività</label><select id="pf-activity" data-pf="activity">${[[1.2,'Sedentario, lavoro da scrivania'],[1.375,'Leggero, 1–3 allenamenti'],[1.55,'Moderato, 3–5 allenamenti'],[1.725,'Alto, 6–7 allenamenti'],[1.9,'Molto alto, lavoro fisico e sport']].map(([v,l])=>`<option value="${v}" ${+p.activity===v?'selected':''}>${l}</option>`).join('')}</select></div>
        <button class="btn block" id="saveProfile">Salva i miei dati</button>
      </div>
      <div class="card stack s12">
        <div class="row between"><h3>Registra il peso</h3><span class="tiny">Ultimo ${fmt(p.weight)} kg</span></div>
        <form class="fridge" id="weightForm" novalidate><label for="wIn" class="vh">Peso di oggi in kg</label><div class="unit" style="flex:1;min-width:0"><input id="wIn" class="input" type="number" inputmode="decimal" step="0.1" placeholder="${fmt(p.weight)}" style="width:100%"><span>kg</span></div><button class="btn food">Registra</button></form>
        <p class="err" id="wErr" hidden></p>
        ${spark(SERIES.peso.v,'var(--food)')}
        <span class="tiny">Ultime ${SERIES.peso.v.length} pesate</span>
      </div>
      <div class="card stack s12">
        <div class="row between"><h3>Salute e Apple Watch</h3><span class="pill ${HK_REAL?'food':'ai'}">${HK_REAL?'Collegato':'Da collegare'}</span></div>
        <p class="tiny" style="max-width:40ch">${HK_REAL?`Ultimi dati ricevuti ${hkDay()}: ${fmt(HEALTH.steps,0)} passi, ${HEALTH.active} kcal attive.`:'Ogni sera un Comando rapido sull’iPhone manda qui passi, calorie attive, sonno, battito a riposo e peso.'}</p>
        <button class="btn soft block" data-hk="1">${HK_REAL?'Rivedi la configurazione':'Collega Salute'}</button>
      </div>`;
  } else if(tb==='obiettivo'){
    const g=S.goal,TT=T(),A=autoTargets(),wl=weeksLeft();
    if(!S.editGoal){
      const dl=new Date(g.deadline);
      body=`<div class="card stack s12">
          <div class="row between"><span class="pill food">${I.target}${esc(g.type)}</span><button class="btn soft sm" id="editGoal">${I.edit}Modifica</button></div>
          <h2 style="font-size:24px">${esc(g.title)}</h2>
          <span class="tiny">${isNaN(dl)?'Nessuna scadenza':'Entro il '+esc(dl.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}))}${wl!=null?' · mancano '+wl+' settimane':''}</span>
          ${lvlHTML()}
          <div class="gbar"><i style="width:${goalPct()}%"></i></div>
          <div class="row between tiny"><span>${fmt(p.start)} kg</span><span><b style="color:var(--ink)">${fmt(p.weight)} kg</b> · ${goalPct()}%</span><span>${fmt(p.target)} kg</span></div>
        </div>
        <div class="card stack s12"><span class="eyebrow">Cosa devo fare</span><p class="goal-text">${esc(g.what)}</p></div>
        <div class="card stack s12"><span class="eyebrow">Approccio alimentare</span><div class="row wrap" style="gap:6px">${g.diet.map(x=>`<span class="pill food">${esc(x)}</span>`).join('')||'<span class="tiny">Nessuno scelto</span>'}</div>
          <span class="eyebrow" style="margin-top:6px">Approccio in palestra</span><div class="row wrap" style="gap:6px">${g.train.map(x=>`<span class="pill gym">${esc(x)}</span>`).join('')||'<span class="tiny">Nessuno scelto</span>'}</div></div>
        <div class="card stack s12"><div class="row between"><span class="eyebrow">Obiettivi giornalieri</span><span class="tiny">${g.manual?'Impostati da te':'Calcolati dai tuoi dati'}</span></div>
          <div class="tgts"><div class="tgt"><div class="v">${fmt(TT.k,0)}</div><div class="t">kcal</div></div><div class="tgt"><div class="v">${TT.p}</div><div class="t">Proteine g</div></div><div class="tgt"><div class="v">${TT.c}</div><div class="t">Carbo g</div></div><div class="tgt"><div class="v">${TT.f}</div><div class="t">Grassi g</div></div></div>
          ${g.manual?'':`<p class="tiny">Fabbisogno stimato ${fmt(Math.round(tdee()),0)} kcal (formula Mifflin-St Jeor per livello di attività), ${Math.round((ADJ[g.type]||0)*100)}% per ${g.type.toLowerCase()}. Proteine 2 g per kg, grassi 0,9 g per kg, il resto carboidrati.</p>`}</div>`;
    } else {
      body=`<form class="card stack" id="goalForm" novalidate>
        <div class="field"><span class="flabel">Tipo di obiettivo</span><div class="chips wrap">${Object.keys(ADJ).map(k=>`<button type="button" class="chip food" aria-pressed="${g.type===k}" data-gtype="${k}">${k}</button>`).join('')}</div></div>
        <div class="field"><label for="g-title">Il mio obiettivo in una frase</label><input id="g-title" data-gf="title" value="${esc(g.title)}" maxlength="80"></div>
        <div class="field"><label for="g-what">Cosa devo fare, esattamente</label><textarea id="g-what" data-gf="what">${esc(g.what)}</textarea><span class="hint">Una azione per riga. Whis userà queste regole nei suoi consigli.</span></div>
        <div class="field"><label for="g-deadline">Entro quando</label><input id="g-deadline" type="date" data-gf="deadline" value="${esc(g.deadline)}"></div>
        <div class="field"><span class="flabel">Approccio alimentare</span><div class="chips wrap">${DIET.map(k=>`<button type="button" class="chip food" aria-pressed="${g.diet.includes(k)}" data-gdiet="${k}">${k}</button>`).join('')}</div></div>
        <div class="field"><span class="flabel">Approccio in palestra</span><div class="chips wrap">${TRAIN.map(k=>`<button type="button" class="chip gym" aria-pressed="${g.train.includes(k)}" data-gtrain="${k}">${k}</button>`).join('')}</div></div>
        <div class="field"><span class="flabel">Calorie e macro</span><div class="seg"><button type="button" aria-selected="${!g.manual}" data-gmanual="0">Calcola per me</button><button type="button" aria-selected="${!!g.manual}" data-gmanual="1">Li imposto io</button></div>
          ${g.manual?`<div class="fgrid" style="margin-top:6px">${[['k','Calorie','kcal'],['p','Proteine','g'],['c','Carboidrati','g'],['f','Grassi','g']].map(([k,l,u])=>`<div class="field"><label for="g-${k}">${l}</label><div class="unit"><input id="g-${k}" type="number" inputmode="numeric" data-gf="${k}" value="${g[k]??A[k]}"><span>${u}</span></div></div>`).join('')}</div>`:`<span class="hint">Con i tuoi dati: ${fmt(A.k,0)} kcal · P ${A.p} g · C ${A.c} g · G ${A.f} g</span>`}</div>
        <div class="fgrid"><button type="button" class="btn soft" id="cancelGoal">Annulla</button><button class="btn food">Salva obiettivo</button></div>
      </form>`;
    }
  } else {
    body=`<div class="card stack s12"><div class="row between"><h3>Foto dei progressi</h3><span class="tiny">${S.photos.length} foto</span></div>
      <label class="upl">${I.cam}Aggiungi foto<input type="file" id="photoIn" accept="image/*" multiple></label>
      ${S.photos.length?`<div class="photos">${S.photos.map((ph,i)=>[ph,i]).reverse().map(([ph,i])=>`<div class="photo"><img src="${ph.src}" alt="Foto progresso del ${esc(ph.date)}"><span class="cap">${esc(ph.date)} · ${fmt(ph.w)} kg</span><button class="rm" data-rmphoto="${i}" aria-label="Elimina foto">${I.x}</button></div>`).join('')}</div>`:
      `<div class="empty"><div class="ill">${I.cam}</div><h3>Ancora nessuna foto</h3><p class="tiny" style="max-width:32ch">Scatta fronte, lato e retro ogni 2 settimane, con la stessa luce e alla stessa ora. Ogni foto si salva con data e peso.</p></div>`}
      </div>`;
  }
  return `<section class="view stack">
    <div class="prof-head"><label class="bigava" aria-label="Cambia foto profilo">${avaHTML()}<span class="cam">${I.cam}</span><input type="file" id="avaIn" accept="image/*" class="vh"></label>
      <div style="min-width:0"><p class="eyebrow">Profilo</p><h1 style="font-size:28px">${esc(p.name)}</h1><p class="tiny">${p.age} anni · ${p.height} cm · ${fmt(p.weight)} kg</p></div></div>
    ${tab('prof',tb,[['dati','I miei dati'],['obiettivo','Obiettivo'],['foto','Foto']])}${body}</section>`;
}

/* ---------- COACH ---------- */
const QUICK=['Cosa mangio a cena?','Aumento i carichi?','Il peso è fermo','Com’è andata la settimana?','Sostituisci la panca','Quali integratori?'];
function vCoach(){
  if(!S.chat&&window.__SF_CHAT&&window.__SF_CHAT.length)S.chat=window.__SF_CHAT;
  if(!S.chat){const t=totals(todayIdx),TT=T();S.chat=[
    {me:true,t:'Stasera ho circa 700 kcal libere e voglio chiudere le proteine. Cosa mangio?'},
    {me:false,t:`Oggi sei a <b>${Math.round(t.p)} g</b> su ${TT.p} g di proteine, ne mancano circa ${Math.max(0,Math.round(TT.p-t.p))}. Con 700 kcal farei così:<ul><li>Petto di pollo 200 g · 220 kcal · 46 g P</li><li>Patate al forno 200 g · 154 kcal · 4 g P</li><li>Insalata con 10 g di olio · 115 kcal</li><li>Prima di dormire: yogurt greco 0% 170 g · 97 kcal · 17 g P</li></ul>Totale circa <b>590 kcal e 67 g di proteine</b>, con 110 kcal di margine.<p class="why" style="margin-top:8px"><b>Perché:</b> conviene dividere le proteine in 3–4 pasti da circa 0,4 g per kg (per te circa 32 g), così stimoli la sintesi muscolare più volte al giorno. Lo yogurt greco la sera porta caseine a lento rilascio durante la notte. I carboidrati delle patate ricaricano il glicogeno dopo Push B.</p>`}]}
  return `<section class="view stack" style="padding-bottom:80px"><div><p class="eyebrow" style="color:var(--ai)">Whis · Coach AI</p><h1>Il tuo maestro</h1><p class="sub">Whis ragiona come un preparatore atletico e un nutrizionista sportivo: conosce obiettivo, diario e scheda, e ti spiega sempre il perché.</p></div>
    <span class="example">Prototipo: risposte di esempio, l’AI vera arriva col backend</span>
    <div class="chat" id="chat">${S.chat.map(m=>`<div class="msg ${m.me?'me':'ai'}">${m.me?esc(m.t):m.t}</div>`).join('')}</div></section>`;
}
function reply(q){
  q=q.toLowerCase();const TT=T(),w=S.profile.weight;
  const why=t=>`<p class="why" style="margin-top:8px"><b>Perché:</b> ${t}</p>`;
  if(/dolor|male|infortun|fastidio/.test(q))return 'Se senti dolore acuto o puntorio, interrompi l’esercizio: il dolore articolare non va “allenato”. Nel frattempo sostituisci con una variante che non lo provoca (per la spalla: panca con manubri a presa neutra o chest press) e riduci il carico del 20–30%.'+why('un fastidio muscolare diffuso è normale, un dolore localizzato all’articolazione no. Non posso fare diagnosi: se dura più di qualche giorno o peggiora, fatti vedere da un fisioterapista o da un medico sportivo.');
  if(/panca|sostitu/.test(q))return 'Alternative alla panca piana con lo stesso schema di spinta orizzontale:<ul><li><b>Panca piana con manubri</b> · 4 × 8 con 32 kg</li><li><b>Chest press</b> · 4 × 10, più stabile se la spalla è sensibile</li><li><b>Dip alle parallele</b> · 3 × 8, busto inclinato in avanti</li></ul>'+why('per non perdere progressi conviene mantenere lo stesso schema motorio, un intervallo di ripetizioni simile e lo stesso numero di serie allenanti per il petto (oggi 10). Riprendi la panca la seduta successiva, così la progressione non si interrompe.');
  if(/tecnica|miglior/.test(q))return 'Per migliorare la tecnica:<ul><li>Registra una serie di lato e caricala nella scheda dell’esercizio</li><li>Per 2 settimane lavora al 10% in meno, con discesa in 2–3 secondi e una pausa di 1 secondo in basso</li><li>Confronta il video con il tutorial che hai salvato</li></ul>'+why('la tecnica si consolida con ripetizioni di qualità e lontano dal cedimento (RPE 6–7). Il carico perso lo recuperi in poche settimane, mentre un compenso sbagliato si porta dietro mesi di stallo o un infortunio.');
  if(/settiman|andata|riepilog|check/.test(q))return `Riepilogo degli ultimi 7 giorni:<ul><li>Allenamenti: <b>5 su 6</b></li><li>Media calorie: <b>2.310 kcal</b> (obiettivo ${fmt(TT.k,0)})</li><li>Media proteine: <b>148 g</b> (obiettivo ${TT.p})</li><li>Peso medio: <b>79,3 kg</b>, −0,6 kg</li></ul>Stai perdendo lo 0,75% del peso a settimana, un po’ troppo veloce per una ricomposizione. Ti propongo +200 kcal, soprattutto carboidrati intorno all’allenamento: trovi tutto nel check-in settimanale.`+why('in ricomposizione l’ideale è perdere lo 0,25–0,5% a settimana. Più veloce di così aumenta il rischio di perdere massa muscolare e forza. Dai tuoi dati reali il fabbisogno è circa 2.970 kcal, più alto della stima a formula.');
  if(/carich|aument|progress/.test(q))return 'Uso la <b>doppia progressione</b>: resti sullo stesso carico finché non completi tutte le serie al massimo delle ripetizioni con 1–2 ripetizioni di riserva (RPE 8–9), poi aumenti. Panca: oggi 80 kg × 6. Alzate laterali: resta a 10 kg e punta a 15 ripetizioni prima di salire.'+why('aumentare il carico solo quando le ripetizioni lo “meritano” ti fa progredire senza accumulare fatica inutile. Sui grandi multiarticolari si sale di 2,5 kg, sui piccoli muscoli conviene salire prima di ripetizioni, perché un salto di 2 kg su un manubrio da 10 kg vale il 20%.');
  if(/stall|fermo|non scend|plateau/.test(q))return 'Prima di cambiare qualcosa guarda la <b>media di 2–3 settimane</b>, non la singola pesata. Se è davvero ferma, hai due leve: −150 kcal al giorno (circa 35 g di carboidrati) oppure +2.000 passi al giorno. Ti consiglio i passi, così non tocchi l’energia per gli allenamenti.'+why('il peso giornaliero oscilla di 1–2 kg per acqua, sale e glicogeno, e il ciclo di allenamento trattiene liquidi. Un vero stallo si vede solo sulla tendenza.');
  if(/creatin|integrat|whey|caffe/.test(q))return 'Con prove scientifiche solide ce ne sono pochi:<ul><li><b>Creatina monoidrato</b> · 3–5 g al giorno, tutti i giorni, a qualsiasi ora</li><li><b>Whey</b> · solo se non arrivi alle proteine con il cibo</li><li><b>Caffeina</b> · 3 mg per kg circa 45 minuti prima, se la tolleri (per te circa 240 mg)</li></ul>'+why('la creatina migliora forza e volume di lavoro ed è sicura in soggetti sani. Il primo mese il peso può salire di 1 kg per l’acqua nel muscolo, non è grasso. Il resto degli integratori conta poco rispetto a dieta, sonno e allenamento.');
  if(/cena|mangi|pasto|ricett|fame/.test(q)){const g=generate('cen'),r=scaled(g.rid,g.f);return `Per stasera ti propongo <b>${esc(r.n)}</b>: ${r.k} kcal e ${r.p} g di proteine, pronto in ${r.min} minuti. In Senzu tocca “Genera ricetta” sotto la cena per vederla con le dosi già calcolate.`+why(`la cena vale circa il 30% delle tue calorie (${Math.round(TT.k*0.3)} kcal). Puntare ad almeno 0,4 g di proteine per kg (${Math.round(w*0.4)} g) e a un po’ di carboidrati aiuta il recupero notturno e la qualità del sonno.`)}
  return 'Nella versione completa leggerò diario, scheda, obiettivo e dati di Salute per risponderti con numeri precisi e spiegarti il ragionamento. Prova a chiedermi della cena, di un esercizio da sostituire, di quando aumentare i carichi, di uno stallo del peso o degli integratori.';
}

/* ---------- SHEETS ---------- */
let lastFocus=null;
const HK_URL=location.origin+'/api/health/ingest';
function hkSheet(){
  const step=(n,t)=>`<div class="row" style="gap:12px;align-items:flex-start"><span class="pill ai" style="flex:none">${n}</span><div class="tiny" style="color:var(--ink-2);line-height:1.5">${t}</div></div>`;
  openSheet('Collega Salute',`<div class="stack s16">
    <p class="tiny" style="color:var(--ink-2)">Un Comando rapido sull’iPhone legge Salute ogni sera e manda i dati a Saiyan Fit. Prima genera il tuo codice personale.</p>
    <div class="card stack s12" style="background:var(--surface-2);box-shadow:none" id="hkBox">
      <button class="btn ai block" data-hkgen="1">Genera il mio codice</button>
      <p class="err" id="hkErr" role="alert" hidden></p><span class="tiny">Il codice si vede una volta sola. Se lo rigeneri, quello vecchio smette di funzionare.</span>
    </div>
    <h3>Crea il Comando rapido</h3>
    ${step(1,'Apri <b>Comandi</b> → <b>Automazione</b> → <b>+</b> → <b>Ora del giorno</b>: 23:30, ogni giorno, <b>Esegui subito</b>.')}
    ${step(2,'Aggiungi <b>Trova campioni di Salute</b>: tipo <b>Passi</b>, data di inizio <b>oggi</b>. Poi <b>Calcola statistiche</b> → <b>Somma</b>. Rinomina il risultato in <i>passi</i>.')}
    ${step(3,'Ripeti con <b>Energia attiva</b> (Somma) → <i>kcal</i>.')}
    ${step(4,'<b>Trova campioni di Salute</b>: <b>Frequenza cardiaca a riposo</b>, ordina per data di inizio, ultimo prima, limite 1 → <i>fc</i>. Uguale per <b>Peso</b> → <i>peso</i>.')}
    ${step(5,'Facoltativo: <b>Analisi del sonno</b> da ieri alle 18:00, solo <b>Addormentato</b>, <b>Calcola statistiche</b> → <b>Somma</b> della durata in ore → <i>sonno</i>.')}
    ${step(6,`Aggiungi <b>Ottieni contenuti dell’URL</b> con l’indirizzo qui sotto. Metodo <b>POST</b>. Intestazione <b>Authorization</b> = <b>Bearer</b> + spazio + il tuo codice. Corpo <b>JSON</b> con i campi <b>steps</b>, <b>active_kcal</b>, <b>resting_hr</b>, <b>weight_kg</b>, <b>sleep_h</b> e le variabili di prima.`)}
    <div class="lnk"><button type="button" data-copy="${HK_URL}" style="text-align:left;flex:1;min-width:0;background:none;border:0;padding:0;color:inherit"><div class="t">Indirizzo (tocca per copiare)</div><div class="u" style="word-break:break-all">${esc(HK_URL)}</div></button></div>
    ${step(7,'Premi ▶︎ per provarlo: deve rispondere <b>"ok": true</b>. Riapri l’app e il riquadro Salute mostra i tuoi dati veri.')}
  </div>`);
}
async function hkGen(btn){
  btn.disabled=true;btn.textContent='Genero…';
  try{const r=await fetch('/api/health/token',{method:'POST'});const j=await r.json().catch(()=>({}));if(!r.ok)throw j.error||'Errore '+r.status;const {token}=j;
    $('#hkBox').innerHTML=`<span class="tiny">Il tuo codice personale</span><div class="num" style="font-size:15px;word-break:break-all;user-select:all">${esc(token)}</div><button class="btn ai block" data-copy="Bearer ${esc(token)}">Copia «Bearer + codice»</button><span class="tiny">Incollalo nell’intestazione Authorization del Comando. Non condividerlo.</span>`;
  }catch(e){btn.disabled=false;btn.textContent='Genera il mio codice';const m=typeof e==='string'?e:'Non sono riuscito a generare il codice, riprova';const n=$('#hkErr');if(n){n.textContent=m;n.hidden=false}else toast(m)}
}
function openSheet(title,html){
  lastFocus=document.activeElement;
  $('#sheetBody').innerHTML=`<div class="sheet-top"><h2 id="sheetTitle">${title}</h2><button class="icon-btn" data-close aria-label="Chiudi">${I.x}</button></div>${html}`;
  const sc=$('#scrim'),sh=$('#sheet');sc.hidden=false;sh.hidden=false;sh.scrollTop=0;
  requestAnimationFrame(()=>{sc.classList.add('open');sh.classList.add('open')});
  setTimeout(()=>{const f=sh.querySelector('[data-close]');f&&f.focus()},80);
}
function closeSheet(){const sc=$('#scrim'),sh=$('#sheet');sc.classList.remove('open');sh.classList.remove('open');setTimeout(()=>{sc.hidden=true;sh.hidden=true;if(lastFocus&&document.body.contains(lastFocus))lastFocus.focus()},260)}
function foodSheet(meal){
  const list=q=>FOODS.filter(f=>f.n.toLowerCase().includes(q.toLowerCase())).map(f=>`<button class="ex-item" data-pick="${FOODS.indexOf(f)}" data-meal="${meal}" style="grid-template-columns:1fr auto"><span><b style="font-weight:600">${esc(f.n)}</b><br><span class="tiny">${esc(f.q)} · P ${fmt(f.p)} · C ${fmt(f.c)} · G ${fmt(f.f)}</span></span><span class="num" style="font-weight:600">${f.k} kcal</span></button>`).join('')||'<p class="tiny" style="padding:12px 0">Nessun alimento trovato. Con il backend potrai cercarlo in un database completo o crearlo.</p>';
  openSheet(`Aggiungi a ${MEAL_NAME[meal]}`,`<div class="field" style="margin-bottom:6px"><label for="foodSearch">Cerca un alimento</label><input id="foodSearch" placeholder="Es. salmone" autocomplete="off"></div><div id="foodList">${list('')}</div>`);
  $('#foodSearch').addEventListener('input',e=>{$('#foodList').innerHTML=list(e.target.value)});
}
function recipeSheet(rid,f,ctx){
  const r=scaled(rid,f);
  openSheet(esc(r.n),`<div class="ph" style="background:${COL[r.m][1]};aspect-ratio:16/8;border-radius:20px;margin-bottom:14px">${art(r.m,RECIPES.findIndex(x=>x.id===rid))}</div>
    <div class="row wrap" style="gap:6px;margin-bottom:14px"><span class="pill n">${MEAL_NAME[r.m]}</span><span class="pill food">${r.k} kcal</span><span class="pill food">P ${r.p} g</span><span class="pill gym">C ${r.c} g</span><span class="pill ai">G ${r.g} g</span><span class="pill n">${I.clock}${r.min} min</span></div>
    ${r.sf&&r.sf!==1?`<p class="tiny" style="margin-bottom:12px">Dosi adattate al tuo budget per ${MEAL_NAME[r.m].toLowerCase()}: ${r.sf>1?'+':''}${Math.round((r.sf-1)*100)}% rispetto alla ricetta base.</p>`:''}
    <h3 style="margin-bottom:4px">Ingredienti · 1 porzione</h3><div class="ing">${r.ingS.map(i=>`<div><span>${esc(i[0])}</span><b>${esc(i[1])}</b></div>`).join('')}</div>
    <h3 style="margin:18px 0 12px">Preparazione</h3><ol class="steps">${r.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol>
    <div class="stack s8" style="margin-top:22px"><button class="btn soft block" data-r2shop="${rid}:${r.sf}">${I.cart}Aggiungi ingredienti alla spesa</button>
    ${ctx?`<button class="btn food block" data-eat="${ctx}">${I.check}Segna come mangiato</button>`:`<button class="btn food block" data-r2meal="${rid}">${I.plus}Aggiungi al diario di oggi</button>`}</div>`);
}
function exSheet(name){
  const x=allEx().find(e=>e.n===name)||{n:name,m:'',a:'',cues:[]};
  openSheet(esc(x.n),`<p class="tiny" style="margin:-4px 0 14px">${esc(x.m)}${x.a?' · '+esc(x.a):''}</p>
    ${x.pr?`<div class="tile" style="box-shadow:none;background:var(--surface-2);margin-bottom:16px"><span class="eyebrow">Record personale</span><div class="v num" style="font-size:24px">${esc(x.pr)}</div></div>`:''}
    <h3 style="margin-bottom:10px">Foto, video e link</h3>
    <div id="mediaBox">${mediaHTML(name)}</div>
    <div class="media-add" style="margin-top:12px"><label class="upl">${I.cam}Foto o video<input type="file" id="mediaIn" accept="image/*,video/*" data-mname="${esc(name)}"></label><button class="upl" id="toggleLink" aria-expanded="false">${I.link}Link YouTube o TikTok</button></div>
    <form id="linkForm" class="stack s8" style="margin-top:12px" hidden data-mname="${esc(name)}" novalidate><div class="field"><label for="linkIn">Incolla il link del video</label><input id="linkIn" type="url" inputmode="url" placeholder="https://youtu.be/…" autocomplete="off"><span class="err" id="linkErr" hidden></span></div><button class="btn block">Aggiungi link</button></form>
    ${x.cues&&x.cues.length?`<h3 style="margin:20px 0 6px">Esecuzione</h3><ul>${x.cues.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>`:''}
    <p class="tiny" style="margin-top:14px">Nel prototipo foto e link restano su questo dispositivo, i video solo finché la pagina è aperta. Con il backend verranno salvati nel tuo account.</p>
    <a class="btn ai block" href="#coach" data-ask="Come miglioro la tecnica di ${esc(x.n.toLowerCase())}?" style="margin-top:16px">${I.spark}Chiedi a Whis</a>`);
}
function mediaHTML(name){
  const m=S.media[name]||[];
  if(!m.length)return `<div class="empty" style="padding:18px;background:var(--surface-2);border-radius:18px"><p class="tiny" style="max-width:34ch">Aggiungi un video della tua esecuzione o un tutorial da YouTube o TikTok, così lo ritrovi qui mentre ti alleni.</p></div>`;
  const idx=m.map((x,i)=>[x,i]),vis=idx.filter(([x])=>x.type!=='link'),links=idx.filter(([x])=>x.type==='link');
  return `${vis.length?`<div class="media-grid" style="margin-bottom:10px">${vis.map(([x,i])=>`<div class="media">${x.type==='image'?`<img src="${x.src}" alt="Foto di ${esc(name)}">`:`<video src="${x.src}" controls playsinline preload="metadata"></video>`}<button class="rm" data-rmmedia="${i}" data-mname="${esc(name)}" aria-label="Elimina">${I.x}</button></div>`).join('')}</div>`:''}
    <div class="stack s8">${links.map(([x,i])=>{const p=platform(x.url)||['web','il sito'];return `<div class="lnk"><span class="pl ${p[0]}">${I.play}</span><a href="${esc(x.url)}" target="_blank" rel="noopener"><div class="t">Guarda su ${p[1]}</div><div class="u">${esc(x.url.replace(/^https?:\/\/(www\.)?/,''))}</div></a><button class="rm2" data-rmmedia="${i}" data-mname="${esc(name)}" aria-label="Rimuovi link">${I.trash}</button></div>`}).join('')}</div>`;
}
function photoSheet(meal,src){
  S.photo={meal,src,items:null};
  openSheet('Whis analizza il piatto',`<img class="prev-img" src="${src}" alt="Foto del piatto"><div id="anaBox" class="stack s8" aria-live="polite"><span class="tiny">Riconosco alimenti e porzioni…</span><div class="skel" style="width:80%;height:18px"></div><div class="skel" style="width:60%;height:18px"></div><div class="skel" style="width:70%;height:18px"></div></div>`);
  const done=items=>{if(!S.photo||S.photo.src!==src)return;S.photo.items=items;const b=$('#anaBox');if(b)b.innerHTML=items.length?anaHTML():'<p class="tiny">Non ho riconosciuto alimenti. Prova con una foto più vicina e con più luce.</p>'};
  if(window.SF&&window.SF.analyze){window.SF.analyze(src,MEAL_NAME[meal]).then(r=>{r.forEach(x=>{PER100[x.name]=[x.k,x.p,x.c,x.f]});done(r.map(x=>[x.name,x.grams]))}).catch(()=>{toast('Analisi non riuscita, ti mostro una stima di esempio');done(DETECT[meal].map(x=>x.slice()))})}
  else setTimeout(()=>done(DETECT[meal].map(x=>x.slice())),1400);
}
function anaTot(){return S.photo.items.reduce((a,[n,g])=>{const v=per(n,g);a.k+=v.k;a.p+=v.p;a.c+=v.c;a.f+=v.f;return a},{k:0,p:0,c:0,f:0})}
function anaHTML(){const t=anaTot();return `<div class="row between"><h3>Ho trovato ${S.photo.items.length} alimenti</h3><span class="pill ai">Stima</span></div>
  <div class="ana">${S.photo.items.map(([n,g],i)=>`<div class="ana-row"><label for="pg-${i}">${esc(n)}</label><div class="unit"><input id="pg-${i}" type="number" inputmode="numeric" min="0" value="${g}" data-pg="${i}"><span>g</span></div><span class="k" id="pk-${i}">${per(n,g).k} kcal</span></div>`).join('')}</div>
  <div class="row wrap" style="gap:6px" id="anaTot"><span class="pill food">${Math.round(t.k)} kcal</span><span class="pill food">P ${Math.round(t.p)} g</span><span class="pill gym">C ${Math.round(t.c)} g</span><span class="pill ai">G ${Math.round(t.f)} g</span></div>
  <p class="tiny">La stima da foto ha un errore tipico del 15–20%, soprattutto su olio e condimenti: correggi i grammi se li conosci.</p>
  <button class="btn food block" data-photo-ok>${I.check}Aggiungi a ${MEAL_NAME[S.photo.meal].toLowerCase()}</button>`}
function barcodeSheet(meal){
  S.bc={meal,item:null};
  openSheet('Codice a barre',`<p class="tiny" style="margin-bottom:12px">Nell’app vera inquadri il codice con la fotocamera e i valori arrivano dal database Open Food Facts. Nel prototipo scrivi il codice o prova un prodotto di esempio.</p>
    <form id="bcForm" class="stack s8" novalidate><div class="field"><label for="bcIn">Codice EAN (13 cifre)</label><input id="bcIn" inputmode="numeric" autocomplete="off" placeholder="8001234567890"><span class="err" id="bcErr" hidden></span></div><button class="btn block">Cerca prodotto</button></form>
    <div class="chips wrap" style="margin-top:12px">${Object.entries(BARCODES).map(([c,v])=>`<button class="chip" data-bccode="${c}">${esc(v[0])}</button>`).join('')}</div>
    <div id="bcRes" style="margin-top:14px"></div>`);
}
function bcShow(code){const v=BARCODES[code],box=$('#bcRes');if(!v)return false;S.bc.item={code,n:v[0],g:v[1],v:v[2]};box.innerHTML=bcHTML();return true}
function bcHTML(){const it=S.bc.item,f=it.g/100;return `<div class="card" style="box-shadow:none;background:var(--surface-2)"><div class="stack s12"><div><h3>${esc(it.n)}</h3><span class="tiny">Per 100 g: ${it.v[0]} kcal · P ${fmt(it.v[1])} · C ${fmt(it.v[2])} · G ${fmt(it.v[3])}</span></div>
  <div class="field"><label for="bcG">Quanto ne mangi</label><div class="unit"><input id="bcG" type="number" inputmode="numeric" value="${it.g}" data-bcg><span>g</span></div></div>
  <div class="row wrap" style="gap:6px" id="bcTot"><span class="pill food">${Math.round(it.v[0]*f)} kcal</span><span class="pill food">P ${fmt(it.v[1]*f)} g</span><span class="pill gym">C ${fmt(it.v[2]*f)} g</span><span class="pill ai">G ${fmt(it.v[3]*f)} g</span></div>
  <button class="btn food block" data-bc-add>${I.plus}Aggiungi a ${MEAL_NAME[S.bc.meal].toLowerCase()}</button></div></div>`}
function checkinSheet(){
  const TT=T(),nk=TT.k+200;
  openSheet('Check-in settimanale',`<p class="tiny" style="margin:-4px 0 14px">Settimana dal ${new Date(monday.getTime()-7*864e5).toLocaleDateString('it-IT',{day:'numeric',month:'short'})} · dati di esempio</p>
    <div class="statg">
      <div class="metric"><span class="tiny">Peso medio</span><span class="v">79,3 kg</span><span class="tiny" style="color:var(--ok)">−0,6 kg · −0,75%</span></div>
      <div class="metric"><span class="tiny">Calorie medie</span><span class="v">2.310</span><span class="tiny">obiettivo ${fmt(TT.k,0)}</span></div>
      <div class="metric"><span class="tiny">Proteine medie</span><span class="v">148 g</span><span class="tiny">obiettivo ${TT.p} g</span></div>
      <div class="metric"><span class="tiny">Allenamenti</span><span class="v">5 / 6</span><span class="tiny">saltato Gambe B</span></div>
      <div class="metric"><span class="tiny">Passi medi</span><span class="v">8.240</span><span class="tiny">da Salute</span></div>
      <div class="metric"><span class="tiny">Sonno medio</span><span class="v">7h 05</span><span class="tiny">da Apple Watch</span></div>
    </div>
    <h3 style="margin:20px 0 8px">L’analisi di Whis</h3>
    <div class="stack s12">
      <p>Hai perso <b>0,6 kg</b>, cioè lo <b>0,75%</b> del peso. Per una ricomposizione è troppo veloce: l’intervallo ideale è 0,25–0,5% a settimana.</p>
      <p>Dai tuoi dati reali il fabbisogno è circa <b>2.970 kcal</b> (2.310 kcal mangiate + 0,6 kg × 7.700 kcal / 7 giorni), più alto delle ${fmt(Math.round(tdee()),0)} kcal stimate con la formula.</p>
      <p>La forza sale ancora (panca +1 kg di 1RM stimato), quindi per ora il muscolo è al sicuro. Ma con questo ritmo, tra 3–4 settimane gli allenamenti ne risentirebbero.</p>
      <p class="why"><b>Proposta:</b> porta le calorie a <b>${fmt(nk,0)} kcal</b> (+200). Aggiungi 50 g di carboidrati nel pasto prima e dopo l’allenamento e lascia invariate le proteine (${TT.p} g). Ricontrolliamo domenica prossima.</p>
    </div>
    <div class="fgrid" style="margin-top:18px"><button class="btn soft" data-close>Non ora</button><button class="btn food" data-apply-kcal="${nk}">Applica ${fmt(nk,0)} kcal</button></div>`);
}
function newExSheet(){
  openSheet('Nuovo esercizio',`<form id="exForm" class="stack" novalidate><div class="field"><label for="ex-n">Nome</label><input id="ex-n" placeholder="Es. Hip thrust" autocomplete="off"><span class="err" id="exErr" hidden></span></div>
    <div class="field"><span class="flabel">Gruppo muscolare</span><div class="chips wrap">${['Petto','Schiena','Gambe','Spalle','Braccia','Core'].map((g,i)=>`<button type="button" class="chip gym" aria-pressed="${i===2}" data-exm="${g}">${g}</button>`).join('')}</div></div>
    <div class="field"><label for="ex-a">Attrezzo</label><select id="ex-a">${['Bilanciere','Manubri','Macchina','Cavi','Corpo libero','Kettlebell','Elastici'].map(a=>`<option>${a}</option>`).join('')}</select></div>
    <button class="btn gym block">Crea esercizio</button></form>`);
}
function fileToDataURL(file,max){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>{const img=new Image();img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*s);c.height=Math.round(img.height*s);c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',0.82))};img.onerror=rej;img.src=fr.result};fr.onerror=rej;fr.readAsDataURL(file)})}

/* timer */
let tLeft=0,tInt=null;
function startTimer(s){tLeft=s;$('#timer').hidden=false;rT();clearInterval(tInt);tInt=setInterval(()=>{tLeft--;if(tLeft<=0){stopTimer();toast('Recupero finito, vai con la prossima serie')}else rT()},1000)}
function rT(){$('#timerVal').textContent=Math.floor(tLeft/60)+':'+String(tLeft%60).padStart(2,'0')}
function stopTimer(){clearInterval(tInt);$('#timer').hidden=true}
$('#timerAdd').onclick=()=>{tLeft+=15;rT()};$('#timerSkip').onclick=stopTimer;

/* router */
const NAV=[['oggi','Oggi',I.home],['alimentazione','Senzu',I.food],['palestra','Gravity',I.gym],['coach','Whis',I.spark],['profilo','Profilo',I.user]];
$('#navIn').innerHTML=NAV.map(([k,l,ic])=>`<a href="#${k}" data-v="${k}">${ic}${l}</a>`).join('');
const VIEWS={oggi:vOggi,alimentazione:vNutrition,palestra:vGym,coach:vCoach,profilo:vProfile};
const cur=()=>{const h=location.hash.slice(1);return VIEWS[h]?h:'oggi'};
function render(keep){
  const v=cur(),y=window.scrollY;
  $('#view').innerHTML=VIEWS[v]();
  $('#topAva').innerHTML=avaHTML();
  document.querySelectorAll('.nav a').forEach(a=>{if(a.dataset.v===v)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  $('#composer').hidden=v!=='coach';
  if(v==='oggi'){const pw=power().total;if(pw>9000&&!S.o9){S.o9=true;setTimeout(()=>toast('È più di 9.000! Livello di combattimento '+fmt(pw,0)),300)}}
  if(v==='coach')$('#quick').innerHTML=QUICK.map(q=>`<button class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join('');
  if(keep)window.scrollTo(0,y);
}
window.addEventListener('hashchange',()=>{render();window.scrollTo(0,0)});

function send(text){
  text=text.trim();if(!text)return;if(!S.chat)vCoach();S.chat.push({me:true,t:text});
  const chat=$('#chat');if(!chat)return;
  chat.insertAdjacentHTML('beforeend',`<div class="msg me">${esc(text)}</div><div class="msg ai" id="typing" aria-live="polite"><span class="typing"><i></i><i></i><i></i></span></div>`);
  window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
  const fin=a=>{S.chat.push({me:false,t:a});const ty=$('#typing');if(ty)ty.removeAttribute('id');if(window.SF)window.SF.saveChat(S.chat)};
  if(window.SF&&window.SF.whis){
    const ctx={profilo:S.profile,obiettivo:S.goal,target:T(),oggi:totals(todayIdx),pesi:SERIES.peso,salute:HEALTH,giorno:DN[todayIdx]};
    const hist=S.chat.slice(-13,-1).map(m=>({role:m.me?'user':'assistant',content:m.raw||m.t.replace(/<[^>]+>/g,' ')}));
    let acc='';
    window.SF.whis(text,hist,ctx,d=>{acc+=d;const ty=$('#typing');if(ty)ty.innerHTML=window.SF.md(acc)}).then(()=>{fin(window.SF.md(acc));S.chat[S.chat.length-1].raw=acc})
      .catch(()=>{const a=reply(text);const ty=$('#typing');if(ty)ty.innerHTML=a;fin(a);toast('Whis offline: risposta dal coach locale')});
  } else setTimeout(()=>{const a=reply(text);const ty=$('#typing');if(ty)ty.innerHTML=a;fin(a);window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'})},900);
}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const i=$('#chatInput');send(i.value);i.value=''});

function genMeal(d,meal,exclude){
  const k=d+':'+meal;S.gen[k]=true;render(true);
  setTimeout(()=>{delete S.gen[k];(S.plan[d]=S.plan[d]||{})[meal]=generate(meal,exclude);render(true)},750);
}
function addShop(name,items){let g=S.shop.find(x=>x.g===name);if(!g){g={g:name,items:[]};S.shop.unshift(g)}items.forEach(i=>g.items.push(i));persist()}
function readGoal(){document.querySelectorAll('[data-gf]').forEach(el=>{S.goal[el.dataset.gf]=el.value})}
const toggle=(arr,v)=>{const i=arr.indexOf(v);i<0?arr.push(v):arr.splice(i,1)};

document.addEventListener('submit',e=>{
  const id=e.target.id;
  if(!['shopForm','fridgeForm','weightForm','goalForm','linkForm','exForm','bcForm'].includes(id))return;
  e.preventDefault();
  if(id==='bcForm'){const c=$('#bcIn').value.replace(/\D/g,''),err=$('#bcErr');if(c.length!==13){err.textContent='Il codice EAN ha 13 cifre: controlla di averle scritte tutte.';err.hidden=false;$('#bcIn').focus();return}if(!bcShow(c)){err.textContent='Non trovo questo prodotto. Controlla il codice oppure aggiungi l’alimento a mano.';err.hidden=false;$('#bcRes').innerHTML=''}}
  if(id==='shopForm'){const v=$('#shopIn').value.trim();if(!v){$('#shopIn').focus();return}addShop('Altro',[{n:v,q:'1',d:false}]);render(true);toast('Aggiunto alla lista');setTimeout(()=>$('#shopIn')&&$('#shopIn').focus(),0)}
  if(id==='fridgeForm'){const v=$('#fridgeIn').value.trim().toLowerCase();if(!v){$('#fridgeIn').focus();return}
    const words=v.split(/[ ,]+/).filter(w=>w.length>2).map(w=>w.slice(0,5));
    const hits=RECIPES.filter(r=>r.ing.some(i=>words.some(w=>i[0].toLowerCase().includes(w))));
    const pool=hits.length?hits:RECIPES,r=pool[Math.floor(Math.random()*pool.length)];
    if(!hits.length)toast('Nessuna ricetta con quell’ingrediente: eccone una adatta al tuo piano');
    recipeSheet(r.id,1)}
  if(id==='weightForm'){const v=parseFloat(String($('#wIn').value).replace(',','.')),err=$('#wErr');
    if(!(v>30&&v<300)){err.textContent='Scrivi un peso tra 30 e 300 kg, per esempio 78,6.';err.hidden=false;$('#wIn').focus();return}
    S.profile.weight=Math.round(v*10)/10;SERIES.peso.v.push(S.profile.weight);if(SERIES.peso.v.length>12)SERIES.peso.v.shift();persist();render(true);toast('Peso registrato: '+fmt(S.profile.weight)+' kg')}
  if(id==='goalForm'){readGoal();S.editGoal=false;persist();render(true);window.scrollTo(0,0);toast('Obiettivo salvato')}
  if(id==='linkForm'){const name=e.target.dataset.mname,v=$('#linkIn').value.trim(),err=$('#linkErr'),p=/^https?:\/\//i.test(v)?platform(v):null;
    if(!p){err.textContent='Il link deve iniziare con https://, per esempio https://youtu.be/abc';err.hidden=false;$('#linkIn').focus();return}
    (S.media[name]=S.media[name]||[]).push({type:'link',url:v});persist();$('#mediaBox').innerHTML=mediaHTML(name);e.target.hidden=true;$('#toggleLink').setAttribute('aria-expanded','false');$('#linkIn').value='';render(true);toast(p[0]==='web'?'Link aggiunto':'Video '+p[1]+' aggiunto')}
  if(id==='exForm'){const n=$('#ex-n').value.trim(),err=$('#exErr');
    if(!n){err.textContent='Scrivi il nome dell’esercizio.';err.hidden=false;$('#ex-n').focus();return}
    if(allEx().some(x=>x.n.toLowerCase()===n.toLowerCase())){err.textContent='Esiste già un esercizio con questo nome.';err.hidden=false;$('#ex-n').focus();return}
    const sel=document.querySelector('[data-exm][aria-pressed="true"]');
    S.custom.push({n,m:sel?sel.dataset.exm:'Gambe',a:$('#ex-a').value,cues:[]});persist();S.exFilter='Tutti';render(true);exSheet(n);toast('Esercizio creato')}
});

document.addEventListener('input',e=>{
  const el=e.target;
  if(el.dataset.pf&&el.tagName==='INPUT'){const k=el.dataset.pf;S.profile[k]=k==='name'?el.value:(parseFloat(el.value)||0);const m=$('#metrics');if(m)m.innerHTML=metricsHTML()}
  if(el.dataset.pg!==undefined&&S.photo&&S.photo.items){const i=+el.dataset.pg,g=Math.max(0,parseFloat(el.value)||0);S.photo.items[i][1]=g;$('#pk-'+i).textContent=per(S.photo.items[i][0],g).k+' kcal';const t=anaTot();$('#anaTot').innerHTML=`<span class="pill food">${Math.round(t.k)} kcal</span><span class="pill food">P ${Math.round(t.p)} g</span><span class="pill gym">C ${Math.round(t.c)} g</span><span class="pill ai">G ${Math.round(t.f)} g</span>`}
  if('bcg' in el.dataset&&S.bc&&S.bc.item){const it=S.bc.item,f=(parseFloat(el.value)||0)/100;$('#bcTot').innerHTML=`<span class="pill food">${Math.round(it.v[0]*f)} kcal</span><span class="pill food">P ${fmt(it.v[1]*f)} g</span><span class="pill gym">C ${fmt(it.v[2]*f)} g</span><span class="pill ai">G ${fmt(it.v[3]*f)} g</span>`}
  if(el.id==='bcIn')$('#bcErr').hidden=true;
  if(el.id==='linkIn')$('#linkErr').hidden=true;
  if(el.id==='wIn')$('#wErr').hidden=true;
  if(el.id==='ex-n')$('#exErr').hidden=true;
});
document.addEventListener('change',async e=>{
  const el=e.target;
  if(el.dataset.mealphoto&&el.files[0]){photoSheet(el.dataset.mealphoto,URL.createObjectURL(el.files[0]));el.value='';return}
  if(el.id==='pf-activity'){S.profile.activity=parseFloat(el.value);const m=$('#metrics');if(m)m.innerHTML=metricsHTML()}
  if(el.id==='avaIn'&&el.files[0]){try{S.profile.photo=await fileToDataURL(el.files[0],320);persist();render(true);toast('Foto profilo aggiornata')}catch(_){toast('Non riesco a leggere questa immagine, prova con un JPG o PNG')}}
  if(el.id==='photoIn'&&el.files.length){for(const f of el.files){try{S.photos.push({src:await fileToDataURL(f,720),date:new Date().toLocaleDateString('it-IT',{day:'numeric',month:'short'}),w:S.profile.weight})}catch(_){toast('Una foto non si apre, provane un’altra')}}persist();render(true);toast('Foto aggiunte')}
  if(el.id==='mediaIn'&&el.files[0]){const f=el.files[0],name=el.dataset.mname,list=(S.media[name]=S.media[name]||[]),isV=f.type.startsWith('video/');
    if(isV)list.push({type:'video',src:URL.createObjectURL(f)});
    else{try{list.push({type:'image',src:await fileToDataURL(f,720)})}catch(_){toast('Non riesco a leggere questo file, prova con un JPG o un MP4');return}}
    persist();$('#mediaBox').innerHTML=mediaHTML(name);render(true);toast(isV?'Video aggiunto':'Foto aggiunta')}
});

document.addEventListener('click',e=>{
  const b=e.target.closest('button,a');if(!b)return;const d=b.dataset;
  if('close' in d){closeSheet();return}
  if(d.rpe){const [k,v]=d.rpe.split(':').length===3?[d.rpe.split(':').slice(0,2).join(':'),d.rpe.split(':')[2]]:d.rpe.split(':');S.rpe[k]=+v;render(true);return}
  if(d.barcode){barcodeSheet(d.barcode);return}
  if(d.bccode){$('#bcIn').value=d.bccode;$('#bcErr').hidden=true;bcShow(d.bccode);return}
  if('bcAdd' in d){const it=S.bc.item,g=parseFloat($('#bcG').value)||0,f=g/100;dayItems(S.selDay)[S.bc.meal].push({n:it.n,q:g+' g',k:Math.round(it.v[0]*f),p:it.v[1]*f,c:it.v[2]*f,f:it.v[3]*f});closeSheet();render(true);toast(it.n+' aggiunto');return}
  if('photoOk' in d){const t=anaTot(),m=S.photo.meal;S.photo.items.forEach(([n,g])=>{if(g>0){const v=per(n,g);dayItems(S.selDay)[m].push({n,q:g+' g',k:v.k,p:v.p,c:v.c,f:v.f})}});closeSheet();render(true);toast('Aggiunte '+Math.round(t.k)+' kcal a '+MEAL_NAME[m].toLowerCase());S.photo=null;return}
  if(b.id==='openCheckin'){checkinSheet();return}
  if(d.applyKcal){const TT=T(),nk=+d.applyKcal;Object.assign(S.goal,{manual:true,k:nk,p:TT.p,f:TT.f,c:TT.c+50});persist();closeSheet();render(true);toast('Nuovo obiettivo: '+fmt(nk,0)+' kcal');return}
  if(d.water!==undefined){const n=+d.water+1;S.water=S.water===n?n-1:n;render(true)}
  else if(d.gotoProf){S.profTab=d.gotoProf;S.editGoal=false}
  else if(d.nut){S.nutTab=d.nut;render(true)}
  else if(d.gym){S.gymTab=d.gym;render(true)}
  else if(d.prof){S.profTab=d.prof;S.editGoal=false;render(true)}
  else if(d.hk){hkSheet()}
  else if(d.hkgen){hkGen(b)}
  else if(d.copy){navigator.clipboard.writeText(d.copy).then(()=>toast('Copiato'),()=>toast('Tieni premuto sul testo per copiarlo'))}
  else if(d.exf){S.exFilter=d.exf;render(true)}
  else if(d.recf){S.recFilter=d.recf;render(true)}
  else if(d.chart){S.chart=d.chart;render(true)}
  else if(d.day!==undefined){S.selDay=+d.day;render(true)}
  else if(d.pref){toggle(S.goal.prefs,d.pref);persist();render(true)}
  else if(d.genDay!==undefined){const day=+d.genDay;MEALS.forEach(([m])=>{S.gen[day+':'+m]=true});render(true);
    MEALS.forEach(([m],i)=>setTimeout(()=>{delete S.gen[day+':'+m];(S.plan[day]=S.plan[day]||{})[m]=generate(m);render(true)},500+i*280))}
  else if(d.genGo){S.nutTab='diario';S.selDay=todayIdx;location.hash='alimentazione';setTimeout(()=>genMeal(todayIdx,d.genGo),60)}
  else if(d.genMeal){const [day,m]=d.genMeal.split(':');genMeal(+day,m)}
  else if(d.regen){const [day,m]=d.regen.split(':');genMeal(+day,m,((S.plan[day]||{})[m]||{}).rid)}
  else if(d.planOpen){const [day,m]=d.planOpen.split(':'),pl=(S.plan[day]||{})[m];if(pl)recipeSheet(pl.rid,pl.f,d.planOpen)}
  else if(d.eat){const [day,m]=d.eat.split(':'),pl=(S.plan[day]||{})[m];if(!pl)return;const r=scaled(pl.rid,pl.f);dayItems(+day)[m].push({n:r.n,q:'1 porzione',k:r.k,p:r.p,c:r.c,f:r.g});delete S.plan[day][m];if(!$('#sheet').hidden)closeSheet();render(true);toast(r.n+' segnato a '+MEAL_NAME[m].toLowerCase())}
  else if(d.add){foodSheet(d.add)}
  else if(d.pick!==undefined){const f=FOODS[+d.pick];dayItems(S.selDay)[d.meal].push(Object.assign({},f));closeSheet();render(true);toast(f.n+' aggiunto')}
  else if(d.recipe){recipeSheet(d.recipe,1)}
  else if(d.r2shop){const [rid,f]=d.r2shop.split(':'),r=scaled(rid,+f);addShop('Per: '+r.n,r.ingS.filter(i=>i[1]!=='q.b.').map(i=>({n:i[0],q:i[1],d:false})));closeSheet();toast('Ingredienti aggiunti alla spesa');render(true)}
  else if(d.r2meal){const r=scaled(d.r2meal,1);dayItems(todayIdx)[r.m].push({n:r.n,q:'1 porzione',k:r.k,p:r.p,c:r.c,f:r.g});closeSheet();toast('Aggiunto a '+MEAL_NAME[r.m].toLowerCase());render(true)}
  else if(d.shop){const [g,i]=d.shop.split(':').map(Number);S.shop[g].items[i].d=!S.shop[g].items[i].d;persist();render(true)}
  else if(b.id==='clearShop'){S.shop.forEach(g=>g.items=g.items.filter(i=>!i.d));S.shop=S.shop.filter(g=>g.items.length);persist();render(true);toast('Lista aggiornata')}
  else if(d.set){const was=S.done[d.set];S.done[d.set]=!was;if(!was)S.lastSet=d.set;render(true);if(!was){setsDone()===setsTotal()?(stopTimer(),toast('Allenamento completato, ottimo lavoro')):startTimer(+d.rest)}}
  else if(d.exname){exSheet(d.exname)}
  else if(b.id==='newEx'){newExSheet()}
  else if(d.exm){document.querySelectorAll('[data-exm]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}
  else if(b.id==='toggleLink'){const f=$('#linkForm');f.hidden=!f.hidden;b.setAttribute('aria-expanded',String(!f.hidden));if(!f.hidden)$('#linkIn').focus()}
  else if(d.rmmedia!==undefined){const name=d.mname,list=S.media[name]||[],it=list[+d.rmmedia];if(it&&it.type==='video')URL.revokeObjectURL(it.src);list.splice(+d.rmmedia,1);persist();$('#mediaBox').innerHTML=mediaHTML(name);render(true);toast('Rimosso')}
  else if(d.rmphoto!==undefined){S.photos.splice(+d.rmphoto,1);persist();render(true);toast('Foto eliminata')}
  else if(d.sex){S.profile.sex=d.sex;render(true)}
  else if(b.id==='saveProfile'){persist();render(true);toast('Dati salvati')}
  else if(b.id==='editGoal'){S.editGoal=true;render(true)}
  else if(b.id==='cancelGoal'){S.editGoal=false;render(true)}
  else if(d.gtype){readGoal();S.goal.type=d.gtype;render(true)}
  else if(d.gdiet){readGoal();toggle(S.goal.diet,d.gdiet);render(true)}
  else if(d.gtrain){readGoal();toggle(S.goal.train,d.gtrain);render(true)}
  else if(d.gmanual!==undefined){readGoal();S.goal.manual=d.gmanual==='1';if(S.goal.manual&&!S.goal.k)Object.assign(S.goal,autoTargets());render(true)}
  else if(d.q){send(d.q)}
  else if(d.ask){closeSheet();setTimeout(()=>send(d.ask),350)}
});
$('#scrim').addEventListener('click',closeSheet);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#sheet').hidden)closeSheet()});

function isDark(){const r=document.documentElement;return (r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark'}
function setThemeIcon(){$('#themeBtn').innerHTML=isDark()?I.sun:I.moon}
$('#themeBtn').addEventListener('click',()=>{const n=isDark()?'light':'dark';document.documentElement.setAttribute('data-theme',n);try{localStorage.setItem('tempra-theme',n)}catch(_){}setThemeIcon()});
try{const t=localStorage.getItem('tempra-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(_){}
setThemeIcon();
render();
})();
