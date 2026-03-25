import { Button } from "@radix-ui/themes";
import { Collapse } from "../../ui/components/Collapse";
import { Loader } from "../../ui/components/Loader";
import type { CreateNugget } from "../models";
import { useVerifyNuggetWithAI } from "./hooks/useVerifyNugget";
type AIFeedbackCollapsibleProps = {
  nugget: CreateNugget;
  disabled: boolean;
};

export const AIFeedbackCollapsible = ({
  disabled,
  nugget,
}: AIFeedbackCollapsibleProps) => {
  const {
    mutate: verifyNugget,
    isPending: isVerifying,
    data: AIFeedback,
  } = useVerifyNuggetWithAI();

  const handleClick = () => {
    if (disabled || isVerifying || AIFeedback) return;
    verifyNugget(nugget);
  };

  if (isVerifying) return <Loader />;
  return (
    <Collapse
      isOpen={!!AIFeedback}
      disabled={disabled}
      trigger={
        <Button type="button" onClick={handleClick}>
          AI Feedback
        </Button>
      }
    >
      {AIFeedback ? AIFeedback.feedback : undefined}
    </Collapse>
  );
};
