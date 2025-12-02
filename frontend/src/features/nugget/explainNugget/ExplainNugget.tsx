import type { Nugget } from '../models';
import classes from './ExplainNugges.module.scss';
import { useExplainNuggetWithAIMutation } from '../api/nuggetApi';
import { Modal } from '../../ui/components/Modal';
import { useState } from 'react';

type ExplainNuggetProps = {
  nugget: Nugget;
};
export const ExplainNugget: React.FC<ExplainNuggetProps> = ({ nugget }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [explainNugget, { isLoading, data: explanationData }] =
    useExplainNuggetWithAIMutation();

  const handleExplainNugget = () => {
    explainNugget({
      title: nugget.title,
      content: nugget.content,
      question: 'Please explain the nugget in a way that is easy to understand',
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleExplainNugget();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const loadedTitle = "Your Assistant's Feedback";
  const loadingText = 'Let me think how to explain the nugget...';
  const message = explanationData?.explanation || '';

  return (
    <Modal
      onClose={handleCloseModal}
      isOpen={isModalOpen}
      setModalOpen={handleOpenModal}
      loadingText={loadingText}
      title={loadedTitle}
      message={message}
      isLoading={isLoading}
      triggerButton={'Explain it to me'}
    />
  );
};
