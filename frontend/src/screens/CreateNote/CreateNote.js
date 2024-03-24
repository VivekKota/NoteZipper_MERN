import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../../actions/noteActions";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const noteCreate = useSelector((state) => state.noteCreate);
  const [message, setmessage] = useState(null);

  const navigate = useNavigate();

  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !content || !category) {
      setmessage("Please fill all fields");
    } else {
      try {
        dispatch(createNote(title, content, category));
        resetHandler();
        navigate("/mynotes");
      } catch (error) {}
    }
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create a Note">
      <Card>
        <Card.Header as="h5">Create a New Note</Card.Header>
        <Card.Body>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <Form onSubmit={submitHandler}>
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
            <Button
              variant="primary"
              id="inputGroupFileAddon04"
              onClick={submitHandler}
            >
              Create Note
            </Button>

            <Button variant="danger" className="mx-2" onClick={resetHandler}>
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateNote;
