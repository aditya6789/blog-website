import Postcard from '@/components/card/postcard';
import ContainerWrapper from '@/components/containerWrapper';
import { fetchBlogs } from '../api/blogApi';
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  img: any;
  createdAt: string;
}

const BlogPage = () => {
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

  return (
    <>
      <header>
        <ContainerWrapper>
          <div className='flex justify-center items-center'>
            <h1 className='text-center text-3xl font-bold'>All Blogs</h1>
          </div>
        </ContainerWrapper>
      </header>
      <section>
        <ContainerWrapper>
          <div className='grid grid-cols-4 gap-5 mt-20'>
            {blogs.map((data, index) => (
              <Link to={`/blog/${data._id}`} key={index}>
                <Postcard date={data.createdAt.substring(0, 10)} title={data.title} imageData={data.img} />
              </Link>
            ))}
          </div>
        </ContainerWrapper>
      </section>
    </>
  );
};

export default BlogPage;
