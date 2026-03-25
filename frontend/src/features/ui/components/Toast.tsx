import { Toast as RadixToast } from "radix-ui";
import { Button } from "@radix-ui/themes";
import classes from "./Toast.module.scss";

type Variant = "error" | "success" | "info";

type ToastProps = {
  text: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: Variant;
  duration?: number;
};

export const Toast: React.FC<ToastProps> = ({
  text,
  open,
  onOpenChange,
  variant = "error",
  duration = 5000,
}) => {
  return (
    <RadixToast.Provider swipeDirection="right" duration={duration}>
      <RadixToast.Root
        open={open}
        onOpenChange={onOpenChange}
        className={`${classes.toastRoot} ${classes[variant]}`}
      >
        <RadixToast.Description className={classes.title}>
          {text}
        </RadixToast.Description>

        <RadixToast.Action altText="Dismiss notification" asChild>
          <Button
            className={classes.dismiss}
            aria-label="Dismiss"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </Button>
        </RadixToast.Action>
      </RadixToast.Root>

      <RadixToast.Viewport className={classes.viewport} />
    </RadixToast.Provider>
  );
};
