import { useApi } from "@/api/addblog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authProvider";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { error, loading, submitBlog } = useApi();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMarkdown(e.target.value);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImg(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!img) {
      console.error("Image file is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("markdown", markdown);
    formData.append("img", img);

    const success = await submitBlog(formData);
    if (success) {
      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setMarkdown("");
      setImg(null);
      navigate("/"); // Redirect to home page or any other page after successful submission
    }
  };

  useEffect(() => {
    // Redirect to login page if user is not logged in
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  if (!user) {
    return <></>; // Render nothing until authentication status is determined
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className=" p-2 mb-4 border-2 rounded-lg  border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className=" p-2 mb-4 border-2 rounded-lg  border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <textarea
          
          placeholder="Markdown"
          value={markdown}
          onChange={handleMarkdownChange}
          className="w-full p-2 mb-4 border-2 rounded-lg  border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        <input type="file" onChange={handleImageChange} />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddBlog;
