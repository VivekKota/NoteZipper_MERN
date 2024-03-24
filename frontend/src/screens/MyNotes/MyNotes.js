import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./MyNotes.css"; // Import CSS file for styling
import { deleteNote, listNotes } from "../../actions/noteActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: sucessCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: sucessUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const navigate = useNavigate();

  const [expandedNote, setExpandedNote] = useState(null);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  const toggleExpand = (id) => {
    setExpandedNote((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
    console.log(userInfo);
  }, [dispatch, sucessCreate, sucessUpdate, navigate, userInfo, successDelete]);

  return (
    <MainScreen title={`Welcome back ${userInfo.name}...`}>
      <Link to="/createNote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loadingDelete && <Loading />}
      {loading && <Loading />}

      {notes &&
        [...notes]
          ?.reverse()
          .filter((fillterNote) =>
            fillterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Card
              style={{
                margin: 10,
                transition: "max-height 0.3s ease-in-out",
              }}
              key={note._id}
              className={`${expandedNote === note._id ? "expanded" : ""}`}
            >
              <Card.Header
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={() => toggleExpand(note._id)}
              >
                <span
                  style={{
                    color: "black",
                    flex: 1,
                    textDecoration: "none",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {note.title}
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from bubbling up to header
                      deleteHandler(note._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <div className="body-container">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </div>
            </Card>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
