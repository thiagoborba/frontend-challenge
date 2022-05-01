import React from 'react';
import { Layout, Link, Paragraph, Spacing, Title } from '../../Components';
import { useLocation } from 'react-router-dom'
import { PAGE } from '../../constants';
import { GlobalContext } from '../../Context'
import styles from './styles.module.scss'
import dayjs from 'dayjs'

export const CharacterInfos: React.FC = () => {
  const { state: { characters, species, vehicles, starships, films } } = GlobalContext()
  const location = useLocation()
  const characterName = decodeURI(location.pathname.split(PAGE.CHARACTERS_INFO(''))[1])
  const character = characters.find(char => char.name === characterName)

  const updateHour = dayjs(character?.edited).format("HH:MM")
  const updateDate = dayjs(character?.edited).format("DD/MM/YYYY")

  const createsHour = dayjs(character?.created).format("HH:MM")
  const createsDate = dayjs(character?.created).format("DD/MM/YYYY")

  const totalOfFilms = films.length

  const appearancesInFilms = character?.films.length!

  const appearancesInFilmsPorcentage = (appearancesInFilms / totalOfFilms) * 100

  return (
    <Layout className={styles.container}>
      <Spacing appearance='xx-large' />
      <div
        className={styles['name-container']}
      >
        <Title as='h2'>
          {character?.name.toLocaleLowerCase()}
        </Title>
        <div className={styles['date-container']}>
          <Paragraph> ATUALIZADA EM: {updateDate} ás {updateHour}</Paragraph>
          <Paragraph> CRIADO EM: {createsDate} ás {createsHour}</Paragraph>
        </div>
      </div>
      <Spacing appearance='xx-large' />

      <div className={styles.grid}>
        <div
          className={styles.infos}
        >
          <Title as='h4'>
            informações físicas
          </Title>
          <Spacing appearance='medium' />
          <div>
            <Paragraph>
              ESPÉCIE: {species.find(specie => specie.url === character?.species[0])?.name}
            </Paragraph>
            <Paragraph>
              ALTURA: {character?.height} CM
            </Paragraph>
            <Paragraph>
              PESO: {character?.mass} KG
            </Paragraph>
            <Paragraph>
              COR DO CABELO: {character?.hair_color.toUpperCase()}
            </Paragraph>
          </div>
        </div>
        <div
          className={styles.vehicles}
        >
          <Title as='h4'>
            veículos e naves utilizados
          </Title>
          <Spacing appearance='medium' />
          <div>
            <div>
              <Title as='h6' color='lightSolid'>
                veículos
              </Title>
              <Spacing appearance='xx-small' />
              {character?.vehicles.map(vehicle => (
                <Paragraph>
                  {vehicles.find(v => v.url === vehicle)?.name}
                </Paragraph>
              ))}
            </div>
            <div>
              <Title as='h6' color='lightSolid'>
                naves
              </Title>
              <Spacing appearance='xx-small' />
              {character?.starships.map(starship => (
                <Paragraph>
                  {starships.find(s => s.url === starship)?.name}
                </Paragraph>
              ))}
            </div>
          </div>
        </div>
        <div
          className={styles.films}
        >
          <Title as='h4'>
            Aparições em filmes
          </Title>
          <Spacing appearance='medium' />

          <div
            className={styles['pie-container']}
          >
            <div
              id='pie-chart'
              style={{
                width: '174px',
                height: '174px',
                borderRadius: '50%',
                background: `conic-gradient(yellow ${appearancesInFilmsPorcentage}%, #7388A95A 0)`,
              }}
            >
            </div>
            <Spacing appearance='small' />
            <Paragraph>{ appearancesInFilmsPorcentage.toFixed(2) }% ({appearancesInFilms} de {totalOfFilms})</Paragraph>
          </div>
          <Spacing appearance='medium' />
          <Title as='h6' color='lightSolid'>
          Aparece em
          </Title>

          <Spacing appearance='xx-small' />
          { character?.films.map(film => {
            const filmName = films.find(f => f.url === film)?.title!
            return (
              <React.Fragment>
              <Link to={PAGE.FILMS_INFO(filmName)}>{filmName}</Link>
              <br></br>
              </React.Fragment>
            )}
          ) }
        </div>
      </div>
    </Layout>
  )
}

export default CharacterInfos