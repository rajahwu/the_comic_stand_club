import CharacterCardImage from "../CharacterCardImage";

export default function CharacterCard({
  id,
  title,
  imageUrl,
  description,
  urls,
}) {
  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "inline-block",
          textAlign: "left",
          margin: "0 0 5px 0",
        }}
      >
        {urls?.map((url) => (
          <a
            key={urls.indexOf(url)}
            style={{
              textAlign: "left",
              fontSize: "0.7rem",
              margin: 0,
              padding: "0 0.5rem 0 0",
              color: "yellow",
              textDecoration: "none",
              textTransform: "uppercase",
              overflow: "hidden",
            }}
            href={url.url}
            target="_blank"
            rel="noreferrer"
          >
            {url.type}
          </a>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <CharacterCardImage imageUrl={imageUrl} contentId={id} />
        {description && (
          <p
            className="description"
            style={{
              display: "inline-block",
              width: "250px",
              height: "150px",
              overflow: "hidden",
              fontSize: "0.9rem",
              margin: "15px",
              padding: "5px",
              backgroundColor: "rgba(55,55,55,0.2)",
              border: "5px solid rgba(255,255,255,0.5)",
              color: "white",
              borderRadius: "15px",
            }}
          >
            {description}
          </p>
        )}
      </div>
      <p
        className="title"
        style={{ textAlign: "left", margin: "0 0 2.5rem 0" }}
      >
        {title}
      </p>
    </div>
  );
}
