import styled from 'styled-components';
import { ReactComponent as Male } from '../../assets/genders/male.svg';
import { ReactComponent as Female } from '../../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../../assets/genders/genderless.svg';
import { COLORS, BREAKPOINTS, TRANSITIONS } from '../../constants/theme';

const GENDER_ICONS = {
  Male: { Component: Male, size: 20, color: COLORS.genderMale },
  Female: { Component: Female, size: 24, color: COLORS.genderFemale },
  unknown: { Component: Genderless, size: 24, color: COLORS.genderUnknown },
  Genderless: { Component: Genderless, size: 24, color: COLORS.genderUnknown }
};

export function CardTitle({ name, gender, className }) {
  const genderConfig = GENDER_ICONS[gender];

  const Icon = genderConfig ? (
    <genderConfig.Component
      width={genderConfig.size}
      height={genderConfig.size}
      fill={genderConfig.color}
      title={gender}
    />
  ) : null;

  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>

      <IconContainer>{Icon}</IconContainer>
    </CardTitleContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color ${TRANSITIONS.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    max-width: 130px;
    font-size: 18px;
  }
`;
