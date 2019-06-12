import React from 'react';
import { Pane, Text, Icon } from 'evergreen-ui';
import moment from 'moment';

const Events = ({ event }) => {
  return (
    <Pane
      height={60}
      width="100%"
      display="flex"
      alignItems="center"
      borderTop="muted"
      borderBottom="muted"
    >
      <Icon icon="tick-circle" color="info" marginRight={16} />
      <Text marginRight={16}>{event.type.toUpperCase()}</Text>
      <Text flex="1 1 0%">{event.userId}</Text>
      <Text>{moment(event.receivedAt).format('YYYY/DD/MM HH:MM:SS')}</Text>
    </Pane>
  );
};

export default Events;
