import React, { useState } from 'react';
import { Plus, BookOpen, Users, Calendar, MessageSquare, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const actions = [
        { icon: BookOpen, label: 'New Course', path: '/courses', color: 'bg-blue-500' },
        { icon: Users, label: 'Add Student', path: '/students', color: 'bg-green-500' },
        { icon: Calendar, label: 'Schedule', path: '/attendance', color: 'bg-purple-500' },
        { icon: MessageSquare, label: 'Announcements', path: '/announcements', color: 'bg-orange-500' },
    ];

    const handleAction = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Action Buttons */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => handleAction(action.path)}
                            className={`${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 animate-in slide-in-from-bottom-5`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <action.icon size={20} />
                            <span className="font-medium text-sm">{action.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main FAB Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-red-500 rotate-45' : 'bg-blue-600'
                    } text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all flex items-center justify-center`}
            >
                {isOpen ? <X size={24} /> : <Plus size={24} />}
            </button>
        </div>
    );
}
