import { ENDPOINT } from '../constants';
import { request } from './config'
import { Character, Film, Planet, Specie, Starship, Vehicle } from './models';

function getStarWarsData<t>(url: string) {
  let requestResponse: t[] = [] 
  return request(url)
    .then(response => {
      requestResponse = response.data.results;
      return response.data.count;
    })
    .then(count => {
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      for (let i = 2; i <= numberOfPagesLeft; i++) {
          promises.push(request(`${url}?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then(response => {
      requestResponse = response.reduce((acc, data) => [...acc, ...data.data.results], requestResponse);
      return requestResponse;
    })
    .catch(error => console.log(error));
}

export async function initialize () {
  const characters = await getStarWarsData<Character>(ENDPOINT.CHARACTERS()) as Character[]
  const films = await getStarWarsData<Film>(ENDPOINT.FILMS()) as Film[]
  const planets = await getStarWarsData<Planet>(ENDPOINT.PLANETS()) as Planet[]
  const starships = await getStarWarsData<Starship>(ENDPOINT.STARSHIPS()) as Starship[]
  const vehicles = await getStarWarsData<Vehicle>(ENDPOINT.VEHICLES()) as Vehicle[]
  const species = await getStarWarsData<Specie>(ENDPOINT.SPECIES()) as Specie[]

  return {
    characters,
    films,
    planets,
    starships,
    vehicles,
    species
  }
}
