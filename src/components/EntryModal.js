import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { categories } from "../utils/categories";
import { addEntry, deleteEntry, updateEntry } from "../utils/mutations";

// Modal component for individual entries.

/* EntryModal parameters:
entry: Data about the entry in question
type: Type of entry modal being opened. 
   This can be "add" (for adding a new entry) or 
   "edit" (for opening or editing an existing entry from table).
user: User making query (The current logged in user). */

export default function EntryModal({ entry, type, user }) {
  // State variables for modal status

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(entry.name);
  const [link, setLink] = useState(entry.link);
  const [description, setDescription] = useState(entry.description);
  const [category, setCategory] = useState(entry.category);
  const [socialLink, setSocialLink] = useState(entry.socialLink);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Modal visibility handlers

  const handleClickOpen = () => {
    setOpen(true);
    setName(entry.name);
    setLink(entry.link);
    setDescription(entry.description);
    setCategory(entry.category);
    setSocialLink(entry.socialLink);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
  };

  // Mutation handlers

  const handleAdd = () => {
    const newEntry = {
      name: name,
      link: link,
      description: description,
      category: category,
      socialLink: socialLink,
      user: user?.displayName ? user?.displayName : "GenericUser",
      userid: user?.uid,
    };

    addEntry(newEntry).catch(console.error);
    handleClose();
  };

  const handleUpdate = () => {
    const updatedEntry = {
      name: name,
      link: link,
      description: description,
      category: category,
      socialLink: socialLink,
      user: user?.displayName || "GenericUser",
      userid: user?.uid,
      id: entry.id,
    };

    updateEntry(updatedEntry).catch(console.error);
    handleClose();
  };

  const handleDelete = () => {
    deleteEntry(entry.id);
    handleDeleteClose();
  };

  // TODO: Add Delete Mutation Handler

  // Button handlers for modal opening and inside-modal actions.
  // These buttons are displayed conditionally based on if adding or editing/opening.
  // TODO: You may have to edit these buttons to implement editing/deleting functionality.

  const openButton =
    type === "edit" ? (
      <IconButton onClick={handleClickOpen}>
        <OpenInNewIcon />
      </IconButton>
    ) : type === "add" ? (
      <Button variant="contained" onClick={handleClickOpen}>
        Add entry
      </Button>
    ) : null;

  const actionButtons =
    type === "edit" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate}>
          Update Entry
        </Button>
        <Button
          color="warning"
          variant="outlined"
          onClick={() => setDeleteConfirmOpen(true)}
        >
          Delete Entry
        </Button>
        <Dialog open={deleteConfirmOpen}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this entry?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </DialogActions>
    ) : type === "add" ? (
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add Entry
        </Button>
      </DialogActions>
    ) : null;

  return (
    <div>
      {openButton}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
        <DialogContent>
          {/* TODO: Feel free to change the properties of these components to implement editing functionality. The InputProps props class for these MUI components allows you to change their traditional CSS properties. */}
          <TextField
            margin="normal"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            id="link"
            label="Link"
            placeholder="e.g. https://google.com"
            fullWidth
            variant="standard"
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            multiline
            maxRows={8}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <FormControl fullWidth sx={{ "margin-top": 20 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            id="socialLink"
            label="Social Link"
            placeholder="Facebook, twitter, and instagram are supported"
            fullWidth
            variant="standard"
            value={socialLink}
            onChange={(event) => setSocialLink(event.target.value)}
          />
        </DialogContent>
        {actionButtons}
      </Dialog>
    </div>
  );
}
