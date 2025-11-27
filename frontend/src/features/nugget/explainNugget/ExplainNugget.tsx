import React, { useState } from 'react';
import type { Nugget } from '../models';
import classes from './ExplainNugges.module.scss';
import { AIVerification } from '../components';
import { useExplainNuggetWithAIMutation } from '../api/nuggetApi';

type ExplainNuggetProps = {
  nugget: Nugget;
};
export const ExplainNugget: React.FC<ExplainNuggetProps> = ({ nugget }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const [explainNugget, { isLoading, data: explanationData }] =
    useExplainNuggetWithAIMutation();

  const handleCloseExplanation = () => {
    setShowExplanation(false);
  };

  const handleExplainNugget = () => {
    explainNugget({
      title: nugget.title,
      content: nugget.content,
      question: 'Please explain the nugget in a way that is easy to understand',
    });
    setShowExplanation(true);
  };
  //   const { id, title, content, tags } = nugget;
  //   const { resense } = useExplainNuggetWithAIMutation();

  //   const [explainNugget, { isLoading }] = useExplainNuggetMutation();
  //   const [explainNugget, { isLoading }] = useExplainNuggetMutation();
  return (
    <div>
      <button className={classes.explainButton} onClick={handleExplainNugget}>
        Explain it to me
      </button>
      {showExplanation && (
        <AIVerification
          feedback={explanationData?.explanation || ''}
          isLoading={isLoading}
          onClose={handleCloseExplanation}
        />
      )}
    </div>
  );
};
