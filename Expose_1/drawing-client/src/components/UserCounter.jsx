import React from 'react';

const UserCounter = ({ count }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[...Array(Math.min(count, 3))].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full border-2 border-white shadow-sm"
            />
          ))}
        </div>
        {count > 3 && (
          <span className="text-sm font-medium text-gray-600">
            +{count - 3}
          </span>
        )}
      </div>
      <div className="text-sm">
        <span className="font-semibold text-gray-700">{count}</span>
        <span className="text-gray-500 ml-1">
          {count === 1 ? 'utilisateur' : 'utilisateurs'}
        </span>
      </div>
    </div>
  );
};

export default UserCounter;