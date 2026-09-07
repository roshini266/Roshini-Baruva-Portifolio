const DEFAULT=window.PORTFOLIO_DATA;
const KEY="roshini_portfolio_data_v2";
let data=JSON.parse(localStorage.getItem(KEY)||"null")||JSON.parse(JSON.stringify(DEFAULT));
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function save(){localStorage.setItem(KEY,JSON.stringify(data));render();toast("Saved on this device.");}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function imgFallback(el){el.onerror=()=>{el.style.display="none"}}
function render(){
 const p=data.profile;
 $("#hero-summary").textContent=p.heroSummary;$("#about-text").textContent=p.about;$("#location").textContent=p.location;$("#email-mini").textContent=p.email;
 $("#hero-email").href="mailto:"+p.email;$("#contact-email").href="mailto:"+p.email;$("#contact-email").textContent=p.email;$("#linkedin").href=p.linkedin;$("#github").href=p.github;$("#year").textContent=new Date().getFullYear();
 const photo=$("#profile-photo"); photo.style.backgroundImage=p.photo?`url("${p.photo}")`:"linear-gradient(145deg,#5bf5cf,#8e7dff)"; if(!p.photo)photo.textContent="RB"; else {photo.textContent="";photo.style.backgroundColor="#151821"}
 $("#education-list").innerHTML=data.education.map(e=>`<article class="edu-item reveal"><div class="period">${esc(e.period)}</div><h3>${esc(e.degree)}</h3><p>${esc(e.institution)}</p>${e.university?`<p>${esc(e.university)}</p>`:""}<p>${esc(e.score)}</p></article>`).join("");
 $("#skills-grid").innerHTML=Object.entries(data.skills).map(([k,v])=>`<div class="skill-box reveal"><h3>${esc(k)}</h3><div class="chips">${v.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></div>`).join("");
 $("#internship-list").innerHTML=data.internships.map(x=>`<article class="exp-card reveal"><div class="company-row"><div class="logo" style="background-image:url('${esc(x.logo)}')">RB</div><div><h3>${esc(x.role)}</h3><div class="company">${esc(x.company)}</div><div class="period">${esc(x.period)}</div></div></div><ul class="details">${x.details.map(d=>`<li>${esc(d)}</li>`).join("")}</ul><div class="admin-media-actions">${x.proof?`<button class="proof" data-open="${esc(x.proof)}">View certification proof ↗</button>`:""}</div></article>`).join("");
 document.querySelectorAll(".logo").forEach(x=>x.addEventListener("error",()=>x.textContent=""));
 $("#project-list").innerHTML=data.projects.map((x,i)=>`<article class="project-card reveal"><div>${x.image?`<img class="project-image" src="${esc(x.image)}" alt="${esc(x.title)}" onerror="this.classList.add('missing')">`:""}<div class="num">0${i+1}</div><h3>${esc(x.title)}</h3><div class="period">${esc(x.period)}</div><p>${esc(x.description)}</p></div><div class="project-actions">${x.github?`<a class="project-link" href="${esc(x.github)}" target="_blank" rel="noreferrer">GitHub ↗</a>`:""}${x.demo?`<a class="project-link" href="${esc(x.demo)}" target="_blank" rel="noreferrer">Live demo ↗</a>`:""}</div></article>`).join("");
 const r=data.publication;$("#journal").textContent=`${r.journal} • ${r.issue}`;$("#paper-title").textContent=r.title;$("#paper-details").innerHTML=`<div class="paper-bullets">${r.details.map(x=>`• ${esc(x)}<br>`).join("")}</div>`;
 $("#publication-media").innerHTML=r.media?`<img class="research-media" src="${esc(r.media)}" alt="Research publication proof" onerror="this.style.display='none'">`:"";
 $("#paper-link").innerHTML=r.paper?`<div class="paper-actions"><button class="project-link" data-open="${esc(r.paper)}">View research paper ↗</button></div>`:"";
 $("#achievement-list").innerHTML=data.achievements.map((x,i)=>`<div class="achievement reveal"><b>0${i+1}</b><span>${esc(x)}</span></div>`).join("");
 $("#cert-list").innerHTML=data.certifications.map(x=>`<article class="cert-card reveal"><h3>${esc(x.name)}</h3>${x.media?`<div class="cert-media"><img src="${esc(x.media)}" alt="${esc(x.name)} proof" onerror="this.parentElement.style.display='none'"></div><button class="proof" data-open="${esc(x.media)}">View certificate ↗</button>`:""}${!x.media?`<span class="period">Certificate image can be added to assets/certifications/</span>`:""}</article>`).join("");
 $("#language-list").innerHTML=data.languages.map(x=>`<span class="language">${esc(x)}</span>`).join("");
 document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openMedia(b.dataset.open));
 activateReveal();
}
function activateReveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});document.querySelectorAll(".reveal:not(.visible)").forEach(x=>io.observe(x))}
render();

