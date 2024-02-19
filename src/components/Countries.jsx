import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import userLogOut from '../auth/userLogOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseauth } from '../firebase/config';

const Countries = () => {
  const [search, setSearch] = useState('');
  const [user] = useAuthState(firebaseauth);

  const { isLoading, data } = useSelector((state) => state.countriesReducer);
  const navigate = useNavigate();
  const { error, logOut } = userLogOut();

  const handleLogOut = async () => {
    await logOut();
    if (!error) {
      navigate('/');
    }
  };

  console.log('Search: ', search);
  console.log('Countries component: ', data);

  console.log('User: ', user);

  return (
    <div>
      <Button onClick={handleLogOut} variant='danger'>
        Log Out
      </Button>
      <Row>
        <Col className='mt-5 d-flex justify-content-center'>
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type='search'
              className='me-2 '
              placeholder='Search for countries'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      <Row xs={2} md={3} lg={4} className=''>
        <Col className=''>
          <Card>
            <Card.Body>
              {data.length > 0 ? (
                data.map((country) => (
                  <Card
                    key={country.altSpellings[0]}
                    style={{ width: '20rem' }}
                  >
                    <Card.Img variant='top' src={country.flags.png} />
                    <Card.Body>
                      <Card.Title>Name: {country.name.common}</Card.Title>
                      <Card.Text>Capital: {country.capital}</Card.Text>

                      <Button
                        variant='success'
                        onClick={() =>
                          navigate(`/countries/${country.name.common}`, {
                            state: { country: country },
                          })
                        }
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <Card.Text>{'No countries found'}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Countries;
