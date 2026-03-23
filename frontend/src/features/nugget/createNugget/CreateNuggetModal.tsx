import { Modal } from '../../ui/components/Modal'
import { CreateNuggetForm } from './CreateNuggetForm'

export const CreateNuggetModal = () => {
    return (
        <div><Modal trigger={<span>Create Nugget</span>} isLoading={false} loadingText={''} title={''} >
            <CreateNuggetForm />
        </Modal>
        </div>
    )
} 
