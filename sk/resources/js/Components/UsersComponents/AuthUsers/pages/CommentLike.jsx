import React, { useState, useContext, useEffect } from 'react';
import { HeartIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { Typography, Button, Textarea, Avatar } from "@material-tailwind/react";
import ApiService from '../../../Services/ApiService';
import { AppContext } from '../../../Context/AppContext';
import moment from 'moment'; // Import moment.js

const CommentLike = ({ AnnounceId }) => {
  const { user } = useContext(AppContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]); // State to hold the comments
  const [showAllComments, setShowAllComments] = useState(false); // State to toggle comment visibility

  const id = user.id;

  // Fetch all comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await ApiService.get(`/announcement/comment/${AnnounceId}`);
        setComments(response.data); // Set the fetched comments
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [AnnounceId]);

  const handleComment = async () => {
    try {
      const response = await ApiService.post(`/announcement/comment/${AnnounceId}/${id}`, {
        comment: newComment
      });

      // Update the comments state to include the new comment
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <Button variant="text" className="flex items-center gap-2">
          <HeartIcon className="w-5 h-5 text-red-500" />
        </Button>
        <Button variant="text" className="flex items-center gap-2">
          <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />
          <Typography color="gray">{comments.length}</Typography> {/* Show number of comments */}
        </Button>
      </div>

      <div>
        <Typography variant="small" className="mb-2 font-semibold">Comments:</Typography>

        {/* Show "View All Comments" if comments are hidden */}
        {!showAllComments && comments.length > 0 && (
          <Button
            variant="text"
            size='sm'
            className="text-xs text-blue-400"
            onClick={() => setShowAllComments(true)}
          >
            View All Comments
          </Button>
        )}

        {/* Display comments only when showAllComments is true */}
        {showAllComments && comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4 p-2 mb-1">
            {/* Display user avatar */}
            <div className='items-center '>
              <Avatar
                src={comment.user.image_path ? `/storage/${comment.user.image_path}` : '/img/default_user.jpg'}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className='flex flex-col'>
  {/* Avoid nesting <div> inside <p> */}
            <div className='px-4 py-2 bg-gray-100 rounded-3xl'>
                <Typography variant="small" component="span" className="font-semibold">{comment.user.name}</Typography>
                <Typography variant="small" component="span" className="text-gray-700">{comment.comment}</Typography>
            </div>
            <div>
                <Typography variant="small" component="span" className="ml-4 text-xs text-gray-500">
                {moment(comment.created_at).fromNow()}
                </Typography>
            </div>
            </div>


            </div>

        ))}

        {/* Optionally hide comments again */}
        {showAllComments && comments.length > 0 && (
          <Button
            variant="text"
            size='sm'
            className="text-xs text-blue-400"
            onClick={() => setShowAllComments(false)}
          >
            Hide Comments
          </Button>
        )}
      </div>

      <div className="mt-4">
        <Textarea
          label="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
        />
        <Button
          color="green"
          size="sm"
          onClick={handleComment}
        >
          Comment
        </Button>
      </div>
    </>
  );
};

export default CommentLike;