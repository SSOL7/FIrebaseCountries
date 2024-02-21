import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import userLogOut from '../auth/userLogOut';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

import { firebaseauth } from '../firebase/config';
import { db } from '../firebase/config';

const Countries = () => {
  const [search, setSearch] = useState('');
  const [user] = useAuthState(firebaseauth);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const q = query(
          collection(db, 'favourites'),
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favourites = [];
        querySnapshot.forEach((doc) => {
          favourites.push(doc.data().country);
        });
        setFavourites(favourites);
        console.log('Favourites: ', favourites);
      } catch (err) {
        console.error('Error getting favourites from Firebase database: ', err);
      }
    };
    getFavourites();
  }, [user]);

  const { data } = useSelector((state) => state.countriesReducer);
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

  const addFavouriteToFirebase = async (uid, name) => {
    try {
      await addDoc(collection(db, 'favourites'), {
        uid,
        country: name,
      });
      console.log('Favourite added to Firebase database');
    } catch (err) {
      console.error('Error adding favourite to Firebase database: ', err);
    }
  };

  const removeFavouriteFromFirebase = async (uid, name) => {
    try {
      const q = query(
        collection(db, 'favourites'),
        where('uid', '==', uid),
        where('country', '==', name)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log('Favourite removed from Firebase database');
    } catch (err) {
      console.error('Error removing favourite from Firebase database: ', err);
    }
  };

  const clearFavourites = async (uid) => {
    try {
      const q = query(collection(db, 'favourites'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      console.log('Favourites removed from Firebase database');
    } catch (err) {
      console.error('Error removing favourites from Firebase database: ', err);
    }
  };

  return (
    <div className='favorites-container'>
      <div className='top-buttons'>
        <Button onClick={handleLogOut} variant='danger'>
          Log Out
        </Button>
        <Button
          onClick={() => {
            clearFavourites(user.uid);
          }}
        >
          Clear favorites
        </Button>
      </div>
      <h3>Favourite countries</h3>
      {favourites.map((favourite) => (
        <div key={favourite}>
          <h3>{favourite}</h3>
        </div>
      ))}
      <div>
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
      </div>

      <Row xs={2} md={3} lg={4} className=''>
        <Col className=''>
          {data.length > 0 ? (
            data.map((country) => (
              <Card key={country.altSpellings[0]} style={{ width: '20rem' }}>
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

                <Button
                  variant='success'
                  onClick={() => {
                    addFavouriteToFirebase(user.uid, country.name.common);
                  }}
                >
                  Add to favorites
                </Button>
                <Button
                  variant='danger'
                  onClick={() => {
                    removeFavouriteFromFirebase(user.uid, country.name.common);
                  }}
                >
                  Remove from favorites
                </Button>
                <Card.Img variant='top' src={country.flags.png} />
                <Card>
                  <Card.Title>Name: {country.name.common}</Card.Title>
                  <Card.Text>Capital: {country.capital}</Card.Text>
                </Card>
              </Card>
            ))
          ) : (
            <Card.Text>{'No countries found'}</Card.Text>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Countries;
