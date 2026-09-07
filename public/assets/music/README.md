# 🎵 Gondang Music Placeholder

Letakkan file MP3 musik Gondang Batak Anda di folder ini dengan nama:

```
gondang.mp3
```

Path lengkap: `public/assets/music/gondang.mp3`

AudioPlayer akan otomatis memutar file ini saat tombol ▶ diklik.

## Format yang didukung
- MP3 (direkomendasikan)
- OGG
- WAV

Untuk menggunakan format lain, update `components/ui/AudioPlayer.tsx` bagian:
```html
<source src={GONDANG_MUSIC_PATH} type="audio/mpeg" />
```
