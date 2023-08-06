import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Button } from "@mui/material";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";

const Content = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) =>
        response.json().then((data) => {
          setPost(data);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const postDate = Date(post.createdAt).split(" ");
  const finalDate = `${postDate[0]} ${postDate[1]} ${postDate[2]} ${postDate[3]}`;
  return (
    <div className="mx-[66px] my-9">
      <div className="mt-8">
        <span className="font-bold text-5xl ">{post.title}</span>
      </div>

      <div className="flex flex-col items-center justify-center  gap-y-1 my-3">
        <div className="text-xl font-semibold text-black-500">
          by {post.author}
        </div>
        <div>{format(new Date(finalDate), "MMM d, yyyy  ")}</div>
        {userInfo.username === post.author ? (
          <Link to={`/edit/${id}`}>
            <Button
              variant="contained"
              color="success"
              endIcon={<EditIcon />}
              disableElevation
            >
              edit
            </Button>
          </Link>
        ) : (
          " "
        )}
      </div>
      <img
        src={post ? `http://localhost:4000/${post.cover}` : ``}
        alt="img"
        className="h-[300px] w-screen "
      />

      <div className="my-8">
        <div
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </div>
  );
};

export default Content;
