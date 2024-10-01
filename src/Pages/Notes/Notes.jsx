import React, { useContext, useState } from "react";
import "./Notes.css";
import { MdLightbulbOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import NotesBox from "../../components/NotesBox/NotesBox";

import { StoreContext } from "../../store/storeContext";

const Notes = () => {
  const [active, setActive] = useState("Notes");
  const [notesAddBox, setNotesAddBox] = useState("z-n1 d-none");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { notes,addNote } = useContext(StoreContext);
  
  if (!notes) {
    // Show loading or placeholder if notes haven't been fetched yet
    return <div>Loading...</div>;
  }

  const handleAddNotes = async () => {
    if (!title || !description) {
      alert("Title and description cannot be empty.");
      return;
    }

      addNote(title,description);
      setLoading(true);
      setTitle("");
      setDescription("");
      setLoading(false);
      setNotesAddBox("z-n1");
  };

 const filteredNotes = notes.filter(note => {
  if (active === "Notes") {
    return note.category === "normal"; // Show only normal notes
  } else if (active === "Archieve") {
    return note.category === "archieve"; // Show only archived notes
  } else if (active === "Trash") {
    return note.category === "trash"; // Show only trashed notes
  }
  return true; // Default case (return all notes if no match)
});

  

  return (
    <>
      <section className="notes-wrapper bg-[white]">
        <div className="row">
          <div className="col-2 min-h-[100vh]">
            <div
              className={`d-flex gap-15 align-items-center mt-3 heading ${
                active === "Notes" ? "active-nodes-heading" : ""
              }`}
              onClick={() => setActive("Notes")}
            >
              <MdLightbulbOutline className="ml-5 fs-5" />
              <h2>Notes</h2>
            </div>
            <div
              className={`d-flex gap-15 align-items-center heading ${
                active === "Archieve" ? "active-nodes-heading" : ""
              }`}
              onClick={() => setActive("Archieve")}
            >
              <RiInboxArchiveLine className="ml-5 fs-5" />
              <h2>Archieve</h2>
            </div>
            <div
              className={`d-flex gap-15 align-items-center heading ${
                active === "Trash" ? "active-nodes-heading" : ""
              }`}
              onClick={() => setActive("Trash")}
            >
              <FaRegTrashCan className="ml-5 fs-5" />
              <h2>Trash</h2>
            </div>
          </div>
          <div className="col-10 px-5 position-relative">
            <div className="d-flex flex-row justify-content-end mt-3">
              <button onClick={() => setNotesAddBox("z-3 d-flex")} className="btn">Add Note</button>
            </div>

            <div className={` flex-column p-3 rounded-2 position-absolute gap-15 addNotesBox ${notesAddBox}`}>
              <div className="form-floating mt-2">
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="floatingPassword"
                  placeholder="Title"
                />
                <label htmlFor="floatingPassword">Title</label>
              </div>
              <div className="form-floating">
                <textarea
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="floatingPassword"
                  placeholder="Notes"
                />
                <label htmlFor="floatingPassword">Description</label>
              </div>
              <div>
                <button onClick={handleAddNotes} className="btn ">
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
              <div onClick={() => setNotesAddBox("z-n1 d-none")} className="position-absolute top-1 end-1">
                <RxCross2 />
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex flex-wrap gap-15 mt-3">
                {filteredNotes.map(item => (
                  <NotesBox 
                    key={item._id}
                    bgcolor={item.bgcolor} 
                    title={item.title} 
                    description={item.description} 
                    noteId={item._id} 
                    category={item.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notes;
