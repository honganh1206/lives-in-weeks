import * as RadixTooltip from "@radix-ui/react-tooltip";
import { JSX } from "react";
import styles from "./tooltip.module.css";

// Reusable tooltip pattern with custom styling
const Tooltip = ({
    trigger,
    children,
}: {
    trigger: JSX.Element;
    children: JSX.Element;
}) => {
    return (
        <RadixTooltip.Root delayDuration={100}>
            <RadixTooltip.Trigger asChild>{trigger}</RadixTooltip.Trigger>
            <RadixTooltip.Portal>
                <RadixTooltip.Content className={styles.content}>
                    <RadixTooltip.Arrow />
                    {children}
                </RadixTooltip.Content>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );
};

export default Tooltip;
