import React, { useState } from "react";
import { Link,  useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Please fill in all fields.");
      return;
    } 
      setLoading(true);
      try {
        await api.post("/notes", { title, content });
        toast.success("Note created successfully!");
        setTitle("");
        setContent("");
        navigate("/");
      } catch (error) {
        console.error("Error creating note:", error);
        toast.error("Failed to create note. Please try again.");
      }
      finally {
        setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto ">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Note
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
