import React from 'react'
import Card from '../../../Components/Card'
import { Character } from '../../../Api/models';
import { Button, Paragraph, Spacing, Title } from '../../../Components';
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { PAGE } from '../../../constants';

type Props = {
  character: Pick<Character, "birth_year" | "homeworld" | 'species' | 'height' | 'vehicles' | 'name'>;
} 

export const CharacterCard: React.FC<Props> = ({ character, ...props }) => {
  const navigate = useNavigate()

  return (
    <Card
      key={character.name}
      className={styles.container}
      { ...props }
    >
      <Spacing appearance='xx-small'/>
      <Title as='h4'>
        { character.name.toLocaleLowerCase() }
      </Title>
      <Spacing appearance='medium'/>
      <Title color='lightSolid' as='h5'>
        Nascimento
      </Title>
      <Spacing appearance='xx-small'/>
      <Paragraph>
        DATA: { character.birth_year }
      </Paragraph>
      <Paragraph>
        PLANETA: { character.homeworld }
      </Paragraph>
      <Spacing appearance='medium'/>
      <Title color='lightSolid' as='h5'>
        Descrição Fisica
      </Title>
      <Spacing appearance='xx-small'/>
      <Paragraph>
        ALTURA: { character.height }
      </Paragraph>
      <Paragraph>
        ESPÉCIE: { character.species[0] }
      </Paragraph>
      <Spacing appearance='medium'/>
      <Title color='lightSolid' as='h5'>
        veículos usados
      </Title>
      <Spacing appearance='xx-small'/>
      { character.vehicles.map(vehicle => (
        <Paragraph
          key={vehicle}
        >
          { vehicle }
        </Paragraph>
      )) }
      <Spacing appearance='medium'/>
      <Button
        onClick={() => navigate(PAGE.CHARACTERS_INFO(character.name))}
      >
        ver detalhes
      </Button>
    </Card>
  )
}