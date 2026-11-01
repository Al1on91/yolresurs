/* Yo‘lResurs standalone backend shim: static JSON (data/*.json, maintained in the GitHub repo)
   + Supabase (admin edits, uploads, public submissions). Exposes window.claude.use() with the
   small API surface the app uses, so the app code stays the same as the Claude version. */
(function(){
  const CFG=window.YR_CONFIG||{};
  const HAS_SB=!!(CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase&&window.supabase.createClient);
  let NEED_PW=false; try{const h=location.hash||"";NEED_PW=/type=(recovery|invite|signup)/.test(h)}catch(e){}
  const sb=HAS_SB?window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true}}):null;
  window.YR_SB=sb;
  const PUBLIC=["docs","news","links","collections","site","specialists","qa","specstat","norms"];
  const ANON_INSERT=["submissions","specreq","qareq"];
  const STATIC=["docs","news","links","collections","site","specialists","qa","specstat","norms"];
  let session=null, isAdmin=false;
  const staticCache={}, sbCache={}, subs=[];
  
  function loadStatic(col){
    if(!STATIC.includes(col))return Promise.resolve([]);
    if(!staticCache[col])staticCache[col]=fetch("data/"+col+".json?v="+Math.floor(Date.now()/300000)).then(r=>r.ok?r.json():[]).then(a=>Array.isArray(a)?a:[]).catch(()=>[]);
    return staticCache[col];
  }
  async function loadSb(col,force){
    if(!sb)return[];
    if(!PUBLIC.includes(col)&&!isAdmin)return[];
    if(sbCache[col]&&!force)return sbCache[col];
    const p=(async()=>{const out=[];let from=0;for(;;){const {data,error}=await sb.from("records").select("id,data").eq("col",col).range(from,from+999);if(error)throw error;out.push(...data);if(data.length<1000)break;from+=1000}return out})();
    sbCache[col]=p.catch(e=>{delete sbCache[col];throw e});
    return sbCache[col];
  }
  async function merged(col,force){
    const [st,dy]=await Promise.all([loadStatic(col),loadSb(col,force).catch(()=>[])]);
    const m=new Map();
    st.forEach(r=>{if(r&&r.id!=null){const {id,...d}=r;m.set(String(id),d)}});
    dy.forEach(r=>{if(r.data&&r.data.__deleted)m.delete(r.id);else m.set(r.id,r.data||{})});
    return m;
  }
  const snapDoc=(id,data)=>({id,exists:data!==undefined,data:()=>data});
  function emit(col){subs.filter(s=>s.col===col).forEach(s=>s.run(true))}
  function collection(col){
    return{
      doc:(id)=>docRef(col+"/"+(id||("r"+Date.now().toString(36)+Math.random().toString(36).slice(2,7)))),
      onSnapshot(next,err){
        const s={col,run:async(force)=>{try{const m=await merged(col,force);next({docs:[...m].map(([id,d])=>snapDoc(id,d)),size:m.size,empty:!m.size})}catch(e){err&&err(e)}}};
        subs.push(s); s.run(false); return()=>{const i=subs.indexOf(s);if(i>-1)subs.splice(i,1)};
      }
    };
  }
  function docRef(path){
    const i=path.indexOf("/"), col=path.slice(0,i), id=path.slice(i+1);
    const need=()=>{if(!sb){const e=new Error("Ma’lumotlar bazasi ulanmagan (config.js)");e.code="unavailable";throw e}};
    const write=async(data)=>{
      need();
      if(!isAdmin){
        if(!ANON_INSERT.includes(col)){const e=new Error("Ruxsat yo‘q");e.code="permission_denied";throw e}
        const {error}=await sb.from("records").insert({col,id,data});if(error)throw error;return;
      }
      const {error}=await sb.from("records").upsert({col,id,data,updated_at:new Date().toISOString()},{onConflict:"col,id"});
      if(error)throw error; delete sbCache[col]; emit(col);
    };
    return{id,path,
      async get(){const m=await merged(col);return snapDoc(id,m.get(id))},
      set:(data)=>write(JSON.parse(JSON.stringify(data))),
      async update(patch){const m=await merged(col,true);const cur=m.get(id);if(cur===undefined){const e=new Error("missing");e.code="not_found";throw e}return write(Object.assign({},cur,JSON.parse(JSON.stringify(patch))))},
      async delete(){
        need(); if(!isAdmin){const e=new Error("Ruxsat yo‘q");e.code="permission_denied";throw e}
        const st=await loadStatic(col);
        if(st.some(r=>String(r.id)===id)){await write({__deleted:true});return}
        const {error}=await sb.from("records").delete().eq("col",col).eq("id",id);if(error)throw error;delete sbCache[col];emit(col);
      },
      onSnapshot(next,err){
        const s={col,run:async(force)=>{try{const m=await merged(col,force);next(snapDoc(id,m.get(id)))}catch(e){err&&err(e)}}};
        subs.push(s); s.run(false); return()=>{const k=subs.indexOf(s);if(k>-1)subs.splice(k,1)};
      }
    };
  }
  const db={collection,doc:docRef};
  function anonId(){try{let v=localStorage.getItem("yr_uid");if(!v){v="u"+Date.now().toString(36)+Math.random().toString(36).slice(2,10);localStorage.setItem("yr_uid",v)}return v}catch(e){return "u"+Math.random().toString(36).slice(2,10)}}
  const user={isOwner:async()=>isAdmin,canEdit:async()=>isAdmin,id:async()=>anonId()};
  const assets=sb?{
    async upload(blob){const name=(blob.name||"fayl").replace(/[^\w.\-]+/g,"_");const key=Date.now().toString(36)+"-"+name;
      const {error}=await sb.storage.from("files").upload(key,blob,{upsert:false,contentType:blob.type||undefined});if(error)throw error;
      const {data}=sb.storage.from("files").getPublicUrl(key);return{id:key,url:data.publicUrl,sizeBytes:blob.size}},
    async delete(id){await sb.storage.from("files").remove([id])}
  }:null;
  const ready=(async()=>{
    if(sb){try{const {data}=await sb.auth.getSession();session=data.session;
      if(session){const r=await sb.rpc("is_admin");isAdmin=r&&r.data===true}
      if(session&&NEED_PW){history.replaceState(null,"",location.pathname+"#admin")}
      if(session&&localStorage.getItem("yr_go_admin")){localStorage.removeItem("yr_go_admin");history.replaceState(null,"",location.pathname+"#admin")}
    }catch(e){}}
    return true;
  })();
  window.YR_AUTH={
    get enabled(){return !!sb},
    get isAdmin(){return isAdmin},
    get email(){return session&&session.user&&session.user.email||""},
    get needPassword(){return NEED_PW&&!!session},
    async signIn(email,password){if(!sb)throw new Error("config");const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)throw error;session=data.session;const r=await sb.rpc("is_admin");isAdmin=r&&r.data===true;return isAdmin},
    async sendReset(email){if(!sb)throw new Error("config");localStorage.setItem("yr_go_admin","1");const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;return true},
    async setPassword(pw){if(!sb)throw new Error("config");const {error}=await sb.auth.updateUser({password:pw});if(error)throw error;NEED_PW=false;return true},
    async sendLink(email){if(!sb)throw new Error("config");localStorage.setItem("yr_go_admin","1");
      const {error}=await sb.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:location.origin+location.pathname}});if(error)throw error;return true},
    get signedInNotAdmin(){return !!session&&!isAdmin},
    async signOut(){if(sb)await sb.auth.signOut();session=null;isAdmin=false}
  };
  window.claude={use:async(name)=>{await ready;
    if(name==="db")return db;
    if(name==="user")return user;
    if(name==="assets")return isAdmin?assets:null;
    return null;}};
  // keep public data fresh for long-open tabs
  setInterval(()=>{STATIC.forEach(c=>{delete staticCache[c]});PUBLIC.forEach(c=>{delete sbCache[c]});[...new Set(subs.map(s=>s.col))].forEach(c=>subs.filter(s=>s.col===c).forEach(s=>s.run(true)))},10*60*1000);
})();
