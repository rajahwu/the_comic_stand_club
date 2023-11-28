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
    let isMounted = true;
    const fetchRssData = async () => {
      try {
        const feed = await fetchRSS();
        if (isMounted) setRssFeed(feed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRssData();
    return () => {
      isMounted = false;
    };
  }, []);
  if(rssFeed.length === 0 || !rssFeed) return <div>Loading...</div>
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
