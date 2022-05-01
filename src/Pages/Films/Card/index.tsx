import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Film } from '../../../Api/models';
import { Button, Paragraph, Spacing, Title } from '../../../Components';
import Card from '../../../Components/Card';
import { PAGE } from '../../../constants';
import styles from './styles.module.scss';

type Props = {
  film: Pick<Film, "title" | "episode_id" | "release_date" | "director" >;
} 

export const FilmCard: React.FC<Props> = ({ film, ...props }) => {
  const navigate = useNavigate()

  return (
    <Card
      key={film.title}
      className={styles.container}
      { ...props }
    >
      <Spacing appearance='xx-small'/>
      <Title as='h4'>
        { film.title.toLocaleLowerCase() }
      </Title>
      <Paragraph>
        EPISÓDIO {film.episode_id}
      </Paragraph>
      <Spacing appearance='medium'/>
      <Title color='lightSolid' as='h5'>
        informações
      </Title>
      <Spacing appearance='xx-small'/>
      <Paragraph>
        LANÇADO EM: { dayjs(film.release_date).format('DD/MM/YYY') }
      </Paragraph>
      <Paragraph>
        DIRIGIDO POR: {film.director }
      </Paragraph>
      <Spacing appearance='medium'/>
      <Button
        onClick={() => navigate(PAGE.FILMS_INFO(film.title))}
      >
        ver detalhes
      </Button>
    </Card>
  )
}