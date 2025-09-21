import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted successfully");
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast;
    }
  };
  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all
     duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {new Date(note.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <div className="flex items-center gap-1">
            <Link to={`/note/${note._id}`}>
              <PenSquareIcon className="size-4" />
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-xs text-error"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
