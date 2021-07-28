import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Test to test the tests', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe('external apis that are still working',() => {
  test('can access the pokemon api', async () => {
    const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/1/';
   
      const myObject = await fetch(pokemonURL);
      const pokemon = await myObject.json();
       
      expect(myObject.status).toBe(200);
      expect(pokemon.name).toBe('bulbasaur');
  });

  test('can access the drag race api', async () => {
    const allQueensInSeasonURL = 'http://www.nokeynoshade.party/api/seasons/1/queens';

    const myObject = await fetch(allQueensInSeasonURL);
    const queens = await myObject.json();

    const ninaFlowers =  queens.filter( queen => queen.id == 11)[0];
    expect(myObject.status).toBe(200);
    expect(ninaFlowers.name).toMatch('Nina Flowers');
    expect(ninaFlowers.winner).toBe(false);
    expect(ninaFlowers.missCongeniality).toBe(true);
    expect(ninaFlowers.image_url).toMatch("http://www.nokeynoshade.party/images/nina-flowers.jpg");

  });
});
