import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Card, Dropdown, Icon } from 'semantic-ui-react';

import { dayjs } from '../utils/dayjs';

const FlowsList = ({
  flowsList,
  onClickEditFlow,
  onDeleteEditFlow,
  onClickFlowEnabled,
}) => {
  return (
    <Card.Group>
      {flowsList.map(({ flowId, name, description, enabled, updatedAt }) => (
        <Card key={flowId} fluid raised>
          <Card.Content>
            <Card.Header as={NavLink} to={`/flows/${flowId}/constructor`}>
              {name}
            </Card.Header>
            <Card.Meta>
              <span className="date">{`Последние изменения ${dayjs(
                updatedAt
              ).format('DD-MM-YYYY HH:mm')}`}</span>
            </Card.Meta>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon
              name={enabled ? 'eye' : 'eye slash'}
              size="big"
              floated="left"
              style={{ marginTop: '5px' }}
            />
            <Button.Group floated="right">
              <Button
                icon
                labelPosition="left"
                onClick={() => onClickEditFlow(flowId)}
              >
                Изменить
                <Icon name="edit" />
              </Button>
              <Dropdown className="button icon">
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => onClickFlowEnabled(flowId, !enabled)}
                  >
                    <Icon name={enabled ? 'toggle off' : 'toggle on'} />
                    {enabled ? 'Выключить' : 'Включить'}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => onDeleteEditFlow(flowId)}>
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

export { FlowsList };
