import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LayoutWithSidebar } from '../components/LayoutWithSidebar';
import { CreationHeader } from '../components/CreationHeader';
import { BotsList } from '../components/BotsList';
import { BotModal } from '../components/BotModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import {
  createBotByAPI,
  deleteBotByAPI,
  getUserBotByAPI,
  getUserBotsByAPI,
  updateBotByAPI,
} from '../actions/app';

const BotsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenCreationBotModal, setOpenOpenCreationBotModal] =
    React.useState(false);
  const [isOpenEditBotModal, setOpenEditBotModal] = React.useState(false);
  const [isOpenConfirmDeleteBotModal, setOpenConfirmDeleteBotModal] =
    React.useState(false);
  const [botIdForEdit, setBotIdForEdit] = React.useState('');
  const [botIdForDelete, setBotIdForDelete] = React.useState('');

  React.useEffect(() => {
    getUserBotsByAPI(dispatch).catch(console.error);
  }, [dispatch]);

  const openCreationBotModal = () => setOpenOpenCreationBotModal(true);

  const closeCreationBotModal = () => setOpenOpenCreationBotModal(false);

  const openEditBotModal = () => setOpenEditBotModal(true);

  const closeEditBotModal = () => setOpenEditBotModal(false);

  const openConfirmDeleteBotModal = () => setOpenConfirmDeleteBotModal(true);

  const closeConfirmDeleteBotModal = () => setOpenConfirmDeleteBotModal(false);

  const handleClickEditBot = async (botId) => {
    try {
      setBotIdForEdit(botId);
      await getUserBotByAPI(dispatch, botId);
      openEditBotModal();
    } catch {
      // ...
    }
  };

  const handleClickDeleteBot = (botId) => {
    setBotIdForDelete(botId);
    openConfirmDeleteBotModal();
  };

  const handleSubmitCreationBotForm = async (values) => {
    try {
      await createBotByAPI(dispatch, values);
      closeCreationBotModal();
    } catch {
      // ...
    }
  };

  const handleSubmitEditBotForm = async (values) => {
    try {
      await updateBotByAPI(dispatch, botIdForEdit, values);
      closeEditBotModal();
    } catch {
      // ...
    }
  };

  const handleConfirmDeleteBot = async () => {
    try {
      await deleteBotByAPI(dispatch, botIdForDelete);
    } catch {
      // ...
    } finally {
      closeConfirmDeleteBotModal();
    }
  };

  const handleClickAnalytics = () => navigate('/analytics');

  const botsList = useSelector(({ botsReducer: { bots } }) => bots);

  const selectedBot = useSelector(
    ({ botsReducer: { selectedBot } }) => selectedBot
  );

  return (
    <LayoutWithSidebar>
      <CreationHeader headerText="Боты" onClickCreate={openCreationBotModal} />
      <BotsList
        botsList={botsList}
        onClickEditBot={handleClickEditBot}
        onDeleteEditBot={handleClickDeleteBot}
        onClickAnalytics={handleClickAnalytics}
      />
      <BotModal
        headerText="Создание бота"
        headerIcon="file alternate outline"
        initialValues={null}
        onSubmitBotForm={handleSubmitCreationBotForm}
        isOpen={isOpenCreationBotModal}
        onOpen={openCreationBotModal}
        onClose={closeCreationBotModal}
      />
      <BotModal
        headerText="Редактирование бота"
        headerIcon="edit outline"
        initialValues={selectedBot}
        onSubmitBotForm={handleSubmitEditBotForm}
        isOpen={isOpenEditBotModal}
        onOpen={openEditBotModal}
        onClose={closeEditBotModal}
      />
      <ConfirmDeleteModal
        headerText="Удаление бота"
        contentText="Вы, действительно хотите удалить бота?"
        isOpen={isOpenConfirmDeleteBotModal}
        onConfirm={handleConfirmDeleteBot}
        onOpen={openConfirmDeleteBotModal}
        onClose={closeConfirmDeleteBotModal}
      />
    </LayoutWithSidebar>
  );
};

export { BotsPage };
