import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-apps"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-apps", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) =>
      prevNotes.filter((noteItem, index) => index !== id)
    );
  }

  const filteredNotes = notes.filter(
    (noteItem) =>
      noteItem.title.toLowerCase().includes(searchText.toLowerCase()) ||
      noteItem.content.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="search">
        <SearchIcon className="search-icons" size="1.3em" />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="type to search..."
        />
      </div>
      <CreateArea onAdd={addNote} />

      {filteredNotes.map((noteItem, index) => (
        <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
