import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCompletedOrders = (userId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/carts/completed?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export default getCompletedOrders;
