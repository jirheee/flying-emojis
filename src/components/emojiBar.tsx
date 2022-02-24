import React from 'react';
import styled from 'styled-components';

const EmojiButton = styled.button`
  background: none;
  font-size: 30px;
  border: none;
  padding: 0.4em;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
`;

/**
😀 😃 😄 😁 😆 😅 😂 🤣 🥲 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠
 */

interface EmojiClickEventTarget extends EventTarget {
  innerText: string;
}

export interface EmojiClickMouseEvent
  extends React.MouseEvent<HTMLButtonElement> {
  target: EmojiClickEventTarget;
}

interface EmojiBarProps {
  onClick: (e: EmojiClickMouseEvent) => void;
}

const EmojiBar: React.FC<EmojiBarProps> = ({ onClick }) => {
  const emojis = ['😀', '🤣', '😢', '🤯', '🤔', '😐'];

  return (
    <div>
      {emojis.map(emoji => (
        <EmojiButton
          onClick={(e: EmojiClickMouseEvent) => {
            onClick(e);
            const flyEmojiEvent = new CustomEvent('fly_emoji', {
              detail: { emoji }
            });
            window.dispatchEvent(flyEmojiEvent);
          }}
          key={emoji}
        >
          {emoji}
        </EmojiButton>
      ))}
    </div>
  );
};

export default EmojiBar;
