import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  console.log(author);
  return (
    <Link to={`/content/${_id}`}>
      <div className="mx-[66px] my-8 flex gap-x-8">
        <img
          src={`http://localhost:4000/${cover}`}
          alt="pic"
          className="h-[160px]  w-[250px]"
        />
        <div className=" w-[400px] flex gap-y-1 flex-col">
          <span className="font-bold text-xl">{title}</span>
          <div className="text-stone-600 space-x-5 font-bold">
            <span className="text-sm  text-center text-gray-500">{author}</span>
            <span className="text-sm text-center text-gray-500">
              {format(new Date(createdAt), "MMM d, yyyy hh:MM bb")}
            </span>
          </div>
          <span>{summary}</span>
        </div>
      </div>
    </Link>
  );
};

export default Post;
