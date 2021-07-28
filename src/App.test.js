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

describe('external apis still working',() => {
  test('can access the pokemon api', async () => {
    const pokemonURL = 'https://pokeapi.co/api/v2/pokemon/1/';
   
      const myObject = await fetch(pokemonURL);
      const pokemon = await myObject.json();
       
      expect(myObject.status).toBe(200);
      expect(pokemon.name).toBe('bulbasaur');
  });

  test('can access the rijksmuseum api', async () => {
    const rijksURL = new URL('https://www.rijksmuseum.nl/api/en/collection');

    rijksURL.search = new URLSearchParams({
      key: process.env.REACT_APP_RIJKS_KEY
    });

    const myObject = await fetch(rijksURL);
    const art = await myObject.json();
    const seatedCupid = art.artObjects.find(pieceOfArt => pieceOfArt.id == 'en-BK-1963-101')

    expect(myObject.status).toBe(200);
    expect(art.artObjects.length).toBe(10);
    expect(seatedCupid.title).toMatch('Seated Cupid');
    expect(seatedCupid.principalOrFirstMaker).toMatch('Étienne-Maurice Falconet');
  });
});
