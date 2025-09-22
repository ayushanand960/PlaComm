import React from "react";
import HeaderBar from "../../../TrainingOfficerComponents/TrainingProgram/HeaderBar";
import CreateActivityForm from "../../../TrainingOfficerComponents/TrainingProgram/CreateActivityForm";

const AptitudeCreate = () => {
  return (
    <div>
      {/* Top Bar */}
      <HeaderBar title="Training Program" backPath="/officer-dashboard/:id/trainingprogram" />

      {/* Pass activity type */}
      <CreateActivityForm activityType="Aptitude" />
    </div>
  );
};

export default AptitudeCreate;
