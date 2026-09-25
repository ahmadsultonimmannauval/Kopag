## Tabel: users

| Kolom | Tipe | Nullable | Key | Keterangan |
|-------|------|----------|-----|------------|
| id | SERIAL | No | PK | Auto increment |
| email | VARCHAR(255) | No | UNIQUE | Email user |
| password_hash | VARCHAR(255) | No | | Hash bcrypt |
| full_name | VARCHAR(255) | No | | Nama lengkap |
| role | VARCHAR(50) | No | | 'user' atau 'admin' |
| created_at | TIMESTAMP | Yes | | Default NOW() |
| updated_at | TIMESTAMP | Yes | | Default NOW() |

## Tabel: refresh_tokens

| Kolom | Tipe | Nullable | Key | Keterangan |
|-------|------|----------|-----|------------|
| id | SERIAL | No | PK | Auto increment |
| user_id | INTEGER | No | FK | References users(id) |
| token | VARCHAR(500) | No | | JWT refresh token |
| expires_at | TIMESTAMP | No | | Waktu kadaluarsa |
| created_at | TIMESTAMP | Yes | | Default NOW() |