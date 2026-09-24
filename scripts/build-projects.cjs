/* Add recent graphic projects in content/graphic-projects.json, then rebuild. */
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const data=JSON.parse(fs.readFileSync(path.join(root,'content/graphic-projects.json'),'utf8'));
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const projects=data.projects.filter(p=>p.status==='published');
const cards=projects.map(p=>{
  for(const key of ['title','category','description','image','alt','url'])if(typeof p[key]!=='string'||!p[key].trim())throw Error('Missing '+key+' in project '+p.title);
  if(!/^\/(?!\/)/.test(p.image)||!fs.existsSync(path.join(root,p.image)))throw Error('Missing local project image: '+p.image);
  if(!/^(https:\/\/|\/(?!\/))/.test(p.url))throw Error('Invalid project URL: '+p.url);
  return `<article class="card cat-card project-card"><img class="shot shot--4x3 shot--top" src="${e(p.image)}" alt="${e(p.alt)}" loading="lazy" decoding="async" /><div class="card__body"><span class="card__cat">${e(p.category)}</span><h3>${e(p.title)}</h3><p class="card__desc">${e(p.description)}</p>${p.role?`<p class="project-role">${e(p.role)}</p>`:''}<span class="arrow" data-arrow>View project </span></div><a class="stretched" href="${e(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="View ${e(p.title)} (opens in a new tab)"></a></article>`;
});
const file=path.join(root,'portfolio/graphic-design/index.html');
const original=fs.readFileSync(file,'utf8');
if(!original.includes('<!-- projects:start -->')||!original.includes('<!-- projects:end -->'))throw Error('Project markers missing');
const html=original.replace(/<!-- projects:start -->[\s\S]*?<!-- projects:end -->/,'<!-- projects:start -->\n<div class="grid grid--3" data-clamp="6">\n'+cards.join('\n')+'\n</div>\n<!-- projects:end -->');
fs.writeFileSync(file,html);
console.log('Published '+cards.length+' graphic projects. Run npm run images after adding or changing images.');
