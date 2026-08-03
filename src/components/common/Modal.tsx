import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div className={`${sizes[size]} w-full bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-[#DDD3CB]">
          <h2 className="text-lg font-bold text-[#231815]">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#F5F0EA] transition-colors">
            <X className="w-5 h-5 text-[#6E625D]" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
