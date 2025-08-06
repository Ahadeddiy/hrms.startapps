import React, { useState } from "react";
import { Cake, Send, Info } from "lucide-react";

interface Birthday {
  name: string;
  date: string;
}

interface BirthdayBoxProps {
  birthdays: Birthday[];
  onSendWish: (name: string) => void;
}

const BirthdayBox: React.FC<BirthdayBoxProps> = ({ birthdays, onSendWish }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="w-full h-full bg-gray-300 px-4 sm:px-6 py-3 sm:py-4 rounded-md shadow-md border border-[#dbe9f1] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-[#113F67]">
          Birthdays
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
            <div className="absolute right-0 mt-2 w-56 text-sm text-gray-700 bg-white border border-gray-300 shadow-md rounded p-2 z-50">
              This feature is in progress.
            </div>
          )}
        </div>
      </div>

      {birthdays.length === 0 ? (
        <p className="text-gray-600 italic text-sm sm:text-base">
          No upcoming birthdays.
        </p>
      ) : (
        <ul className="space-y-3">
          {birthdays.map(({ name, date }, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-3 bg-[#f0f8fb] border border-[#dbe9f1] rounded-md gap-2"
            >
              <div>
                <p className="font-medium text-[#113F67] text-sm sm:text-base">
                  {name}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(date).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => onSendWish(name)}
                className="flex items-center justify-center gap-2 bg-[#113F67] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-[#226597] transition duration-200"
              >
                <Send size={16} /> <span>Send Wish</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BirthdayBox;
