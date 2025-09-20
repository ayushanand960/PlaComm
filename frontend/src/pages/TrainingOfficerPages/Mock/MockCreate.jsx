import React from "react";
import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
import CreateActivityForm from "../../../TrainingOfficerComponents/TrainingProgram/CreateActivityForm";

const MockCreate = () => {
  return (
    <div>
      {/* Top Bar */}
      <HeaderBar title="Training Program" backPath="/officer-dashboard/:id/trainingprogram" />

     {/* Pass activity type */}
      <CreateActivityForm activityType="Mock" />
    </div>
  );
};

export default MockCreate;
