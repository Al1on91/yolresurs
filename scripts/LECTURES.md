# Ma’ruzalar — tayyorlash qoidalari (Yo‘lResurs.uz)

Foydalanuvchilar «Ma’ruzalar» bo‘limida (`#lectures`) mavzu yuboradi. So‘rovlar Supabase `records` jadvalida `col='lecreq'` sifatida saqlanadi va
`https://ixzbxzoebwgmzscyettd.supabase.co/functions/v1/lecreq` manzilidan JSON ko‘rinishida o‘qiladi:
`{"now":…, "reqs":[{"id","topic","pages":10|15|20,"intl":true|false,"lang","at"}]}`.

Tayyor ma’ruza — `data/lectures/<id>.json`. Indeks `data/lectures.json` ni qo‘lda yozmang: `python3 scripts/lecture_index.py` uni tekshirib, qayta quradi
(xato bo‘lsa 1 kodi bilan chiqadi). So‘rov bajarilgan deb hisoblanadi, agar uning `id` si biror ma’ruzaning `reqIds` ro‘yxatida bo‘lsa.

## Hujjat matnini olish (raqamlar shu yerdan)
`https://ixzbxzoebwgmzscyettd.supabase.co/functions/v1/normtext?doc=<lex.uz raqami>` — lex.uz hujjatini oddiy matn qilib beradi:
- `&toc=1` — boblar, paragraflar, jadvallar, ilovalar (qator raqami bilan);
- `&from=150&to=212` — 150–212-bandlar matni;
- `&q=жадвал` — so‘z qatnashgan qatorlar;  `&line=3950&n=120` — qator raqamidan boshlab 120 qator (jadvallar uchun).
Javob 24 000 belgidan oshsa kesiladi — oraliqni toraytiring. Matn lex.uz da kirill yozuvida; ma’ruza o‘zbek lotin yozuvida yoziladi.
Asosiy hujjatlar (lex.uz raqami): ShNQ 2.05.02-23 «Avtomobil yo‘llari» — 7205692; ShNQ 2.05.03-22 «Ko‘priklar va quvurlar» — 6130301; ShNQ 2.05.05-24 «Tunnellar» — 7179741; ShNQ 2.07.06-24 «Shahar ko‘cha-yo‘llari» 1/2/3-qism — 7039154 / 7325622 / 7327695; ShNQ 3.01.03-24 «Qurilishda geodeziya ishlari» — 7165467; ShNQ 3.06.07-23 «Ko‘priklarni tekshirish va sinash» — 6579145; «Avtomobil yo‘llari to‘g‘risida»gi Qonun O‘RQ-1162 — lex.uz/mact/8380201. Boshqa hujjatlar uchun `data/norms.json` dagi manba havolasidan raqamni oling.

