import { Collapsible } from 'radix-ui';
import { useState } from 'react';
import Markdown from 'react-markdown';

export const Collapse = ({
  children,
  trigger,
  isOpen,
}: {
  children?: string;
  trigger: React.ReactNode;
  isOpen: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isOpen);
  return (
    <Collapsible.Root
      // className='CollapsibleRoot'
      open={isCollapsed}
      onOpenChange={setIsCollapsed}>
      <Collapsible.Trigger asChild>{trigger}</Collapsible.Trigger>
      <Collapsible.Content>
        <Markdown>{children}</Markdown>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
