/* Editable vector compositions. The browser receives WebP exports, not SVG fonts. */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'assets/design-studies');
fs.mkdirSync(output, { recursive: true });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const text = (x,y,size,value,fill='#151515',font='Arial',extra='') => `<text x="${x}" y="${y}" font-size="${size}" font-family="${font}" fill="${fill}" ${extra}>${esc(value)}</text>`;
const rect = (x,y,w,h,fill,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const line = (x1,y1,x2,y2,color='#151515',width=1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
const circle = (x,y,r,fill,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
const label = (x,y,v,c='#151515') => text(x,y,15,v,c,'Arial','letter-spacing="2" font-weight="700"');
const svg = (w,h,bg,content) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${rect(0,0,w,h,bg)}${content}</svg>`;
const posterFooter = (n,c='#151515') => line(48,1100,852,1100,c)+label(48,1136,'RONNIE BALONON / DESIGN STUDY',c)+text(852,1136,15,n,c,'Arial','text-anchor="end"');
const studies = [];
function add(id,title,type,description,w,h,source) { studies.push({id,title,type,description,width:w,height:h});fs.writeFileSync(path.join(output,id+'.svg'),source); }

// 01 — Music: a deliberately narrow palette and oversized typographic rhythm.
let p=label(48,62,'SOUND / CULTURE / AFTER DARK','#f6f1e8')+text(850,62,16,'01', '#f6f1e8','Arial','text-anchor="end"');
p+=text(40,267,226,'NOISE','#f6f1e8','Impact')+text(42,459,226,'RISING','#f6f1e8','Impact');
p+=circle(450,750,237,'#fd542d');
for(let i=0;i<18;i++){const x=150+i*35;const len=70+Math.sin(i*.63)**2*280;p+=rect(x,750-len/2,10,len,'#151515');}
p+=label(48,1057,'A STUDY IN SOUND & TYPOGRAPHY','#f6f1e8')+posterFooter('01 / MUSIC','#f6f1e8');
add('noise-rising','Noise Rising','Poster','A two-colour music identity built around condensed type and a rhythmic sound motif.',900,1200,svg(900,1200,'#151515',p));

// 02 — Exhibition: an asymmetric Swiss-style grid with one vivid intervention.
p=label(48,62,'FORM / SPACE / NEW PERSPECTIVES')+line(48,90,852,90);
p+=text(43,226,123,'BEYOND', '#171717','Arial','font-weight="900" letter-spacing="-7"');
p+=text(48,325,102,'the canvas.', '#171717','Georgia','font-style="italic" letter-spacing="-5"');
p+=rect(48,386,804,592,'#204bf5');
p+=circle(450,682,222,'#f4f0e7');
p+=rect(450,460,222,444,'#101010');
for(let i=0;i<9;i++)p+=line(78,424+i*65,822,424+i*65,'#f4f0e7',1);
p+=label(48,1048,'AN EXPLORATION OF POSITIVE & NEGATIVE SPACE')+posterFooter('02 / EXHIBITION');
add('beyond-the-canvas','Beyond the Canvas','Poster','An exhibition concept exploring negative space, optical geometry and editorial type.',900,1200,svg(900,1200,'#f4f0e7',p));

// 03 — Summer: clean graphic shapes rather than generated decorative lettering.
p=label(48,64,'OPEN AIR / GOOD MUSIC / LONG DAYS','#f3ffc4');
p+=text(42,235,167,'SUMMER','#f3ffc4','Impact')+text(42,412,184,'SPLASH','#f3ffc4','Impact');
p+=circle(715,552,94,'#d8f34a');
for(let i=0;i<4;i++)p+=`<path d="M -70 ${580+i*116} C 170 ${380+i*116}, 430 ${820+i*116}, 970 ${550+i*116}" fill="none" stroke="${i%2?'#e9f4ff':'#8ec7ef'}" stroke-width="64"/>`;
p+=posterFooter('03 / SUMMER','#f3ffc4');
add('summer-splash','Summer Splash','Poster','A summer campaign direction using expansive type, a citrus accent and flowing wave forms.',900,1200,svg(900,1200,'#064eb4',p));

// 04 — Hospitality: a simple, purpose-built diner illustration and strong hierarchy.
p=label(48,62,'THE NEIGHBOURHOOD DINER','#9c291f');
p+=text(450,228,165,'BURGERS','#a92a22','Impact','text-anchor="middle"');
p+=text(450,357,134,'& SHAKES','#a92a22','Impact','text-anchor="middle"');
p+=`<path d="M170 665 C170 432 730 432 730 665 Z" fill="#a92a22"/>`;
for(const [x,y] of [[300,573],[390,544],[502,550],[588,590]])p+=`<ellipse cx="${x}" cy="${y}" rx="9" ry="3" fill="#f9df83" transform="rotate(-25 ${x} ${y})"/>`;
p+=rect(166,685,568,33,'#29574a','rx="16"')+`<path d="M172 741 L732 741 L580 785 L475 758 L335 787 Z" fill="#d29126"/>`+rect(165,799,570,60,'#a92a22','rx="28"')+`<path d="M175 880 H725 Q710 956 625 956 H275 Q190 956 175 880Z" fill="#a92a22"/>`;
p+=label(48,1048,'GOOD FOOD. NO COMPLICATIONS.','#a92a22')+posterFooter('04 / HOSPITALITY','#a92a22');
add('burgers-and-shakes','Burgers & Shakes','Poster','A diner identity study with a custom vector illustration and a warm, limited colour palette.',900,1200,svg(900,1200,'#f9df83',p));

// 05 — Travel: an original geometric coastal illustration, not a fictional photo.
p=label(48,62,'SLOW DOWN / LOOK A LITTLE LONGER','#18483f');
p+=text(48,197,116,'Coastal','#18483f','Georgia','letter-spacing="-6"')+text(48,309,116,'escape.','#18483f','Georgia','font-style="italic" letter-spacing="-6"');
p+=rect(48,370,804,632,'#b8d4d4')+circle(680,498,80,'#ef7444')+rect(48,614,804,388,'#247d8a');
for(let i=0;i<7;i++)p+=line(48,659+i*49,852,659+i*49,'#86bfbe',2);
p+=`<path d="M48 547 L210 593 L343 716 L274 810 L394 1002 H48Z" fill="#e6c79b"/><path d="M48 547 L161 589 L243 709 L180 790 L280 1002 H48Z" fill="#42634f"/>`;
p+=label(48,1050,'A POSTCARD FROM A QUIETER PLACE','#18483f')+posterFooter('05 / TRAVEL','#18483f');
add('coastal-escape','Coastal Escape','Poster','An illustrated travel print combining a restrained coastal palette with expressive serif type.',900,1200,svg(900,1200,'#f5ecdc',p));

// 06 — Type study: a visual metaphor for progress, built entirely from vector type.
p=label(48,62,'SMALL STEPS / FORWARD MOTION','#182618');
p+=text(48,222,135,"LET'S",'#182618','Arial','font-weight="900" letter-spacing="-6"')+text(48,356,135,'KEEP','#182618','Arial','font-weight="900" letter-spacing="-6"')+text(48,490,135,'GOING.', '#182618','Arial','font-weight="900" letter-spacing="-6"');
p+=`<path d="M95 925 L275 745 L450 865 L736 579 M542 579 H736 V773" fill="none" stroke="#182618" stroke-width="54" stroke-linecap="square" stroke-linejoin="miter"/>`;
p+=label(48,1048,'PROGRESS IS A PRACTICE, NOT A DESTINATION.')+posterFooter('06 / TYPOGRAPHY');
add('keep-going',"Let's Keep Going",'Poster','A typography study pairing assertive letterforms with a single directional graphic.',900,1200,svg(900,1200,'#cef266',p));

// 07 — Print: actual typeset menu copy, with no raster-generated microtext.
p=label(74,74,'TABLE / 01')+label(765,74,'MENU STUDY');
p+=text(74,196,98,'Dinner,','#253a30','Georgia')+text(74,294,98,'considered.','#253a30','Georgia','font-style="italic"');
p+=line(74,345,1126,345,'#253a30');
const menu=[['TO BEGIN',[['Tomato & basil','Roasted tomatoes, basil oil, toasted sourdough','28'],['Burrata','Seasonal tomatoes, olive oil, fresh herbs','42']]],['FROM THE KITCHEN',[['Wild mushroom risotto','Arborio rice, parmesan, thyme','64'],['Roasted sea bass','Lemon butter, seasonal greens','88']]],['SOMETHING SWEET',[['Dark chocolate tart','Sea salt, vanilla cream','32'],['Vanilla panna cotta','Seasonal berries, almond crumble','30']]]];
menu.forEach(([heading,rows],i)=>{const y=408+i*177;p+=label(74,y,heading,'#253a30');rows.forEach(([name,detail,price],j)=>{const yy=y+42+j*63;p+=text(74,yy,24,name,'#253a30','Georgia')+text(74,yy+24,13,detail,'#616a60')+text(725,yy,20,price,'#253a30','Arial','text-anchor="end"');});});
p+=line(795,389,795,882,'#c2c6b6')+`<path d="M952 755 V448 M952 672 Q850 624 880 564 Q950 574 952 672 M952 603 Q1056 554 1031 494 Q955 511 952 603 M952 755 Q1044 724 1047 662 Q969 654 952 755" fill="none" stroke="#526c4f" stroke-width="4"/>`;
p+=line(74,924,1126,924,'#253a30')+label(74,960,'EDITORIAL MENU CONCEPT / PRICES IN AED','#253a30');
add('dinner-menu','Table / 01','Print','A restaurant menu study with readable hierarchy, deliberate spacing and a restrained botanical detail.',1200,1000,svg(1200,1000,'#f2efe4',p));

async function photo(file,w,h) { const b=await sharp(path.join(root,file)).resize(w,h,{fit:'cover'}).jpeg({quality:90}).toBuffer();return 'data:image/jpeg;base64,'+b.toString('base64'); }
(async()=>{
  // Existing portfolio photography is reused as a supporting image in these layout studies.
  const coffee=await photo('assets/photography/coffee-1.jpg',560,690);
  p=label(54,62,'FIELD NOTES / ISSUE 01')+text(1146,62,15,'A STUDY OF EVERYDAY RITUALS','#151515','Arial','text-anchor="end"')+line(54,86,1146,86);
  p+=text(54,199,78,'The art of','#151515','Georgia','letter-spacing="-3"')+text(54,286,78,'slowing','#151515','Georgia','font-style="italic" letter-spacing="-3"')+text(54,373,78,'down.','#151515','Georgia','letter-spacing="-3"');
  p+=label(54,435,'COFFEE / CRAFT / EVERYDAY LIFE');
  const lines=['A familiar cup. A little room to breathe.','Sometimes the most ordinary moments','are the ones worth paying attention to.','','This editorial study explores how space,','photography and typography can make','a simple story feel quietly compelling.'];
  lines.forEach((l,i)=>p+=text(54,500+i*28,18,l,'#54534d','Georgia'));
  p+=`<image x="604" y="116" width="542" height="632" href="${coffee}" preserveAspectRatio="xMidYMid slice"/>`+line(54,798,1146,798)+label(54,834,'EDITORIAL LAYOUT STUDY')+text(1146,834,16,'01 — 02','#151515','Arial','text-anchor="end"');
  add('editorial-ritual','The Everyday Ritual','Print','A magazine spread with controlled type hierarchy, generous margins and existing portfolio photography.',1200,880,svg(1200,880,'#f4f1e9',p));
  p=label(48,60,'SLOW COFFEE / SOCIAL CAMPAIGN STUDY')+text(1152,60,14,'THREE FORMATS. ONE VISUAL VOICE.','#151515','Arial','text-anchor="end"');
  p+=rect(48,115,352,520,'#183e35')+text(76,186,15,'SLOW COFFEE','#f7f1df','Arial','letter-spacing="3"')+text(76,285,51,'Make time','#f7f1df','Georgia')+text(76,344,51,'for a good','#f7f1df','Georgia')+text(76,403,51,'cup.','#cddd81','Georgia','font-style="italic"')+line(76,546,370,546,'#f7f1df')+text(76,586,14,'YOUR DAILY MOMENT OF PAUSE','#f7f1df');
  p+=`<image x="424" y="115" width="352" height="520" href="${coffee}" preserveAspectRatio="xMidYMid slice"/>`+rect(424,536,352,99,'#cddd81')+text(448,578,25,'A little slower.','#183e35','Georgia')+text(448,611,25,'A little better.','#183e35','Georgia');
  p+=rect(800,115,352,520,'#cddd81')+text(828,186,15,'SLOW COFFEE','#183e35','Arial','letter-spacing="3"')+circle(976,344,103,'#183e35')+circle(976,344,67,'#cddd81')+circle(976,344,40,'#183e35')+text(828,529,42,'Good things','#183e35','Georgia')+text(828,579,42,'take time.','#183e35','Georgia','font-style="italic"');
  p+=line(48,680,1152,680)+label(48,720,'ART DIRECTION / TYPOGRAPHY / CONTENT SYSTEM');
  add('slow-coffee-social','Slow Coffee','Social','A coordinated three-post campaign study with one type system, palette and photographic direction.',1200,780,svg(1200,780,'#e8e9e2',p));
  for(const item of studies){await sharp(path.join(output,item.id+'.svg')).webp({quality:94,effort:6}).toFile(path.join(output,item.id+'.webp'));}
  fs.writeFileSync(path.join(output,'studies.json'),JSON.stringify(studies,null,2)+'\n');
  console.log(`Built ${studies.length} editable SVG studies and WebP exports.`);
})();
