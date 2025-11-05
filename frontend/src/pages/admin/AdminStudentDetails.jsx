// // src/pages/admin/AdminStudentDetails.jsx
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CircularProgress,
//   Avatar,
//   Divider,
//   Button,
//   Grid,
//   List,
//   ListItem,
//   ListItemText,
//   Link,
//   Chip,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../api/axiosInstance";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import PersonIcon from "@mui/icons-material/Person";

// const AdminStudentDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchStudent = async () => {
//     try {
//       const response = await axiosInstance.get(`students/students/${id}/`);
//       setStudent(response.data);
//     } catch (error) {
//       console.error("Error fetching student details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudent();
//   }, [id]);

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );

//   if (!student)
//     return (
//       <Typography textAlign="center" mt={5} color="textSecondary">
//         Student details not found.
//       </Typography>
//     );

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 } }}>
//       {/* Back Button */}
//       <Button
//         startIcon={<ArrowBackIcon />}
//         onClick={() => navigate(-1)}
//         sx={{
//           mb: 3,
//           color: "#1565C0",
//           textTransform: "none",
//           fontWeight: "bold",
//           "&:hover": {
//             background: "#E3F2FD",
//             transform: "translateY(-1px)",
//             boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
//           },
//         }}
//       >
//         Back
//       </Button>

//       {/* Student Card */}
//       <Card
//         sx={{
//           borderRadius: "20px",
//           boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
//           p: 3,
//           transition: "0.3s",
//           "&:hover": { boxShadow: "0 10px 36px rgba(0,0,0,0.15)" },
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 2,
//             mb: 3,
//           }}
//         >
//           <Avatar
//             sx={{
//               bgcolor: "#1565C0",
//               width: 64,
//               height: 64,
//               fontSize: 30,
//             }}
//           >
//             <PersonIcon fontSize="large" />
//           </Avatar>
//           <Box>
//             <Typography
//               variant="h5"
//               fontWeight="bold"
//               sx={{ letterSpacing: "0.3px" }}
//             >
//               {student.first_name} {student.middle_name} {student.last_name}
//             </Typography>
//             <Typography color="textSecondary">{student.email}</Typography>
//             <Chip
//               label={student.gender}
//               size="small"
//               color="primary"
//               sx={{ mt: 1 }}
//             />
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Basic Info */}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography>
//               <strong>RUM Number:</strong> {student.rum_number}
//             </Typography>
//             <Typography>
//               <strong>Phone:</strong> {student.phone}
//             </Typography>
//             <Typography>
//               <strong>Course:</strong> {student.course}
//             </Typography>
//             <Typography>
//               <strong>Branch:</strong> {student.faculty}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Typography>
//               <strong>Year:</strong> {student.year}
//             </Typography>
//             <Typography>
//               <strong>Institute:</strong> {student.academics?.[0]?.institute || "N/A"}
//             </Typography>
//             <Typography>
//               <strong>Enrollment Status:</strong>{" "}
//               <Chip
//                 label={student.enrollment_status || "Active"}
//                 size="small"
//                 color="success"
//               />
//             </Typography>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Dynamic Sections Helper */}
//         {[
//           { title: "Academics", data: student.academics, render: (acad) => `${acad.degree} - ${acad.branch} (${acad.institute}) | Year: ${acad.year_of_passing}, CGPA: ${acad.cgpa}` },
//           { title: "Experiences", data: student.experiences, render: (exp) => `${exp.role} at ${exp.company} | ${exp.start_date} - ${exp.end_date || "Present"} | ${exp.description}` },
//           { title: "Projects", data: student.projects, render: (proj) => `${proj.title} | Tech: ${proj.tech_stack} | ${proj.description} ${proj.repo_link ? `| Repo: ${proj.repo_link}` : ""}` },
//           { title: "Skills", data: student.skills, render: (skill) => `${skill.name} - Level: ${skill.level}` },
//           { title: "Certifications", data: student.certifications, render: (cert) => `${cert.name} by ${cert.provider} | Date: ${cert.date} | File: ${cert.file ? <Link href={cert.file} target="_blank">View</Link> : "N/A"}` },
//           { title: "Documents", data: student.documents, render: (doc) => `${doc.title} | Uploaded: ${doc.uploaded_at} | File: ${doc.file ? <Link href={doc.file} target="_blank">View</Link> : "N/A"}` },
//           { title: "Job Applications", data: student.applications, render: (app) => `${app.job.title} at ${app.job.company} | Applied At: ${app.applied_at} | Status: ${app.status}` },
//         ].map(
//           (section, idx) =>
//             section.data?.length > 0 && (
//               <Box key={idx} sx={{ mb: 3 }}>
//                 <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
//                   {section.title}
//                 </Typography>
//                 <List dense>
//                   {section.data.map((item, i) => (
//                     <ListItem
//                       key={i}
//                       sx={{
//                         bgcolor: i % 2 === 0 ? "#F9FAFB" : "#fff",
//                         borderRadius: "10px",
//                         mb: 0.5,
//                         "&:hover": { bgcolor: "#E3F2FD", transition: "0.3s" },
//                       }}
//                     >
//                       <ListItemText primary={section.render(item)} />
//                     </ListItem>
//                   ))}
//                 </List>
//                 <Divider sx={{ my: 2 }} />
//               </Box>
//             )
//         )}
//       </Card>
//     </Box>
//   );
// };

