import React from 'react'
import './Home.css';

function Home() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <title>Maple Leaf University</title>
      <link rel="stylesheet" href="index.css" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="link"
        integrity="sha384-wESLQ85D6gbsF459vf1CiZ2+rr+CsxRY0RpiF1tLlQpDnAgg6rwdsUF1+Ics2bni"
        crossOrigin="anonymous"
      />
      <header>

      </header>
      {/* SLIDES*/}
      {/*INCOMPLETE*/}
      <div className="slides" id="top">
        <img src="images/college.png" alt="bacfacile" />
      </div>
      {/* WHO ARE WE*/}
      <div className="whoarewe">
        <img className="image" src="images/maple.png" alt="bacfacile" />
        <div className="whoarewetext">
          <h3>Maple Leaf University</h3>
          <p>
            The Maple Leaf University seeks to provide world class facilities and
            education to make students aspire for a bright career ahead.
            Professional faculties will provide the student with best learning
            experience along with detailed video lectures for better understanding
            and creative approach.
          </p>
        </div>
      </div>
    </>

  );
}
export default Home;

