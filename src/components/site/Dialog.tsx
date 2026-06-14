import { Button } from "@/components";

type DialogProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export const Dialog = ({ open, title, children, confirmText = "Confirm", cancelText = "Cancel", onClose, onConfirm }: DialogProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="w-95 rounded-2xl bg-gray-900 p-6 text-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        {title && <h2 className="font-bold text-xl">{title}</h2>}
        <div className="mt-4 text-gray-300 text-sm">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="red">
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};
