
import React from 'react';

interface ContentSectionProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, content, icon }) => {
  return (
    <div className="mb-12">
      <div className="bg-anime-dark p-8 rounded-xl border border-gray-700">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-gray-300 leading-relaxed text-lg">{content}</p>
      </div>
    </div>
  );
};

export default ContentSection;
