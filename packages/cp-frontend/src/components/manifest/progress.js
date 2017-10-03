import React from 'react';
import styled from 'styled-components';

import {
  Progressbar,
  ProgressbarItem,
  ProgressbarButton
} from 'joyent-ui-toolkit';

const StyledProgressbarButton = styled(ProgressbarButton)`
  svg {
    margin-top: 1px;
    margin-left: 1px;
  }
`;

const Progress = ({ stage, create, edit }) => {
  const _nameCompleted = stage !== 'name';
  const _nameActive = stage === 'name';

  const _name = !create ? null : (
    <ProgressbarItem>
      <StyledProgressbarButton
        zIndex="10"
        completed={_nameCompleted}
        active={_nameActive}
        first
      >
        Name the group
      </StyledProgressbarButton>
    </ProgressbarItem>
  );

  const _manifestCompleted = ['environment', 'review'].indexOf(stage) >= 0;
  const _manifestActive = create ? stage === 'manifest' : stage === 'edit';

  const _manifest = (
    <ProgressbarItem>
      <StyledProgressbarButton
        zIndex="9"
        completed={_manifestCompleted}
        active={_manifestActive}
        first={edit}
      >
        Define services
      </StyledProgressbarButton>
    </ProgressbarItem>
  );

  const _environmentCompleted = stage === 'review';
  const _environmentActive = stage === 'environment';

  const _environment = (
    <ProgressbarItem>
      <StyledProgressbarButton
        zIndex="8"
        completed={_environmentCompleted}
        active={_environmentActive}
      >
        Define environment
      </StyledProgressbarButton>
    </ProgressbarItem>
  );

  const _reviewActive = stage === 'review';

  const _review = (
    <ProgressbarItem>
      <StyledProgressbarButton zIndex="7" active={_reviewActive} last>
        Review and deploy
      </StyledProgressbarButton>
    </ProgressbarItem>
  );

  return (
    <Progressbar>
      {_name}
      {_manifest}
      {_environment}
      {_review}
    </Progressbar>
  );
};

export default Progress;
