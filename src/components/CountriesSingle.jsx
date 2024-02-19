import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { fetchCountryDetails } from '../features/countries/countriesSlice';

const CountriesSingle = () => {
  const { single } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.countriesReducer);

  console.log('CountriesSingle component: ', country);
  console.log('Country React Router name: ', single);
  console.log('Country data type: ', typeof country);

  useEffect(() => {
    dispatch(fetchCountryDetails(single));
  }, []);

  return (
    country && (
      <Container>
        <Card key={country.altSpellings[0]} style={{ width: '20rem' }}>
          <Card.Img variant='top' src={country.flags.png} />
          <Card.Body>
            <Card.Title>Name: {country.name.common}</Card.Title>
            <Card.Text>Capital: {country.capital}</Card.Text>
            <Card.Text>
              Population: {country?.population.toLocaleString()}
            </Card.Text>
            <Card.Text>Region: {country?.region}</Card.Text>
            <Card.Text>Subregion: {country?.subregion}</Card.Text>
            <Card.Text>Area: {country?.area.toLocaleString()} km²</Card.Text>
            <Card.Text>Timezones: {country?.timezones}</Card.Text>
            <Card.Text>
              Currencies: {Object.values(country?.currencies)[0]?.name}
            </Card.Text>
            <Card.Text>
              Languages: {Object.values(country?.languages)}
            </Card.Text>
          </Card.Body>
        </Card>

        <Button
          variant='success'
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </Button>
      </Container>
    )
  );
};

export default CountriesSingle;
