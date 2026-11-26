#!/usr/bin/env python3
"""Ma’ruzalarni tekshiradi va data/lectures.json indeksini qayta quradi.
Ishlatish: python3 scripts/lecture_index.py   (repo ildizidan)
Ma’ruza fayli: data/lectures/<id>.json — tuzilma lectures.js dagi kabi."""
import json, os, re, sys, glob
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BT={"h2","h3","p","ul","ol","tbl","fig","note"}
def words(s): return len(str(s).split())
def check(L,path):
    err=[]
    for k in ("id","title","date","src","blocks"):
        if k not in L: err.append(f"{k} yo‘q")
    if err: return err
    if not re.fullmatch(r"[a-z0-9-]{3,80}",L["id"]): err.append("id noto‘g‘ri")
    if os.path.basename(path)!=L["id"]+".json": err.append("fayl nomi id ga mos emas")
    keys=set(L.get("src",{}))|set(L.get("isrc",{}))
    for k,s in L.get("src",{}).items():
        if s.get("st") not in ("active","amended"): err.append(f"src {k}: st faqat active/amended bo‘lishi mumkin (amaldagi hujjat)")
        if not s.get("t") or not s.get("u"): err.append(f"src {k}: t/u yo‘q")
    for i,b in enumerate(L["blocks"]):
        if b.get("t") not in BT: err.append(f"blok {i}: t noto‘g‘ri")
        if b.get("k",1) not in (1,2,3): err.append(f"blok {i}: k 1/2/3 bo‘lishi kerak")
        if b.get("t")=="fig" and not str(b.get("svg","")).lstrip().startswith("<svg"): err.append(f"blok {i}: svg yo‘q")
        if b.get("t")=="fig" and re.search(r"<script|on\w+=|foreignObject|href",b.get("svg",""),re.I): err.append(f"blok {i}: svg da taqiqlangan element")
        txt=json.dumps(b,ensure_ascii=False)
        for m in re.findall(r"\[\[([a-zA-Z0-9_-]+)\|",txt):
            if m not in keys: err.append(f"blok {i}: [[{m}|…]] manbasi src/isrc da yo‘q")
        if b.get("src") and str(b["src"]).split("|")[0] not in keys: err.append(f"blok {i}: src kaliti yo‘q")
        if b.get("i") and not L.get("isrc"): err.append(f"blok {i}: xorijiy blok bor, isrc yo‘q")
    return err
def wc(L,lim,intl):
    n=0
    for b in L["blocks"]:
        if b.get("k",1)>lim or (b.get("i") and not intl): continue
        x=b.get("x")
        if isinstance(x,str): n+=words(x)
        elif isinstance(x,list): n+=sum(words(y) for y in x)
        for r in b.get("rows",[]): n+=sum(words(c) for c in r)
        if b["t"]=="fig": n+=120
        if b["t"]=="tbl": n+=40
    return n
items=[];bad=0
for p in sorted(glob.glob(os.path.join(ROOT,"data/lectures/*.json"))):
    L=json.load(open(p,encoding="utf-8"))
    e=check(L,p)
    if e: bad+=1; print("XATO",os.path.basename(p)); [print("  -",x) for x in e]; continue
    intl=any(b.get("i") for b in L["blocks"])
    pages={str(pg):max(1,round(wc(L,lim,intl)/320))+2+-(-(len(L.get("questions",[]))+len(L["src"]))//14) for pg,lim in ((10,1),(15,2),(20,3))}
    items.append({"id":L["id"],"title":L["title"],"subject":L.get("subject",""),"date":L["date"],"intl":intl,
      "srcN":len(L["src"]),"kw":L.get("kw",[]),"topics":L.get("topics",[]),"reqIds":L.get("reqIds",[]),"pages":pages,
      "words":{k:wc(L,lim,intl) for k,lim in (("10",1),("15",2),("20",3))}})
    print("OK",L["id"],"so‘zlar:",items[-1]["words"],"varaq:",pages)
json.dump({"v":max([i["date"] for i in items] or [""]),"items":items},open(os.path.join(ROOT,"data/lectures.json"),"w",encoding="utf-8"),ensure_ascii=False,indent=1)
sys.exit(1 if bad else 0)
