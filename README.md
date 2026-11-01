# Yo‘lResurs.uz

Avtomobil yo‘llari ilmiy-tadqiqot institutining yo‘l sohasi bo‘yicha milliy ilmiy-texnik hujjatlar elektron kutubxonasi.

Sayt hech qanday ro‘yxatdan o‘tishsiz, istalgan hududdan ochiladi (GitHub Pages).

## Tuzilishi

| Fayl | Vazifasi |
|---|---|
| `index.html` | Saytning o‘zi (barcha sahifalar) |
| `standalone.js` | Ma’lumotlar bazasi bilan ishlash |
| `config.js` | Supabase manzili va ochiq kaliti |
| `data/*.json` | Hujjatlar, yangiliklar, havolalar — har kuni avtomatik yangilanadi |
| `catalog/trb-idea.json` | TRB NCHRP IDEA loyihalari ro‘yxati |
| `supabase-setup.sql` | Supabase bazasini bir marta sozlash skripti |

## Ma’lumotlar qayerda saqlanadi

- **Avtomatik qo‘shiladigan** hujjat va yangiliklar — shu repozitoriydagi `data/` papkasida.
- **Administrator** admin paneldan qo‘shgan, tahrirlagan yoki o‘chirgan narsalar, yuklangan fayllar — Supabase’da.
- **Foydalanuvchilar** yuborgan hujjatlar, mutaxassis arizalari va savollar — Supabase’da. Ularni faqat administrator ko‘radi.

## Supabase’ni sozlash (bir marta)

1. Supabase → **SQL Editor** → **New query**. `supabase-setup.sql` faylini oching, ichidagi `SIZNING_POCHTANGIZ@gmail.com` ni o‘z pochtangizga almashtiring, hammasini joylang va **Run** bosing.
2. **Authentication → Users → Add user → Create new user**: o‘sha pochta va kuchli parol. «Auto Confirm User» belgisini qo‘ying.
3. **Authentication → Sign In / Providers → Email**: «Allow new users to sign up» ni o‘chiring.
4. `config.js` ga Project URL va anon public kalitni yozing.

## Administrator kirishi

Saytning pastki qismidagi **Administrator** havolasi yoki `…/#admin` manzili orqali pochta va parol bilan kiriladi.
