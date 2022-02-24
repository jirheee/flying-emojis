import React, { useEffect, useRef, useState } from 'react';
import Human, { Emotion } from '@vladmandic/human';

type EmotionRecord = Record<Emotion, number>;

const initionEmotionRecord = {
  sad: 0,
  angry: 0,
  neutral: 0,
  happy: 0,
  disgust: 0,
  fear: 0,
  surprise: 0
};

const VideoRecorder = () => {
  const previewRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const humanRef = useRef<Human | null>(null);

  const [emotionRecord, setEmotionRecord] =
    useState<EmotionRecord>(initionEmotionRecord);

  useEffect(() => {
    humanRef.current = new Human({
      backend: 'webgl',
      modelBasePath: 'models'
    });
    humanRef.current.load({
      body: { enabled: false },
      gesture: { enabled: false },
      object: { enabled: false },
      segmentation: { enabled: false },
      hand: { enabled: false }
    });
  }, []);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async stream => {
        if (previewRef.current) {
          previewRef.current.srcObject = stream;
        }
      });
  };

  const detectVideo = () => {
    humanRef.current?.detect(previewRef.current).then(result => {
      if (humanRef.current) {
        humanRef.current.draw.canvas(result.canvas, canvasRef.current);

        const [{ emotion }] =
          result.face.length === 0
            ? [
                {
                  emotion: [] as {
                    emotion: Emotion;
                    score: number;
                  }[]
                }
              ]
            : result.face;

        emotion?.forEach(e => {
          emotionRecord[e.emotion] = e.score;
        });

        setEmotionRecord(() => {
          return {
            ...initionEmotionRecord,
            ...emotion?.reduce((acc, curr) => {
              return { ...acc, [curr.emotion]: curr.score };
            }, {})
          };
        });

        humanRef.current.draw.face(canvasRef.current, result.face);

        requestAnimationFrame(detectVideo);
      }
    });
  };

  return (
    <>
      <video
        ref={previewRef}
        id="preview"
        width="50%"
        height="50%"
        autoPlay
        muted
        style={{ transform: 'scaleX(-1)' }}
      />
      <canvas width="600px" height="600px" ref={canvasRef} />
      <div>{JSON.stringify(emotionRecord)}</div>
      <button onClick={handleStartRecording}>🎥</button>
      <button
        onClick={() => {
          if (previewRef && humanRef.current && canvasRef.current) {
            detectVideo();
          }
        }}
      >
        😫
      </button>
    </>
  );
};

export default VideoRecorder;
