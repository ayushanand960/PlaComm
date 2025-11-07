// src/pages/DevelopersPage.jsx
import React from "react";
import { mentors, members } from "../data/teamData";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Stack,
    Tooltip,
    Chip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import confetti from "canvas-confetti";

const skills = ["React", "Django", "MongoDB", "MySQL", "Node", "REST API"];

const robotImages = {
    default: "/images/robot/happy.png",
    wave: "/images/robot/wave.png",
    megaphone: "/images/robot/megaphone.png",
    love: "/images/robot/love.png",
    laptop: "/images/robot/laptop.png",
};

const DeveloperCard = ({ person }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ perspective: "1000px" }}
    >
        <motion.div
            whileHover={{ rotateY: 6, rotateX: 6 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
            <Card
                sx={{
                    width: 300,
                    height: 470,
                    borderRadius: 4,
                    p: 1,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                    transition: "0.4s",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.3)",
                    ":hover": {
                        transform: "translateY(-10px)",
                        border: "1px solid rgba(0,255,255,0.7)",
                        boxShadow: "0 0 20px rgba(0,255,255,0.5)",
                    },
                }}
            >
                <CardMedia
                    component="img"
                    image={person.photo}
                    alt={person.name}
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        objectFit: "cover",
                        mx: "auto",
                        mt: 2,
                        border: "4px solid white",
                        boxShadow: "0px 0px 15px rgba(255,255,255,0.5)",
                    }}
                />

                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                        {person.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                        {person.title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{ color: "#00eaff", fontWeight: 600, mt: 1 }}
                    >
                        {person.role}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        sx={{ flexWrap: "wrap", mt: 2 }}
                    >
                        {skills.slice(0, 3).map((skill, i) => (
                            <Chip
                                key={i}
                                label={skill}
                                size="small"
                                sx={{
                                    background: "rgba(255,255,255,0.1)",
                                    color: "#00eaff",
                                    border: "1px solid rgba(0,255,255,0.4)",
                                }}
                            />
                        ))}
                    </Stack>

                    <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
                        {person.github && (
                            <Tooltip title="GitHub">
                                <IconButton
                                    onClick={() => window.open(person.github, "_blank")}
                                    sx={{
                                        color: "white",
                                        fontSize: 38,
                                        ":hover": { color: "#8c00ff", transform: "scale(1.2)" },
                                    }}
                                >
                                    <GitHubIcon sx={{ fontSize: 38 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                        {person.linkedin && (
                            <Tooltip title="LinkedIn">
                                <IconButton
                                    onClick={() => window.open(person.linkedin, "_blank")}
                                    sx={{
                                        color: "#00a6ff",
                                        fontSize: 38,
                                        ":hover": { color: "#00eaff", transform: "scale(1.2)" },
                                    }}
                                >
                                    <LinkedInIcon sx={{ fontSize: 38 }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </motion.div>
    </motion.div>
);

const DevelopersPage = () => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [robot, setRobot] = React.useState(robotImages.default);
    const [chatOpen, setChatOpen] = React.useState(false);
    const [msgIndex, setMsgIndex] = React.useState(0);
    const [clickCount, setClickCount] = React.useState(0);
    const [showCursor, setShowCursor] = React.useState(true);

    const messages = [
        "Click here to hire us 😎",
        "Need help?",
        "Our team is awesome!",
        "We build full-stack projects 🚀",
    ];

    // Mouse tracking
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Mood cycle
    React.useEffect(() => {
        const moods = ["wave", "love", "megaphone", "laptop"];
        const interval = setInterval(() => {
            const random = moods[Math.floor(Math.random() * moods.length)];
            setRobot(robotImages[random]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Message cycle
    React.useEffect(() => {
        const interval = setInterval(() => {
            setMsgIndex((i) => (i + 1) % messages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Teleport robot
    React.useEffect(() => {
        const interval = setInterval(() => {
            setMousePos({
                x: Math.random() * window.innerWidth * 0.6,
                y: Math.random() * window.innerHeight * 0.6,
            });
            setRobot(robotImages.wave);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    // Click → talk or dance
    const handleClick = () => {
        setClickCount((c) => c + 1);

        if (clickCount === 0) {
            setRobot(robotImages.megaphone);
            setChatOpen(true);
        } else if (clickCount === 1) {
            setRobot(robotImages.love);
            setTimeout(() => setRobot(robotImages.default), 1500);
            setClickCount(0);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
                color: "white",
                textAlign: "center",
                p: 4,
                background: "radial-gradient(circle, #0a0a0a 10%, #000f1f 80%)",
            }}
        >
            {/* ✅ Floating Neon Wave */}
            <motion.div
                animate={{ x: ["0%", "100%", "0%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    top: "40%",
                    left: "-50%",
                    width: "200%",
                    height: "200px",
                    background:
                        "radial-gradient(circle, rgba(0,255,255,0.25) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(90px)",
                    opacity: 0.4,
                    zIndex: 1,
                }}
            />

            {/* ✅ Floating Code Rain */}
            {/* {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: ["-10%", "110%"] }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.4,
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            fontSize: "12px",
            color: "rgba(0,255,255,0.25)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {["const dev='Placomm';", "debug();", "console.log('🔥')"][i % 3]}
        </motion.div>
      ))} */}

            {/* ✅ FLOATING ALL TEAM AVATARS (5 left, 5 right) */}
            {members.slice(0, 10).map((m, idx) => (
                <motion.img
                    key={idx}
                    src={m.photo}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 4, -4, 0],
                    }}
                    transition={{
                        duration: 6 + idx * 0.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                    style={{
                        position: "fixed",
                        top: `${10 + (idx % 5) * 14}%`,     // ✅ 5 vertical slots
                        left: idx < 5 ? "1.5%" : "auto",    // ✅ first 5 left
                        right: idx >= 5 ? "1.5%" : "auto",  // ✅ next 5 right
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        opacity: 0.22,
                        filter: "drop-shadow(0 0 10px rgba(0,255,255,0.4))",
                        zIndex: 999,                        // ✅ visible above background but below robot
                        pointerEvents: "none",
                    }}
                />
            ))}



            {/* ✅ Floating Robot */}
            <motion.img
                src={robot}
                alt="robot"
                animate={{
                    y: [0, -12, 0],
                    scale: [1, 1.06, 1],
                    rotate: robot === robotImages.love ? [0, 8, -8, 0] : 0,
                }}
                transition={{
                    duration: robot === robotImages.love ? 0.3 : 2.5,
                    repeat: robot === robotImages.love ? 3 : Infinity,
                }}
                onMouseEnter={() => setRobot(robotImages.love)}
                onMouseLeave={() => setRobot(robotImages.default)}
                onClick={handleClick}
                style={{
                    position: "fixed",
                    left: mousePos.x + 25,
                    top: mousePos.y + 25,
                    width: "130px",
                    zIndex: 999999,
                    filter: "drop-shadow(0 0 15px #00eaff)",
                    pointerEvents: "auto",
                    cursor: "pointer",
                }}
            />

            {/* ✅ Speech Bubble (only when chat closed) */}
            {!chatOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: "fixed",
                        left: mousePos.x + 160,
                        top: mousePos.y - 10,
                        background: "rgba(0,255,255,0.15)",
                        border: "1px solid #00eaff",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        color: "white",
                        fontSize: "14px",
                        backdropFilter: "blur(6px)",
                        zIndex: 999999,
                        whiteSpace: "nowrap",
                    }}
                >
                    {messages[msgIndex]}
                </motion.div>
            )}

            {/* ✅ Chat Popup */}
            {chatOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: "fixed",
                        bottom: "140px",
                        right: "50px",
                        width: "260px",
                        background: "rgba(0,0,0,0.7)",
                        border: "1px solid #00eaff",
                        borderRadius: "12px",
                        padding: "15px",
                        zIndex: 99999,
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>🤖 Hello!</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>
                        Want to hire the Placomm Team for your project?
                    </Typography>
                    <button
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#00eaff",
                            color: "#000",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            confetti({
                                particleCount: 200,
                                spread: 90,
                                origin: { y: 0.8, x: 0.95 },
                            });
                            alert("We'll contact you soon!");
                        }}
                    >
                        Contact with Shambhavi Dwivedi
                    </button>
                </motion.div>
            )}

            {/* ✅ Particles */}
            <Particles
                id="tsparticles"
                options={{
                    background: { color: "transparent" },
                    particles: {
                        number: { value: 60 },
                        size: { value: { min: 1, max: 4 } },
                        color: { value: "#00eaff" },
                        move: { speed: 1 },
                        links: {
                            color: "#00eaff",
                            distance: 120,
                            enable: true,
                        },
                    },
                }}
                style={{ position: "absolute", top: 0 }}
            />

            {/* ✅ Neon Floating Circles */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{
                    position: "absolute",
                    top: "150px",
                    left: "10%",
                    width: "160px",
                    height: "160px",
                    borderRadius: "50%",
                    border: "3px solid #00eaff",
                    filter: "blur(1px)",
                    opacity: 0.3,
                }}
            />
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                style={{
                    position: "absolute",
                    bottom: "100px",
                    right: "15%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    border: "3px solid #b700ff",
                    filter: "blur(2px)",
                    opacity: 0.25,
                }}
            />

            {/* ✅ Hero */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ marginTop: "60px", marginBottom: "40px" }}
            >
                <motion.h1
                    animate={{ textShadow: ["0 0 10px #00eaff", "0 0 25px #b700ff"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                    style={{
                        fontSize: "48px",
                        fontWeight: "900",
                        letterSpacing: "2px",
                        background: "linear-gradient(90deg,#00eaff, #b700ff)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    ✨ Placomm Developer Tribute
                </motion.h1>

                <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    onAnimationComplete={() => {
                        setTimeout(() => setShowCursor(false), 200); // ✅ remove cursor after animation
                    }}
                    style={{
                        fontSize: "20px",
                        color: "rgba(255,255,255,0.6)",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        margin: "0 auto",
                        width: "fit-content",
                        borderRight: showCursor ? "3px solid #00eaff" : "none",
                        animation: showCursor ? "blink 0.8s step-end infinite" : "none",
                    }}
                >
                    Meet the brilliant minds behind the project…
                </motion.p>

            </motion.div>

            {/* ✅ Mentors */}
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                ⭐ Mentors & Advisors
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {mentors.map((p, i) => (
                    <Grid item key={i}>
                        <DeveloperCard person={p} />
                    </Grid>
                ))}
            </Grid>

            {/* ✅ Development Team */}
            <Typography variant="h4" sx={{ mt: 6, mb: 2, fontWeight: 700 }}>
                👨‍💻 Core Development Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {members.map((p, i) => (
                    <Grid item key={i}>
                        <DeveloperCard person={p} />
                    </Grid>
                ))}
            </Grid>

            {/* ✅ Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ marginTop: "80px" }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                    🚀 Project Journey
                </Typography>

                {[
                    "Idea Discussion & Proposal",
                    "UI/UX Prototyping",
                    "Student & Admin Modules",
                    "Training Officer Module",
                    "Certificate Automation",
                    "Android App Build",
                ].map((step, i) => (
                    <Typography
                        key={i}
                        sx={{
                            color: "rgba(255,255,255,0.7)",
                            mb: 1,
                            fontSize: "18px",
                        }}
                    >
                        ✅ {step}
                    </Typography>
                ))}
            </motion.div>

            {/* ✅ Footer */}
            <Box
                sx={{
                    mt: 10,
                    py: 3,
                    background: "rgba(255,255,255,0.05)",
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(6px)",
                }}
            >
                <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                    Built with ❤️ and endless debugging by the Placomm Team
                </Typography>
            </Box>
        </Box>
    );
};

export default DevelopersPage;
