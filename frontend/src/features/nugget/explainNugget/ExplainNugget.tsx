// import type { Nugget } from '../models';
// import { Modal } from '../../ui/components/Modal';
// import { useExplainNuggetWithAI } from '../api/nuggetApi';

// type ExplainNuggetProps = {
//   nugget: Nugget;
// };
// export const ExplainNugget = ({ nugget }: ExplainNuggetProps) => {
//   // const [isModalOpen, setIsModalOpen] = useState(false);
//   const {
//     mutate: explainNugget,
//     isPending: isLoading,
//     data: explanationData,
//   } = useExplainNuggetWithAI();

//   // const handleExplainNugget = () => {
//   //   explainNugget({
//   //     title: nugget.title,
//   //     content: nugget.content,
//   //     question: 'Please explain the nugget in a way that is easy to understand',
//   //   });
//   // };

//   // const handleOpenModal = () => {
//   //   // setIsModalOpen(true);
//   //   handleExplainNugget();
//   // };

//   // const handleCloseModal = () => {
//   //   setIsModalOpen(false);
//   // };

//   const loadedTitle = "Your Assistant's Feedback";
//   const loadingText = 'Let me think how to explain the nugget...';
//   const message = explanationData?.explanation || '';

//   return (
//     <Modal
//       loadingText={loadingText}
//       title={loadedTitle}
//       message={message}
//       isLoading={isLoading}
//       trigger={'Explain it to me'}
//       open={false}
//       // onOpenChange={function (open: boolean): void {
//       //   throw new Error('Function not implemented.');
//       // }}
//       children={undefined} />
//   );
// };
