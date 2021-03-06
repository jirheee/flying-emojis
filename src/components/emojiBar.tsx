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
๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คฃ ๐ฅฒ โบ๏ธ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ฅฐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐ ๐คช ๐คจ ๐ง ๐ค ๐ ๐ฅธ ๐คฉ ๐ฅณ ๐ ๐ ๐ ๐ ๐ ๐ ๐ โน๏ธ ๐ฃ ๐ ๐ซ ๐ฉ ๐ฅบ ๐ข ๐ญ ๐ค ๐  ๐ก ๐คฌ ๐คฏ ๐ณ ๐ฅต ๐ฅถ ๐ฑ ๐จ ๐ฐ ๐ฅ ๐ ๐ค ๐ค ๐คญ ๐คซ ๐คฅ ๐ถ ๐ ๐ ๐ฌ ๐ ๐ฏ ๐ฆ ๐ง ๐ฎ ๐ฒ ๐ฅฑ ๐ด ๐คค ๐ช ๐ต ๐ค ๐ฅด ๐คข ๐คฎ ๐คง ๐ท ๐ค ๐ค ๐ค ๐ค 
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
  const emojis = ['๐', '๐คฃ', '๐ข', '๐คฏ', '๐ค', '๐'];

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
