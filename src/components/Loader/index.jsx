import React from 'react';
import './Loader.css'

function Loader(props) {
  return (
    <div className='loader'>
      <div className="lds-spinner">
        {
          Array(12).fill().map((_, i) => (
          <div key={i}></div>
          ))
        }
      </div>
    </div>
  );
}

export default Loader;