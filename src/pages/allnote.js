import React, { useState, useEffect } from "react";

function Notes() {
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  function handleNoteChange(event) {
    setNote(event.target.value);
  }

  function handleSaveNote() {
    localStorage.setItem("note", note);
    alert("Note saved!");
  }

  return (
    <div>
      <form>
        <textarea
          className="text-black"
          value={note}
          onChange={handleNoteChange}
        />
        <button
          className="ml-20 bg-white text-black
      "
          onClick={handleSaveNote}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Notes;
