import React from 'react'
import Card from '../../../Components/Card'
import { Character } from '../../../Api/models';
import { Button, Layout, Paragraph, Spacing, Title } from '../../../Components';
import styles from './styles.module.scss'

type Props = {
  character: Pick<Character, "birth_year" | "homeworld" | 'species' | 'height' | 'vehicles' | 'name'>;
} 

export const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <Card className={styles.container}>
      <Spacing appearance='xx-small'/>
      <Title as='h4'>
        { character.name }
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
        <Paragraph>
          { vehicle }
        </Paragraph>
      )) }
      <Spacing appearance='medium'/>
      <Button>
        ver detalhes
      </Button>
    </Card>
  )
}