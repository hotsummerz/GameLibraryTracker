# Game Library Tracker

Aplikasi web untuk mencatat dan mengelola koleksi game pribadi. Dibangun dengan React + Vite + TypeScript menggunakan konsep Component-Based UI Development sebagai tugas Mata Kuliah Pengembangan Aplikasi Web.

## Fitur

- ✅ Tambah, hapus, ubah status game
- ✅ Upload dan kompres cover game
- ✅ Rating bintang (0-5)
- ✅ Pencarian dan filter berdasarkan status
- ✅ Sort berdasarkan tanggal, judul, atau rating
- ✅ Statistik koleksi game
- ✅ Catatan per game
- ✅ Persistensi data ke localStorage
- ✅ Responsif (mobile-first)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TypeScript** - Type safety
- **CSS** - Plain CSS (no framework), system font stack
- **localStorage** - Data persistence

## Konsep React yang Diterapkan

### 1. Components (12 komponen)
- `App` - Root component dengan state management
- `Navbar`, `PageHeader`, `Footer` - Layout components
- `StatsBar` - Menampilkan statistik
- `GameForm` - Form input game baru
- `FilterBar` - Search, filter, sort controls
- `GameList`, `GameCard` - List rendering
- `StatusBadge`, `StarRating`, `ConfirmDialog`, `CoverUpload` - Reusable components

### 2. Props
Data mengalir dari parent ke child melalui props. Contoh:
- `GameCard` menerima `game` object dan callback functions (`onDelete`, `onChangeStatus`, `onRate`)
- `StatusBadge` menerima `status` dan menampilkan badge sesuai status

### 3. State (useState)
State utama dikelola di `App.tsx`:
- `games` - Array of Game objects (disimpan ke localStorage)
- `searchText` - Teks pencarian
- `statusFilter` - Filter status aktif
- `sortBy` - Kriteria sorting
- `gameToDelete` - Game yang akan dihapus (untuk konfirmasi)

### 4. Event Handling
User actions ditangani melalui event handlers:
- `handleAddGame` - Tambah game baru
- `handleDeleteGame` - Hapus game (dengan konfirmasi)
- `handleChangeStatus` - Ubah status game
- `handleRate` - Set rating game
- `handleSubmit` - Submit form dengan validasi

### 5. Conditional Rendering
- Empty state berbeda untuk data kosong vs hasil filter kosong
- Detail catatan game tampil/sembunyi (toggle)
- ConfirmDialog hanya render saat `gameToDelete !== null`
- Cover placeholder vs gambar aktual
- Error message hanya muncul saat validasi gagal

### 6. List Rendering
- `GameList` me-render array `games` dengan `map()`
- Setiap item diberi `key={game.id}` (UUID unik)
- FilterBar me-render tabs dengan `map()` over array filters

## Struktur Folder

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Root component (all state here)
├── types.ts              # TypeScript interfaces
├── config.ts             # Environment variables
├── index.css             # Complete design system
├── components/           # 12 React components
│   ├── Navbar.tsx
│   ├── PageHeader.tsx
│   ├── Footer.tsx
│   ├── StatsBar.tsx
│   ├── GameForm.tsx
│   ├── FilterBar.tsx
│   ├── GameList.tsx
│   ├── GameCard.tsx
│   ├── StatusBadge.tsx
│   ├── StarRating.tsx
│   ├── CoverUpload.tsx
│   └── ConfirmDialog.tsx
├── hooks/
│   └── useLocalStorage.ts  # Custom hook for localStorage
├── utils/
│   ├── filterSort.ts        # Pure functions: filter, search, sort
│   ├── stats.ts             # Calculate statistics
│   └── image.ts             # Compress cover images
└── data/
    └── seed.ts              # Initial game data
```

## Setup & Development

1. Clone repository
2. Copy `.env.example` ke `.env` dan isi data Anda:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run development server:
   ```bash
   npm run dev
   ```
5. Build untuk production:
   ```bash
   npm run build
   ```

## Environment Variables

```env
VITE_APP_NAME=Game Library Tracker
VITE_APP_VERSION=1.0.0
VITE_COURSE_NAME=Pengembangan Aplikasi Web
VITE_STUDENT_NAME=Your Name
VITE_STUDENT_NIM=Your NIM
VITE_PROFILE_URL=https://example.com/
```

## Data Model

```typescript
interface Game {
  id: string;          // UUID
  title: string;       // Wajib
  platform: string;    // PC, PS5, Switch, dll
  genre: string;
  status: 'wishlist' | 'playing' | 'completed';
  rating: number;      // 0-5
  hours: number;       // Jam main
  notes: string;
  cover?: string;      // Data URL (JPEG terkompresi)
  createdAt: number;   // Timestamp
}
```

## Fitur Upload Cover

- Format: JPG, PNG, WebP
- Ukuran max: 5 MB
- Otomatis dikompres ke max 360px dengan quality 0.8
- Disimpan sebagai data URL di localStorage
- Error handling untuk quota localStorage penuh

## Deployment

Deploy otomatis ke GitHub Pages lewat `.github/workflows/deploy.yml` setiap push ke `main`.

1. Aktifkan Pages: **Settings → Pages → Source: GitHub Actions**
2. Push ke `main` (atau re-run workflow)

Nilai `VITE_*` disimpan di `.env.production` (ikut ter-commit). File `.env` tetap tidak di-commit karena biasanya berisi konfigurasi lokal.

Catatan: semua variabel `VITE_*` di-inline ke bundle JS dan bisa dibaca siapa pun dari browser, jadi jangan pernah menaruh rahasia (API key privat, token) di sini.

`vite.config.ts` memakai `base: './'` agar aset tetap benar baik di `username.github.io/nama-repo/` maupun di custom domain.

## Browser Support

- Chrome/Edge (modern)
- Firefox (modern)
- Safari (modern)
- Requires JavaScript enabled
- LocalStorage available

## Tugas Requirements ✅

- [x] React + Vite
- [x] >= 5 komponen terpisah (dibuat 12)
- [x] >= 2 reusable components (StatusBadge, StarRating, ConfirmDialog, CoverUpload)
- [x] Props, State, Event Handling terimplementasi
- [x] Conditional Rendering (empty states, toggle, dialog)
- [x] List Rendering dengan map() + key
- [x] >= 3 fitur interaktif (dibuat 7: tambah, hapus, ubah status, rating, search, filter, sort)
- [x] Responsif mobile-first
- [x] Nama & NIM tampil
- [x] No errors in console
- [x] >= 5 commits
- [x] Published online

## License

Project ini dibuat untuk keperluan tugas akademik Mata Kuliah Pengembangan Aplikasi Web.

## Kontak

Untuk pertanyaan atau feedback, silakan buka issue di repository ini atau hubungi melalui [website pribadi](https://hotsummerz.my.id).