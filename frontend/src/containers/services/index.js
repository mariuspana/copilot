const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const Column = require('@ui/components/column');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const selectors = require('@state/selectors');

const {
  connect
} = ReactRedux;

const {
  FormattedMessage
} = ReactIntl;

const {
  orgByIdSelector,
  projectByIdSelector,
  servicesByProjectIdSelector
} = selectors;

const {
  Link
} = ReactRouter;

const Services = ({
  org = {},
  project = {},
  services = []
}) => {
  const empty = services.length ? null : (
    <Row>
      <Column xs={12}>
        <p name='empty'>
          <FormattedMessage id='no-personal-projects' />
        </p>
      </Column>
    </Row>
  );

  const serviceList = (services) => {
    if (!services || !services.length) {
      return null;
    }

    const list = services.map((service) => {
      const to = `/${org.id}/projects/${project.id}/services/${service.id}`;

      return (
        <li key={service.id}>
          <Link activeClassName='active' to={to}>
            {service.name}
          </Link>
          {serviceList(service.services)}
        </li>
      );
    });

    return (
      <ul>
        {list}
      </ul>
    );
  };

  return (
    <div>
      {empty}
      <Row>
        {serviceList(services)}
      </Row>
    </div>
  );
};

Services.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  services: React.PropTypes.arrayOf(PropTypes.service)
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  project: projectByIdSelector(params.projectId)(state),
  services: servicesByProjectIdSelector(params.projectId)(state)
});

module.exports = connect(
  mapStateToProps
)(Services);
