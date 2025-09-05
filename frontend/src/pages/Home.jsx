// // src/pages/Home.jsx
// import { useState } from "react";

// export default function Home() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h2>Welcome to PlaComm 🚀</h2>
//       <p>Counter: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }


// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

export default function Home() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to PlaComm 🚀
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your placement companion for students and faculty
      </Typography>

      <Box mt={5} display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/student-recruiter-login")}
        >
          Student / Recruiter Login
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin-coordinator-login")}
        >
          Admin / Coordinator Login
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/student-register")}
        >
          Register as Student
        </Button>
      </Box>

      <Box mt={10}>
        <Typography variant="h6">Counter: {count}</Typography>
        <Button variant="text" onClick={() => setCount(count + 1)}>
          Increase
        </Button>
      </Box>
    </Container>
  );
}
