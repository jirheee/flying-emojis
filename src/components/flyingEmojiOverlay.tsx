import React, {
  AnimationEventHandler,
  ReactElement,
  useEffect,
  useState
} from 'react';
import { v4 as uuid } from 'uuid';
import '../styles/flyingEmojiOverlay.css';
import { FlyingEmojiAnimationEvent } from '../types/flyingEmojis';

interface FlyingEmojiProps {
  emoji: string;
  onAnimationEnd: AnimationEventHandler<HTMLDivElement>;
  id: string;
}

const FlyingEmoji: React.FC<FlyingEmojiProps> = ({
  emoji,
  onAnimationEnd,
  id
}) => {
  return (
    <div
      className={`emoji ${Math.random() * 1 > 0.5 ? 'wiggle-1' : 'wiggle-2'}`}
      style={{
        transform: `rotate(${-30 + Math.random() * 60}deg)`,
        left: `${10 + Math.random() * 0.8 * 100}%`
      }}
      onAnimationEnd={onAnimationEnd}
      id={id}
    >
      {emoji}
    </div>
  );
};

const FlyingEmojiOverlay: React.FC<Record<string, never>> = () => {
  const [flyingEmojis, setFlyingEmojis] = useState<ReactElement[]>([]);

  useEffect(() => {
    const handleFlyEmojiEvent = (e: CustomEvent<{ emoji: string }>) => {
      const {
        detail: { emoji }
      } = e;
      const id = uuid();

      const handleEmojiAnimationEnd: AnimationEventHandler<
        HTMLDivElement
      > = e => {
        setFlyingEmojis(emojis =>
          emojis.filter(
            emoji =>
              emoji.key !==
              (e as unknown as FlyingEmojiAnimationEvent).target.id
          )
        );
      };

      setFlyingEmojis(nodes => {
        return [
          ...nodes,
          <FlyingEmoji
            emoji={emoji}
            onAnimationEnd={handleEmojiAnimationEnd}
            id={id}
            key={id}
          />
        ];
      });
    };

    window.addEventListener('fly_emoji', handleFlyEmojiEvent);

    return () => {
      window.removeEventListener('fly_emoji', handleFlyEmojiEvent);
    };
  }, []);

  return <div className="flying-emojis">{flyingEmojis}</div>;
};

export default FlyingEmojiOverlay;
