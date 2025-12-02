import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastNotification({ message, type = 'info', onClose, duration = 3000 }) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const icons = {
        success: { Icon: CheckCircle, color: 'bg-green-500', textColor: 'text-green-800', bgColor: 'bg-green-50' },
        error: { Icon: XCircle, color: 'bg-red-500', textColor: 'text-red-800', bgColor: 'bg-red-50' },
        warning: { Icon: AlertTriangle, color: 'bg-yellow-500', textColor: 'text-yellow-800', bgColor: 'bg-yellow-50' },
        info: { Icon: Info, color: 'bg-blue-500', textColor: 'text-blue-800', bgColor: 'bg-blue-50' },
    };

    const { Icon, color, textColor, bgColor } = icons[type] || icons.info;

    return (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
            <div className={`${bgColor} ${textColor} px-4 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3 min-w-[300px] max-w-md`}>
                <div className={`${color} text-white p-1.5 rounded-lg`}>
                    <Icon size={18} />
                </div>
                <p className="flex-1 text-sm font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
