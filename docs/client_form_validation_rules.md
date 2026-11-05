# Client Form Validation Rules (Modul Autentikasi)

Sumber: frontend/src/app/shared/validators.ts dan form di pages/login serta pages/register (Angular Reactive Forms).

| Form | Field | Aturan | Pesan galat |
|---|---|---|---|
| Login | email | wajib, format email, maks 150 | Email wajib diisi / Format email tidak valid, contoh: nama@perusahaan.com |
| Login | password | wajib, min 8 | Kata sandi wajib diisi / Kata sandi minimal 8 karakter |
| Register | name | wajib, 2-100 karakter | Nama lengkap wajib diisi / minimal 2 / maksimal 100 karakter |
| Register | email | sama dengan login | sama dengan login |
| Register | password | wajib, min 8, huruf dan angka | Kata sandi harus mengandung huruf / angka |
| Register | confirmPassword | wajib, sama dengan password | Konfirmasi kata sandi tidak sama |

Batas name (100) dan email (150) mengikuti DDL tabel users milik Backend.
Pesan galat tampil setelah field disentuh (blur) atau form dikirim.
