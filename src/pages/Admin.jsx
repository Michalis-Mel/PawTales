import UploadStory from "../components/UploadStory";
import DeleteStories from "../components/DeleteStories";
import AddTopStories from "../components/AddTopStories";
import ToggleMaintenance from "../components/ToggleMaintenance";

const Admin = () => {
  return (
    <div className="admin">
      <div className="adminCon">
        <DeleteStories />
        <UploadStory />
        <AddTopStories />
        <ToggleMaintenance />
      </div>
    </div>
  );
};

export default Admin;
