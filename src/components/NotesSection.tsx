import { useState } from "react";
import { Link } from "react-router-dom";

interface Note {
  id: number;
  title: string;
  description: string;
}

const NotesSection = () => {
  const notes: Note[] = [
    { id: 1, title: "Note 1", description: "Description for note 1" },
    { id: 2, title: "Note 2", description: "Description for note 2" },
    { id: 3, title: "Note 3", description: "Description for note 3" },
    { id: 1, title: "Note 1", description: "Description for note 1" },
    { id: 2, title: "Note 2", description: "Description for note 2" },
    { id: 3, title: "Note 3", description: "Description for note 3" },
    { id: 1, title: "Note 1", description: "Description for note 1" },
    { id: 2, title: "Note 2", description: "Description for note 2" },
    { id: 1, title: "Note 1", description: "Description for note 1" },
    { id: 2, title: "Note 2", description: "Description for note 2" },
    { id: 3, title: "Note 3", description: "Description for note 3" },
    { id: 1, title: "Note 1", description: "Description for note 1" },
    { id: 2, title: "Note 2", description: "Description for note 2" },
  ];

  const [selectedNoteIds, setSelectedNoteIds] = useState<number[]>([]);

  const handleNoteSelect = (id: number) => {
    setSelectedNoteIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((noteId) => noteId !== id) // Deselect if already selected
          : [...prev, id] // Add to selection if not already selected
    );
  };

  return (
    <>
      {/* <div className=" max-h-full grid lg:grid-cols-3  lg:grid-flow-row gap-3">
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>
        <div className="  row-span-2 bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] row-span-1 bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>{" "}
        <div className=" h-[200px] bg-red-400 rounded-lg p-1">
          <div className=" font-semibold text-3xl">Title</div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
            expedita!
          </div>
        </div>
      </div> */}
      <div className=" bg-red-400 h-full overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md group hover:bg-gray-200"
          >
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.description}</p>
            {/* Button that appears on hover */}
            {/* <button
              onClick={() => handleSelectNote(note.id)}
              className="absolute top-2 right-2 px-2 py-1 text-sm text-white bg-blue-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Select
            </button> */}
            <input
              type="checkbox"
              className={`absolute top-2 right-2 px-2 py-1 text-sm text-white bg-blue-600 rounded-md ${
                !selectedNoteIds.includes(note.id) ? "opacity-0" : "opacity-100"
              }  group-hover:opacity-100 transition-opacity duration-300`}
              id={String(note.id)}
              checked={selectedNoteIds.includes(note.id)}
              onChange={() => handleNoteSelect(note.id)}
            />
          </div>
        ))}
      </div>

      <Link
        to={"/addnote"}
        className=" h-16 w-16 bg-green-300 rounded-xl absolute bottom-10 right-10"
      >
        AddNote
      </Link>

      <div></div>
    </>
  );
};

export default NotesSection;
