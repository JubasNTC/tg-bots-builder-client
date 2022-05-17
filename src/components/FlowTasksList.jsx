import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Image, Grid, Icon, Dropdown } from 'semantic-ui-react';

import { dayjs } from '../utils/dayjs';

const FlowTasksList = ({
  flowTasksList,
  onClickEditFlow,
  onDeleteEditFlow,
  onClickFlowEnabled,
}) => {
  return (
    <Card.Group>
      {flowTasksList.map(({ taskId, name }) => (
        <Card key={taskId} fluid raised>
          <Card.Content>
            <Icon name="question circle outline" size="big" />
          </Card.Content>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span>Тип шага: Задать вопрос</span>
            </Card.Meta>
            <Card.Description>
              <Button.Group vertical floated="right">
                <Dropdown
                  upward
                  icon="ellipsis horizontal"
                  button
                  className="icon"
                  style={{
                    marginBottom: '10px',
                    width: '40px',
                    marginLeft: '105px',
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Icon name="delete" />
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Button
                  icon
                  labelPosition="left"
                  style={{ marginBottom: '10px' }}
                  //onClick={() => onClickEditFlow(flowId)}
                >
                  Изменить
                  <Icon name="edit" />
                </Button>
                <Button
                  icon
                  labelPosition="left"
                  style={{ marginBottom: '10px' }}
                  //onClick={() => onClickEditFlow(flowId)}
                >
                  Фильтры
                  <Icon name="filter" />
                </Button>
              </Button.Group>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              icon
              floated="left"
              //onClick={() => onClickEditFlow(taskId)}
            >
              <Icon name="plus" />
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export { FlowTasksList };
