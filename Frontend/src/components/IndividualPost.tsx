// src/components/IndividualPost.tsx
import { useParams } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

export default function InstagramPost() {
  const { id } = useParams();
  const { posts } = usePostContext();
  
  const post = posts.find((p) => p.id === parseInt(id || ""));

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { user: 'alex_89', text: 'This looks amazing! 😍', likes: 4 },
    { user: 'travel_enthusiast', text: 'Where is this? I need to visit!', likes: 2 }
  ]);
  const [likeCount, setLikeCount] = useState(post?.likes || 0);

  if (!post) {
    return <div className="text-white text-lg">Post not found</div>;
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { user: 'current_user', text: comment, likes: 0 }]);
      setComment('');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 p-0.5">
            <div className="bg-white rounded-full p-0.5 h-full w-full">
              <img 
                src="/api/placeholder/40/40" 
                alt="Profile" 
                className="rounded-full h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">travel_photography</p>
            <p className="text-xs text-gray-500">Santorini, Greece</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500 h-5 w-5" />
      </div>

      {/* Image */}
      <div className="w-full">
        <img 
          src={post.imageUrl}
          alt="Post" 
          className="w-full object-cover" 
        />
      </div>

      {/* Action Buttons */}
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={handleLike}>
              <Heart 
                className={`h-6 w-6 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-800'}`} 
              />
            </button>
            <button>
              <MessageCircle className="h-6 w-6 text-gray-800" />
            </button>
            <button>
              <Send className="h-6 w-6 text-gray-800" />
            </button>
          </div>
          <button onClick={handleSave}>
            <Bookmark 
              className={`h-6 w-6 ${saved ? 'text-black fill-black' : 'text-gray-800'}`} 
            />
          </button>
        </div>

        <p className="font-semibold text-sm mb-1">{likeCount} likes</p>

        <p className="text-sm mb-2">
          <span className="font-semibold">travel_photography</span> {post.caption}
        </p>

        <p className="text-xs text-gray-500 mb-3">2 HOURS AGO</p>

        {/* Comments */}
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={index} className="flex justify-between items-start mb-2">
              <p className="text-sm">
                <span className="font-semibold">{comment.user}</span> {comment.text}
              </p>
              <Heart className="h-3 w-3 text-gray-500 mt-1" />
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="flex items-center border-t pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button 
            type="submit" 
            className={`text-blue-500 font-semibold text-sm ${comment.trim() ? '' : 'opacity-50'}`}
            disabled={!comment.trim()}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
