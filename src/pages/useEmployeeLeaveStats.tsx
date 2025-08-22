import { useEffect, useState } from "react";
import { getLeaves } from "../api/leave";
import { getEmployeeById } from "../api/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LeaveType } from "../components/LeaveProgressBar/LeaveProgressBar";

export interface leaveType {
  type: string;
  used: number;
  total: number;
}

export const useEmployeeLeaveStats = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.userId;

  const [leaveStats, setLeaveStats] = useState<LeaveType[]>([]);

  useEffect(() => {
    const fetchLeaveStats = async () => {
      if (!userId) return;

      try {
        const leaves = await getLeaves();
        const employee = await getEmployeeById(userId);

        const joinDate = new Date(employee?.createdAt || "2024-01-01");
        const now = new Date();

        let monthsWorked =
          (now.getFullYear() - joinDate.getFullYear()) * 12 +
          (now.getMonth() - joinDate.getMonth());

        if (now.getDate() < 15) monthsWorked--;
        if (monthsWorked > 12) monthsWorked = 12;

      const dynamicEntitlements = {
          "WFH": monthsWorked * 1.0,
          "Casual Leave": monthsWorked * 0.5,
          "Sick Leave": monthsWorked * 1.0,
        };


        const leaveUsage: Record<string, number> = {
           "WFH": 0,
          "Casual Leave": 0,
          "Sick Leave": 0,
        };

        for (const leave of leaves) {
          if (leave.status !== "Approved") continue;

     const rawType = leave.leaveType.toLowerCase().trim();
     
       const typeMap: Record<string, string> = {
            sick: "Sick Leave",
            "sick leave": "Sick Leave",
            casual: "Casual Leave",
            "casual leave": "Casual Leave",
             work: "WFH",
              wfh: "WFH",
          };

          const type = typeMap[rawType];
        
          if (!type) {
            console.warn("Unknown leave type:", leave.leaveType);
            continue;
          }

          const days = leave.dayType === "halfday" ? 0.5 : leave.noOfDays;

          if (leaveUsage[type] !== undefined) {
            leaveUsage[type] += days;
          }
        }

        const stats: LeaveType[] = Object.keys(dynamicEntitlements).map(
          (type) => ({
            type,
            used: parseFloat((leaveUsage[type] || 0).toFixed(1)),
            total: parseFloat(dynamicEntitlements[type].toFixed(1)),
          })
        );

        setLeaveStats(stats);
      } catch (error) {
        console.error("Error fetching leave stats:", error);
        setLeaveStats([]);
      }
    };

    fetchLeaveStats();
  }, [userId]);

  return { leaveStats };
};
