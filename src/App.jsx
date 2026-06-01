import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, LineChart, Line, CartesianGrid, Cell, PieChart, Pie } from "recharts";

// ── SAMPLE DATA ─────────────────────────────────────────────────────────────
const sampleData = [
  { ts: "2024-01-03T14:22:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-01-03T14:26:00Z", master_metadata_track_name: "Save Your Tears", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-01-04T09:10:00Z", master_metadata_track_name: "Levitating", master_metadata_album_artist_name: "Dua Lipa", master_metadata_album_album_name: "Future Nostalgia", ms_played: 203000 },
  { ts: "2024-01-04T09:14:00Z", master_metadata_track_name: "Physical", master_metadata_album_artist_name: "Dua Lipa", master_metadata_album_album_name: "Future Nostalgia", ms_played: 194000 },
  { ts: "2024-01-05T22:30:00Z", master_metadata_track_name: "Circles", master_metadata_album_artist_name: "Post Malone", master_metadata_album_album_name: "Hollywood's Bleeding", ms_played: 215000 },
  { ts: "2024-01-06T08:05:00Z", master_metadata_track_name: "Watermelon Sugar", master_metadata_album_artist_name: "Harry Styles", master_metadata_album_album_name: "Fine Line", ms_played: 174000 },
  { ts: "2024-01-07T18:45:00Z", master_metadata_track_name: "drivers license", master_metadata_album_artist_name: "Olivia Rodrigo", master_metadata_album_album_name: "SOUR", ms_played: 242000 },
  { ts: "2024-01-08T20:00:00Z", master_metadata_track_name: "good 4 u", master_metadata_album_artist_name: "Olivia Rodrigo", master_metadata_album_album_name: "SOUR", ms_played: 178000 },
  { ts: "2024-01-09T11:30:00Z", master_metadata_track_name: "Industry Baby", master_metadata_album_artist_name: "Lil Nas X", master_metadata_album_album_name: "MONTERO", ms_played: 212000 },
  { ts: "2024-01-10T15:00:00Z", master_metadata_track_name: "MONTERO", master_metadata_album_artist_name: "Lil Nas X", master_metadata_album_album_name: "MONTERO", ms_played: 137000 },
  { ts: "2024-01-11T07:20:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-01-12T19:10:00Z", master_metadata_track_name: "Peaches", master_metadata_album_artist_name: "Justin Bieber", master_metadata_album_album_name: "Justice", ms_played: 198000 },
  { ts: "2024-01-13T21:00:00Z", master_metadata_track_name: "Stay", master_metadata_album_artist_name: "The Kid LAROI", master_metadata_album_album_name: "F*CK LOVE 3", ms_played: 141000 },
  { ts: "2024-02-01T10:00:00Z", master_metadata_track_name: "As It Was", master_metadata_album_artist_name: "Harry Styles", master_metadata_album_album_name: "Harry's House", ms_played: 167000 },
  { ts: "2024-02-02T09:00:00Z", master_metadata_track_name: "Heat Waves", master_metadata_album_artist_name: "Glass Animals", master_metadata_album_album_name: "Dreamland", ms_played: 238000 },
  { ts: "2024-02-03T14:00:00Z", master_metadata_track_name: "Anti-Hero", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Midnights", ms_played: 200000 },
  { ts: "2024-02-04T16:00:00Z", master_metadata_track_name: "Lavender Haze", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Midnights", ms_played: 202000 },
  { ts: "2024-02-05T22:00:00Z", master_metadata_track_name: "Flowers", master_metadata_album_artist_name: "Miley Cyrus", master_metadata_album_album_name: "Endless Summer Vacation", ms_played: 200000 },
  { ts: "2024-02-06T08:00:00Z", master_metadata_track_name: "Cruel Summer", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Lover", ms_played: 178000 },
  { ts: "2024-02-07T17:30:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-03-01T13:00:00Z", master_metadata_track_name: "Espresso", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 175000 },
  { ts: "2024-03-02T09:30:00Z", master_metadata_track_name: "Please Please Please", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 186000 },
  { ts: "2024-03-03T20:00:00Z", master_metadata_track_name: "greedy", master_metadata_album_artist_name: "Tate McRae", master_metadata_album_album_name: "think later", ms_played: 152000 },
  { ts: "2024-03-04T11:00:00Z", master_metadata_track_name: "Snooze", master_metadata_album_artist_name: "SZA", master_metadata_album_album_name: "SOS", ms_played: 220000 },
  { ts: "2024-03-05T14:30:00Z", master_metadata_track_name: "Kill Bill", master_metadata_album_artist_name: "SZA", master_metadata_album_album_name: "SOS", ms_played: 154000 },
  { ts: "2024-03-06T22:00:00Z", master_metadata_track_name: "Anti-Hero", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Midnights", ms_played: 200000 },
  { ts: "2024-03-07T08:30:00Z", master_metadata_track_name: "Heat Waves", master_metadata_album_artist_name: "Glass Animals", master_metadata_album_album_name: "Dreamland", ms_played: 238000 },
  { ts: "2024-03-10T19:00:00Z", master_metadata_track_name: "Flowers", master_metadata_album_artist_name: "Miley Cyrus", master_metadata_album_album_name: "Endless Summer Vacation", ms_played: 200000 },
  { ts: "2024-04-01T10:00:00Z", master_metadata_track_name: "Levitating", master_metadata_album_artist_name: "Dua Lipa", master_metadata_album_album_name: "Future Nostalgia", ms_played: 203000 },
  { ts: "2024-04-02T21:00:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-04-03T09:00:00Z", master_metadata_track_name: "Cruel Summer", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Lover", ms_played: 178000 },
  { ts: "2024-04-04T14:00:00Z", master_metadata_track_name: "Espresso", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 175000 },
  { ts: "2024-04-05T20:00:00Z", master_metadata_track_name: "drivers license", master_metadata_album_artist_name: "Olivia Rodrigo", master_metadata_album_album_name: "SOUR", ms_played: 242000 },
  { ts: "2024-05-01T08:00:00Z", master_metadata_track_name: "APT.", master_metadata_album_artist_name: "ROSÉ & Bruno Mars", master_metadata_album_album_name: "APT.", ms_played: 177000 },
  { ts: "2024-05-02T18:00:00Z", master_metadata_track_name: "Espresso", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 175000 },
  { ts: "2024-05-03T22:00:00Z", master_metadata_track_name: "Birds of a Feather", master_metadata_album_artist_name: "Billie Eilish", master_metadata_album_album_name: "HIT ME HARD AND SOFT", ms_played: 210000 },
  { ts: "2024-05-04T10:00:00Z", master_metadata_track_name: "LUNCH", master_metadata_album_artist_name: "Billie Eilish", master_metadata_album_album_name: "HIT ME HARD AND SOFT", ms_played: 158000 },
  { ts: "2024-05-05T15:00:00Z", master_metadata_track_name: "Snooze", master_metadata_album_artist_name: "SZA", master_metadata_album_album_name: "SOS", ms_played: 220000 },
  { ts: "2024-05-06T20:00:00Z", master_metadata_track_name: "Kill Bill", master_metadata_album_artist_name: "SZA", master_metadata_album_album_name: "SOS", ms_played: 154000 },
  { ts: "2024-06-01T09:00:00Z", master_metadata_track_name: "Good Luck, Babe!", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 218000 },
  { ts: "2024-06-02T14:00:00Z", master_metadata_track_name: "Pink Pony Club", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 252000 },
  { ts: "2024-06-03T20:00:00Z", master_metadata_track_name: "APT.", master_metadata_album_artist_name: "ROSÉ & Bruno Mars", master_metadata_album_album_name: "APT.", ms_played: 177000 },
  { ts: "2024-06-04T22:30:00Z", master_metadata_track_name: "Birds of a Feather", master_metadata_album_artist_name: "Billie Eilish", master_metadata_album_album_name: "HIT ME HARD AND SOFT", ms_played: 210000 },
  { ts: "2024-06-05T08:00:00Z", master_metadata_track_name: "Good Luck, Babe!", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 218000 },
  { ts: "2024-07-01T10:00:00Z", master_metadata_track_name: "Espresso", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 175000 },
  { ts: "2024-07-02T21:00:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-07-03T16:00:00Z", master_metadata_track_name: "Good Luck, Babe!", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 218000 },
  { ts: "2024-07-04T12:00:00Z", master_metadata_track_name: "Cruel Summer", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Lover", ms_played: 178000 },
  { ts: "2024-08-01T09:30:00Z", master_metadata_track_name: "Please Please Please", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 186000 },
  { ts: "2024-08-02T20:00:00Z", master_metadata_track_name: "Pink Pony Club", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 252000 },
  { ts: "2024-08-03T22:00:00Z", master_metadata_track_name: "APT.", master_metadata_album_artist_name: "ROSÉ & Bruno Mars", master_metadata_album_album_name: "APT.", ms_played: 177000 },
  { ts: "2024-09-01T08:00:00Z", master_metadata_track_name: "Birds of a Feather", master_metadata_album_artist_name: "Billie Eilish", master_metadata_album_album_name: "HIT ME HARD AND SOFT", ms_played: 210000 },
  { ts: "2024-09-02T18:00:00Z", master_metadata_track_name: "Heat Waves", master_metadata_album_artist_name: "Glass Animals", master_metadata_album_album_name: "Dreamland", ms_played: 238000 },
  { ts: "2024-09-03T23:00:00Z", master_metadata_track_name: "Snooze", master_metadata_album_artist_name: "SZA", master_metadata_album_album_name: "SOS", ms_played: 220000 },
  { ts: "2024-10-01T10:00:00Z", master_metadata_track_name: "APT.", master_metadata_album_artist_name: "ROSÉ & Bruno Mars", master_metadata_album_album_name: "APT.", ms_played: 177000 },
  { ts: "2024-10-02T14:00:00Z", master_metadata_track_name: "Good Luck, Babe!", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 218000 },
  { ts: "2024-10-03T20:00:00Z", master_metadata_track_name: "Espresso", master_metadata_album_artist_name: "Sabrina Carpenter", master_metadata_album_album_name: "Short n' Sweet", ms_played: 175000 },
  { ts: "2024-11-01T09:00:00Z", master_metadata_track_name: "Pink Pony Club", master_metadata_album_artist_name: "Chappell Roan", master_metadata_album_album_name: "The Rise and Fall of a Midwest Princess", ms_played: 252000 },
  { ts: "2024-11-02T19:00:00Z", master_metadata_track_name: "Blinding Lights", master_metadata_album_artist_name: "The Weeknd", master_metadata_album_album_name: "After Hours", ms_played: 215000 },
  { ts: "2024-12-01T08:00:00Z", master_metadata_track_name: "Cruel Summer", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Lover", ms_played: 178000 },
  { ts: "2024-12-02T22:00:00Z", master_metadata_track_name: "Anti-Hero", master_metadata_album_artist_name: "Taylor Swift", master_metadata_album_album_name: "Midnights", ms_played: 200000 },
  { ts: "2024-12-03T15:00:00Z", master_metadata_track_name: "APT.", master_metadata_album_artist_name: "ROSÉ & Bruno Mars", master_metadata_album_album_name: "APT.", ms_played: 177000 },
];

// ── ANALYSIS ENGINE ──────────────────────────────────────────────────────────
function analyzeData(raw) {
  const tracks = raw.filter(r => r.ms_played > 30000);

  // Top tracks
  const trackCounts = {};
  tracks.forEach(r => {
    const key = r.master_metadata_track_name;
    if (!key) return;
    trackCounts[key] = (trackCounts[key] || { plays: 0, ms: 0, artist: r.master_metadata_album_artist_name });
    trackCounts[key].plays++;
    trackCounts[key].ms += r.ms_played;
  });
  const topTracks = Object.entries(trackCounts)
    .sort((a, b) => b[1].plays - a[1].plays)
    .slice(0, 10)
    .map(([name, v]) => ({ name, plays: v.plays, artist: v.artist, mins: Math.round(v.ms / 60000) }));

  // Top artists
  const artistCounts = {};
  tracks.forEach(r => {
    const key = r.master_metadata_album_artist_name;
    if (!key) return;
    artistCounts[key] = (artistCounts[key] || { plays: 0, ms: 0 });
    artistCounts[key].plays++;
    artistCounts[key].ms += r.ms_played;
  });
  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1].plays - a[1].plays)
    .slice(0, 8)
    .map(([name, v]) => ({ name, plays: v.plays, hrs: +(v.ms / 3600000).toFixed(1) }));

  // Listening by hour
  const hourCounts = Array(24).fill(0);
  tracks.forEach(r => { hourCounts[new Date(r.ts).getUTCHours()]++; });
  const byHour = hourCounts.map((count, h) => ({ hour: `${h}:00`, count }));

  // Listening by day of week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayCounts = Array(7).fill(0);
  tracks.forEach(r => { dayCounts[new Date(r.ts).getUTCDay()]++; });
  const byDay = dayCounts.map((count, i) => ({ day: days[i], count }));

  // Monthly listening
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthData = {};
  tracks.forEach(r => {
    const d = new Date(r.ts);
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    monthData[key] = monthData[key] || { label: monthNames[d.getUTCMonth()], ms: 0, plays: 0 };
    monthData[key].ms += r.ms_played;
    monthData[key].plays++;
  });
  const byMonth = Object.entries(monthData)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, v]) => ({ month: v.label, plays: v.plays, hrs: +(v.ms / 3600000).toFixed(1) }));

  // Mood radar (simulated based on artist/track patterns)
  const mood = [
    { subject: "Energy", value: 78 },
    { subject: "Danceability", value: 82 },
    { subject: "Valence", value: 65 },
    { subject: "Acousticness", value: 30 },
    { subject: "Speechiness", value: 18 },
    { subject: "Instrumentalness", value: 12 },
  ];

  // Genre pie (simulated)
  const genres = [
    { name: "Pop", value: 45 },
    { name: "R&B / Soul", value: 22 },
    { name: "Indie / Alt", value: 15 },
    { name: "Hip-Hop", value: 12 },
    { name: "Other", value: 6 },
  ];

  const totalMins = Math.round(tracks.reduce((s, r) => s + r.ms_played, 0) / 60000);
  const uniqueArtists = new Set(tracks.map(r => r.master_metadata_album_artist_name)).size;
  const uniqueTracks = new Set(tracks.map(r => r.master_metadata_track_name)).size;

  return { topTracks, topArtists, byHour, byDay, byMonth, mood, genres, totalMins, uniqueArtists, uniqueTracks, totalPlays: tracks.length };
}

// ── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 14px" }}>
      <p style={{ color: "#aaa", fontSize: 11, margin: 0 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color || "#e8ff47", fontSize: 13, margin: "2px 0", fontWeight: 600 }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function MusicDashboard() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDemo, setIsDemo] = useState(true);
  const fileRef = useRef();

  useEffect(() => {
    setData(analyzeData(sampleData));
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        let parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) parsed = [parsed];
        setData(analyzeData(parsed));
        setUploadedFile(file.name);
        setIsDemo(false);
      } catch { alert("Could not parse JSON. Make sure it's a Spotify streaming history file."); }
    };
    reader.readAsText(file);
  };

  const ACCENT = "#e8ff47";
  const ACCENT2 = "#ff6b6b";
  const ACCENT3 = "#47c8ff";
  const PIE_COLORS = [ACCENT, ACCENT2, ACCENT3, "#c47aff", "#ff9f47"];

  const tabs = ["overview", "artists", "tracks", "patterns", "mood"];

  if (!data) return <div style={{ background: "#080808", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "monospace" }}>Analyzing...</div>;

  return (
    <div style={{
      background: "#080808",
      minHeight: "100vh",
      color: "#e8e8e8",
      fontFamily: "'DM Mono', 'Courier New', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 8px 20px; font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; transition: all 0.2s; }
        .tab-btn:hover { color: #e8ff47; }
        .stat-card { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 12px; padding: 24px; transition: border-color 0.2s; }
        .stat-card:hover { border-color: #2a2a2a; }
        .upload-zone { border: 1px dashed #2a2a2a; border-radius: 12px; padding: 16px 24px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; }
        .upload-zone:hover { border-color: #e8ff47; background: rgba(232,255,71,0.03); }
        .track-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #111; transition: background 0.15s; }
        .track-row:hover { background: rgba(255,255,255,0.02); }
        .section-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #fff; margin: 0 0 4px; }
        .label { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #555; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #151515", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="label" style={{ marginBottom: 4 }}>Data Science Project</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: -2, color: "#fff" }}>
            Music<span style={{ color: ACCENT }}>.</span>Analysis
          </h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isDemo && <span style={{ fontSize: 11, color: "#555", letterSpacing: 1 }}>DEMO DATA</span>}
          {uploadedFile && <span style={{ fontSize: 11, color: ACCENT, letterSpacing: 1 }}>{uploadedFile}</span>}
          <div className="upload-zone" onClick={() => fileRef.current?.click()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span style={{ fontSize: 12, color: "#888" }}>Upload your Spotify JSON</span>
          </div>
          <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFile} />
        </div>
      </div>

      {/* TABS */}
      <div style={{ borderBottom: "1px solid #151515", padding: "0 32px", display: "flex", gap: 4 }}>
        {tabs.map(t => (
          <button key={t} className="tab-btn" onClick={() => setActiveTab(t)}
            style={{ color: activeTab === t ? ACCENT : "#444", borderBottom: activeTab === t ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div>
            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Total Plays", val: data.totalPlays.toLocaleString(), color: ACCENT },
                { label: "Minutes Listened", val: data.totalMins.toLocaleString(), color: ACCENT2 },
                { label: "Unique Tracks", val: data.uniqueTracks, color: ACCENT3 },
                { label: "Unique Artists", val: data.uniqueArtists, color: "#c47aff" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="label" style={{ marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 36, fontWeight: 500, color: s.color, letterSpacing: -1, lineHeight: 1 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Monthly trend + Genre pie */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
              <div className="stat-card">
                <div className="section-title" style={{ fontSize: 20 }}>Monthly Activity</div>
                <div className="label" style={{ marginBottom: 20 }}>plays per month</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data.byMonth}>
                    <CartesianGrid stroke="#151515" />
                    <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="plays" stroke={ACCENT} strokeWidth={2} dot={{ fill: ACCENT, r: 4 }} name="Plays" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="stat-card">
                <div className="section-title" style={{ fontSize: 20 }}>Genre Mix</div>
                <div className="label" style={{ marginBottom: 20 }}>estimated breakdown</div>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={data.genres} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                      {data.genres.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", marginTop: 8 }}>
                  {data.genres.map((g, i) => (
                    <div key={g.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: PIE_COLORS[i] }} />
                      <span style={{ fontSize: 11, color: "#888" }}>{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top artist */}
            <div className="stat-card">
              <div className="section-title" style={{ fontSize: 20, marginBottom: 4 }}>Your #1 Artist</div>
              <div className="label" style={{ marginBottom: 16 }}>most played this year</div>
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${ACCENT}, #2a3a00)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🎵</div>
                <div>
                  <div style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#fff" }}>{data.topArtists[0].name}</div>
                  <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>{data.topArtists[0].plays} plays · {data.topArtists[0].hrs} hours</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ARTISTS ── */}
        {activeTab === "artists" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <p className="section-title">Top Artists</p>
              <p className="label">ranked by play count</p>
            </div>
            <div className="stat-card" style={{ marginBottom: 24 }}>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={data.topArtists} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fill: "#555", fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "#ccc", fontSize: 12 }} width={130} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="plays" radius={[0, 6, 6, 0]} name="Plays">
                    {data.topArtists.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? ACCENT : i === 1 ? ACCENT2 : i === 2 ? ACCENT3 : "#2a2a2a"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {data.topArtists.map((a, i) => (
                <div key={a.name} className="stat-card" style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#222", minWidth: 32 }}>#{i+1}</div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: "#ddd" }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{a.plays} plays · {a.hrs}h</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRACKS ── */}
        {activeTab === "tracks" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <p className="section-title">Top Tracks</p>
              <p className="label">your most-played songs</p>
            </div>
            <div className="stat-card">
              {data.topTracks.map((t, i) => (
                <div key={t.name} className="track-row">
                  <div style={{ fontSize: 13, color: i < 3 ? ACCENT : "#333", minWidth: 28, fontWeight: 600 }}>#{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "#ddd", fontWeight: 500 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.artist}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 500, color: ACCENT }}>{t.plays}</div>
                    <div style={{ fontSize: 10, color: "#444" }}>plays</div>
                  </div>
                  <div style={{ width: 80, height: 6, background: "#1a1a1a", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(t.plays / data.topTracks[0].plays) * 100}%`, background: ACCENT, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PATTERNS ── */}
        {activeTab === "patterns" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <p className="section-title">Listening Patterns</p>
              <p className="label">when you vibe the most</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div className="stat-card">
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>By Hour of Day</div>
                <div className="label" style={{ marginBottom: 16 }}>UTC</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.byHour}>
                    <XAxis dataKey="hour" tick={{ fill: "#444", fontSize: 9 }} interval={3} />
                    <YAxis tick={{ fill: "#444", fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[3, 3, 0, 0]} name="Plays">
                      {data.byHour.map((d, i) => <Cell key={i} fill={d.count === Math.max(...data.byHour.map(x => x.count)) ? ACCENT : "#1e1e1e"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>By Day of Week</div>
                <div className="label" style={{ marginBottom: 16 }}>average plays</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.byDay}>
                    <XAxis dataKey="day" tick={{ fill: "#555", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[3, 3, 0, 0]} name="Plays">
                      {data.byDay.map((d, i) => <Cell key={i} fill={d.count === Math.max(...data.byDay.map(x => x.count)) ? ACCENT2 : "#1e1e1e"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Peak stat */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
              {[
                { label: "Peak Hour", val: data.byHour.reduce((a, b) => a.count > b.count ? a : b).hour, sub: "most active time" },
                { label: "Peak Day", val: data.byDay.reduce((a, b) => a.count > b.count ? a : b).day, sub: "most active day" },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
                  <div className="label" style={{ marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 48, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: ACCENT }}>{s.val}</div>
                  <div style={{ color: "#444", fontSize: 11, marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MOOD ── */}
        {activeTab === "mood" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <p className="section-title">Mood Profile</p>
              <p className="label">audio features estimated from your taste</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div className="stat-card">
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>Audio Feature Radar</div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={data.mood} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="#1a1a1a" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#666", fontSize: 11 }} />
                    <Radar name="Your Music" dataKey="value" stroke={ACCENT} fill={ACCENT} fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>Feature Breakdown</div>
                {data.mood.map(m => (
                  <div key={m.subject} style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "#999" }}>{m.subject}</span>
                      <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>{m.value}%</span>
                    </div>
                    <div style={{ height: 6, background: "#151515", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${m.value}%`, background: `linear-gradient(90deg, ${ACCENT}88, ${ACCENT})`, borderRadius: 3, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="stat-card" style={{ marginTop: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Taste Summary</div>
              <div style={{ color: "#888", fontSize: 14, lineHeight: 1.8 }}>
                You lean toward <span style={{ color: ACCENT }}>high-energy, danceable pop</span> with moderate emotional valence — your music is upbeat but not always euphoric. 
                Low acousticness suggests a preference for <span style={{ color: ACCENT2 }}>produced, electronic-influenced tracks</span>. 
                Minimal speechiness means you favor melodic singing over rap-heavy content. 
                Your profile fits a <span style={{ color: ACCENT3 }}>mainstream pop listener</span> with taste crossing into R&B and indie.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #111", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#333", letterSpacing: 2 }}>MUSIC TASTE ANALYSIS · DATA SCIENCE PROJECT</span>
        <span style={{ fontSize: 10, color: "#333" }}>{isDemo ? "SAMPLE DATA — upload your Spotify JSON to analyze real stats" : `Analyzing: ${uploadedFile}`}</span>
      </div>
    </div>
  );
}
