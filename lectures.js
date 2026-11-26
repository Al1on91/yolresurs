/* Yo‘lResurs.uz — «Ma’ruzalar» bo‘limi.
   Foydalanuvchi mavzu so‘raydi (Supabase records, col="lecreq"); ma’ruzalar data/lectures.json va
   data/lectures/<id>.json da saqlanadi (faqat amaldagi hujjatlar asosida tayyorlanadi).
   Word (.docx) — vendor/docx.min.js orqali brauzerda; PDF — chop etish oynasi orqali. */
(function(){
"use strict";
const L={
uz:{nav_lec:"Ma’ruzalar",lec_h:"Ma’ruza matnlari",lec_p:"Mavzuni yozing — ma’ruza faqat amaldagi me’yoriy hujjatlar asosida, har bir raqam manbasi (hujjat va band) bilan tayyorlanadi. Tayyor ma’ruzani muqovasi bilan Word yoki PDF qilib yuklab olasiz.",
 lec_req_h:"Ma’ruza buyurtma qilish",lec_topic:"Ma’ruza mavzusi",lec_topic_ph:"Masalan: Avtomobil yo‘llarida kesishma va tutashmalarni loyihalash",lec_pages:"Hajmi",lec_pg:"varaq",
 lec_intl:"Platformadagi xorijiy manbalardan ham foydalanish",lec_intl_h:"Ixtiyoriy: xorijiy tajriba alohida bo‘limda, aniq manbalar bilan qo‘shiladi.",lec_send:"Mavzuni yuborish",
 lec_need:"Mavzuni yozing (kamida 10 ta belgi).",lec_sent:"Mavzu qabul qilindi. Ma’ruza odatda 1–2 kun ichida tayyor bo‘ladi va «Mening so‘rovlarim»da ko‘rinadi.",lec_fail:"Hozircha yuborib bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.",lec_limit:"Bugun 3 ta mavzu yubordingiz. Ertaga yana yuborishingiz mumkin.",lec_dup:"Bu mavzu allaqachon yuborilgan.",
 lec_have:"Shunga o‘xshash tayyor ma’ruza bor:",lec_mine_h:"Mening so‘rovlarim",lec_mine_0:"Hali mavzu yubormagansiz.",lec_wait:"Navbatda",lec_ready:"Tayyor",
 lec_list_h:"Tayyor ma’ruzalar",lec_search:"Ma’ruzalardan qidirish",lec_none:"Hali ma’ruzalar yo‘q.",lec_nf:"Hech narsa topilmadi.",lec_open:"Ochish",
 lec_how_h:"Qanday ishlaydi",lec_how1:"Mavzuni yozasiz, hajmini (10, 15 yoki 20 varaq) tanlaysiz.",lec_how2:"Ma’ruza faqat amaldagi ShNQ, QR, O‘zDSt va qonunlar asosida yoziladi; muddati o‘tgan hujjatlardan foydalanilmaydi.",lec_how3:"Tayyor bo‘lgach, muqovani to‘ldirib Word yoki PDF yuklab olasiz.",
 lec_basis:"Faqat amaldagi hujjatlar asosida",lec_checked:"Holati tekshirildi",lec_vol:"Hajmi",lec_est:"taxminan {n} varaq (A4, Times New Roman 14, 1,5 interval)",lec_show_intl:"Xorijiy tajriba bo‘limini qo‘shish",
 lec_cover_h:"Muqova",lec_c_uni:"OTM nomi",lec_c_fac:"Fakultet",lec_c_dep:"Kafedra",lec_c_sub:"Fan",lec_c_auth:"Tayyorlovchi (F.I.Sh.)",lec_c_city:"Shahar",lec_c_year:"Yil",lec_c_kind:"Hujjat turi",lec_kind_def:"MA’RUZA MATNI",
 lec_dl_h:"Yuklab olish",lec_word:"Word (.docx)",lec_pdf:"PDF",lec_pdf_h:"Chop etish oynasi ochiladi — «PDF sifatida saqlash»ni tanlang.",lec_wait_dl:"Fayl tayyorlanmoqda…",lec_dl_fail:"Faylni yasab bo‘lmadi.",
 lec_plan:"Reja",lec_q:"Nazorat savollari",lec_src:"Foydalanilgan me’yoriy hujjatlar",lec_isrc:"Xorijiy manbalar",lec_terms:"Asosiy atamalar",lec_kw:"Kalit so‘zlar",lec_status_a:"amalda",lec_status_m:"o‘zgartirishlar bilan amalda",
 lec_disc:"Ushbu ma’ruza matni Yo‘lResurs.uz platformasida amaldagi me’yoriy hujjatlar asosida tayyorlangan. Foydalanishdan oldin fan o‘qituvchisi yoki mutaxassis tomonidan tekshirilishi lozim.",
 lec_back:"Barcha ma’ruzalar",lec_nolec:"Ma’ruza topilmadi.",lec_load:"Yuklanmoqda…",lec_fig:"rasm",lec_tbl:"jadval",lec_intl_badge:"xorijiy tajriba bilan",lec_upd:"Tayyorlangan sana"},
ru:{nav_lec:"Лекции",lec_h:"Тексты лекций",lec_p:"Напишите тему — лекция готовится только на основе действующих нормативных документов, с источником (документ и пункт) для каждой цифры. Готовую лекцию с титульным листом можно скачать в Word или PDF.",
 lec_req_h:"Заказать лекцию",lec_topic:"Тема лекции",lec_topic_ph:"Например: Проектирование пересечений и примыканий автомобильных дорог",lec_pages:"Объём",lec_pg:"стр.",
 lec_intl:"Использовать также зарубежные источники платформы",lec_intl_h:"По желанию: зарубежный опыт отдельным разделом, с точными источниками.",lec_send:"Отправить тему",
 lec_need:"Напишите тему (не менее 10 символов).",lec_sent:"Тема принята. Обычно лекция готова через 1–2 дня и появится в разделе «Мои запросы».",lec_fail:"Не удалось отправить. Попробуйте позже.",lec_limit:"Сегодня вы уже отправили 3 темы. Попробуйте завтра.",lec_dup:"Эта тема уже отправлена.",
 lec_have:"Есть похожая готовая лекция:",lec_mine_h:"Мои запросы",lec_mine_0:"Вы ещё не отправляли тем.",lec_wait:"В очереди",lec_ready:"Готово",
 lec_list_h:"Готовые лекции",lec_search:"Поиск по лекциям",lec_none:"Лекций пока нет.",lec_nf:"Ничего не найдено.",lec_open:"Открыть",
 lec_how_h:"Как это работает",lec_how1:"Вы пишете тему и выбираете объём (10, 15 или 20 страниц).",lec_how2:"Лекция пишется только по действующим ШНК, ҚР, O‘zDSt и законам; утратившие силу документы не используются.",lec_how3:"Когда лекция готова, заполните титульный лист и скачайте Word или PDF.",
 lec_basis:"Только по действующим документам",lec_checked:"Статус проверен",lec_vol:"Объём",lec_est:"примерно {n} стр. (A4, Times New Roman 14, интервал 1,5)",lec_show_intl:"Добавить раздел о зарубежном опыте",
 lec_cover_h:"Титульный лист",lec_c_uni:"Вуз",lec_c_fac:"Факультет",lec_c_dep:"Кафедра",lec_c_sub:"Дисциплина",lec_c_auth:"Составитель (Ф.И.О.)",lec_c_city:"Город",lec_c_year:"Год",lec_c_kind:"Вид документа",lec_kind_def:"ТЕКСТ ЛЕКЦИИ",
 lec_dl_h:"Скачать",lec_word:"Word (.docx)",lec_pdf:"PDF",lec_pdf_h:"Откроется окно печати — выберите «Сохранить как PDF».",lec_wait_dl:"Файл готовится…",lec_dl_fail:"Не удалось создать файл.",
 lec_plan:"План",lec_q:"Контрольные вопросы",lec_src:"Использованные нормативные документы",lec_isrc:"Зарубежные источники",lec_terms:"Основные термины",lec_kw:"Ключевые слова",lec_status_a:"действует",lec_status_m:"действует с изменениями",
 lec_disc:"Текст лекции подготовлен на платформе Yo‘lResurs.uz на основе действующих нормативных документов. Перед использованием его должен проверить преподаватель или специалист.",
 lec_back:"Все лекции",lec_nolec:"Лекция не найдена.",lec_load:"Загрузка…",lec_fig:"рис.",lec_tbl:"табл.",lec_intl_badge:"с зарубежным опытом",lec_upd:"Дата подготовки"},
en:{nav_lec:"Lectures",lec_h:"Lecture notes",lec_p:"Enter a topic — the lecture is prepared only from normative documents in force, citing the document and clause for every figure. Download it with a cover page as Word or PDF.",
 lec_req_h:"Request a lecture",lec_topic:"Lecture topic",lec_topic_ph:"For example: Design of road intersections and junctions",lec_pages:"Length",lec_pg:"pages",
 lec_intl:"Also use the platform’s foreign sources",lec_intl_h:"Optional: foreign practice as a separate section, with exact sources.",lec_send:"Send topic",
 lec_need:"Enter a topic (at least 10 characters).",lec_sent:"Topic received. The lecture is usually ready within 1–2 days and appears under “My requests”.",lec_fail:"Could not send. Please try again later.",lec_limit:"You have sent 3 topics today. Try again tomorrow.",lec_dup:"This topic has already been sent.",
 lec_have:"A similar lecture is already available:",lec_mine_h:"My requests",lec_mine_0:"No topics sent yet.",lec_wait:"Queued",lec_ready:"Ready",
 lec_list_h:"Available lectures",lec_search:"Search lectures",lec_none:"No lectures yet.",lec_nf:"Nothing found.",lec_open:"Open",
 lec_how_h:"How it works",lec_how1:"Enter a topic and choose the length (10, 15 or 20 pages).",lec_how2:"Only ShNQ, QR, O‘zDSt and laws currently in force are used; repealed documents are not.",lec_how3:"When ready, fill in the cover page and download Word or PDF.",
 lec_basis:"Based only on documents in force",lec_checked:"Status checked",lec_vol:"Length",lec_est:"about {n} pages (A4, Times New Roman 14, 1.5 spacing)",lec_show_intl:"Include foreign practice section",
 lec_cover_h:"Cover page",lec_c_uni:"University",lec_c_fac:"Faculty",lec_c_dep:"Department",lec_c_sub:"Course",lec_c_auth:"Prepared by",lec_c_city:"City",lec_c_year:"Year",lec_c_kind:"Document type",lec_kind_def:"LECTURE NOTES",
 lec_dl_h:"Download",lec_word:"Word (.docx)",lec_pdf:"PDF",lec_pdf_h:"A print dialog opens — choose “Save as PDF”.",lec_wait_dl:"Preparing file…",lec_dl_fail:"Could not create the file.",
 lec_plan:"Outline",lec_q:"Review questions",lec_src:"Normative documents used",lec_isrc:"Foreign sources",lec_terms:"Key terms",lec_kw:"Keywords",lec_status_a:"in force",lec_status_m:"in force with amendments",
 lec_disc:"These lecture notes were prepared on the Yo‘lResurs.uz platform from normative documents in force. They should be checked by the course teacher or a specialist before use.",
 lec_back:"All lectures",lec_nolec:"Lecture not found.",lec_load:"Loading…",lec_fig:"Fig.",lec_tbl:"Table",lec_intl_badge:"with foreign practice",lec_upd:"Prepared on"}
};
for(const k of Object.keys(L))Object.assign(T[k]||(T[k]={}),L[k]);

/* ---------- styles ---------- */
const css=`
.lec-req textarea{min-height:76px}
#v-lectures .doc-layout>*{min-width:0}
@media (min-width:1141px) and (max-width:1300px){nav.main a{padding:9px 5px;font-size:13.5px}nav.main a.adm-entry{padding:8px 12px!important;margin-left:4px}}
@media (max-width:640px){.lec-card{grid-template-columns:40px 1fr}.lec-card>.btn{display:none}.lec-ic{width:40px;height:40px}}
.lec-row{display:flex;flex-wrap:wrap;gap:16px;align-items:center;margin-top:14px}
.lec-seg{display:inline-flex;border:1px solid var(--line);border-radius:8px;overflow:hidden}
.lec-seg label{cursor:pointer}.lec-seg input{position:absolute;opacity:0;pointer-events:none}
.lec-seg span{display:block;padding:8px 14px;font-weight:700;font-size:14.5px;border-left:1px solid var(--line);background:var(--surface)}
.lec-seg label:first-child span{border-left:0}
.lec-seg input:checked+span{background:var(--brand-2);color:#fff}
.lec-seg input:focus-visible+span{outline:2px solid var(--brand-2);outline-offset:-3px}
.lec-chk{display:flex;gap:10px;align-items:flex-start;margin-top:14px;cursor:pointer}
.lec-chk input{margin-top:4px;width:18px;height:18px;flex:none}
.lec-chk small{display:block;color:var(--muted);font-size:13px}
.lec-card{display:grid;grid-template-columns:44px 1fr auto;gap:14px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:10px;text-decoration:none;color:inherit;transition:border-color .15s,transform .15s}
.lec-card:hover{border-color:var(--brand-2);transform:translateY(-1px)}
.lec-ic{width:44px;height:44px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,#0d5aa7,#0e8a5c);color:#fff;font-size:22px}
.lec-card h3{margin:0 0 4px;font-size:16.5px;line-height:1.3}
.lec-card .meta{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:13px;color:var(--muted)}
.lec-mine{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.lec-mine li{font-size:14px;line-height:1.35}
.lec-st{display:inline-block;font-size:12px;font-weight:700;padding:1px 8px;border-radius:999px;margin-right:6px}
.lec-st.w{background:var(--warn-bg);color:var(--warn)}.lec-st.r{background:var(--ok-bg);color:var(--ok)}
.lec-paper{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:34px 40px;font-family:var(--display);font-size:17px;line-height:1.65}
@media (max-width:700px){.lec-paper{padding:22px 18px;font-size:16px}}
.lec-paper h1{font-size:26px;line-height:1.25;margin:0 0 10px}
.lec-paper h2{font-size:21px;margin:30px 0 10px;line-height:1.3}
.lec-paper h3{font-size:18px;margin:22px 0 8px}
.lec-paper p{margin:0 0 12px;text-align:justify;hyphens:auto}
.lec-paper ul,.lec-paper ol{margin:0 0 12px;padding-left:24px}
.lec-paper .cit{font-family:var(--body);font-size:.78em;color:var(--link);white-space:nowrap;font-weight:600}
.lec-paper table{border-collapse:collapse;width:100%;margin:6px 0 4px;font-family:var(--body);font-size:14.5px;line-height:1.4}
.lec-paper th,.lec-paper td{border:1px solid var(--line);padding:6px 8px;text-align:left;vertical-align:top}
.lec-paper th{background:var(--surface2)}
.lec-paper .cap{font-family:var(--body);font-size:13.5px;color:var(--muted);margin:0 0 16px}
.lec-paper .tcap{font-family:var(--body);font-size:14px;font-weight:700;margin:16px 0 4px}
.lec-paper figure{margin:16px 0}.lec-paper figure svg{max-width:100%;height:auto;display:block;margin:0 auto;background:#fff;border-radius:8px}
.lec-paper .plan{background:var(--surface2);border-radius:10px;padding:14px 18px 14px 38px;margin:14px 0 18px;font-family:var(--body);font-size:15px}
.lec-paper .intl{border-left:4px solid var(--accent);padding-left:16px}
.lec-paper .note-b{font-family:var(--body);font-size:14px;background:var(--warn-bg);color:var(--ink);border-radius:8px;padding:10px 14px;margin:14px 0}
.lec-paper .srcl li{font-family:var(--body);font-size:14.5px;margin-bottom:6px}
.lec-badges{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 4px;font-family:var(--body)}
.lec-badges span{font-size:12.5px;font-weight:700;padding:3px 10px;border-radius:999px;background:var(--surface2)}
.lec-badges .ok{background:var(--ok-bg);color:var(--ok)}
.lec-side .field{margin-bottom:10px}.lec-side input[type=text]{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:7px;background:var(--surface);color:var(--ink);font-size:14.5px}
.lec-dl{display:grid;grid-template-columns:1fr 1fr;gap:8px}.lec-dl .btn{justify-content:center;margin:0}
.lec-cover-prev{border:1px solid var(--line);border-radius:8px;background:#fff;color:#111;font-family:"Times New Roman",serif;aspect-ratio:210/297;padding:8% 9%;display:flex;flex-direction:column;justify-content:space-between;text-align:center;font-size:9px;line-height:1.35;margin-bottom:12px}
.lec-cover-prev b{font-size:12px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- DOM: nav + view ---------- */
const nav=document.querySelector("nav.main");
if(nav&&!nav.querySelector('[data-nav="lectures"]')){const a=document.createElement("a");a.href="#lectures";a.dataset.nav="lectures";a.dataset.i="nav_lec";const ref=nav.querySelector('[data-nav="qa"]');nav.insertBefore(a,ref)}
const main=document.querySelector("main.wrap");
const view=document.createElement("section");view.className="view";view.id="v-lectures";main.appendChild(view);

/* ---------- data ---------- */
let IDX=null, idxP=null; const CACHE={};
const ver=()=>Math.floor(Date.now()/300000);
function loadIdx(){if(!idxP)idxP=fetch("data/lectures.json?v="+ver()).then(r=>r.ok?r.json():{items:[]}).then(j=>{IDX=Array.isArray(j.items)?j.items:[];return IDX}).catch(()=>{IDX=[];return IDX});return idxP}
function loadLec(id){if(!/^[a-z0-9-]{3,80}$/.test(id))return Promise.resolve(null);if(!CACHE[id])CACHE[id]=fetch("data/lectures/"+id+".json?v="+ver()).then(r=>r.ok?r.json():null).catch(()=>null);return CACHE[id]}
const S={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const nrm=s=>String(s||"").toLowerCase().replace(/[ʻʼ‘’`']/g,"").replace(/[^\p{L}\p{N}]+/gu," ").trim();
const words=s=>nrm(s).split(" ").filter(w=>w.length>3);
function sim(a,b){const A=new Set(words(a).map(w=>w.slice(0,6))),B=new Set(words(b).map(w=>w.slice(0,6)));if(!A.size||!B.size)return 0;let n=0;A.forEach(w=>{if(B.has(w))n++});return n/Math.min(A.size,B.size)}

/* ---------- inline text: **bold** and [[key|band]] citations ---------- */
function srcLabel(lec,key){const s=(lec.src&&lec.src[key])||(lec.isrc&&lec.isrc[key]);return s?(s.s||s.t||key):key}
function inl(lec,x){
  return esc(x).replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/\[\[([a-zA-Z0-9_-]+)\|([^\]]*)\]\]/g,(m,k,b)=>`<span class="cit">(${esc(srcLabel(lec,k))}${b?", "+b:""})</span>`);
}
function plain(lec,x){return String(x||"").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\[\[([a-zA-Z0-9_-]+)\|([^\]]*)\]\]/g,(m,k,b)=>`(${srcLabel(lec,k)}${b?", "+b:""})`)}
function runs(lec,x){/* -> [{t,b}] for docx */const out=[];const re=/\*\*([^*]+)\*\*|\[\[([a-zA-Z0-9_-]+)\|([^\]]*)\]\]/g;let i=0,m;const s=String(x||"");
  while((m=re.exec(s))){if(m.index>i)out.push({t:s.slice(i,m.index)});if(m[1]!=null)out.push({t:m[1],b:1});else out.push({t:`(${srcLabel(lec,m[2])}${m[3]?", "+m[3]:""})`,c:1});i=re.lastIndex}
  if(i<s.length)out.push({t:s.slice(i)});return out}

