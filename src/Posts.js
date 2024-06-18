import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Table, Badge } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    title: "",
    description: "",
    attendance: false,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setPosts(posts.filter((post) => post._id !== id));
    handleDeleteClose();
  };

  const updatePost = (id, title, description, attendance) => {
    setUpdatedPost({ id, title, description, attendance });
    handleShow();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedPost((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveUpdatedPost = () => {
    axios
      .put(`/update/${updatedPost.id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setPosts(
      posts.map((post) =>
        post._id === updatedPost.id ? updatedPost : post
      )
    );
    handleClose();
  };

  return (
    <div className="" style={{ width: "90%", margin: "auto", textAlign: "center" }}>
      <h1 className="my-4">Attendance</h1>
      <Button
        variant="outline-dark"
        style={{ width: "100%", marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Attenance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              placeholder="First & Second Name"
              name="title"
              value={updatedPost.title}
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <Form.Control
              placeholder="Phone Number"
              name="description"
              onChange={handleChange}
              value={updatedPost.description}
              style={{ marginBottom: "1rem" }}
            />
            <Form.Check
              type="checkbox"
              label="Confirm attendance"
              name="attendance"
              checked={updatedPost.attendance}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>First & Second Names</th>
            <th>Phone Number</th>
            <th>Attendance</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{post.description}</td>
              <td>
                <Badge pill bg={post.attendance ? "success" : "secondary"}>
                  {post.attendance ? "Present" : "Absent"}
                </Badge>
              </td>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="dark"
                  onClick={() =>
                    updatePost(post._id, post.title, post.description, post.attendance)
                  }
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDeleteShow}>
                  Delete
                </Button>

                <Modal show={deleteShow} onHide={handleDeleteClose} animation={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you wanna delete this entry?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={() => deletePost(post._id)}>
                      Parmanent Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Posts;
