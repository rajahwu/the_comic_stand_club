export default function ContentCard({ currentContent, contentType }) {
    return (

      <div>
        <div>
          <h1>{currentContent?.name} content page</h1>
          <p>
            {contentType}Id : {currentContent.id}
          </p>
          <p>Description: {currentContent?.description}</p>
        </div>
        {/* <Link to="/feed">Back to feed</Link> */}
      </div>
    );
  };
  