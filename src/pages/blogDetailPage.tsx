import ContainerWrapper from "@/components/containerWrapper";
import { Button } from "@/components/ui/button";
import Markdown from "markdown-to-jsx";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { addComment, fetchBlog, fetchComments } from "../api/blogApi";

interface IBlogData {
  title: string;
  description: string;
  img: any;
  markdown: string;
  createdAt: string;
}

interface IComment {
  _id: string;
  comment: string;
}

const Heading: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  if (typeof children === "string" && children.toString().startsWith("#")) {
    return (
      <h1 className="font-bold text-2xl" {...props}>
        {children.toString().substring(1)}
      </h1>
    );
  } else {
    return <h1 {...props}>{children}</h1>;
  }
};

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [blogData, setBlogData] = useState<IBlogData | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blog = await fetchBlog(id||"");
        setBlogData(blog);
      } catch (error) {
        setError("Failed to fetch blog");
      }

      try {
        const comments = await fetchComments(id||"");
        setComments(comments);
      } catch (error) {
        setError("Failed to fetch comments");
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
      setError(""); // Clear any previous errors

      if (!comment) {
        console.error("Empty comment!!");
        return;
      }

      await addComment(id || "", comment);
      console.log("Comment posted!!");
      setComment(""); // Clear the comment input after successful submission
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment. Please try again.");
    }
  };

  if (!blogData) {
    return <p>Loading...</p>;
  }

  const { contentType, data } = blogData.img;
  const base64ImageData = `data:${contentType};base64,${btoa(
    data.data.reduce((acc: any, byte: any) => acc + String.fromCharCode(byte), "")
  )}`;

  return (
    <section>
      <ContainerWrapper>
        <div className="flex flex-col justify-start items-start mt-20">
          <h1 className="text-3xl font-bold text-black">{blogData.title}</h1>
          <p className="text-white rounded-full text-lg mt-5 bg-blue-500 py-1 px-7">
            {blogData.createdAt.substring(0, 10)}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="flex justify-center items-center overflow-hidden">
            <img
              src={base64ImageData}
              alt=""
              className="mt-10 object-cover max-h-[50vh] w-auto  "
              height={50}
            />
          </div>
        </div>
        <p className="text-md font-medium text-gray-500 mt-10">{blogData.description}</p>
        <Markdown
          options={{
            overrides: {
              h1: {
                component: Heading,
              },
            },
          }}
        >
          {blogData.markdown}
        </Markdown>
        <div className="flex justify-start items-center gap-5 mt-20">
          <input
            type="text"
            placeholder="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 p-2  border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <Button onClick={handleCommentSubmit}>Comment</Button>
        </div>
        <div className="mt-10">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-gray-700 px-10 py-4 w-[300px] mt-5 rounded-3xl"
            >
              <p className="text-md font-medium text-black">anonymous</p>
              <h1 className="mt-2 text-gray-500 text-lg">{comment.comment}</h1>
            </div>
          ))}
        </div>
      </ContainerWrapper>
    </section>
  );
};

export default BlogDetailPage;
