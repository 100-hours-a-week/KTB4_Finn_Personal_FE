import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function PostForm({mode, initValues, onSubmit, isSubmitting}){
    const isEdit = mode === "edit";
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = useState("");

    useEffect(() => {
      return () => {
        if (selectedImage?.previewUrl) {
          URL.revokeObjectURL(selectedImage.previewUrl);
        }
      };
    }, [selectedImage]);

    const handleImageChange = (event) => {
      const file = event.target.files?.[0];

      setImageError("");

      if (!file) {
        setSelectedImage(null);
        return;
      }

      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        setSelectedImage(null);
        setImageError("이미지 파일만 첨부할 수 있어요.");
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        event.target.value = "";
        setSelectedImage(null);
        setImageError("10MB 이하의 이미지만 첨부할 수 있어요.");
        return;
      }

      setSelectedImage({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    };

    const handleImageRemove = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSelectedImage(null);
      setImageError("");
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      onSubmit?.({
        title: formData.get("title"),
        content: formData.get("description"),
        contentImg: selectedImage?.file ?? null,
      });
    };


    return (
    <section className="editor-card">
      <h1>{isEdit ? "기록 수정" : "새 기록"}</h1>
      <p className="lead">{isEdit ? "장면의 제목과 이야기를 다듬을 수 있어요." : "오늘 시선이 머문 장면을 사진과 함께 남겨보세요."}</p>

      <form className="editor-form" onSubmit={handleSubmit} method="post">
          <div className="field">
            <label htmlFor="create-title">제목</label>
            <input
              id="create-title"
              name="title"
              defaultValue={isEdit ? initValues.title : ""}
              type="text"
              maxLength="26"
              placeholder="장면을 한 문장으로 소개해주세요"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="create-tags">태그</label>
            <input
              id="create-tags"
              name="tags"
              type="text"
              placeholder="예: 풍경, 노을, 오늘의빛"
            />
            <p className="helper">
              쉼표로 구분해 최대 5개까지 입력할 수 있어요.
            </p>
          </div>
          <div className="field">
            <label htmlFor="create-description">설명</label>
            <textarea
              id="create-description"
              name="description"
              defaultValue={isEdit ? initValues.description : ""}
              placeholder="이 장면에 담긴 순간을 들려주세요"
              required
            ></textarea>
          </div>
          <div className="field">
            <span className="field-label">사진</span>
            {selectedImage && (
              <div className="current-photo selected-photo">
                <img
                  src={selectedImage.previewUrl}
                  alt="선택한 게시물 사진 미리보기"
                />
                <div className="selected-photo-copy">
                  <p>{selectedImage.file.name}</p>
                  <span>
                    선택한 사진 · {formatFileSize(selectedImage.file.size)}
                  </span>
                </div>
                <button
                  className="button outline selected-photo-remove"
                  type="button"
                  onClick={handleImageRemove}
                >
                  제거
                </button>
              </div>
            )}
            <label className="upload-box" htmlFor="create-photo">
              <span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 16l4-4 4 4 3-3 5 5" />
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                </svg>
                <strong>
                  {selectedImage
                    ? "다른 사진으로 변경하기"
                    : "사진을 선택해주세요"}
                </strong>
                <span>JPG, PNG · 최대 10MB</span>
              </span>
            </label>
            <input
              ref={fileInputRef}
              className="sr-only"
              id="create-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
            />
            {imageError && (
              <p className="helper input-error" role="alert">
                {imageError}
              </p>
            )}
          </div>
          <div className="form-actions">
            <Link className="button outline" to="/">
            취소
            </Link>
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "업로드 중..."
                : mode === "edit" ? "수정 완료" : "기록 올리기"}
            </button>
          </div>
        </form>
    </section>
  );
}
export default PostForm;
