import { Collapsible } from 'radix-ui';
import { useState } from 'react';
import Markdown from 'react-markdown';
import classes from './Collapse.module.scss';
import { CopyButton } from './CopyButton';
import chevron from '../../../assets/chevron.svg';


export const Collapse = ({
  children,
  trigger,
  isOpen,
  disabled = false
}: {
  children?: string;
  trigger: React.ReactNode;
  isOpen: boolean;
  disabled?: boolean
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isOpen);
  const toggleCollapse = () => {
    if (disabled) return;
    setIsCollapsed(!isCollapsed);
  }
  return (
    <Collapsible.Root
      className={classes.collapsibleRoot}
      open={isCollapsed}
      onOpenChange={toggleCollapse}>
      <Collapsible.Trigger asChild>
        <span className={disabled ? classes.disabled : classes.trigger}>{trigger} <>
          <img src={chevron} className={isCollapsed && !disabled ? classes.triggerIcon : classes.triggerIconDown} alt="toggle collapse" />
        </>
        </span>
      </Collapsible.Trigger>
      <Collapsible.Content>
        {children && <CopyButton text={children} />}
        <Markdown>{children}</Markdown>
      </Collapsible.Content>
    </Collapsible.Root >
  );
};
