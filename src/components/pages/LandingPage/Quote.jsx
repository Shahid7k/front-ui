import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialQuote = {
  text: 'Something',
  author: 'someone',
};

const i = Math.round(1000 * Math.random());

const Quote = () => {
  const [quote, saveQuote] = useState({ ...initialQuote });

  useEffect(() => {
    (async function () {
      // const result = await axios.get('https://type.fit/api/quotes');
      const result = await axios.get('https://quotes.rest/qod');
      const qObj = result.data.contents.quotes[0];
      // saveQuote({ author: result.data[i].author, text: result.data[i].text });
      saveQuote({ author: qObj.author, text: qObj.quote });
    })();
  }, []);

  return (
    <>
      <span className='bg-half-dark font19'>
        {'“'}
        {quote.text}
        {'”'} <br />{' '}
        <span className='font19'>
          {' - '}
          {quote.author == null ? 'Anonymous' : quote.author}
        </span>
      </span>
    </>
  );
};

export default Quote;
