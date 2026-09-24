/* Optimise only assets referenced by the live site. Originals are preserved. */
const fs=require('fs');
const path=require('path');
const sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'assets/optimized');
fs.mkdirSync(out,{recursive:true});
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(['.git','node_modules','_source','assets','scripts','.cache'].includes(e.name)?[]:walk(path.join(dir,e.name))):[path.join(dir,e.name)]);}
const files=walk(root).filter(p=>/\.(html|css|js)$/.test(p));
const texts=new Map(files.map(p=>[p,fs.readFileSync(p,'utf8')]));
const manifestPath=path.join(out,'manifest.json');
const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')).images:{};
const wanted=new Set();
for(const s of texts.values())for(const m of s.matchAll(/\/assets\/[^"'<>?\r\n)]+?\.(?:png|jpe?g|webp)/gi)){
  if(!m[0].includes('/optimized/')&&!m[0].includes('/favicon.'))wanted.add(m[0]);
}
// Keep the mapping stable on repeat runs, when HTML already references optimised assets.
for(const [source,entry] of Object.entries(previous))if([...texts.values()].some(s=>s.includes(entry.src)||s.includes(entry.full)))wanted.add(source);
(async()=>{
  const images={};let before=0,after=0;
  for(const source of [...wanted].sort()){
    const input=path.join(root,decodeURIComponent(source.slice(1)));
    if(!fs.existsSync(input))throw Error('Missing source image: '+source);
    const stat=fs.statSync(input),meta=await sharp(input).metadata();
    if(!meta.width||!meta.height)continue;
    const tiny=/\/tools\/|\/Clients\/|logo-black|logo-white/i.test(source);
    const max=tiny?256:1920;
    const widths=[...new Set([...(tiny?[]:[480,960]),Math.min(max,meta.width)].filter(w=>w<=meta.width&&w<=max))].sort((a,b)=>a-b);
    const parsed=path.parse(source.replace('/assets/',''));
    const dest=path.join(out,parsed.dir);fs.mkdirSync(dest,{recursive:true});
    let variants=[];
    for(const width of widths){
      const filename=parsed.name+'-'+parsed.ext.slice(1)+'-'+width+'.webp';
      const file=path.join(dest,filename);
      if(!fs.existsSync(file)||fs.statSync(file).mtimeMs<stat.mtimeMs){
        await sharp(input).rotate().resize({width,withoutEnlargement:true}).webp({quality:source.includes('/design-studies/')?92:84,alphaQuality:100,effort:6}).toFile(file);
      }
      const info=await sharp(file).metadata();
      variants.push({src:'/'+path.relative(root,file).replace(/\\/g,'/'),width:info.width,height:info.height,bytes:fs.statSync(file).size});
    }
    const full=variants.at(-1),preview=variants.find(v=>v.width>=Math.min(960,meta.width))||full;
    images[source]={src:preview.src,full:full.src,width:preview.width,height:preview.height,variants,originalBytes:stat.size,previewBytes:preview.bytes};
    before+=stat.size;after+=preview.bytes;
  }
  const reverse={};for(const [source,v] of Object.entries(previous))for(const img of v.variants)reverse[img.src]=source;
  const lookup=url=>images[url.split('?')[0]]||images[reverse[url.split('?')[0]]];
  for(const [file,original] of texts){
    let s=original;
    if(file.endsWith('.html')){
      s=s.replace(/<img\b[^>]*>/g,tag=>{
        const match=tag.match(/\bsrc="([^"]+)"/);if(!match)return tag;
        const data=lookup(match[1]);if(!data)return tag;
        let t=tag.replace(/\s(?:srcset|sizes|width|height|data-full)="[^"]*"/g,'').replace(/\bsrc="[^"]*"/,'src="'+data.src+'"');
        const large=data.variants.length>1;
        const sizes=tag.includes('expertise-visual')?'(max-width: 760px) calc(100vw - 48px), 560px':tag.includes('portrait')?'420px':'(max-width: 760px) calc(100vw - 48px), (max-width: 1024px) 46vw, 560px';
        const attrs=' width="'+data.width+'" height="'+data.height+'"'+(large?' srcset="'+data.variants.map(v=>v.src+' '+v.width+'w').join(', ')+'" sizes="'+sizes+'"':'')+(tag.includes('shot')?' data-full="'+data.full+'"':'');
        return t.replace(/\s*\/?>(?=$)/,attrs+' />');
      });
      s=s.replace(/poster="([^"]+)"/g,(all,url)=>lookup(url)?'poster="'+lookup(url).src+'"':all);
    }
    // Shared JS logos and CSS backgrounds use the final WebP size.
    if(!file.endsWith('.html'))for(const [source,data] of Object.entries(images)){
      s=s.split(source).join(data.full);
    }
    // Explicit image anchors (if present) must open the full-resolution variant.
    if(file.endsWith('.html'))s=s.replace(/href="(\/assets\/[^"?]+\.(?:png|jpe?g|webp))(?:\?[^" ]*)?"/g,(all,url)=>lookup(url)?'href="'+lookup(url).full+'"':all);
    if(s!==original)fs.writeFileSync(file,s);
  }
  fs.writeFileSync(manifestPath,JSON.stringify({imageCount:Object.keys(images).length,originalBytes:before,previewBytes:after,savingsPercent:Math.round((1-after/before)*100),images},null,2)+'\n');
  console.log(JSON.stringify({images:Object.keys(images).length,originalMB:(before/1048576).toFixed(2),previewMB:(after/1048576).toFixed(2),savingsPercent:Math.round((1-after/before)*100)}));
})();
