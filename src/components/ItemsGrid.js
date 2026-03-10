import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Popup } from './popup';
import { useData } from './providers';
import { Card } from './Card/index';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

function CharacterCard({ character, onClickHandler }) {
  const handleClick = useCallback(() => {
    onClickHandler(character);
  }, [character, onClickHandler]);

  return <Card onClickHandler={handleClick} {...character} />;
}

export function ItemsGrid() {
  const { characters } = useData();
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const cardOnClickHandler = useCallback((props) => {
    setPopupSettings({
      visible: true,
      content: { ...props }
    });
  }, []);

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClickHandler={cardOnClickHandler}
        />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