/* SVG sanitiser */
function cleanSvg(src){
  try{const d=new DOMParser().parseFromString(String(src||""),"image/svg+xml");const r=d.documentElement;if(!r||r.nodeName.toLowerCase()!=="svg"||d.querySelector("parsererror"))return "";
    r.querySelectorAll("script,foreignObject,iframe,image,use,a").forEach(n=>n.remove());
    const walk=n=>{[...n.attributes].forEach(a=>{const nm=a.name.toLowerCase();if(nm.startsWith("on")||/href/.test(nm)||/javascript:|url\(\s*["']?http/i.test(a.value))n.removeAttribute(a.name)});[...n.children].forEach(walk)};walk(r);
    if(!r.getAttribute("xmlns"))r.setAttribute("xmlns","http://www.w3.org/2000/svg");
    return new XMLSerializer().serializeToString(r)}catch(e){return ""}
}

/* blocks selected for a given size */
function pick(lec,pages,intl){const lim=pages>=20?3:pages>=15?2:1;let n=0;return (lec.blocks||[]).filter(b=>(b.k||1)<=lim&&(!b.i||intl)).map(b=>b.t==="h2"&&!b.nn?Object.assign({},b,{x:(++n)+". "+b.x}):b)}
function wordCount(lec,bl){let n=0;const add=s=>{n+=String(s||"").split(/\s+/).filter(Boolean).length};
  bl.forEach(b=>{if(typeof b.x==="string")add(b.x);else if(Array.isArray(b.x))b.x.forEach(add);if(b.rows)b.rows.forEach(r=>r.forEach(add));if(b.t==="fig")n+=120;if(b.t==="tbl")n+=40});
  return n}
const estPages=(lec,bl)=>Math.max(1,Math.round(wordCount(lec,bl)/320))+2+Math.ceil(((lec.questions||[]).length+Object.keys(lec.src||{}).length)/14);
function plan(bl){return bl.filter(b=>b.t==="h2").map(b=>b.x)}

/* ---------- list view ---------- */
let lecQ="";
function mineList(){return S.get("yr_lecreq",[])}
function renderList(){
  const mine=mineList();
  view.innerHTML=`<div class="page-h"><div class="crumbs"><a href="#home">${esc(t("nav_home"))}</a> / <span>${esc(t("nav_lec"))}</span></div><h1>${esc(t("lec_h"))}</h1><p>${esc(t("lec_p"))}</p></div>
  <div class="doc-layout"><div>
    <form class="panel lec-req" id="lecForm" novalidate>
      <label class="qa-lab" for="lecTopic">${esc(t("lec_topic"))}</label>
      <textarea id="lecTopic" class="qa-in" maxlength="300" placeholder="${esc(t("lec_topic_ph"))}"></textarea>
      <div class="lec-row"><b style="font-size:14px">${esc(t("lec_pages"))}:</b>
        <div class="lec-seg" role="radiogroup" aria-label="${esc(t("lec_pages"))}">${[10,15,20].map(p=>`<label><input type="radio" name="lecPg" value="${p}"${p===15?" checked":""}><span>${p} ${esc(t("lec_pg"))}</span></label>`).join("")}</div></div>
      <label class="lec-chk"><input type="checkbox" id="lecIntl"><span><b>${esc(t("lec_intl"))}</b><small>${esc(t("lec_intl_h"))}</small></span></label>
      <div class="qa-btns" style="margin-top:16px"><button class="btn" type="submit">${esc(t("lec_send"))}</button><span class="note" id="lecMsg" role="status"></span></div>
      <div id="lecSim"></div>
    </form>
    <div class="sec-h" style="margin-top:32px"><h2>${esc(t("lec_list_h"))}</h2></div>
    <div class="searchrow" style="margin:0 0 14px"><label for="lecQ" class="sr">${esc(t("lec_search"))}</label><input id="lecQ" type="search" autocomplete="off" placeholder="${esc(t("lec_search"))}" value="${esc(lecQ)}"></div>
    <div id="lecList"><div class="empty">${esc(t("lec_load"))}</div></div>
  </div>
  <aside class="side">
    <div class="box"><h3>${esc(t("lec_how_h"))}</h3><ol style="margin:0;padding-left:20px;color:var(--muted);display:flex;flex-direction:column;gap:8px"><li>${esc(t("lec_how1"))}</li><li>${esc(t("lec_how2"))}</li><li>${esc(t("lec_how3"))}</li></ol></div>
    <div class="box"><h3>${esc(t("lec_mine_h"))}</h3><div id="lecMine"></div></div>
  </aside></div>`;
  loadIdx().then(()=>{paintList();paintMine()});
  paintMine();
  $("lecQ").addEventListener("input",e=>{lecQ=e.target.value;paintList()});
  let st;$("lecTopic").addEventListener("input",e=>{clearTimeout(st);st=setTimeout(()=>paintSim(e.target.value),250)});
  $("lecForm").addEventListener("submit",onSubmit);
}
function paintSim(v){const box=$("lecSim");if(!box)return;if(!IDX||nrm(v).length<10){box.innerHTML="";return}
  const hits=IDX.map(x=>({x,s:sim(v,x.title+" "+(x.topics||[]).join(" "))})).filter(h=>h.s>=.6).sort((a,b)=>b.s-a.s).slice(0,3);
  box.innerHTML=hits.length?`<div class="note" style="margin-top:12px">${esc(t("lec_have"))} ${hits.map(h=>`<a href="#lec-${esc(h.x.id)}">«${esc(h.x.title)}»</a>`).join(", ")}</div>`:""}
function card(x){const pg=x.pages||{};return `<a class="lec-card" href="#lec-${esc(x.id)}"><span class="lec-ic" aria-hidden="true">📘</span><span><h3>${esc(x.title)}</h3><span class="meta">${x.subject?`<span>${esc(x.subject)}</span>`:""}<span>${esc(fmtD(x.date))}</span><span>10 / 15 / 20 ${esc(t("lec_pg"))}</span>${x.intl?`<span>🌐 ${esc(t("lec_intl_badge"))}</span>`:""}</span></span><span class="btn sec sm">${esc(t("lec_open"))} →</span></a>`}
function fmtD(d){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||"");return m?`${m[3]}.${m[2]}.${m[1]}`:(d||"")}
function paintList(){const box=$("lecList");if(!box||!IDX)return;
  let items=[...IDX].sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  if(nrm(lecQ)){const q=nrm(lecQ);items=items.filter(x=>nrm(x.title+" "+(x.subject||"")+" "+(x.topics||[]).join(" ")+" "+(x.kw||[]).join(" ")).includes(q)||sim(lecQ,x.title)>=.5)}
  box.innerHTML=items.length?items.map(card).join(""):`<div class="empty">${esc(t(IDX.length?"lec_nf":"lec_none"))}</div>`}
function reqLecture(r){return (IDX||[]).find(x=>(x.reqIds||[]).includes(r.id))}
function paintMine(){const box=$("lecMine");if(!box)return;const mine=mineList();
  box.innerHTML=mine.length?`<ul class="lec-mine">${[...mine].reverse().map(r=>{const x=reqLecture(r);return `<li>${x?`<span class="lec-st r">${esc(t("lec_ready"))}</span><a href="#lec-${esc(x.id)}">${esc(r.topic)}</a>`:`<span class="lec-st w">${esc(t("lec_wait"))}</span>${esc(r.topic)}`} <span class="note" style="display:inline;margin:0">· ${esc(r.pages)} ${esc(t("lec_pg"))}${r.intl?" · 🌐":""}</span></li>`}).join("")}</ul>`:`<p class="note" style="margin:0">${esc(t("lec_mine_0"))}</p>`}
async function onSubmit(e){e.preventDefault();const msg=$("lecMsg");msg.textContent="";
  const topic=$("lecTopic").value.replace(/\s+/g," ").trim();
  if(topic.length<10){msg.textContent=t("lec_need");$("lecTopic").focus();return}
  const mine=mineList();const day=Date.now()-864e5;
  if(mine.some(r=>nrm(r.topic)===nrm(topic))){msg.textContent=t("lec_dup");return}
  if(mine.filter(r=>r.at>day).length>=3){msg.textContent=t("lec_limit");return}
  const pages=+((document.querySelector('input[name="lecPg"]:checked')||{}).value||15);const intl=$("lecIntl").checked;
  const id="l"+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  const btn=e.target.querySelector("button[type=submit]");btn.disabled=true;
  try{
    const db=await window.claude.use("db");const uid=await (await window.claude.use("user")).id();
    await db.collection("lecreq").doc(id).set({topic,pages,intl,lang,at:Date.now(),uid});
    mine.push({id,topic,pages,intl,at:Date.now()});S.set("yr_lecreq",mine.slice(-40));
    $("lecTopic").value="";$("lecSim").innerHTML="";msg.textContent=t("lec_sent");paintMine();
  }catch(err){msg.textContent=t("lec_fail")}
  btn.disabled=false;
}

/* ---------- lecture view ---------- */
const COV_KEYS=["uni","fac","dep","sub","auth","city","year","kind"];
function cover(lec){const c=S.get("yr_lec_cover",{});const o={};COV_KEYS.forEach(k=>o[k]=c[k]||"");if(!o.year)o.year=String(new Date().getFullYear());if(!o.kind)o.kind=t("lec_kind_def");if(!o.sub&&lec&&lec.subject)o.sub=lec.subject;if(!o.city)o.city="Toshkent";return o}
let cur={id:null,pages:20,intl:true};
function renderLecture(id){
  view.innerHTML=`<div class="page-h"><div class="crumbs"><a href="#home">${esc(t("nav_home"))}</a> / <a href="#lectures">${esc(t("nav_lec"))}</a></div></div><div class="empty">${esc(t("lec_load"))}</div>`;
  Promise.all([loadLec(id),loadIdx()]).then(([lec])=>{
    if(location.hash!=="#lec-"+id)return;
    if(!lec||!Array.isArray(lec.blocks)){view.innerHTML=`<div class="page-h"><div class="crumbs"><a href="#home">${esc(t("nav_home"))}</a> / <a href="#lectures">${esc(t("nav_lec"))}</a></div></div><div class="empty">${esc(t("lec_nolec"))} <a href="#lectures">${esc(t("lec_back"))}</a></div>`;return}
    if(cur.id!==id){const q=S.get("yr_lec_pref",{});cur={id,pages:[10,15,20].includes(q.pages)?q.pages:20,intl:true}}
    paintLecture(lec);
  });
}
function hasIntl(lec){return (lec.blocks||[]).some(b=>b.i)}
function blockHtml(lec,b,n){
  const cls=b.i?' class="intl"':"";
  switch(b.t){
    case "h2":return `<h2${cls}>${esc(b.x)}</h2>`;
    case "h3":return `<h3${cls}>${esc(b.x)}</h3>`;
    case "p":return `<p${cls}>${inl(lec,b.x)}</p>`;
    case "ul":case "ol":return `<${b.t}${cls}>${(b.x||[]).map(li=>`<li>${inl(lec,li)}</li>`).join("")}</${b.t}>`;
    case "note":return `<div class="note-b">${inl(lec,b.x)}</div>`;
    case "tbl":n.t++;return `<div${cls}><div class="tcap">${esc(t("lec_tbl"))} ${n.t}. ${esc(b.cap||"")}</div><div style="overflow-x:auto"><table>${b.head?`<thead><tr>${b.head.map(h=>`<th>${inl(lec,h)}</th>`).join("")}</tr></thead>`:""}<tbody>${(b.rows||[]).map(r=>`<tr>${r.map(c=>`<td>${inl(lec,c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${b.src?`<p class="cap">${inl(lec,"[["+b.src+"]]")}</p>`:'<p class="cap"></p>'}</div>`;
    case "fig":n.f++;return `<figure${cls}>${cleanSvg(b.svg)}<figcaption class="cap" style="text-align:center">${esc(t("lec_fig"))} ${n.f}. ${esc(b.cap||"")}${b.src?" "+inl(lec,"[["+b.src+"]]"):""}</figcaption></figure>`;
  }return ""}
function srcItems(lec){const used=new Set();(JSON.stringify(lec.blocks).match(/\[\[([a-zA-Z0-9_-]+)\|/g)||[]).forEach(m=>used.add(m.slice(2,-1)));(lec.blocks||[]).forEach(b=>{if(b.src)used.add(String(b.src).split("|")[0])});return used}
function paintLecture(lec){
  const bl=pick(lec,cur.pages,cur.intl&&hasIntl(lec));const n={t:0,f:0};const pl=plan(bl);const c=cover(lec);
  const srcs=Object.entries(lec.src||{});const isrc=cur.intl?Object.entries(lec.isrc||{}):[];
  const est=estPages(lec,bl);
  view.innerHTML=`<div class="page-h"><div class="crumbs"><a href="#home">${esc(t("nav_home"))}</a> / <a href="#lectures">${esc(t("nav_lec"))}</a> / <span>${esc(lec.title)}</span></div></div>
  <div class="doc-layout"><article class="lec-paper">
    <h1>${esc(lec.title)}</h1>
    <div class="lec-badges"><span class="ok">✓ ${esc(t("lec_basis"))}</span><span>${esc(t("lec_checked"))}: ${esc(fmtD(lec.checked||lec.date))}</span>${lec.subject?`<span>${esc(lec.subject)}</span>`:""}</div>
    ${pl.length?`<ul class="plan" style="list-style:none;padding-left:18px" aria-label="${esc(t("lec_plan"))}">${pl.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:""}
    ${(lec.kw||[]).length?`<p style="font-family:var(--body);font-size:14.5px"><b>${esc(t("lec_kw"))}:</b> ${esc(lec.kw.join(", "))}</p>`:""}
    ${bl.map(b=>blockHtml(lec,b,n)).join("")}
    ${(lec.questions||[]).length?`<h2>${esc(t("lec_q"))}</h2><ol>${lec.questions.slice(0,cur.pages>=20?99:cur.pages>=15?10:7).map(q=>`<li>${esc(q)}</li>`).join("")}</ol>`:""}
    <h2>${esc(t("lec_src"))}</h2><ol class="srcl">${srcs.map(([k,s])=>`<li>${esc(s.t)}${s.st?` — <i>${esc(s.st==="amended"?t("lec_status_m"):t("lec_status_a"))}</i>`:""}${safeUrl(s.u)?` · <a href="${esc(safeUrl(s.u))}" target="_blank" rel="noopener noreferrer">${esc(hostOf(s.u))}</a>`:""}</li>`).join("")}</ol>
    ${isrc.length?`<h2>${esc(t("lec_isrc"))}</h2><ol class="srcl">${isrc.map(([k,s])=>`<li>${esc(s.t)}${s.org?", "+esc(s.org):""}${s.y?", "+esc(s.y):""}${safeUrl(s.u)?` · <a href="${esc(safeUrl(s.u))}" target="_blank" rel="noopener noreferrer">${esc(hostOf(s.u))}</a>`:""}</li>`).join("")}</ol>`:""}
    <div class="note-b">${esc(t("lec_disc"))}</div>
  </article>
  <aside class="side lec-side">
    <div class="box"><h3>${esc(t("lec_vol"))}</h3>
      <div class="lec-seg" role="radiogroup" aria-label="${esc(t("lec_vol"))}">${[10,15,20].map(p=>`<label><input type="radio" name="lecVPg" value="${p}"${p===cur.pages?" checked":""}><span>${p} ${esc(t("lec_pg"))}</span></label>`).join("")}</div>
      <p class="note">${esc(t("lec_est").replace("{n}",est))}</p>
      ${hasIntl(lec)?`<label class="lec-chk"><input type="checkbox" id="lecVIntl"${cur.intl?" checked":""}><span><b style="font-size:14px">${esc(t("lec_show_intl"))}</b></span></label>`:""}
    </div>
    <div class="box"><h3>${esc(t("lec_cover_h"))}</h3>
      <div class="lec-cover-prev" id="lecCovPrev">${coverPrev(lec,c)}</div>
      ${COV_KEYS.map(k=>`<div class="field"><label for="lc_${k}">${esc(t("lec_c_"+k))}</label><input type="text" id="lc_${k}" data-cov="${k}" maxlength="160" value="${esc(c[k])}"></div>`).join("")}
    </div>
    <div class="box"><h3>${esc(t("lec_dl_h"))}</h3><div class="lec-dl"><button class="btn" type="button" id="lecWord">${esc(t("lec_word"))}</button><button class="btn sec" type="button" id="lecPdf">${esc(t("lec_pdf"))}</button></div><p class="note">${esc(t("lec_pdf_h"))}</p><p class="note" id="lecDlMsg" role="status"></p></div>
    <a class="btn sec sm" href="#lectures">← ${esc(t("lec_back"))}</a>
  </aside></div>`;
  view.querySelectorAll('input[name="lecVPg"]').forEach(r=>r.addEventListener("change",()=>{cur.pages=+r.value;S.set("yr_lec_pref",{pages:cur.pages});paintLecture(lec)}));
  const ic=$("lecVIntl");if(ic)ic.addEventListener("change",()=>{cur.intl=ic.checked;paintLecture(lec)});
  view.querySelectorAll("[data-cov]").forEach(inp=>inp.addEventListener("input",()=>{const o=S.get("yr_lec_cover",{});o[inp.dataset.cov]=inp.value;S.set("yr_lec_cover",o);$("lecCovPrev").innerHTML=coverPrev(lec,cover(lec))}));
  $("lecWord").addEventListener("click",()=>makeDocx(lec));
  $("lecPdf").addEventListener("click",()=>makePdf(lec));
}
const hostOf=u=>{try{return new URL(u).hostname.replace(/^www\./,"")}catch(e){return ""}};
function coverTop(c){return [c.uni&&c.uni.toUpperCase(),c.fac,c.dep&&(c.dep)].filter(Boolean)}
function coverPrev(lec,c){return `<div>${coverTop(c).map((x,i)=>i?`<div>${esc(x)}</div>`:`<div style="font-weight:700">${esc(x)}</div>`).join("")}</div>
  <div>${c.sub?`<div>«${esc(c.sub)}» ${lang==="uz"?"fanidan":""}</div>`:""}<div style="margin:6px 0"><b>${esc(c.kind)}</b></div><div style="font-weight:700">${esc(lec.title)}</div></div>
  <div style="text-align:right">${c.auth?`<div>${lang==="uz"?"Tayyorladi":lang==="ru"?"Составил":"Prepared by"}: ${esc(c.auth)}</div>`:""}</div>
  <div>${esc([c.city,c.year].filter(Boolean).join(" — "))}</div>`}

/* ---------- PDF (print) ---------- */
function makePdf(lec){
  const bl=pick(lec,cur.pages,cur.intl&&hasIntl(lec));const n={t:0,f:0};const c=cover(lec);const pl=plan(bl);
  const srcs=Object.values(lec.src||{});const isrc=cur.intl&&hasIntl(lec)?Object.values(lec.isrc||{}):[];
  const qs=(lec.questions||[]).slice(0,cur.pages>=20?99:cur.pages>=15?10:7);
  const body=bl.map(b=>blockHtml(lec,b,n)).join("");
  const html=`<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(lec.title)}</title><style>
@page{size:A4;margin:20mm 15mm 20mm 30mm}
body{font-family:"Times New Roman",Times,serif;font-size:14pt;line-height:1.5;color:#000;margin:0}
.cover{height:257mm;display:flex;flex-direction:column;justify-content:space-between;text-align:center;page-break-after:always}
.cover .big{font-size:20pt;font-weight:700;margin:10px 0}.cover .t{font-size:18pt;font-weight:700}
h1{font-size:16pt;text-align:center;margin:0 0 12pt}h2{font-size:14pt;text-align:center;margin:18pt 0 8pt;page-break-after:avoid}h3{font-size:14pt;margin:12pt 0 6pt;page-break-after:avoid}
p{text-align:justify;text-indent:1.25cm;margin:0}ul,ol{margin:0 0 6pt}li{text-align:justify}
.cit{white-space:nowrap}table{border-collapse:collapse;width:100%;font-size:12pt;line-height:1.25;margin:4pt 0}th,td{border:1px solid #000;padding:3pt 5pt;vertical-align:top;text-align:left}
.tcap{text-align:right;font-style:italic;margin-top:8pt}.cap{font-size:12pt;text-align:center;text-indent:0;margin:2pt 0 8pt}
figure{margin:8pt 0;page-break-inside:avoid;text-align:center}figure svg{max-width:100%;height:auto}
.plan{page-break-after:always}.note-b{font-size:11pt;border-top:1px solid #000;margin-top:16pt;padding-top:6pt;text-indent:0}
.intl{}tr,figure{page-break-inside:avoid}
</style></head><body>
<div class="cover"><div>${coverTop(c).map((x,i)=>`<div${i?"":' style="font-weight:700"'}>${esc(x)}</div>`).join("")}</div>
<div>${c.sub?`<div>«${esc(c.sub)}» ${lang==="uz"?"fanidan":""}</div>`:""}<div class="big">${esc(c.kind)}</div><div class="t">${esc(lec.title)}</div></div>
<div style="text-align:right">${c.auth?`${lang==="uz"?"Tayyorladi":lang==="ru"?"Составил":"Prepared by"}: ${esc(c.auth)}`:""}</div>
<div>${esc([c.city,c.year].filter(Boolean).join(" — "))}</div></div>
<div class="plan"><h1>${esc(lec.title)}</h1>${pl.length?`<h2>${esc(t("lec_plan").toUpperCase())}</h2><div>${pl.map(x=>`<p style="text-indent:0">${esc(x)}</p>`).join("")}</div>`:""}${(lec.kw||[]).length?`<p style="text-indent:0;margin-top:12pt"><b>${esc(t("lec_kw"))}:</b> ${esc(lec.kw.join(", "))}</p>`:""}</div>
${body}
${qs.length?`<h2>${esc(t("lec_q").toUpperCase())}</h2><ol>${qs.map(q=>`<li>${esc(q)}</li>`).join("")}</ol>`:""}
<h2>${esc(t("lec_src").toUpperCase())}</h2><ol>${srcs.map(s=>`<li>${esc(s.t)}${s.u?". "+esc(s.u):""}</li>`).join("")}</ol>
${isrc.length?`<h2>${esc(t("lec_isrc").toUpperCase())}</h2><ol>${isrc.map(s=>`<li>${esc(s.t)}${s.org?", "+esc(s.org):""}${s.y?", "+esc(s.y):""}${s.u?". "+esc(s.u):""}</li>`).join("")}</ol>`:""}
<p class="note-b">${esc(t("lec_disc"))} https://al1on91.github.io/yolresurs/#lec-${esc(lec.id)}</p>
<script>window.onload=function(){setTimeout(function(){window.focus();window.print()},350)}<\/script></body></html>`;
  const w=window.open("","_blank");
  if(!w){const b=new Blob([html],{type:"text/html"});const u=URL.createObjectURL(b);location.href=u;return}
  w.document.open();w.document.write(html);w.document.close();
}

/* ---------- Word (.docx) ---------- */
let docxP=null;
function loadDocx(){if(window.docx)return Promise.resolve(window.docx);if(!docxP)docxP=new Promise((res,rej)=>{const s=document.createElement("script");s.src="vendor/docx.min.js";s.onload=()=>window.docx?res(window.docx):rej(new Error("docx"));s.onerror=()=>{docxP=null;rej(new Error("docx"))};document.head.appendChild(s)});return docxP}
function svgPng(svg){return new Promise(res=>{try{const d=new DOMParser().parseFromString(svg,"image/svg+xml").documentElement;let vb=(d.getAttribute("viewBox")||"").split(/[\s,]+/).map(Number);let w=+d.getAttribute("width")||vb[2]||800,h=+d.getAttribute("height")||vb[3]||400;
  const sc=Math.min(2,1600/w);const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=Math.round(w*sc);c.height=Math.round(h*sc);const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);
    c.toBlob(b=>{if(!b)return res(null);b.arrayBuffer().then(buf=>res({buf,w,h}))},"image/png")};img.onerror=()=>res(null);
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg)}catch(e){res(null)}})}
async function makeDocx(lec){
  const msg=$("lecDlMsg");msg.textContent=t("lec_wait_dl");const btn=$("lecWord");btn.disabled=true;
  try{
    const D=await loadDocx();
    const {Document,Packer,Paragraph,TextRun,AlignmentType,HeadingLevel,Table,TableRow,TableCell,WidthType,ImageRun,Footer,PageNumber,PageBreak,BorderStyle,LevelFormat}=D;
    const F="Times New Roman",SZ=28;
    const run=(r,o={})=>new TextRun({text:r.t,bold:!!(r.b||o.b),italics:!!o.i,font:F,size:o.size||SZ});
    const para=(x,o={})=>new Paragraph({children:(typeof x==="string"?runs(lec,x):x).map(r=>r instanceof TextRun?r:run(r,o)),alignment:o.al||AlignmentType.JUSTIFIED,indent:o.noind?undefined:{firstLine:709},spacing:{line:360,before:o.before||0,after:o.after||0},keepNext:!!o.keep,numbering:o.num});
    const head=(x,lvl)=>new Paragraph({children:[new TextRun({text:x,bold:true,font:F,size:SZ})],alignment:lvl===2?AlignmentType.CENTER:AlignmentType.LEFT,spacing:{line:360,before:240,after:120},keepNext:true,indent:lvl===3?{firstLine:709}:undefined});
    const c=cover(lec);const bl=pick(lec,cur.pages,cur.intl&&hasIntl(lec));
    const cov=[];
    coverTop(c).forEach((x,i)=>cov.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:x,bold:i===0,font:F,size:SZ})],spacing:{line:300}})));
    for(let i=0;i<9;i++)cov.push(new Paragraph({children:[]}));
    if(c.sub)cov.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:`«${c.sub}»${lang==="uz"?" fanidan":""}`,font:F,size:SZ})]}));
    cov.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:240,after:240},children:[new TextRun({text:c.kind,bold:true,font:F,size:40})]}));
    cov.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:lec.title,bold:true,font:F,size:32})]}));
    for(let i=0;i<8;i++)cov.push(new Paragraph({children:[]}));
    if(c.auth)cov.push(new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:`${lang==="uz"?"Tayyorladi":lang==="ru"?"Составил":"Prepared by"}: ${c.auth}`,font:F,size:SZ})]}));
    for(let i=0;i<5;i++)cov.push(new Paragraph({children:[]}));
    cov.push(new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:[c.city,c.year].filter(Boolean).join(" — "),font:F,size:SZ})]}));
    const out=[];
    out.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:240,line:360},children:[new TextRun({text:lec.title,bold:true,font:F,size:32})]}));
    const pl=plan(bl);
    if(pl.length){out.push(head(t("lec_plan").toUpperCase(),2));pl.forEach(x=>out.push(para([{t:x}],{noind:true,al:AlignmentType.LEFT})))}
    if((lec.kw||[]).length)out.push(para([{t:t("lec_kw")+": ",b:1},{t:lec.kw.join(", ")}],{noind:true,before:200}));
    out.push(new Paragraph({children:[new PageBreak()]}));
    let nt=0,nf=0;
    const bullet=(x,i,ord)=>para([{t:ord?`${i+1}) `:"– "},...runs(lec,x)],{noind:true,al:AlignmentType.JUSTIFIED});
    for(const b of bl){
      if(b.t==="h2")out.push(head(b.x,2));
      else if(b.t==="h3")out.push(head(b.x,3));
      else if(b.t==="p")out.push(para(b.x));
      else if(b.t==="note")out.push(para(b.x,{noind:true,before:120,after:120}));
      else if(b.t==="ul"||b.t==="ol")(b.x||[]).forEach((li,i)=>out.push(bullet(li,i,b.t==="ol")));
      else if(b.t==="tbl"){nt++;out.push(new Paragraph({alignment:AlignmentType.RIGHT,spacing:{before:160,line:300},keepNext:true,children:[new TextRun({text:`${t("lec_tbl")} ${nt}. ${b.cap||""}`,italics:true,font:F,size:26})]}));
        const cell=(x,h)=>new TableCell({children:[new Paragraph({children:runs(lec,x).map(r=>new TextRun({text:r.t,bold:!!(r.b||h),font:F,size:24})),spacing:{line:260}})]});
        const rows=[];if(b.head)rows.push(new TableRow({tableHeader:true,children:b.head.map(h=>cell(h,1))}));(b.rows||[]).forEach(r=>rows.push(new TableRow({cantSplit:true,children:r.map(x=>cell(x))})));
        out.push(new Table({rows,width:{size:100,type:WidthType.PERCENTAGE}}));
        if(b.src)out.push(new Paragraph({alignment:AlignmentType.LEFT,spacing:{after:160,line:300},children:[new TextRun({text:plain(lec,"[["+b.src+"]]"),font:F,size:22,italics:true})]}));}
      else if(b.t==="fig"){nf++;const svg=cleanSvg(b.svg);const im=svg?await svgPng(svg):null;
        if(im){const W=600,H=Math.round(W*im.h/im.w);out.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{before:120},keepNext:true,children:[new ImageRun({data:im.buf,transformation:{width:W,height:H},type:"png"})]}))}
        out.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:160,line:300},children:[new TextRun({text:`${t("lec_fig")} ${nf}. ${b.cap||""}${b.src?" "+plain(lec,"[["+b.src+"]]"):""}`,font:F,size:24})]}));}
    }
    const qs=(lec.questions||[]).slice(0,cur.pages>=20?99:cur.pages>=15?10:7);
    if(qs.length){out.push(head(t("lec_q").toUpperCase(),2));qs.forEach((q,i)=>out.push(para([{t:`${i+1}. ${q}`}],{noind:true})))}
    out.push(head(t("lec_src").toUpperCase(),2));
    Object.values(lec.src||{}).forEach((s,i)=>out.push(para([{t:`${i+1}. ${s.t}${s.u?". "+s.u:""}`}],{noind:true})));
    if(cur.intl&&hasIntl(lec)&&Object.keys(lec.isrc||{}).length){out.push(head(t("lec_isrc").toUpperCase(),2));Object.values(lec.isrc).forEach((s,i)=>out.push(para([{t:`${i+1}. ${s.t}${s.org?", "+s.org:""}${s.y?", "+s.y:""}${s.u?". "+s.u:""}`}],{noind:true})))}
    out.push(new Paragraph({spacing:{before:360},children:[new TextRun({text:t("lec_disc")+" https://al1on91.github.io/yolresurs/#lec-"+lec.id,italics:true,font:F,size:22})]}));
    const pageProps={page:{size:{width:11906,height:16838},margin:{top:1134,bottom:1134,left:1701,right:850}}};
    const doc=new Document({creator:"Yo‘lResurs.uz",title:lec.title,styles:{default:{document:{run:{font:F,size:SZ}}}},
      sections:[{properties:pageProps,children:cov},{properties:pageProps,footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({children:[PageNumber.CURRENT],font:F,size:24})]})]})},children:out}]});
    const blob=await Packer.toBlob(doc);
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=fileName(lec)+".docx";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
    msg.textContent="";
  }catch(e){console.error(e);msg.textContent=t("lec_dl_fail")}
  btn.disabled=false;
}
const fileName=lec=>("Maruza - "+lec.title).replace(/[\\/:*?"<>|ʻʼ‘’]+/g,"").slice(0,90).trim();

/* ---------- routing hook ---------- */
window.renderLectures=function(h){if(String(h||"").startsWith("lec-"))renderLecture(h.slice(4));else renderList()};
window.lecApplyI18n=function(){const a=nav&&nav.querySelector('[data-nav="lectures"]');if(a)a.textContent=t("nav_lec")};
lecApplyI18n();
const h=(location.hash||"").slice(1);if(h==="lectures"||h.startsWith("lec-"))route();
loadIdx();
})();
