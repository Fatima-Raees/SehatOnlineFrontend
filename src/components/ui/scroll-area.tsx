import * as React from "react";
import {
    ScrollArea as RadixScrollArea,
    ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner,
} from "@radix-ui/react-scroll-area";

interface ScrollAreaProps {
    children: React.ReactNode;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
    return (
        <RadixScrollArea className="relative overflow-hidden">
            <ScrollAreaViewport className="h-full w-full">
                {children}
            </ScrollAreaViewport>
            <ScrollAreaScrollbar
                orientation="vertical"
                className="flex touch-none select-none p-0.5 bg-gray-200 dark:bg-gray-800"
            >
                <ScrollAreaThumb className="flex-1 bg-gray-400 dark:bg-gray-600 rounded" />
            </ScrollAreaScrollbar>
            <ScrollAreaScrollbar
                orientation="horizontal"
                className="flex touch-none select-none p-0.5 bg-gray-200 dark:bg-gray-800"
            >
                <ScrollAreaThumb className="flex-1 bg-gray-400 dark:bg-gray-600 rounded" />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner className="bg-gray-200 dark:bg-gray-800" />
        </RadixScrollArea>
    );
};