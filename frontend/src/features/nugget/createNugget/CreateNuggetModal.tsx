import { useState } from 'react';
import { Modal } from '../../ui/components/Modal';
import { CreateNuggetForm } from './CreateNuggetForm';
import { useCreateNugget } from './hooks/useCreateNugget';
import classes from './CreateNuggetForm.module.scss';

export const CreateNuggetModal = () => {
  const [open, setOpen] = useState(false);
  const { isPending } = useCreateNugget();

  const delayedClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        open={open}
        onOpenChange={setOpen}
        trigger={<button className={classes.createTrigger}>Create Nugget</button>}
        isLoading={isPending}
        loadingText='Saving your knowledge'
        title='Create Nugget'
        aria-describedby='modal-title'>
        <CreateNuggetForm onSuccess={delayedClose} />
      </Modal>
    </>
  );
};
