import React from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

// Components
import { Navigator, Footer, Person, HelmetMeta } from '../../components';
import { fetchPeople } from '../../apis';

import './people.css';
import { TEAM_ROLES_ORDER } from '../../constants';

function People() {
  // Queries
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['fetchPeople'],
    queryFn: () => fetchPeople(0),
  });

  const handleDisplayMain = () => {
    if (!isLoading && isError) {
      return (
        <>
          <h2>Something went wrong while fetching people</h2>
          <p>{_.get(error, 'message', '')}</p>
        </>
      );
    }

    if (isLoading) {
      <h2>Loading...</h2>;
    }

    let people = _.get(data, 'data', []);

    if (people.length === 0) {
      return <h2>Currently, there are no updates for this one</h2>;
    }

    people = _.orderBy(people, ['name'], ['asc']);

    const groupedPeople = _.groupBy(people, 'role.name');

    return (
      <>
        {TEAM_ROLES_ORDER.map((peopleRole) => {
          const peopleGroup = _.get(groupedPeople, peopleRole, null);
          if (peopleGroup) {
            return (
              <Col lg="12" xl="10" className="people-page__role-division" key={peopleRole}>
                <h2>{peopleRole}</h2>
                <Row>
                  {groupedPeople[peopleRole].map((person) => (
                    <Col md="6" lg="4" xl="3" key={_.get(person, 'name', '')}>
                      <Person
                        name={_.get(person, 'name', '')}
                        title={_.get(person, 'job.name', '')}
                        image={_.get(person, 'coverImagePath', '')}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            );
          }
          return <></>;
        })}
      </>
    );
  };

  return (
    <>
      <HelmetMeta
        title="Team"
        description="You can view the information of all members of the team who have joined us to build marvelous things"
      />
      <div id="people-page">
        <Navigator />
        <main id="people-main" className="page-main">
          <Container>
            <Row>
              <Col lg="12" xl="10">
                <h1>Our Team</h1>
              </Col>

              {handleDisplayMain()}
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default People;
