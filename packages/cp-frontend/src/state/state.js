const state = {
  ui: {
    sections: {
      deploymentGroups: [
        {
          pathname: 'services',
          name: 'Services'
        },
        {
          pathname: 'instances',
          name: 'Instances'
        },
        {
          pathname: 'manifest/edit',
          name: 'Manifest'
        },
        {
          pathname: 'environment',
          name: 'Environment'
        }
      ],
      services: [
        {
          pathname: 'instances',
          name: 'Instances'
        },
        {
          pathname: 'metrics',
          name: 'Metrics'
        }
      ]
    },
    services: {
      quickActions: {
        show: false
      }
    },
    instances: {
      tooltip: {
        show: false
      }
    }
  }
};

export default state;
