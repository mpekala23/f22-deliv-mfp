import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FacebookEmbed,
  TwitterEmbed,
  InstagramEmbed,
} from "react-social-media-embed";
import IconButton from "@mui/material/IconButton";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import { useEffect } from "react";

export default function SocialModal({ link }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (!link) return;
    if (link.includes("facebook")) {
      setType("facebook");
    } else if (link.includes("twitter")) {
      setType("twitter");
    } else if (link.includes("instagram")) {
      setType("instagram");
    } else {
      setType(null);
    }
  }, [link]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const openButton = (
    <IconButton onClick={handleClickOpen}>
      <AppShortcutIcon />
    </IconButton>
  );

  const actionButtons = (
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  );

  return (
    <div>
      {openButton}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Social Media</DialogTitle>
        <DialogContent>
          {type === "facebook" && <FacebookEmbed url={link} width={550} />}
          {type === "twitter" && <TwitterEmbed url={link} width={550} />}
          {type === "instagram" && <InstagramEmbed url={link} width={550} />}
        </DialogContent>
        {actionButtons}
      </Dialog>
    </div>
  );
}