// export default AdminStudentDetails;





// src/pages/admin/AdminStudentDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Avatar,
  Divider,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Link as MuiLink,
  Chip,
  Tooltip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { motion } from "framer-motion";

// Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import StarsIcon from "@mui/icons-material/Stars";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";

// MUI Lab (Timeline)
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

/* ------------------------- helpers ------------------------- */
const variants = {
  page: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  card: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  section: (i) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.05 * i } },
  }),
  listItem: (i) => ({
    initial: { opacity: 0, x: -12 },
    animate: { opacity: 1, x: 0, transition: { delay: 0.03 * i } },
  }),
};

const fmt = (date) => {
  if (!date) return "—";
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return String(date);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
  } catch {
    return String(date);
  }
};

const getInitials = (first, middle, last) =>
  [first, middle, last]
    .filter(Boolean)
    .map((s) => s?.[0]?.toUpperCase())
    .join("")
    .slice(0, 2) || "ST";

const SafeLink = ({ href, children }) =>
  href ? (
    <MuiLink href={href} target="_blank" rel="noopener noreferrer" underline="hover">
      {children ?? "View"}
    </MuiLink>
  ) : (
    <Typography component="span" color="text.secondary">
      N/A
    </Typography>
  );

/* ------------------------- main ------------------------- */
const AdminStudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudent = async () => {
    try {
      const response = await axiosInstance.get(`students/students/${id}/`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const academics = student?.academics ?? [];
  const experiences = student?.experiences ?? [];
  const projects = student?.projects ?? [];
  const skills = student?.skills ?? [];
  const certifications = student?.certifications ?? [];
  const documents = student?.documents ?? [];
  const applications = student?.applications ?? [];

  const topInstitute = student?.academics?.[0]?.institute || "N/A";
  const yop = student?.academics?.[0]?.year_of_passing ?? "N/A";

  const profileTitle = useMemo(
    () =>
      [student?.first_name, student?.middle_name, student?.last_name]
        .filter(Boolean)
        .join(" ") || "Student",
    [student]
  );

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // you can replace this with a toast if you use notistack
      alert("Profile link copied!");
    } catch {
      alert("Unable to copy link.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ display: "flex", justifyContent: "center", marginTop: 64 }}
      >
        <CircularProgress size={60} thickness={4} />
      </motion.div>
    );

  if (!student)
    return (
      <Typography textAlign="center" mt={5} color="textSecondary">
        Student details not found.
      </Typography>
    );

  return (
    <motion.div
      initial={variants.page.initial}
      animate={variants.page.animate}
      style={{
        minHeight: "100dvh",
        background:
          "radial-gradient(1200px 600px at 10% -10%, rgba(21,101,192,0.18), transparent 60%), radial-gradient(900px 500px at 100% 10%, rgba(33,150,243,0.16), transparent 60%)",
      }}
    >
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
        {/* Top actions */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: "#1565C0",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 2,
              px: 1.5,
              "&:hover": { background: "#E3F2FD" },
            }}
          >
            Back
          </Button>

          <Box sx={{ flex: 1 }} />

          <Tooltip title="Copy profile link">
            <IconButton onClick={copyProfileLink}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print / Save as PDF">
            <IconButton onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Glass primary card */}
        <motion.div
          initial={variants.card.initial}
          animate={variants.card.animate}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: "24px",
              p: { xs: 2, md: 3 },
              backdropFilter: "saturate(140%) blur(6px)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%)",
              boxShadow:
                "0 10px 30px rgba(21,101,192,0.08), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#1565C0",
                    width: 72,
                    height: 72,
                    fontSize: 28,
                    boxShadow: "0 10px 24px rgba(21,101,192,0.35)",
                  }}
                >
                  {getInitials(student.first_name, student.middle_name, student.last_name) || (
                    <PersonIcon fontSize="large" />
                  )}
                </Avatar>
              </motion.div>

              <Box>
                <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 0.3 }}>
                  {profileTitle}
                </Typography>
                <Typography color="text.secondary">{student.email}</Typography>
                {student?.gender && (
                  <Chip
                    label={student.gender}
                    size="small"
                    color="primary"
                    sx={{ mt: 1, fontWeight: 600 }}
                  />
                )}
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Basic Info */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <InfoRow label="RUM Number" value={student.rum_number} />
                <InfoRow label="Phone" value={student.phone} />
                <InfoRow label="Course" value={student.course} />
                <InfoRow label="Branch" value={student.faculty} />
              </Grid>
              <Grid item xs={12} md={4}>
                <InfoRow label="Year of Passing" value={yop} />
                <InfoRow label="Institute" value={topInstitute} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                  <Typography fontWeight={700}>Enrollment Status:</Typography>
                  <Chip
                    label={student.enrollment_status || "Active"}
                    size="small"
                    color="success"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* quick highlights */}
                <Highlights
                  academics={academics}
                  experiences={experiences}
                  projects={projects}
                  skills={skills}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Sections */}
            <PremiumAccordion
              icon={<SchoolIcon />}
              title="Academics"
              defaultExpanded
              index={0}
              itemsExist={academics.length > 0}
            >
              <List disablePadding>
                {academics.map((a, i) => (
                  <AnimatedListItem key={i} index={i}>
                    <ListItemText
                      primary={
                        <StrongText>
                          {a.degree} — {a.branch} ({a.institute})
                        </StrongText>
                      }
                      secondary={
                        <Muted>
                          Year: {a.year_of_passing ?? "—"} &nbsp; • &nbsp; CGPA:{" "}
                          {a.cgpa ?? "—"}
                        </Muted>
                      }
                    />
                  </AnimatedListItem>
                ))}
              </List>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<WorkIcon />}
              title="Experiences"
              index={1}
              itemsExist={experiences.length > 0}
            >
              <Timeline position="right" sx={{ my: 0 }}>
                {experiences.map((e, i) => (
                  <TimelineItem key={i}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {i < experiences.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Typography fontWeight={700}>
                          {e.role} @ {e.company}
                        </Typography>
                        <Muted>
                          {fmt(e.start_date)} — {e.end_date ? fmt(e.end_date) : "Present"}
                        </Muted>
                        {e.description && (
                          <Typography sx={{ mt: 0.5 }}>{e.description}</Typography>
                        )}
                      </motion.div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<CodeIcon />}
              title="Projects"
              index={2}
              itemsExist={projects.length > 0}
            >
              <Timeline position="right" sx={{ my: 0 }}>
                {projects.map((p, i) => (
                  <TimelineItem key={i}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {i < projects.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Typography fontWeight={700}>{p.title}</Typography>
                        <Muted sx={{ display: "block" }}>
                          Tech: {p.tech_stack ?? "—"}
                        </Muted>
                        {p.description && (
                          <Typography sx={{ mt: 0.5 }}>{p.description}</Typography>
                        )}
                        {p.repo_link && (
                          <Typography sx={{ mt: 0.5 }}>
                            Repo: <SafeLink href={p.repo_link} />
                          </Typography>
                        )}
                      </motion.div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<StarsIcon />}
              title="Skills"
              index={3}
              itemsExist={skills.length > 0}
            >
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {skills.map((s, i) => (
                  <motion.div
                    key={`${s.name}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                  >
                    <Chip
                      label={`${s.name}${s.level ? ` • ${s.level}` : ""}`}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#E3F2FD" },
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<WorkspacePremiumIcon />}
              title="Certifications"
              index={4}
              itemsExist={certifications.length > 0}
            >
              <List disablePadding>
                {certifications.map((c, i) => (
                  <AnimatedListItem key={i} index={i}>
                    <ListItemText
                      primary={<StrongText>{c.name}</StrongText>}
                      secondary={
                        <>
                          <Muted>
                            {c.provider ? `By ${c.provider}` : ""}
                            {c.date ? ` • ${fmt(c.date)}` : ""}
                          </Muted>
                          <Box sx={{ mt: 0.5 }}>
                            File: <SafeLink href={c.file} />
                          </Box>
                        </>
                      }
                    />
                  </AnimatedListItem>
                ))}
              </List>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<DescriptionIcon />}
              title="Documents"
              index={5}
              itemsExist={documents.length > 0}
            >
              <List disablePadding>
                {documents.map((d, i) => (
                  <AnimatedListItem key={i} index={i}>
                    <ListItemText
                      primary={<StrongText>{d.title}</StrongText>}
                      secondary={
                        <>
                          <Muted>Uploaded: {fmt(d.uploaded_at)}</Muted>
                          <Box sx={{ mt: 0.5 }}>
                            File: <SafeLink href={d.file} />
                          </Box>
                        </>
                      }
                    />
                  </AnimatedListItem>
                ))}
              </List>
            </PremiumAccordion>

            <PremiumAccordion
              icon={<AssignmentIcon />}
              title="Job Applications"
              index={6}
              itemsExist={applications.length > 0}
            >
              <List disablePadding>
                {applications.map((a, i) => (
                  <AnimatedListItem key={i} index={i}>
                    <ListItemText
                      primary={
                        <StrongText>
                          {a?.job?.job_title || "Job"} @ {a?.job?.company_name || "Company"}
                        </StrongText>
                      }
                      secondary={
                        <Muted>
                          Applied: {fmt(a.applied_at)} • Status: {a.status ?? "—"}
                        </Muted>
                      }
                    />
                  </AnimatedListItem>
                ))}
              </List>
            </PremiumAccordion>
          </Card>
        </motion.div>
      </Box>
    </motion.div>
  );
};

/* ------------------------- small components ------------------------- */

const InfoRow = ({ label, value }) => (
  <Box sx={{ mb: 1.25 }}>
    <Typography component="span" fontWeight={800}>
      {label}:
    </Typography>{" "}
    <Typography component="span" color="text.secondary">
      {value ?? "—"}
    </Typography>
  </Box>
);

const StrongText = ({ children }) => (
  <Typography fontWeight={700} component="span">
    {children}
  </Typography>
);

const Muted = ({ children, sx }) => (
  <Typography component="span" color="text.secondary" sx={sx}>
    {children}
  </Typography>
);

const PremiumAccordion = ({ icon, title, children, defaultExpanded, index, itemsExist }) => (
  <motion.div
    initial={variants.section(index).initial}
    animate={variants.section(index).animate}
    style={{ marginBottom: 12 }}
  >
    <Accordion
      defaultExpanded={defaultExpanded}
      disabled={!itemsExist}
      sx={{
        borderRadius: "14px !important",
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              bgcolor: "#E3F2FD",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>
          {!itemsExist && (
            <Chip label="No data" size="small" sx={{ ml: 1 }} variant="outlined" />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  </motion.div>
);

const AnimatedListItem = ({ children, index }) => (
  <motion.div
    initial={variants.listItem(index).initial}
    animate={variants.listItem(index).animate}
  >
    <ListItem
      sx={{
        bgcolor: index % 2 === 0 ? "#F9FAFB" : "#FFFFFF",
        borderRadius: 2,
        mb: 0.75,
        px: 2,
        py: 1.25,
        transition: "transform .2s ease, box-shadow .2s ease, background .2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 20px rgba(21,101,192,0.10)",
          bgcolor: "#EFF6FF",
        },
      }}
    >
      {children}
    </ListItem>
  </motion.div>
);

const Highlights = ({ academics, experiences, projects, skills }) => {
  const cgpa = academics?.[0]?.cgpa ?? null;
  const expCount = experiences?.length ?? 0;
  const projCount = projects?.length ?? 0;
  const topSkills = (skills || []).slice(0, 4).map((s) => s.name);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "rgba(21,101,192,0.05)",
        border: "1px solid rgba(21,101,192,0.15)",
      }}
    >
      <Typography fontWeight={800} sx={{ mb: 1 }}>
        Highlights
      </Typography>
      <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 1 }}>
        {cgpa && <Chip label={`CGPA ${cgpa}`} size="small" />}
        <Chip label={`${expCount} Experience${expCount === 1 ? "" : "s"}`} size="small" />
        <Chip label={`${projCount} Project${projCount === 1 ? "" : "s"}`} size="small" />
      </Stack>
      {topSkills.length > 0 && (
        <Stack direction="row" gap={1} flexWrap="wrap">
          {topSkills.map((s, i) => (
            <Chip key={`${s}-${i}`} label={s} variant="outlined" size="small" />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AdminStudentDetails;
