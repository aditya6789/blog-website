import { fetchBlogs } from "@/api/blogApi";
import Postcard from "@/components/card/postcard";
import ContainerWrapper from "@/components/containerWrapper";


import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface Blog {
  _id: string;
  title: string;
  img:any;
  createdAt: string;
}

const HomePage = () => {
  console.log("url:" , import.meta.env.VITE_API_URL)
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsData = await fetchBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);
  console.log(blogs);

  // Check if blogs array is not empty before accessing the first blog
  const firstBlog = blogs.length > 0 ? blogs[0] : null;

  // Check if the first blog exists and has an image
  const firstBlogImageURL = firstBlog?.img || '';

  // If the first blog has an image URL, extract the contentType and data properties
  const { contentType, data } = firstBlogImageURL || {};

  // Convert binary image data to base64 string
  const base64ImageData = firstBlogImageURL
    ? `data:${contentType};base64,${btoa(
        data.data.reduce((acc: any, byte: any) => acc + String.fromCharCode(byte), '')
      )}`
    : '';
  return (
    <>
      <header>
        <ContainerWrapper>
          
          <div className={`bg-cover h-[70vh] w-full rounded-3xl relative  `}  style={{ backgroundImage: `url('${base64ImageData}')` }}>
            <div className="h-[200px] w-[300px] md:h-[300px] md:w-[500px] p-10 bg-white absolute shadow-md rounded-3xl -bottom-20 left-50 md:left-10 flex justify-center items-center">
            {firstBlog && (
              <h1 className="text-start font-semibold text-4xl">
                {firstBlog.title}
              </h1>
            )}
            </div>
          </div>
        </ContainerWrapper>
      </header>
      <section className="mt-[150px]">
        <ContainerWrapper>
          <h1 className="text-3xl font-bold mb-10">Recent Stories</h1>
          <div className="grid grid-cols-4 gap-5">
           {blogs.map(blog=>(

             <Link to={`/blog/${blog._id}`} key={blog._id}>
                <Postcard date={blog.createdAt.substring(0,10)} title={blog.title} imageData={blog.img}/>
              </Link>
              ))}
      
          </div>
        </ContainerWrapper>
      </section>
    </>
  );
};

export default HomePage;
