import React, { useState } from 'react';
import './App.css';
import EmojiBar, { EmojiClickMouseEvent } from './components/emojiBar';
import FlyingEmojiOverlay from './components/flyingEmojiOverlay';
import Video from './components/video';
import VideoRecorder from './components/videoRecorder';

function App() {
  const [emotionLog, setEmotionLog] = useState<string[]>([]);

  const handleEmojiClick = (e: EmojiClickMouseEvent) => {
    setEmotionLog(log => [...log, e.target.innerText]);
  };

  // useEffect(() => {
  //   console.log(emotionLog);
  // }, [emotionLog]);

  return (
    <div className="App">
      <Video src="videos/math.mp4" />
      <EmojiBar onClick={handleEmojiClick} />
      <VideoRecorder />
      <FlyingEmojiOverlay />
    </div>
  );
}

export default App;
