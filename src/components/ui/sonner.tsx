import React from "react";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner@2.0.3";

// Wrapper to strip Figma inspector attributes
export function Toaster(props: ToasterProps) {
  // Extract only valid ToasterProps, filtering out data-* attributes
  const validProps: ToasterProps = {
    position: props.position,
    theme: props.theme,
    duration: props.duration,
    richColors: props.richColors,
    expand: props.expand,
    visibleToasts: props.visibleToasts,
    closeButton: props.closeButton,
    offset: props.offset,
    dir: props.dir,
    hotkey: props.hotkey,
    invert: props.invert,
    toastOptions: props.toastOptions,
    gap: props.gap,
    loadingIcon: props.loadingIcon,
    icons: props.icons,
    containerAriaLabel: props.containerAriaLabel,
    pauseWhenPageIsHidden: props.pauseWhenPageIsHidden,
  };

  return <SonnerToaster {...validProps} />;
}
