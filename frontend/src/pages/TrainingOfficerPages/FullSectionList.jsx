import React, { useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import ActivityCard from "../../TrainingOfficerComponents/StudentEvaluation/ActivityCard";
import { Box, Typography } from "@mui/material";
import HeaderBar from "../../TrainingOfficerComponents/TrainingProgram/HeaderBar";

export default function FullSectionList() {
  const { id, section } = useParams();
  const location = useLocation();

  const isPriorityListPage = location.pathname.includes("prioritylist");

  const activities = useMemo(() => {
    if (!section) return [];

    const storedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    const storedPriority = JSON.parse(localStorage.getItem("priorityList")) || {};

    const typeKey = section.charAt(0).toUpperCase() + section.slice(1);

    if (isPriorityListPage) {
      // Show uploaded results for priority list
      return (storedPriority[typeKey] || [])
        .filter(a => !a.deleted) // exclude deleted
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Student Evaluation: show only pending
    return storedActivities
      .filter(
        a =>
          a &&
          a.type &&
          a.type.toLowerCase() === section.toLowerCase() &&
          !a.deleted &&
          !a.resultUploaded // pending
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [section, isPriorityListPage]);

  return (
    <>
      <HeaderBar />
      <div style={{ padding: 20 }}>
        <h2>{section ? section.toUpperCase() : "Full List"}</h2>

        {activities.length === 0 ? (
          <p>No activities found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px", // space between cards
            }}
          >
            {activities.map((a) => (
              <ActivityCard
                key={a.id}
                activity={a}
                onUpload={() => {}}
                isResultUploaded={a.resultUploaded || isPriorityListPage}
                sx={{ width: { xs: "100%", sm: 220, md: 250 } }} // responsive width
              />
            ))}
          </div>
        )}

        {/* Eligible / Non-Eligible badges for priority list */}
        {isPriorityListPage &&
          activities.map(
            (a) =>
              a.students &&
              a.students.length > 0 && (
                <Box
                  key={a.id}
                  mt={1}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  {a.students.map((s, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        backgroundColor:
                          s.marks >= a.minMarks ? "#2196f3" : "#f44336",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    >
                      {s.name}: {s.marks >= a.minMarks ? "Eligible" : "Non-Eligible"}
                    </Box>
                  ))}
                </Box>
              )
          )}
      </div>
    </>
  );
}
