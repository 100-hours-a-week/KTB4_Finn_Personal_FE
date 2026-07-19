import defaultProfileImage from "../../assets/image.png";

function Avatar({
  src,
  nickname,
  className = "avatar",
}) {
  return (
    <img
      className={className}
      src={src || defaultProfileImage}
      alt={`${nickname} 프로필`}
    />
  );
}

export default Avatar;