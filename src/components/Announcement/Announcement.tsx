import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface Announcement {
  title: string;
  content: string;
}

interface AnnouncementBoxProps {
  announcements: Announcement[];
}

const AnnouncementBox: React.FC<AnnouncementBoxProps> = ({ announcements }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full h-full bg-gray-300 px-4 sm:px-6 py-3 sm:py-4 rounded-md shadow-md border border-[#dbe9f1] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-[#113F67]">
          Announcement(s)
        </h2>

        <div className="relative">
          <button
            className="text-[#113F67] hover:text-[#226597]"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Info"
          >
            <Info size={18} />
          </button>

          {showInfo && (
            <div className="absolute right-0 mt-2 w-52 sm:w-48 text-sm text-gray-700 bg-white border border-gray-300 shadow-md rounded p-2 z-50">
              This feature is in progress.
            </div>
          )}
        </div>
      </div>

      {announcements.map((announcement, index) => (
        <div
          key={index}
          className="border border-[#dbe9f1] rounded-md overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full text-left py-2 px-4 bg-[#f0f8fb] hover:bg-[#dbe9f1] font-medium text-[#113F67] flex justify-between items-center text-sm sm:text-base"
          >
            <span>{announcement.title}</span>
            <span>
              {openIndex === index ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </button>

          {openIndex === index && (
            <div className="px-4 py-3 text-sm text-gray-700 bg-[#f9fcfd] border-t border-[#dbe9f1]">
              {announcement.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnnouncementBox;
