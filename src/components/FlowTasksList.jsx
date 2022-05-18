import React from 'react';

import { Button, Card, Icon, Dropdown } from 'semantic-ui-react';

const iconsMapping = {
  triggers: 'file code outline',
  message: 'comment alternate outline',
  question: 'question circle outline',
  image: 'images outline',
  video: 'file video outline',
};

const FlowTasksList = ({
  flowTasksList,
  onClickAddTaskFlow,
  onClickEditTaskFlow,
  onDeleteEditTaskFlow,
}) => {
  return (
    <Card.Group>
      {flowTasksList.map(({ taskId, name, taskType, triggers }, taskIndex) => (
        <Card key={taskId} fluid raised>
          <Card.Content>
            <Icon name={iconsMapping[taskType]} size="big" />
          </Card.Content>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            {taskType !== 'triggers' && (
              <Card.Meta>
                <br />
                {<b>{`id: ${taskId}`}</b>}
              </Card.Meta>
            )}
            <Card.Description>
              {taskType === 'triggers' &&
                triggers.map((trigger) => <p key={trigger}>{trigger}</p>)}
              {taskType !== 'triggers' && (
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
                      <Dropdown.Item
                        onClick={() => onDeleteEditTaskFlow(taskId, taskIndex)}
                      >
                        <Icon name="delete" />
                        Удалить
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    icon
                    labelPosition="left"
                    style={{ marginBottom: '10px' }}
                    onClick={() =>
                      onClickEditTaskFlow(taskId, taskIndex, taskType)
                    }
                  >
                    Изменить
                    <Icon name="edit" />
                  </Button>
                  <Button
                    icon
                    labelPosition="left"
                    style={{ marginBottom: '10px' }}
                    //onClick={() => onDeleteEditTaskFlow(taskId, taskIndex)}
                  >
                    Фильтры
                    <Icon name="filter" />
                  </Button>
                </Button.Group>
              )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Dropdown
              text="Добавить"
              icon="plus"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    onClickAddTaskFlow(taskId, taskIndex, 'message')
                  }
                >
                  <Icon name="comment alternate outline" />
                  Сообщение
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    onClickAddTaskFlow(taskId, taskIndex, 'question')
                  }
                >
                  <Icon name="question circle outline" />
                  Вопрос
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => onClickAddTaskFlow(taskId, taskIndex, 'image')}
                >
                  <Icon name="images outline" />
                  Изображение
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => onClickAddTaskFlow(taskId, taskIndex, 'video')}
                >
                  <Icon name="file video outline" />
                  Видео
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export { FlowTasksList };
