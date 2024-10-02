import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const url = "http://localhost:5100/api";
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [notes, setNotes] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Fetch documents from API
  const fetchDocuments = async () => {
    const storedToken = localStorage.getItem("token");
    try {
      const response = await axios.get(url + "/document/get-documents", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      });
      setDocuments(response.data);
    } catch (error) {
      console.error(
        "Error fetching documents:",
        error.response ? error.response.data : error
      );
    }
  };

  // Fetch notes from API
  const fetchNotes = async () => {
    const storedToken = localStorage.getItem("token");
    try {
      const response = await axios.get(url + "/notes/get-notes", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      });
      setNotes(response.data); // Update notes state
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response ? error.response.data : error
      );
    }
  };

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const response = await axios.get(url + "/user/get-user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      });

      if (response.data) {
        setUserDetails({
          name: response.data.name,
          email: response.data.email,
          login: response.data.logins,
        });
        setIsLogin(true);
      }
    } catch (error) {
      console.error(
        "Failed to get the user data",
        error.response ? error.response.data : error
      );
    }
  };

  // useEffect to load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken); // Set the token in state
        await fetchUserData(); // Fetch user data
      }
    };
    loadData();
  }, []);

  // Optional: Log userDetails whenever they change
  
    useEffect(() => {
      const loadData = async () => {
        await fetchDocuments(); // Fetch documents
        await fetchNotes(); // Fetch notes
      };
      if (isLogin === true) {
        loadData();
      }
    }, [isLogin]);

  useEffect(() => {
    // console.log("Updated userDetails:", userDetails);
  }, [userDetails]);

  // Optional: Log notes whenever they change
  useEffect(() => {
    // console.log('Updated notes:', notes);
  }, [notes]);

  // Optional: Log documents whenever they change
  useEffect(() => {
    // console.log('Updated documents:', documents);
  }, [documents]);

  // Add a new note
  const addNote = async (title, description) => {
    const newUrl = url + "/notes/add-notes";
    try {
      const response = await axios.post(
        newUrl,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      await fetchNotes(); // Fetch updated notes after adding
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    const newUrl = url + `/notes/delete-notes/${noteId}`;
    try {
      await axios.delete(newUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      await fetchNotes(); // Fetch updated notes after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Update a note
  const updateNote = async (notesId, category, bgcolor) => {
    const newUrl = url + `/notes/update-notes/${notesId}`;
    try {
      await axios.put(
        newUrl,
        { category, bgcolor },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      await fetchNotes(); // Fetch updated notes after deletion
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Context value to be passed to other components
  const ContextValue = {
    url,
    isLogin,
    setIsLogin,
    userDetails,
    setToken,
    notes,
    setNotes, // Add notes to context,
    addNote,
    deleteNote,
    updateNote,
    documents,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