## Asosiy qoidalar
1. **Faqat amaldagi hujjatlar.** `src` dagi har bir hujjat `data/norms.json` da `status` = `active` yoki `amended` bo‘lishi va rasmiy manbada (lex.uz, tmsiti.uz, avtoyulnorma.uz) amalda ekani tekshirilgan bo‘lishi kerak. `replaced`, `cancelled`, `updating`, `draft` hujjatlar ishlatilmaydi. Har bir `src` yozuvida `"st":"active"` yoki `"amended"`.
2. **Har bir raqam — band bilan.** Matndagi har bir son, o‘lcham, chegaraviy qiymat `[[kalit|NNN-band]]` havolasi bilan beriladi va hujjatning o‘sha bandida haqiqatda yozilgan bo‘ladi. Hujjat matnini o‘qimasdan raqam yozilmaydi. Taxmin, «odatda», xotiradan raqam — taqiqlanadi.
3. **Xorijiy bo‘lim** faqat so‘rovda `intl:true` bo‘lsa yoziladi. Manbalar — platforma katalogidagi (`data/docs.json`, `intl:true`) hujjatlar; faktlar ochib o‘qilgan sahifadan yoki katalog yozuvidagi tekshirilgan mazmundan olinadi; `isrc` da sarlavha, tashkilot, yil, havola. Xorijiy bloklar `"i":1` belgisi bilan, alohida bo‘limda; ular O‘zbekistonda majburiy emasligi aytiladi.
4. **O‘z so‘zlaringiz bilan.** Hujjat matnidan uzun parchalar ko‘chirilmaydi; mazmun o‘zbek lotin yozuvida (o‘ g‘ ’) bayon qilinadi.
5. **Hajm.** Bloklar `k` darajasiga ega: `k:1` — 10 varaqli variantda ham bor, `k:2` — 15 va 20 da, `k:3` — faqat 20 da. Taxminiy so‘z soni (jadval va rasmlarsiz): k1 ≈ 1900–2100, k1+k2 ≈ 3500–3700, hammasi ≈ 4800–5200. Indeks skripti varaqlarni taxminlaydi (≈320 so‘z/varaq).
6. **Tuzilma.** `Kirish` (`"nn":1`), 6–11 ta raqamlanadigan bo‘lim (`h2`, raqamsiz yoziladi — sayt o‘zi raqamlaydi), zarur bo‘lsa `h3`, `Xulosa` (`"nn":1`). Har bir bo‘limda kamida bitta jadval yoki sxema bo‘lishi tavsiya etiladi. 10–15 ta nazorat savoli (`questions`), 5–8 ta kalit so‘z (`kw`).
7. **Sxemalar** — oddiy inline SVG (`viewBox` va `width/height` bilan, oq fon, `font-family="Arial, sans-serif"`), faqat matndagi raqamlarni ko‘rsatadi. `<script>`, `href`, `on…=`, `foreignObject`, tashqi rasm — taqiqlangan.
8. **O‘xshash mavzular.** Yangi so‘rov mavjud ma’ruzaga mos kelsa (bir xil mavzu, boshqacha so‘z bilan), yangi ma’ruza yozilmaydi — so‘rov `id` si o‘sha ma’ruzaning `reqIds` iga qo‘shiladi. Agar so‘rovda `intl:true` bo‘lsa-yu, ma’ruzada xorijiy bo‘lim bo‘lmasa, xorijiy bo‘lim qo‘shiladi.
9. **Yo‘l sohasiga oid bo‘lmagan, ma’nosiz yoki zararli so‘rovlar** bajarilmaydi (ro‘yxatga yozib qo‘yiladi, javob berilmaydi).

## Fayl formati
```json
{
 "id":"latin-harflar-va-chiziqcha", "title":"…", "subject":"Fan nomi", "date":"YYYY-MM-DD", "checked":"YYYY-MM-DD", "lang":"uz",
 "reqIds":["l…"], "topics":["so‘rovdagi mavzu matni"], "kw":["…"],
 "src":{"r":{"s":"ShNQ 2.05.02-23","t":"To‘liq nomi va tasdiqlagan hujjat","u":"https://lex.uz/docs/…","st":"active"}},
 "isrc":{"cn":{"s":"Qisqa nom","t":"To‘liq nom","org":"Tashkilot, mamlakat","y":2026,"u":"https://…"}},
 "blocks":[
  {"t":"h2","x":"Kirish","k":1,"nn":1},
  {"t":"p","x":"Matn **qalin** va havola [[r|150-band]].","k":1},
  {"t":"ul","x":["…","…"],"k":2},
  {"t":"tbl","cap":"Jadval nomi","head":["…","…"],"rows":[["…","…"]],"src":"r|170-band","k":1},
  {"t":"fig","cap":"Rasm nomi","svg":"<svg …>…</svg>","src":"r|151-band","k":1},
  {"t":"h2","x":"Xorijiy tajriba","k":1,"i":1},
  {"t":"p","x":"… [[cn|]]","k":1,"i":1}
 ],
 "questions":["…"]
}
```
Namuna: `data/lectures/kesishma-va-tutashmalar.json`.
