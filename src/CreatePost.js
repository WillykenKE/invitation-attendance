import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createPost = (e) => {
    e.preventDefault();

    axios
      .post("/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate("posts");
  };

  return (
    <div className="my-5" style={{ textAlign: "center", width: "90%", margin: "auto auto" }}>
      <h1 className="my-5">Guest in Attendance</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="title"
            value={post.title}
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
            placeholder="First & Second Name"
          />
          <Form.Control
            onChange={handleChange}
            name="description"
            value={post.description}
            style={{ marginBottom: "1rem" }}
            placeholder="Phone Number"
          />
        </Form.Group>
        <Button
          onClick={createPost}
          variant="success"
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          CREATE ATTENDANCE
        </Button>
      </Form>
      <Button
        onClick={() => navigate("posts")}
        variant="outline-secondary"
        style={{ width: "100%" }}
      >
        ALL ATTENDANCE
      </Button>
    </div>
  );
}

export default CreatePost;
