import type { ReactNode } from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function CuteModal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        // Backdrop with a blur effect
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-{50} backdrop-blur-lg">

            {/* Modal Panel with custom animation, shadows, and rounded corners */}
            <div className="w-full max-w-md p-2 mx-auto bg-white rounded-3xl shadow-2xl transform transition-all animate-pop-in">

                {/* Decorative top border */}
                <div className="bg-white rounded-2xl border-t-8 border-purple-300 p-6">

                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">✨</span>
                        <h3 className="text-2xl font-bold text-slate-800" id="modal-title">
                            {title}
                        </h3>
                    </div>

                    {/* Content Area */}
                    <div className="mt-4 text-slate-600">
                        {children}
                    </div>


                </div>
            </div>
        </div>
    );
}