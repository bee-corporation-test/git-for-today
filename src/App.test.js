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

  test('can access the drag race api', async () => {
    const allQueensInSeasonURL = 'http://www.nokeynoshade.party/api/seasons/1/queens';

    const myObject = await fetch(allQueensInSeasonURL);
    const queens = await myObject.json();

    const ninaFlowers =  queens.find( queen => queen.id == 11);

    expect(myObject.status).toBe(200);
    expect(ninaFlowers.name).toMatch('Nina Flowers');
    expect(ninaFlowers.winner).toBe(false);
    expect(ninaFlowers.missCongeniality).toBe(true);
    expect(ninaFlowers.image_url).toMatch("http://www.nokeynoshade.party/images/nina-flowers.jpg");

  });

  test('can access the makeup api', async () => {
    // a note that this api is slow if you do not specify any search params
    const makeupURL = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';


    const myObject = await fetch(makeupURL);
    const makeupProducts = await myObject.json();

    const expressEyeliner = makeupProducts.find(product => product.id == 232);

    expect(myObject.status).toBe(200);
    expect(makeupProducts.length).toBe(54);
    expect(expressEyeliner.name).toMatch('Maybelline Line Express Eyeliner');
    expect(expressEyeliner.product_type).toMatch('eyeliner');
  });

  test('can access the openbrewery api', async () => {
    const breweriesURL = 'https://api.openbrewerydb.org/breweries';

    const myObject = await fetch(breweriesURL);
    const breweries = await myObject.json();
    const snowBeltBrewery = breweries.find(brewery => brewery.id == 14417);

    expect(myObject.status).toBe(200);
    expect(snowBeltBrewery.name).toMatch('Snow Belt Brew')
  });
});
