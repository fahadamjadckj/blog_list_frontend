const Like = ( { likeHandler, likeStyle } ) => {
  return (
    <button style={likeStyle} onClick={likeHandler} className='addlike'>Like</button>
  )
}
export default Like