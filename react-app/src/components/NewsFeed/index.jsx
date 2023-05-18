import { useState, useEffect } from "react";

async function fetchRSS() {
  try {
    const response = await fetch("/api/rss-feed/");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch RSS feed");
    }
  } catch (error) {
    console.error(error);
  }
}

export default function NewsFeed() {
  const [rssFeed, setRssFeed] = useState([]);

  useEffect(() => {
    const fetchRssData = async () => {
      try {
        const feed = await fetchRSS();
        setRssFeed(feed);
        // console.log("Rss data: ", feed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRssData();
  }, []);
  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {rssFeed?.length &&
        rssFeed?.map((entry, i) => (
          <a key={i} href={entry.link} target="_blank" rel="noreferrer">
            <p>{entry.title}</p>
          </a>
        ))}
    </div>
  );
}
