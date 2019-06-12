import React from 'react';
import { Pane, Text, Icon } from 'evergreen-ui';

const Events = () => {
  return (
    <Pane
      height={60}
      width="100%"
      display="flex"
      alignItems="center"
      borderTop="muted"
      borderBottom="muted"
    >
      <Icon icon="tick-circle" color="success" marginRight={16} />
      <Text marginRight={16}>Identify</Text>
      <Text flex="1 1 0%">KEY</Text>
      <Text>Date</Text>
    </Pane>
  );
};

export default Events;
