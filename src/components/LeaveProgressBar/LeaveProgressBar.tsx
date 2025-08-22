import React from "react";
import { MoreVertical } from "lucide-react";

export interface LeaveType {
  type: "Sick Leave" | "Casual Leave" | "Annual Leave";
  used: number;
  total: number;
}

interface LeaveProgressBarProps {
  leaveData: LeaveType[];
}

const LeaveProgressBar: React.FC<LeaveProgressBarProps> = ({ leaveData }) => {
  return (
    <div className="space-y-3 w-full h-full bg-white py-3 px-4 shadow-md rounded-md border border-[#dbe9f1]">
    
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-xl font-semibold text-[#113F67]">Available Leave Days</h1>
     
      </div>

    
      {leaveData.map((leave, index) => {
        const percent = Math.min((leave.used / leave.total) * 100, 100);

        return (
          <div key={index} className="space-y-6">
            
            <div className="flex justify-between text-sm font-medium text-[#113F67]">
              <span>{leave.type}</span>
              <span>{leave.used}/{leave.total}</span>
            </div>

           
            <div className="w-full bg-[#dbe9f1] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#113F67] transition-all duration-700 ease-in-out rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveProgressBar;
