const ShareStory = () => {
  return (
    <div className="shareBtns">
      <div
        className="fb-share-button"
        data-href={encodeURIComponent(window.location.href)}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmichalis-mel.github.io%2FPawTales%2F%23%2FPawTales%2Fstories%2F2&amp;src=sdkpreparse"
          className="fb-xfbml-parse-ignore"
        >
          Facebook
        </a>
      </div>
    </div>
  );
};

export default ShareStory;
