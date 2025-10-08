import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function ViewResultDialog({ open, onClose, activity, onLock }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!activity) return null;

  const handleLockClick = () => setConfirmOpen(true);

  const handleConfirmLock = () => {
    setConfirmOpen(false);
    onLock(activity.id); // tell parent to mark activity as locked
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
          {activity.topic} - Results
          {activity.locked && (
            <LockIcon
              sx={{ ml: 1, fontSize: 20, color: "goldenrod" }}
              titleAccess="Locked"
            />
          )}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {activity.students && activity.students.length > 0 ? (
            activity.students.map((s, i) => (
              <Typography key={i} sx={{ mb: 1 }}>
                <strong>{s.name}</strong> — {s.marks} marks (
                {s.marks >= activity.minMarks ? "Eligible ✅" : "Not Eligible ❌"})
              </Typography>
            ))
          ) : (
            <Typography>No results uploaded for this activity.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {/* Only show Lock button if not locked */}
          {!activity.locked && (
          <Button
           onClick={() => onLock(activity.id)}
           variant="contained"
           color="secondary"
           >
           Lock
          </Button>
         )}

          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Lock These Students?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmLock} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Students Locked!
        </Alert>
      </Snackbar>
    </>
  );
}
