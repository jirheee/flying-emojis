export interface FlyingEmojiEventTarget extends EventTarget {
  id: string;
}

export interface FlyingEmojiAnimationEvent extends AnimationEvent {
  target: FlyingEmojiEventTarget;
}

export const FlyEmojiEventType = 'fly_emoji';

class FlyEmojiCustomEvent extends CustomEvent<FlyEmojiDetail> {
  constructor(detail: FlyEmojiDetail) {
    super(FlyEmojiEventType, { detail });
  }
}

interface FlyEmojiDetail {
  emoji: string;
}

export default FlyEmojiCustomEvent;

declare global {
  interface WindowEventMap {
    [FlyEmojiEventType]: FlyEmojiCustomEvent;
  }
}
