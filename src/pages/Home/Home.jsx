import React from 'react';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';
import { fetchPublications } from '../../apis';

// Components
import { Navigator, Footer, Article, HelmetMeta } from '../../components';

import './home.css';

function Home() {
  // Queries
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['fetchPublications'],
    queryFn: () => fetchPublications(1, null, 30),
  });
  const articles = _.get(data, 'data', []);

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h2>Something went wrong while fetching articles</h2>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h2>Loading...</h2>;
    }

    if (articles.length === 0) {
      return <h2>Currently, there are no updates for this one</h2>;
    }

    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 home-articles_list">
        {articles.map((article) => {
          const { title, description, coverImagePath, publish, type } = article;
          return (
            <div key={title}>
              <Article
                title={title}
                description={description}
                thumbnail={coverImagePath}
                createdYear={publish}
                category={type}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <HelmetMeta
        title="Home"
        description="Artificial Intelligence Laboratory for Advanced BioMedical Imaging. An academic program designed to accelerate AI solutions into clinic practice. Our latest Updates and News."
      />

      <Navigator />

      <header
        id="home-header"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/img/home-bg.jpg')`,
        }}
      >
        <div className="header_header-content">
          <Container>
            <h1>
              Artificial Intelligence Laboratory for <br /> Advanced BioMedical Imaging
            </h1>
          </Container>
        </div>
      </header>
      <section id="home-sub-header">
        <Container>
          <h2>
            An academic program designed to accelerate AI <br /> solutions into clinic practice.
          </h2>
        </Container>
      </section>
      <main id="home-articles">
        <Container>
          <h3>OUR LATEST UPDATES AND NEWS</h3>
          {handleDisplayMain()}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
