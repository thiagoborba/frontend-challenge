import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialize } from "../../Api";
import { Character } from "../../Api/models";
import {
  Grid,
  Input,
  Layout,
  Loader,
  Pagination,
  Spacing,
  Title,
} from "../../Components";
import { PAGE, PAGE_SIZE } from "../../constants";
import { GlobalContext } from "../../Context";
import { paginate } from "../../utils";
import { CharacterCard } from "./Card";
import styles from "./styles.module.scss";

type State = {
  loading: boolean;
  filteredCharacters: Character[];
  pagination: {
    totalOfPages: number;
    currentPage: number;
  };
};

export const Characters: React.FC = () => {
  const {
    state: { planets, species, vehicles, characters },
    dispatch,
    ActionTypes,
  } = GlobalContext();
  const { search } = useLocation();
  const page = search.split("?page=")[1] || 1;
  const navigate = useNavigate();

  const [{ pagination, filteredCharacters, loading }, setState] =
    useState<State>({
      loading: false,
      filteredCharacters: [],
      pagination: {
        totalOfPages: getTotalOfPages(characters?.length),
        currentPage: Number(page),
      },
    });

  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (filterValue) {
      filterCards();
    } else {
      setState((prevState) => ({
        ...prevState,
        filteredCharacters: characters,
      }));
      PaginateCards(characters, 1, getTotalOfPages(characters?.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  function filterCards() {
    const filteredCharacters = characters?.filter((char) =>
      char.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    );
    PaginateCards(
      filteredCharacters,
      1,
      getTotalOfPages(filteredCharacters?.length)
    );
  }

  function getTotalOfPages(arraylength: number) {
    return Math.ceil(arraylength / PAGE_SIZE);
  }

  const fetchStarWarsData = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const data = await initialize();
      dispatch({
        type: ActionTypes.SET_CONTEXT,
        payload: data,
      });
      setState((prevState) => ({
        ...prevState,
        pagination: { ...prevState.pagination, paginate: true },
      }));
    } catch (error) {
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [ActionTypes.SET_CONTEXT, dispatch]);

  useEffect(() => {
    if (!characters) {
      fetchStarWarsData();
    } else {
      PaginateCards(characters, 1, getTotalOfPages(characters?.length));
    }
  }, [fetchStarWarsData, characters]);

  useEffect(() => {
    const array = filterValue ? filteredCharacters : characters;
    PaginateCards(array, Number(page), getTotalOfPages(array?.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function PaginateCards(
    characters: Character[],
    currentPage: number,
    totalOfPages: number
  ) {
    const paginatedCards = paginate(currentPage, characters);
    setState((prevState) => ({
      ...prevState,
      filteredCharacters: paginatedCards,
      pagination: {
        totalOfPages,
        currentPage,
      },
    }));
  }

  return (
    <Layout>
      <Loader show={loading} />
      <div className={styles.container}>
        <Spacing appearance="xx-large" />
        <Title as="h2">tesxte integrtação</Title>
        <Spacing appearance="x-large" />
        <Input
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="FILTRE POR NOME DO PERSONAGEM"
        />
        <Spacing appearance="large" />
      </div>

      <Grid>
        {filteredCharacters?.map((character) => {
          const characterData = {
            name: character.name!,
            birth_year: character.birth_year!,
            height: character.height!,
            homeworld: planets.find(
              (planet) => planet.url === character.homeworld
            )?.name!,
            species: !character.species?.length
              ? character.species
              : [
                  species.find((specie) => specie.url === character.species[0])
                    ?.name!,
                ],
            vehicles: character.vehicles.map(
              (vehicle) => vehicles.find((v) => v.url === vehicle)!?.name
            )!,
          };

          return (
            <CharacterCard key={character.url} character={characterData} />
          );
        })}
      </Grid>
      {!filterValue && (
        <div className={styles.container}>
          <Spacing appearance="large" />
          <Pagination
            onChange={(page) =>
              navigate(`${PAGE.CHARACTERS()}?page=${page}`, { replace: true })
            }
            currentPage={pagination.currentPage}
            numberOfPages={pagination.totalOfPages}
          />
        </div>
      )}
    </Layout>
  );
};

export default Characters;
