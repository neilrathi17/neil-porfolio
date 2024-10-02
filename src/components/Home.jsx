// import React, { useState, useEffect } from 'react';
// // import Typewriter from 'typewriter-effect';
// import Fade from 'react-reveal';
// import endpoints from '../constants/endpoints';
// import Social from './Social';
// import FallbackSpinner from './FallbackSpinner';

// const styles = {
//   nameStyle: {
//     fontSize: '5em',
//   },
//   inlineChild: {
//     display: 'inline-block',
//   },
//   mainContainer: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// };

// function Home() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(endpoints.home, {
//       method: 'GET',
//     })
//       .then((res) => res.json())
//       .then((res) => setData(res))
//       .catch((err) => err);
//   }, []);

//   return data ? (
//     <Fade>
//       <div style={styles.mainContainer}>
//         <h1 style={styles.nameStyle}>{data?.name}</h1>
//         <div style={{ flexDirection: 'row' }}>
//           {/* <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2> */}
//           {/* <Typewriter
//             options={{
//               loop: true,
//               autoStart: true,
//               strings: data?.roles,
//             }}
//           /> */}
//         </div>
//         <Social />
//       </div>
//     </Fade>
//   ) : <FallbackSpinner />;
// }

// export default Home;
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal';
import ReactMarkdown from 'react-markdown';
import { Container, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import endpoints from '../constants/endpoints';
// import Header from './Header';

const styles = {
  portfolioContainer: {
    display: 'flex',
    height: '100vh', // Make sure it takes the full height of the viewport
  },
  homeContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nameStyle: {
    fontSize: '5em',
    marginBottom: '30px',
  },
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function Portfolio() {
  const [homeData, setHomeData] = useState(null);
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // Fetch home data
    fetch(endpoints.home, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setHomeData(res))
      .catch((err) => console.error(err));

    // Fetch about data
    fetch(endpoints.about, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setAboutData(res))
      .catch((err) => console.error(err));
  }, []);

  const parseIntro = (text) => (
    <ReactMarkdown children={text} />
  );

  return (
    <div style={styles.portfolioContainer}>
      {/* Home Section */}
      <div style={styles.homeContainer}>
        {homeData ? (
          <Fade>
            <h1 style={styles.nameStyle}>{homeData?.name}</h1>
            <img width={300} height={300} src={aboutData?.imageSource} alt="profile" />
            <Social />
          </Fade>
        ) : <FallbackSpinner />}
      </div>

      {/* About Section */}
      <div style={styles.aboutContainer}>
        {aboutData ? (
          <Fade>
            <Container>
              <Row>
                {parseIntro(aboutData.about)}
              </Row>
            </Container>
          </Fade>
        ) : <FallbackSpinner />}
      </div>
    </div>
  );
}

export default Portfolio;
