import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import  PostContext  from '../PostContext/ContextProvider';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  replies?: Comment[];
}

export default function InstagramPost() {
  const { id } = useParams();
  //@ts-ignore
  const { Posts } = useContext(PostContext);
  const post = Posts.find((p) => p.id === id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const fetchComments = async () => {
    if (!post?.id) return;

    setLoadingComments(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const res = await axios.get(`${BACKEND_URL}/user/comments`, {
        params: {
          mediaId: post.id,
          accessToken,
        },
      });

      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error fetching comments", err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleReply = async (commentId: string) => {
    try {
      await axios.post(`${BACKEND_URL}api/user/reply`, {
        commentId,
        message: replyText,
        accessToken: localStorage.getItem("access_token"),
      });

      setReplyText("");
      setReplyingTo(null);
      fetchComments(); // Refresh after reply
    } catch (err) {
      console.error("Failed to reply", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post?.id]);

  if (!post) {
    return (
      <div className="text-black text-lg w-screen h-screen bg-gradient-to-tr from-purple-700 via-red-600 to-purple-500 flex items-center justify-center">
        <div className="text-white text-4xl font-bold">Post not found...</div>
      </div>
    );
  }

  return (
    <div className="max-w-xl m-10 mx-auto bg-white shadow-md rounded-lg w-full">
      {/* Image */}
      <div className="w-full">
        <img src={post.media_url} alt="Post" className="w-full object-cover" />
      </div>

      {/* Caption */}
      {post.caption && (
        <div className="px-4 py-2">
          <p className="text-gray-800 text-sm">{post.caption}</p>
        </div>
      )}

      {/* Comments */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded-lg shadow-inner">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold">{comment.username}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mt-1 text-gray-800">{comment.text}</p>

                {/* Reply input */}
                {replyingTo === comment.id ? (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-grow p-2 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >
                      Send
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm text-blue-600 mt-1 hover:underline"
                  >
                    Reply
                  </button>
                )}

                {/* Nested replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-2 ml-4 border-l border-gray-300 pl-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="text-sm text-gray-700">
                        <strong>{reply.username}:</strong> {reply.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
