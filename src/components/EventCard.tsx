import React from "react";
import { useNavigate } from "react-router-dom";
import type { EventItem } from "../types/events";
import * as S from "../styles/styles.eventsCard";
import { useTheme } from "../context/ThemeContext";

interface EventCardProps extends EventItem {}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  type,
  company,
  date,
  isNew,
  tags,
  imageUrl,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <S.EventCardContainer
      theme={theme}
      onClick={() => navigate(`/events/${id}`)}
    >
      {isNew && <S.BadgeNew theme={theme}>NEW</S.BadgeNew>}
      <S.EventImage imageUrl={imageUrl} eventType={type} />
      <S.EventInfo theme={theme}>
        <S.EventTitle>{title}</S.EventTitle>
        <S.EventType>{type}</S.EventType>
        <S.CompanyText>{company}</S.CompanyText>
        <S.DateText>{date}</S.DateText>
        {tags && tags.length > 0 && (
          <S.TagsContainer>
            {tags.map((tag) => (
              <S.Tag theme={theme} key={tag}>
                {tag}
              </S.Tag>
            ))}
          </S.TagsContainer>
        )}
      </S.EventInfo>
    </S.EventCardContainer>
  );
};

export default EventCard;
