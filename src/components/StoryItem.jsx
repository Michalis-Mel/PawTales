import { NavLink } from "react-router-dom";
const StoryItem = ({ story }) => {
  const { id, title, idea, image, smallDescription, dateCreated } = story;
  return (
    <div className="story">
      <NavLink to={`/stories/${id}`} className="storyCon">
        <img src={image} alt={title} />
        <div className="storyInfo">
          <h3>{title}</h3>
          <h5>{dateCreated}</h5>
          {idea && <h5>Ιδέα: {idea}</h5>}
          <p>{smallDescription}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default StoryItem;
