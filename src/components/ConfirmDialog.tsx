import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    onCancel();
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <dialog ref={dialogRef} className="confirm-dialog" onClose={onCancel}>
      <h3>{title}</h3>
      <p className="confirm-text">{message}</p>
      <div className="dialog-actions">
        <button type="button" className="btn-secondary" onClick={handleCancel}>
          Batal
        </button>
        <button type="button" className="btn-danger" onClick={handleConfirm}>
          Ya, Hapus
        </button>
      </div>
    </dialog>
  );
}
