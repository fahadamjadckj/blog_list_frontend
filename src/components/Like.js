import { Button } from 'react-bootstrap'

const Like = ({ likeHandler, likeStyle }) => {
  return (
    <Button
      style={likeStyle}
      onClick={likeHandler}
      className="addlike"
      variant="success"
    >
      Like
    </Button>
  )
}
export default Like
