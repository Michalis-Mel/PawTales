import UploadStory from "../components/UploadStory";
import DeleteStories from "../components/DeleteStories";
import AddTopStories from "../components/AddTopStories";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Admin = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="admin">
      {user ? (
        <div className="adminCon">
          <DeleteStories />
          <UploadStory />
          <AddTopStories />
        </div>
      ) : (
        <h1 className="logIn">Unauthorized</h1>
      )}
    </div>
  );
};

export default Admin;
