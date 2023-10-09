const Story = ({ story }) => {
  const { id, title, content, tags, idea, image, smallDescription } = story;
  return (
    <div className="story">
      <div className="storyCon">
        <img src={image} alt={title} />
        <div className="storyInfo">
          <h3>{title}</h3>
          {idea && <h5>Ιδέα: {idea}</h5>}
          <p>{smallDescription}</p>
          <div className="tags">
            {tags && tags.map((tag, index) => <span key={index}>#{tag}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
