import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
// import { useNavigate } from 'react-router-dom';

import { LayoutWithSidebar } from '../components/LayoutWithSidebar';
import { CreationHeader } from '../components/CreationHeader';
import { FlowTasksList } from '../components/FlowTasksList';
import { FlowModal } from '../components/FlowModal';

import {
  getUserFlowsByAPI,
  createFlowByAPI,
  getUserFlowForEditFormByAPI,
  updateFlowByAPI,
  deleteFlowByAPI,
  setFlowEnabledByAPI,
} from '../actions/flows';
import { getUserBotsForAttachmentByAPI } from '../actions/app';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { QuestionTaskForm } from '../components/QuestionTaskForm';

const FlowConstructorPage = () => {
  const dispatch = useDispatch();
  const { flowId } = useParams();

  // const navigate = useNavigate();

  const [isOpenCreationFlowModal, setOpenOpenCreationFlowModal] =
    React.useState(false);
  const [isOpenEditFlowModal, setOpenEditFlowModal] = React.useState(false);
  const [isOpenConfirmDeleteFlowModal, setOpenConfirmDeleteFlowModal] =
    React.useState(false);
  const [flowIdForEdit, setFlowIdForEdit] = React.useState('');
  const [flowIdForDelete, setFlowIdForDelete] = React.useState('');

  React.useEffect(() => {
    getUserFlowsByAPI(dispatch).catch(console.error);
    getUserBotsForAttachmentByAPI(dispatch).catch(console.error);
  }, [dispatch]);

  const openCreationFlowModal = () => setOpenOpenCreationFlowModal(true);

  const closeCreationFlowModal = () => setOpenOpenCreationFlowModal(false);

  const openEditFlowModal = () => setOpenEditFlowModal(true);

  const closeEditFlowModal = () => setOpenEditFlowModal(false);

  const openConfirmDeleteFlowModal = () => setOpenConfirmDeleteFlowModal(true);

  const closeConfirmDeleteFlowModal = () =>
    setOpenConfirmDeleteFlowModal(false);

  const handleClickEditFlow = async (flowId) => {
    try {
      setFlowIdForEdit(flowId);
      await getUserFlowForEditFormByAPI(dispatch, flowId);
      openEditFlowModal();
    } catch {
      // ...
    }
  };

  const handleClickDeleteFlow = (flowId) => {
    setFlowIdForDelete(flowId);
    openConfirmDeleteFlowModal();
  };

  const handleSubmitCreationFlowForm = async (values) => {
    try {
      await createFlowByAPI(dispatch, values);
      closeCreationFlowModal();
    } catch {
      // ...
    }
  };

  const handleSubmitEditFlowForm = async (values) => {
    try {
      await updateFlowByAPI(dispatch, flowIdForEdit, values);
      closeEditFlowModal();
    } catch {
      // ...
    }
  };

  const handleConfirmDeleteFlow = async () => {
    try {
      await deleteFlowByAPI(dispatch, flowIdForDelete);
    } catch {
      // ...
    } finally {
      closeConfirmDeleteFlowModal();
    }
  };

  const handleClickFlowEnabled = async (flowId, enabled) => {
    try {
      await setFlowEnabledByAPI(dispatch, flowId, enabled);
    } catch {
      // ...
    }
  };

  const flowTasksList = useSelector(
    ({ flowsReducer: { flowTasks } }) => flowTasks
  );

  const selectedFlow = useSelector(
    ({ flowsReducer: { selectedFlow } }) => selectedFlow
  );

  const botsForAttachment = useSelector(
    ({ botsReducer: { botsForAttachment } }) => botsForAttachment
  );

  return (
    <LayoutWithSidebar>
      {/*<CreationHeader*/}
      {/*  headerText="Сценарии"*/}
      {/*  onClickCreate={openCreationFlowModal}*/}
      {/*/>*/}
      <Header as="h1">Шаги сценария</Header>
      {/*<FlowTasksList*/}
      {/*  flowTasksList={flowTasksList}*/}
      {/*  onClickEditFlow={handleClickEditFlow}*/}
      {/*  onDeleteEditFlow={handleClickDeleteFlow}*/}
      {/*  onClickFlowEnabled={handleClickFlowEnabled}*/}
      {/*/>*/}
      <QuestionTaskForm />
      {/*<FlowModal*/}
      {/*  headerText="Создание сценария"*/}
      {/*  headerIcon="file alternate outline"*/}
      {/*  initialValues={null}*/}
      {/*  botsForAttachment={botsForAttachment}*/}
      {/*  onSubmitFlowForm={handleSubmitCreationFlowForm}*/}
      {/*  isOpen={isOpenCreationFlowModal}*/}
      {/*  onOpen={openCreationFlowModal}*/}
      {/*  onClose={closeCreationFlowModal}*/}
      {/*/>*/}
      {/*<FlowModal*/}
      {/*  headerText="Редактирование сценария"*/}
      {/*  headerIcon="edit outline"*/}
      {/*  initialValues={selectedFlow}*/}
      {/*  botsForAttachment={botsForAttachment}*/}
      {/*  onSubmitFlowForm={handleSubmitEditFlowForm}*/}
      {/*  isOpen={isOpenEditFlowModal}*/}
      {/*  onOpen={openEditFlowModal}*/}
      {/*  onClose={closeEditFlowModal}*/}
      {/*/>*/}
      {/*<ConfirmDeleteModal*/}
      {/*  headerText="Удаление сценария"*/}
      {/*  contentText="Вы, действительно хотите удалить сценарий?"*/}
      {/*  isOpen={isOpenConfirmDeleteFlowModal}*/}
      {/*  onConfirm={handleConfirmDeleteFlow}*/}
      {/*  onOpen={openConfirmDeleteFlowModal}*/}
      {/*  onClose={closeConfirmDeleteFlowModal}*/}
      {/*/>*/}
    </LayoutWithSidebar>
  );
};

export { FlowConstructorPage };
