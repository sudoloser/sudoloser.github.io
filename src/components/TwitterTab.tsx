import { useState, useEffect } from 'react';
import { Twitter } from 'lucide-react';

interface Post {
  link: string;
  title: string;
  description: string;
  pubDate: string;
  enclosure?: { link: string; type: string };
  thumbnail?: string;
  author: string;
}

const TwitterTab = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://nitter.net/explysm/rss');
        const data = await response.json();
        setPosts(data.items || []);
      } catch (err) {
        console.error("Failed to fetch tweets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  return (
    <div className="h-[calc(100vh-140px)] overflow-y-auto pr-2 pb-20 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 font-inter mb-6">X Posts</h3>
      {loading ? (
        <div className="text-slate-400">Loading posts...</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => {
            const isRepost = post.title.startsWith('RT');
            const content = post.description.replace(/<[^>]*>?/gm, '').replace(/https?:\/\/t\.co\/\S+/g, '');
            const imageMatch = post.description.match(/src="([^"]*)"/);
            const image = imageMatch ? imageMatch[1] : (post.thumbnail || post.enclosure?.link);

            return (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="block p-5 bg-slate-900/40 border border-slate-700/50 rounded-xl hover:border-slate-500 transition-all duration-300"
              >
                {isRepost && (
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] mb-2 font-bold uppercase tracking-wider">
                    <Twitter size={10} /> Repost
                  </div>
                )}
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{content}</p>
                {image && (
                  <img 
                    src={image} 
                    alt="" 
                    className="mt-4 rounded-lg w-full object-cover max-h-64 border border-slate-700"
                  />
                )}
                <div className="mt-4 flex items-center justify-between text-slate-500 text-[10px] font-mono">
                  <span>{post.author}</span>
                  <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TwitterTab;
