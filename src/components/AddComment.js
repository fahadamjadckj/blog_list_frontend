import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { pushComment } from '../reducers/blogsReducer'
import { Button } from 'react-bootstrap'

const AddComment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = () => {
    const comments = [...blog.comments]
    comments.push(comment)
    const update = { ...blog, comments: comments }
    dispatch(pushComment(update))
  }

  return (
    <div>
      <input type="text" onChange={(e) => setComment(e.target.value)} />
      <Button type="submit" onClick={handleComment} variant="primary">
        post
      </Button>
    </div>
  )
}

export default AddComment
