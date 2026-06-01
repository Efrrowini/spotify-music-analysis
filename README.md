# 🎵 Spotify Music Taste Analysis

A data science project that analyzes your personal Spotify streaming history to uncover listening patterns, top artists, mood profiles, and more — all rendered in an interactive dashboard.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Recharts](https://img.shields.io/badge/Recharts-2.10-FF6B6B?style=flat)
![Data Science](https://img.shields.io/badge/Data-Science-E8FF47?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

---

## 📊 What It Analyzes

| Section | Insights |
|---|---|
| **Overview** | Total plays, minutes listened, unique artists & tracks, genre breakdown |
| **Artists** | Top 8 artists ranked by play count with hours listened |
| **Tracks** | Top 10 most-replayed songs with visual play bars |
| **Patterns** | Listening heatmaps by hour of day and day of week |
| **Mood Profile** | Audio feature radar — energy, danceability, valence, acousticness |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/spotify-music-analysis.git
cd spotify-music-analysis
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

The app opens at `http://localhost:3000`.

---

## 📁 Using Your Own Spotify Data

### Request your data from Spotify

1. Go to [spotify.com](https://www.spotify.com) → **Account → Privacy Settings**
2. Under **"Download your data"**, request **Extended Streaming History**
3. Spotify emails you a ZIP file (can take up to 30 days)

### Load it into the dashboard

Once your export arrives:

1. Unzip the file
2. Find the files named `Streaming_History_Audio_0.json`, `_1.json`, etc.
3. Click **"Upload your Spotify JSON"** in the top-right of the dashboard
4. Your real data loads instantly — no server needed, everything runs in the browser

---

## 🏗️ Project Structure

```
spotify-music-analysis/
├── src/
│   └── App.jsx          # Main dashboard component
├── public/
│   └── index.html
├── package.json
└── README.md
```

---

## 🔧 Tech Stack

- **React 18** — UI framework
- **Recharts** — Data visualizations (bar, line, radar, pie charts)
- **DM Mono + Playfair Display** — Typography
- **Vanilla CSS-in-JS** — Styling

---

## 📈 Data Science Concepts Used

- **JSON parsing & transformation** — cleaning raw Spotify streaming records
- **Aggregation** — grouping plays by artist, track, hour, day, month
- **Frequency analysis** — ranking top artists and tracks by play count
- **Time-series analysis** — monthly listening trends over the year
- **Feature profiling** — estimating audio features (energy, valence, danceability) from listening patterns
- **Data visualization** — translating raw data into meaningful charts

---

## 🔒 Privacy

All data processing happens **entirely in your browser**. Your Spotify listening history is never uploaded to any server.

---

## 📌 Roadmap

- [ ] Multi-file upload support (merge multiple JSON history files)
- [ ] Spotify Web API integration for real audio features
- [ ] Artist image display
- [ ] Export analyzed data as CSV
- [ ] Year-over-year comparison view

---

## 👤 Author

**Efro** — 2nd year Data Science student at Presidency University  
Building at the intersection of data analysis and web development.

--- 
## 📄 License

MIT — feel free to fork and adapt for your own music data.
