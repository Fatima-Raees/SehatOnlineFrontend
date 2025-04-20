// components/ui/Dialog.tsx
import * as React from "react"
import { forwardRef, useEffect, ReactNode, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

// Dialog component
interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ isOpen, onClose, children, className, ...props }, ref) => {
    // Handle Escape key to close dialog
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose()
        }
      }
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
          className
        )}
        onClick={onClose}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Dialog.displayName = "Dialog"

// DialogContent
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn(
        "bg-white rounded-lg shadow-xl max-w-lg w-full p-6 sm:max-w-md",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
)
DialogContent.displayName = "DialogContent"

// DialogHeader
interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
)
DialogHeader.displayName = "DialogHeader"

// DialogTitle
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      ref={ref}
      {...props}
    >
      {children}
    </h3>
  )
)
DialogTitle.displayName = "DialogTitle"

// DialogDescription
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className, ...props }, ref) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  >
    {children}
  </p>
))
DialogDescription.displayName = "DialogDescription"

// DialogFooter
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
)
DialogFooter.displayName = "DialogFooter"

// DialogTrigger
interface DialogTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick: () => void
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, className, onClick, ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
        className
      )}
      type="button"
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
)
DialogTrigger.displayName = "DialogTrigger"

// DialogClose
interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick: () => void
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ children, className, onClick, ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2",
        className
      )}
      type="button"
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
)
DialogClose.displayName = "DialogClose"