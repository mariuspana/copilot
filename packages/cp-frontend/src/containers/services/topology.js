import React from 'react';
import { compose, graphql } from 'react-apollo';
// Import { connect } from 'react-redux';
import styled from 'styled-components';
import ServicesQuery from '@graphql/ServicesTopology.gql';
import unitcalc from 'unitcalc';

import { processServices } from '@root/state/selectors';

import { LayoutContainer } from '@components/layout';
import { Loader, ErrorMessage } from '@components/messaging';
// Import { ServicesTooltip } from '@components/services';

import { Topology } from 'joyent-ui-toolkit';
/* Import ServicesTooltip from '@components/services/tooltip';

import { toggleTooltip } from '@state/actions'; */

const StyledBackground = styled.div`
  background-color: ${props => props.theme.whiteActive};
`;

const StyledContainer = styled.div`
  position: relative;
  padding: ${unitcalc(4)};
`;

const ServicesTopology = ({ push, services, datacenter, loading, error }) => {
  if (loading) {
    return (
      <LayoutContainer>
        <Loader />
      </LayoutContainer>
    );
  } else if (error) {
    return (
      <LayoutContainer>
        <ErrorMessage message="Oops, and error occured while loading your services." />
      </LayoutContainer>
    );
  }

  return (
    <StyledBackground>
      <StyledContainer>
        <Topology services={services} />
      </StyledContainer>
    </StyledBackground>
  );
};

const ServicesGql = graphql(ServicesQuery, {
  options(props) {
    return {
      variables: {
        deploymentGroupSlug: props.match.params.deploymentGroup
      }
    };
  },
  props: ({ data: { deploymentGroup, loading, error } }) => ({
    services: deploymentGroup
      ? processServices(deploymentGroup.services, null)
      : null,
    loading,
    error
  })
});

const ServicesTopologyWithData = compose(ServicesGql)(ServicesTopology);

export default ServicesTopologyWithData;
