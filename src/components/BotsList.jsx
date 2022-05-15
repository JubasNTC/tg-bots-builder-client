import React from 'react';
import { Button, Card, Dropdown, Icon } from 'semantic-ui-react';

const BotsList = ({ botsList, onClickEditBot, onClickAnalytics }) => {
  return (
    <Card.Group>
      {botsList.map(({ id, name, description }) => (
        <Card key={id} fluid raised>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group floated="right">
              <Button icon labelPosition="left" onClick={onClickEditBot}>
                Изменить
                <Icon name="edit" />
              </Button>
              <Dropdown className="button icon">
                <Dropdown.Menu>
                  <Dropdown.Item onClick={onClickAnalytics}>
                    <Icon name="chart bar" />
                    Аналитика
                  </Dropdown.Item>
                  <Dropdown.Item>
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
