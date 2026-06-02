// Import React and chart components
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Import your Spotify history files
import data2022 from "../Streaming_History_Audio_2022.js";
import data2023 from "../Streaming_History_Audio_2023.js";
import data2024 from "../Streaming_History_Audio_2024.js";
import data2025 from "../Streaming_History_Audio_2025.js";
import data2026 from "../Streaming_History_Audio_2026.js";




// Merge them into one dataset
const allData = [...data2022, ...data2023, ...data2024, ...data2025, ...data2026];

function App() {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    // Load combined data into state
    setMusicData(allData);
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={musicData}>
          <XAxis dataKey="master_metadata_track_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ms_played" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
