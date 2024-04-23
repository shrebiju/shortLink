import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import styled from 'styled-components'
const Main = styled.div`
  background:#fafafa;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
`
const InputWrapper = styled.div`
  display:flex;

`
const UrlInput = styled.input` 
  border:1px solid #ddd;
  background:#fff;
  height:40px;
  outline:none;
  width:250px;
`
const Button = styled.button`
  height:42px;
  padding:0px 10px;
  background:#000;
  color:#fff;
  font-size:14px;
  border:0px;
`
const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const shortenUrl = async () => {
  
    await axios.post('https://api-ssl.bitly.com/v4/shorten', {
      long_url: longUrl
    }, {
      headers: {
        'Authorization': 'Bearer 198073f370f78a6e4115633753b0bf0bda2a13b9',
        'Content-Type': 'application/json'
      }
    }).then(res =>{
       setShortUrl(res?.data?.link)
       setErrorMessage('');
        console.log(res)
      }).catch(err =>{
        setShortUrl('');
        setErrorMessage('An error occurred while shortening the URL.');
      });
     
        
   
  };

  return (
    <Main>
      <InputWrapper>
      <UrlInput
        type="text"
        placeholder="Enter URL to shorten"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <Button onClick={shortenUrl}>Shorten URL</Button>
      </InputWrapper>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <p>QR Code:</p>
          <QRCode value={shortUrl} />
        </div>
      )}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </Main>
  );
};

export default App;
