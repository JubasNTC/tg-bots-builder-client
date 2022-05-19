import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header, Modal } from 'semantic-ui-react';

import { LayoutWithSidebar } from '../components/LayoutWithSidebar';
import { FlowTasksList } from '../components/FlowTasksList';

import {
  createTaskFlowByAPI,
  deleteTaskFlowByAPI,
  updateTaskFlowByAPI,
  getTasksFlowByAPI,
  getTaskFlowByAPI,
  getTaskFlowFiltersByAPI,
  changeTaskFlowFiltersByAPI,
} from '../actions/flows';

import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { QuestionTaskForm } from '../components/QuestionTaskForm';
import { MessageTaskForm } from '../components/MessageTaskForm';
import { ImageTaskForm } from '../components/ImageTaskForm';
import { VideoTaskForm } from '../components/VideoTaskForm';
import { CardTaskForm } from '../components/CardTaskForm';
import { NotificationTaskForm } from '../components/NotificationTaskForm';
import { RequestTaskForm } from '../components/RequestTaskForm';
import FiltersForm from '../components/FiltersForm';

const headerMapping = {
  message: '(Отправить сообщения)',
  question: '(Задать вопрос)',
  image: '(Отправить изображение)',
  video: '(Отправить видео)',
  card: '(Отправить карточку)',
  notifyTelegram: '(Отправить уведомление в Telegram чаты)',
  http: '(Отправить HTTP запрос)',
};

const FlowConstructorPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();

  const [isOpenCreationTaskFlowModal, setOpenOpenCreationTaskFlowModal] =
    React.useState(false);
  const [isOpenEditTaskFlowModal, setOpenTaskEditFlowModal] =
    React.useState(false);
  const [isOpenFiltersTaskModal, setOpenFiltersTaskModal] =
    React.useState(false);
  const [isOpenConfirmDeleteTaskFlowModal, setOpenConfirmDeleteTaskFlowModal] =
    React.useState(false);
  const [selectedTaskType, setSelectedTaskType] = React.useState('');
  const [selectedTaskFilters, setSelectedFilters] = React.useState('');
  const [prevTaskForCreation, setPrevTaskForCreation] = React.useState(null);
  const [taskForEdit, setTaskForEdit] = React.useState(null);
  const [taskForDelete, setTaskForDelete] = React.useState(null);

  React.useEffect(() => {
    getTasksFlowByAPI(dispatch, flowId).catch(console.error);
  }, [dispatch, flowId]);

  const openCreationTaskFlowModal = () =>
    setOpenOpenCreationTaskFlowModal(true);

  const closeCreationTaskFlowModal = () =>
    setOpenOpenCreationTaskFlowModal(false);

  const openTaskEditFlowModal = () => setOpenTaskEditFlowModal(true);

  const closeTaskEditFlowModal = () => setOpenTaskEditFlowModal(false);

  const openFiltersTaskModal = () => setOpenFiltersTaskModal(true);

  const closeFiltersTaskModal = () => setOpenFiltersTaskModal(false);

  const openConfirmDeleteTaskFlowModal = () =>
    setOpenConfirmDeleteTaskFlowModal(true);

  const closeConfirmDeleteFlowModal = () =>
    setOpenConfirmDeleteTaskFlowModal(false);

  const handleClickEditTaskFlow = async (taskId, taskIndex, taskType) => {
    try {
      setTaskForEdit({ taskId, taskIndex });
      setSelectedTaskType(taskType);
      await getTaskFlowByAPI(dispatch, flowId, taskId);
      openTaskEditFlowModal();
    } catch {
      // ...
    }
  };

  const handleClickDeleteTaskFlow = (taskId, taskIndex) => {
    setTaskForDelete({ taskId, taskIndex });
    openConfirmDeleteTaskFlowModal();
  };

  const handleClickAddTaskFlow = (taskId, taskIndex, taskType) => {
    setSelectedTaskType(taskType);
    setPrevTaskForCreation({ taskId, taskIndex });
    openCreationTaskFlowModal();
  };

  const handleSubmitCreationFlowForm = async (values) => {
    try {
      await createTaskFlowByAPI(
        dispatch,
        flowId,
        prevTaskForCreation.taskId,
        prevTaskForCreation.taskIndex,
        selectedTaskType,
        values
      );
      closeCreationTaskFlowModal();
    } catch {
      // ...
    }
  };

  const handleSubmitEditTaskFlowForm = async (values) => {
    try {
      await updateTaskFlowByAPI(
        dispatch,
        flowId,
        taskForEdit.taskId,
        taskForEdit.taskIndex,
        selectedTaskType,
        values
      );
      closeTaskEditFlowModal();
    } catch {
      // ...
    }
  };

  const handleSubmitTaskFlowFiltersForm = async (values) => {
    console.log(JSON.stringify(values));
    try {
      await changeTaskFlowFiltersByAPI(
        dispatch,
        flowId,
        selectedTaskFilters,
        values
      );
      closeFiltersTaskModal();
    } catch {
      // ...
    }
  };

  const handleConfirmDeleteFlow = async () => {
    try {
      await deleteTaskFlowByAPI(
        dispatch,
        flowId,
        taskForDelete.taskId,
        taskForDelete.taskIndex
      );
    } catch {
      // ...
    } finally {
      closeConfirmDeleteFlowModal();
    }
  };

  const handleClickTaskFlowFilters = async (taskId) => {
    try {
      setSelectedFilters(taskId);
      openFiltersTaskModal();
      await getTaskFlowFiltersByAPI(dispatch, flowId, taskId);
    } catch {
      // ...
    } finally {
    }
  };

  const flowTasksList = useSelector(
    ({ flowsReducer: { flowTasks } }) => flowTasks
  );

  const selectedTaskFlow = useSelector(
    ({ flowsReducer: { selectedTaskFlow } }) => selectedTaskFlow
  );

  return (
    <LayoutWithSidebar>
      <Header as="h1">Шаги сценария</Header>
      <FlowTasksList
        flowTasksList={flowTasksList}
        onClickAddTaskFlow={handleClickAddTaskFlow}
        onClickEditTaskFlow={handleClickEditTaskFlow}
        onDeleteEditTaskFlow={handleClickDeleteTaskFlow}
        onClickFiltersTaskFlow={handleClickTaskFlowFilters}
      />
      <Modal
        closeIcon
        dimmer="inverted"
        open={isOpenCreationTaskFlowModal}
        onOpen={openCreationTaskFlowModal}
        onClose={closeCreationTaskFlowModal}
        style={{ paddingBottom: '20px' }}
      >
        <Header
          icon="file alternate outline"
          content={`Создание шага сценария ${headerMapping[selectedTaskType]}`}
        />
        <Modal.Content>
          {selectedTaskType === 'message' && (
            <MessageTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'question' && (
            <QuestionTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'image' && (
            <ImageTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'video' && (
            <VideoTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'card' && (
            <CardTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'notifyTelegram' && (
            <NotificationTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
          {selectedTaskType === 'http' && (
            <RequestTaskForm
              initialValues={null}
              onSubmit={handleSubmitCreationFlowForm}
            />
          )}
        </Modal.Content>
      </Modal>
      <Modal
        closeIcon
        dimmer="inverted"
        open={isOpenEditTaskFlowModal}
        onOpen={openTaskEditFlowModal}
        onClose={closeTaskEditFlowModal}
        style={{ paddingBottom: '20px' }}
      >
        <Header
          icon="edit"
          content={`Изменение шага сценария ${headerMapping[selectedTaskType]}`}
        />
        <Modal.Content>
          {selectedTaskType === 'message' && (
            <MessageTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'question' && (
            <QuestionTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'image' && (
            <ImageTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'video' && (
            <VideoTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'card' && (
            <CardTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'notifyTelegram' && (
            <NotificationTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
          {selectedTaskType === 'http' && (
            <RequestTaskForm
              initialValues={selectedTaskFlow}
              onSubmit={handleSubmitEditTaskFlowForm}
            />
          )}
        </Modal.Content>
      </Modal>
      <Modal
        closeIcon
        dimmer="inverted"
        open={isOpenFiltersTaskModal}
        onOpen={openFiltersTaskModal}
        onClose={closeFiltersTaskModal}
        style={{ paddingBottom: '20px' }}
      >
        <Header icon="filter" content="Фильтры" />
        <Modal.Content>
          <FiltersForm onSubmit={handleSubmitTaskFlowFiltersForm} />
        </Modal.Content>
      </Modal>
      <ConfirmDeleteModal
        headerText="Удаление шага сценария"
        contentText="Вы, действительно хотите удалить шаг сценария?"
        isOpen={isOpenConfirmDeleteTaskFlowModal}
        onConfirm={handleConfirmDeleteFlow}
        onOpen={openConfirmDeleteTaskFlowModal}
        onClose={closeConfirmDeleteFlowModal}
      />
    </LayoutWithSidebar>
  );
};

export { FlowConstructorPage };
