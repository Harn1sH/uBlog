import React, { useEffect, useState } from "react";
import Post from "./Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) =>
      response.json().then((posts) => setPosts(posts))
    );
  }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post, index) => {
          return <Post key={index} {...post} />;
        })}

      {!posts.length > 0 && (
        <div className="h-screen w-screen flex justify-center items-center font-bold text-9xl text-gray-200">
          NO BLOGS YET
        </div>
      )}
    </div>
  );
};

export default HomePage;
