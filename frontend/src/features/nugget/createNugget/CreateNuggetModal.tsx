import { Modal } from '../../ui/components/Modal'
import { CreateNuggetForm } from './CreateNuggetForm'

export const CreateNuggetModal = () => {
    return (
        <div><Modal triggerButton={<button>Create Nugget</button>} isLoading={false} loadingText={''} title={''} >
            <CreateNuggetForm />
        </Modal>
        </div>
    )
} 
