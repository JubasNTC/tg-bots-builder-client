import React from 'react';
import { Button, Card, Dropdown, Icon } from 'semantic-ui-react';

import { dayjs } from '../utils/dayjs';

const BotsList = ({
  botsList,
  onClickEditBot,
  onDeleteEditBot,
  onClickAnalytics,
}) => {
  return (
    <Card.Group>
      {botsList.map(({ botId, name, description, updatedAt }) => (
        <Card key={botId} fluid raised>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className="date">{`Последние изменения ${dayjs(
                updatedAt
              ).format('DD-MM-YYYY HH:mm')}`}</span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group floated="right">
              <Button
                icon
                labelPosition="left"
                onClick={() => onClickEditBot(botId)}
              >
                Изменить
                <Icon name="edit" />
              </Button>
              <Dropdown className="button icon">
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onClickAnalytics}>
                    <Icon name="chart bar" />
                    Аналитика
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onDeleteEditBot(botId)}>
                    <Icon name="delete" />
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Button.Group>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export { BotsList };
