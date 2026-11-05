# Katalog Komponen UI Autentikasi (Angular)

Palet: navy #1e2d45, hijau #047857 (aksi utama), merah #b91c1c (galat), latar #f4f7fc. Font: Plus Jakarta Sans.

| Komponen | Selector | Input / Output | Variasi status |
|---|---|---|---|
| InputText | app-input-text | control, label, type, placeholder, hint, autocomplete | default, focus, error, disabled |
| PrimaryButton | app-primary-button | type, loading, disabled | default, hover, loading, disabled |
| AlertToast | app-alert-toast | type (error/success), message, output closed | error, success |
| AuthLayout | app-auth-layout | title, subtitle, slot [footer] | dua kolom; satu kolom di mobile (<860px) |
| authGuard | route guard | - | redirect ke /login bila token tidak ada |