document.addEventListener("mousemove",e=>{const g=$(".cursor-glow");if(g){g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"}});
const menuBtn=$("#menuBtn"),mobileMenu=$("#mobileMenu");
menuBtn.onclick=()=>{const open=!mobileMenu.classList.contains("open");mobileMenu.classList.toggle("open",open);mobileMenu.setAttribute("aria-hidden",String(!open));menuBtn.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open)};
mobileMenu.querySelectorAll("a").forEach(a=>a.onclick=()=>{mobileMenu.classList.remove("open");mobileMenu.setAttribute("aria-hidden","true");menuBtn.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open")});
window.addEventListener("resize",()=>{if(innerWidth>1000){mobileMenu.classList.remove("open");document.body.classList.remove("menu-open")}});

$("#contact-form").addEventListener("submit",e=>{e.preventDefault();const subject=encodeURIComponent($("#sender-subject").value);const body=encodeURIComponent(`Hello Roshini,\n\nName: ${$("#sender-name").value}\nEmail: ${$("#sender-email").value}\n\n${$("#sender-message").value}`);location.href=`mailto:${data.profile.email}?subject=${subject}&body=${body}`});

function openMedia(path){const m=$("#media-modal"),c=$("#modal-content");m.classList.add("open");m.setAttribute("aria-hidden","false");const ext=path.split("?")[0].split(".").pop().toLowerCase();c.innerHTML=["pdf"].includes(ext)?`<iframe src="${esc(path)}" title="Document viewer"></iframe>`:`<img src="${esc(path)}" alt="Portfolio media">`}
$("#modal-close").onclick=()=>{$("#media-modal").classList.remove("open");$("#modal-content").innerHTML=""};
$("#media-modal").addEventListener("click",e=>{if(e.target.id==="media-modal")$("#modal-close").click()});

/* Owner Mode: hidden from public navigation. Mac: Cmd+Shift+E | Windows: Ctrl+Shift+E */
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="e"){e.preventDefault();openAdmin()}});
$("#close-admin").onclick=()=>$("#admin-panel").classList.remove("open");
function openAdmin(){$("#admin-panel").classList.add("open");buildAdmin()}
function field(label,key,value,multi=false){return `<div class="admin-field"><label>${label}</label>${multi?`<textarea data-key="${key}" rows="4">${esc(value)}</textarea>`:`<input data-key="${key}" value="${esc(value)}">`}</div>`}
function buildAdmin(){
 const p=data.profile;
 $("#admin-content").innerHTML=`
 <div class="admin-block">
   <h4>Profile</h4>
   ${field("Name","profile.name",p.name)}
   ${field("Headline","profile.headline",p.headline)}
   ${field("Hero introduction","profile.heroSummary",p.heroSummary,true)}
   ${field("About Me","profile.about",p.about,true)}
   ${field("Email","profile.email",p.email)}
   ${field("Location","profile.location",p.location)}
   ${field("LinkedIn URL","profile.linkedin",p.linkedin)}
   ${field("GitHub URL","profile.github",p.github)}
   ${field("Profile image path","profile.photo",p.photo)}
   <div class="admin-actions"><button class="admin-btn accent" id="profile-save">Save profile</button></div>
 </div>

 <div class="admin-block"><h4>Add new content</h4>
   <div class="admin-actions">
     <button class="admin-btn accent" data-add="education">+ Education</button>
     <button class="admin-btn accent" data-add="internship">+ Internship</button>
     <button class="admin-btn accent" data-add="project">+ Project</button>
     <button class="admin-btn accent" data-add="certification">+ Certification</button>
     <button class="admin-btn accent" data-add="achievement">+ Achievement</button>
   </div>
 </div>

 <div class="admin-block"><h4>Education</h4><div id="admin-education"></div></div>
 <div class="admin-block"><h4>Internships</h4><div id="admin-internships"></div></div>
 <div class="admin-block"><h4>Projects</h4><div id="admin-projects"></div></div>

 <div class="admin-block"><h4>Research publication</h4>
   ${field("Journal","research.journal",data.publication.journal)}
   ${field("Issue / date","research.issue",data.publication.issue)}
   ${field("Paper title","research.title",data.publication.title,true)}
   ${field("Publication proof image path","research.media",data.publication.media)}
   ${field("Research paper PDF path","research.paper",data.publication.paper)}
   <div class="admin-field"><label>Research details (one per line)</label>
   <textarea id="research-details" rows="6">${esc(data.publication.details.join("\n"))}</textarea></div>
   <div class="admin-actions"><button class="admin-btn accent" id="research-save">Save research</button></div>
 </div>

 <div class="admin-block"><h4>Certifications</h4><div id="admin-certifications"></div></div>
 <div class="admin-block"><h4>Achievements</h4><div id="admin-achievements"></div></div>

 <div class="admin-block"><h4>Publish</h4>
   <p class="admin-note">Put media into the matching <b>assets</b> folder, use the relative path in the editor, then export <b>data.js</b> and replace the GitHub copy. Normal visitors never see Owner Mode.</p>
   <div class="admin-actions">
     <button class="admin-btn" id="export-data">Export data.js</button>
     <button class="admin-btn" id="reset-data">Reset local edits</button>
   </div>
 </div>`;

 renderAdminEntries();

 $("#profile-save").onclick=()=>{
   document.querySelectorAll("[data-key^='profile.']").forEach(el=>{
     data.profile[el.dataset.key.split(".")[1]]=el.value;
   });
   save(); buildAdmin();
 };

 $("#research-save").onclick=()=>{
   document.querySelectorAll("[data-key^='research.']").forEach(el=>{
     data.publication[el.dataset.key.split(".")[1]]=el.value;
   });
   data.publication.details=$("#research-details").value.split("\n").map(x=>x.trim()).filter(Boolean);
   save(); buildAdmin();
 };

 document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addEntry(b.dataset.add));
 $("#export-data").onclick=exportData;

 $("#reset-data").onclick=()=>{
   if(confirm("Reset all local edits to the original portfolio data?")){
     localStorage.removeItem(KEY);
     data=JSON.parse(JSON.stringify(DEFAULT));
     render(); buildAdmin(); toast("Reset complete.");
   }
 };
}

