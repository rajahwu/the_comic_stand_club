export default function NewsFeed({ rssFeed }) {
  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {rssFeed.length &&
        rssFeed?.map((entry, i) => (
          <a key={i} href={entry.link} target="_blank" rel="noreferrer">
            <p>{entry.title}</p>
          </a>
        ))}
    </div>
  );
}
