import React, { useEffect, useState } from "react";
import { deleteNote, updateNote } from "../../actions/noteActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

const SingleNote = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const [message, setmessage] = useState(null);

  const navigate = useNavigate();

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const updateHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      setmessage(`Please fill all fields`);
    } else {
      try {
        dispatch(updateNote(id, title, content, category));
        resetHandler();
        navigate("/mynotes");
      } catch (error) {
        console.log("Error in dispatching notes");
      }
    }
  };

  const deleteHandler = (objectID) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(objectID));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        if (id) {
          const { data } = await axios.get(`/api/notes/${id}`);

          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
        }
      } catch (error) {
        console.error("Error fetching note data:", error);
      }
    };

    fetching();
  }, [id]);

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header as="h5">Edit your Note</Card.Header>
        <Card.Body>
          {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
          )}
          {loadingDelete && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                value={content}
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>

            <Button
              variant="danger"
              className="mx-2"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default SingleNote;
