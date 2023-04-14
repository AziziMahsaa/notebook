import React from "react";
import { useState, useEffect } from "react";

export default function Second() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("notes"));
    if (storedList) {
      setNotes(storedList);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteTextChange = (event) => {
    setNoteText(event.target.value);
  };
  const handleNoteSubmit = (event) => {
    event.preventDefault();
    if (noteText.trim() === "") return;
    if (selectedNoteIndex !== null) {
      const newNotes = [...notes];
      newNotes[selectedNoteIndex] = noteText;
      setNotes(newNotes);
      setSelectedNoteIndex(null);
    } else {
      setNotes([...notes, noteText]);
    }
    setNoteText("");
  };
  const handleNoteDelete = (noteIndex) => {
    setNotes(notes.filter((_, index) => index !== noteIndex));

    // to handle Delete faQat dashti state ro avaz mikardi. bayad local storage ham avaz mikardi
    // code avval check mikone ag tedad kolle note had 1 bashe, kolle key ro az local hazf kone
    // ag nist(else) faQat state jadid notes ro bezare to local storage >>>

    if (notes.length === 1) localStorage.removeItem("notes");
    else localStorage.setItem("notes", JSON.stringify(notes));
  };
  const handleNoteEdit = (noteIndex, note) => {
    setSelectedNoteIndex(noteIndex);
    setNoteText(note);
  };

  return (
    <div className="container mx-auto py-6">
      <form className="mb-6">
        <label htmlFor="note" className="block text-lg font-medium mb-2">
          Write a note:
        </label>
        <textarea
          id="note"
          name="note"
          rows="3"
          value={noteText}
          onChange={handleNoteTextChange}
          className="w-full text-black border border-gray-300 rounded-lg p-2 mb-4"
        ></textarea>
        <button
          onClick={handleNoteSubmit}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          {selectedNoteIndex !== null ? "Update Note" : "Save Note"}
        </button>
        {/* <button
          onClick={handleNoteSubmit}
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          Save Note
        </button> */}
      </form>
      <ul>
        {notes.map((note, index) => (
          <li key={index} className=" border  rounded-lg p-4 mb-4">
            {note}
            <div className="flex justify-end">
              {selectedNoteIndex === index ? (
                <button
                  onClick={() => setSelectedNoteIndex(null)}
                  className="text-gray-500 rounded-sm text-xs px-2 mx-4 hover:bg-white"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleNoteEdit(index, note)}
                    className="text-blue-500 rounded-sm text-xs px-2 mx-4 hover:bg-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleNoteDelete(index)}
                    className="text-red-500 rounded-sm text-xs px-2 mx-4 hover:bg-white"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
