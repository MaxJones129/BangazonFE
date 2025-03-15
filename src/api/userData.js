import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllSellers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sellers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const getSingleUser = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getUserProfile = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/users/uid/${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export { getAllSellers, getSingleUser, getUserProfile };
