import { Tooltip as RadixTooltip } from 'radix-ui';
import classes from './Tooltip.module.scss';

type TooltipProps = {
  trigger: React.ReactNode;
  tooltipText: string;
  displaySide?: 'top' | 'right' | 'bottom' | 'left';
};
export const Tooltip = ({
  trigger,
  tooltipText,
  displaySide = 'top',
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className={classes.content}
            sideOffset={5}
            side={displaySide}>
            {tooltipText}
            <RadixTooltip.Arrow className={classes.arrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
