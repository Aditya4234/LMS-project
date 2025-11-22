import React from "react";


export default function Page({ title, icon, subtitle, action, children }) {
  // Default empty if nothing to show
  const showHeader = !!(title || subtitle || action);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-50 via-white to-blue-100 min-h-screen">
      {/* Header (title, subtitle, action) */}
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Title, Icon and Subtitle */}
          <div>
            {title && (
              <div className="flex items-center gap-2">
                {icon && <span className="text-2xl md:text-3xl">{icon}</span>}
                <span className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">{title}</span>
              </div>
            )}
            {subtitle && (
              <div className="mt-1 text-sm text-gray-500">{subtitle}</div>
            )}
          </div>
          {/* Optional action (e.g., button) */}
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {/* Main content */}
      <div>
        {children}
      </div>
    </div>
  );
}