function renderAdminEntries(){
 renderAdminGroup("admin-education","education",data.education,
   ["degree","institution","university","period","score"],"Education");

 renderAdminGroup("admin-internships","internships",data.internships,
   ["role","company","period","logo","proof"],"Internship",true);

 renderAdminGroup("admin-projects","projects",data.projects,
   ["title","period","description","image","github","demo"],"Project");

 renderAdminGroup("admin-certifications","certifications",data.certifications,
   ["name","media"],"Certification");

 const a=$("#admin-achievements");
 a.innerHTML=data.achievements.map((x,i)=>`
   <div class="admin-entry">
     <h5>Achievement ${i+1}</h5>
     <textarea data-ach="${i}" rows="3">${esc(x)}</textarea>
     <div class="admin-actions">
       <button class="admin-btn" data-del="achievements" data-i="${i}">Delete</button>
     </div>
   </div>`).join("") || `<p class="admin-note">No achievements yet.</p>`;

 document.querySelectorAll("[data-ach]").forEach(t=>t.onchange=()=>{
   data.achievements[+t.dataset.ach]=t.value; save();
 });
}

function renderAdminGroup(id,type,arr,keys,label,internship=false){
 const box=$("#"+id);
 box.innerHTML=arr.map((x,i)=>`
   <div class="admin-entry">
     <h5>${label} ${i+1}</h5>
     ${keys.map(k=>field(k,k,x[k]||"",k==="description")).join("")}
     ${internship?`
       <div class="admin-field">
         <label>Details (one per line)</label>
         <textarea data-detail-list rows="6">${esc((x.details||[]).join("\n"))}</textarea>
       </div>`:""}
     <div class="admin-actions">
       <button class="admin-btn accent" data-save-entry data-type="${type}" data-i="${i}">Save</button>
       <button class="admin-btn" data-del="${type}" data-i="${i}">Delete</button>
     </div>
   </div>`).join("") || `<p class="admin-note">No ${label.toLowerCase()} entries yet.</p>`;

 box.querySelectorAll("[data-save-entry]").forEach(b=>b.onclick=()=>{
   const i=+b.dataset.i, c=b.closest(".admin-entry");
   c.querySelectorAll("[data-key]").forEach(el=>arr[i][el.dataset.key]=el.value);
   if(internship){
     const d=c.querySelector("[data-detail-list]");
     arr[i].details=d?d.value.split("\n").map(x=>x.trim()).filter(Boolean):arr[i].details;
   }
   save(); buildAdmin();
 });

 box.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{
   arr.splice(+b.dataset.i,1); save(); buildAdmin();
 });
}

function saveEntry(type,i){
 const b=document.querySelector(`[data-save-entry][data-type="${type}"][data-i="${i}"]`);
 if(!b)return;
 const c=b.closest(".admin-entry");
 c.querySelectorAll("[data-key]").forEach(el=>data[type][i][el.dataset.key]=el.value);
 const detail=c.querySelector("[data-detail-list]");
 if(type==="internships" && detail){
   data[type][i].details=detail.value.split("\n").map(x=>x.trim()).filter(Boolean);
 }
 save(); buildAdmin();
}

function addEntry(type){
 const t={
  education:{
    degree:"New qualification",institution:"Institution",university:"",
    period:"Year – Year",score:""
  },
  internship:{
    role:"New role",company:"Company",period:"Month Year – Month Year",
    logo:"assets/internships/company-logo.png",
    proof:"assets/internships/internship-certificate.pdf",
    details:["Add your first internship detail here."]
  },
  project:{
    title:"New project",period:"",description:"Describe the project in detail.",
    image:"assets/projects/project-image.png",github:"",demo:""
  },
  certification:{
    name:"New certification",
    media:"assets/certifications/certificate.pdf"
  }
 };
 if(type==="achievement") data.achievements.push("New achievement");
 else if(t[type]){
   const target=type==="internship"?"internships":type==="certification"?"certifications":type;
   data[target].push(t[type]);
 }
 save(); buildAdmin();
}

function exportData(){const text="window.PORTFOLIO_DATA = "+JSON.stringify(data,null,2)+";\n";const blob=new Blob([text],{type:"text/javascript"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="data.js";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast("data.js exported. Replace GitHub's data.js.")}
