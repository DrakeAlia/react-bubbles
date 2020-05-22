import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

// Stage 2 - Consuming the API
const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

   // [GET] to /api/colors: returns the list of colors and their hex codes.
  useEffect(() => {
    axiosWithAuth()
      .get('/api/colors')
      .then(response => {
        setColorList(response.data);
        // console.log(colorList);
      })
      .catch(error => console.error(error));
  }, []);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const updateColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <ColorList colors={colorList} updateColors={updateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;