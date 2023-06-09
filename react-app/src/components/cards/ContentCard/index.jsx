import { useHistory } from "react-router-dom";

export default function ContentCard({ currentContent, contentType }) {
  const history = useHistory();
  return (
    <div
    style={{cursor: "pointer"}}
      onClick={(e) =>
        history.push(
          `/${contentType[contentType.length - 1] === "s" ? contentType.substring(0, contentType.length - 1) : contentType}/${
            currentContent.id
          }`
        )
      }
    >
      <div>
        <h1>{currentContent?.name} content page</h1>
        <p>
          {contentType} Id : {currentContent?.id}
        </p>
        <p>Description: {currentContent?.description}</p>
      </div>
    </div>
  );
}
