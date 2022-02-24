import React from 'react';

interface VideoProps {
  src: string;
}

const Video: React.FC<VideoProps> = ({ src }) => {
  return (
    <video controls loop width="100%" height="100%">
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default Video;
