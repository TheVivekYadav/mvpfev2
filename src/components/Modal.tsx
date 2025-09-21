import { useEffect, type ReactNode } from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function CuteModal({ isOpen, onClose, title, children }: ModalProps) {

    useEffect(() => {
        if (!isOpen) return;

        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    function handleClose(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div onClick={handleClose} className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-{50} backdrop-blur-lg">

            <div className="w-full max-w-md p-4 mx-auto bg-white border border-slate-200/80 rounded-xl shadow-lg sm:p-6">

                <div className="flex items-center gap-4">

                    <h3 className="text-xl font-semibold text-slate-800" id="modal-title">
                        {title}
                    </h3>
                </div>

                <div className="mt-5 text-sm text-slate-600 sm:text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}