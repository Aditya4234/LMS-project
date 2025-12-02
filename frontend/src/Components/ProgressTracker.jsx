import React from 'react';
import { Trophy, Target, Zap, Award } from 'lucide-react';

export default function ProgressTracker({ stats }) {
    const achievements = [
        { icon: Trophy, label: 'Courses Completed', value: stats?.completed || 5, total: 10, color: 'text-yellow-500' },
        { icon: Target, label: 'Assignments Done', value: stats?.assignments || 12, total: 15, color: 'text-blue-500' },
        { icon: Zap, label: 'Learning Streak', value: stats?.streak || 7, unit: 'days', color: 'text-orange-500' },
        { icon: Award, label: 'Certificates', value: stats?.certificates || 3, total: 5, color: 'text-purple-500' },
    ];

    return (
        <div className="bg-white dark:bg-[#1e1f2e] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Your Progress
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                    const percentage = achievement.total
                        ? Math.round((achievement.value / achievement.total) * 100)
                        : 100;

                    return (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-lg bg-white dark:bg-gray-700 ${achievement.color}`}>
                                    <achievement.icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.label}</p>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {achievement.value}
                                        {achievement.unit && <span className="text-sm font-normal text-gray-500"> {achievement.unit}</span>}
                                        {achievement.total && <span className="text-sm font-normal text-gray-500">/{achievement.total}</span>}
                                    </p>
                                </div>
                            </div>

                            {achievement.total && (
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
