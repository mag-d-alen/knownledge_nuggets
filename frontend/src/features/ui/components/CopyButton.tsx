import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";
import copy from "../../../assets/copy.svg";
import check from "../../../assets/check.svg";
import classes from "./CopyButton.module.scss";

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
    };

    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root open={copied ? true : undefined}>
                <Tooltip.Trigger asChild>
                    <button onClick={handleCopy} className={classes.copyButton}>
                        <img src={copied ? check : copy} alt="Copy" />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content side="top">
                        {copied ? "Copied!" : "Copy"}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}