import { useState } from 'react';
import { Modal } from '../../ui/components/Modal';
import { CreateNuggetForm } from './CreateNuggetForm';
import { Button } from '@radix-ui/themes';
import { useCreateNugget } from './hooks/useCreateNugget';

export const CreateNuggetModal = () => {
    const [open, setOpen] = useState(false);
    const { isPending } = useCreateNugget();

    const delayedClose = () => {
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    };

    return (<>
        <Modal
            open={open}
            onOpenChange={setOpen}
            trigger={<Button>Create Nugget</Button>}
            isLoading={isPending}
            loadingText="Saving your knowledge"
            title="Create Nugget"
            aria-describedby="modal-title"
        >
            <CreateNuggetForm onSuccess={delayedClose} />
        </Modal>
    </>
    );
};