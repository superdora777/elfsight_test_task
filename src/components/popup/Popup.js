import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useBodyScrollLock, useKeyPress } from '../../hooks';
import { COLORS, TRANSITIONS } from '../../constants/theme';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  const closePopup = useCallback(() => {
    setSettings((prevState) => ({
      ...prevState,
      visible: false
    }));
  }, [setSettings]);

  const togglePopup = useCallback(
    (e) => {
      if (e && e.currentTarget !== e.target) {
        return;
      }

      setSettings((prevState) => ({
        ...prevState,
        visible: !prevState.visible
      }));
    },
    [setSettings]
  );

  useBodyScrollLock(visible);
  useKeyPress('Escape', closePopup, visible);

  return (
    <PopupContainer visible={visible} onClick={togglePopup}>
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: ${COLORS.overlay};
  width: 100%;
  height: 100vh;
  color: ${COLORS.text};
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity ${TRANSITIONS.normal}, visible ${TRANSITIONS.normal};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: ${COLORS.cardBackground};
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid ${COLORS.primary};
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.closeButton};

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: ${COLORS.text};
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  @media (max-width: 930px) {
    right: calc(10% - 10px);
  }

  @media (max-width: 600px) {
    right: calc(3% - 10px);
  }
`;
