import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const Create = () => {
  const [postid, setId] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/post/" + id);
    console.log(response.json());
  };

  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) =>
      response.json().then((data) => {
        setId(data._id);
        setTitle(data.title);
        setContent(data.content);
        setSummary(data.summary);
        setAuthor(data.author);
      })
    );
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("id", postid);
    data.set("author", author);
    data.set("title", title);
    data.set("summary", summary);
    data.set("photo", photo[0]);
    data.set("content", content);
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/edit", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        alert("Enter appropriate values");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div className="mx-[66px] mt-10">
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          className="w-[1400px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Summary"
          className="w-[1400px]"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <Button
          variant="contained"
          color="info"
          component="label"
          endIcon={<AddPhotoAlternateIcon />}
          className="w-[200px]"
          disableElevation
        >
          upload file{" "}
          <input
            type="file"
            hidden
            onChange={(e) => setPhoto(e.target.files)}
          />
        </Button>
        <ReactQuill
          modules={modules}
          style={{ height: "300 px" }}
          formats={formats}
          className=""
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <Button
          color="success"
          variant="contained"
          className="mt-2"
          disableElevation
          type="submit"
        >
          done
        </Button>
      </form>
    </div>
  );
};

export default Create;
