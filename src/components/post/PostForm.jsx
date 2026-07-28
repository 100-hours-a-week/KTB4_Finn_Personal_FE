import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_TAG_COUNT = 5;
const MAX_TAG_LENGTH = 20;

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
    const [title, setTitle] = useState(initValues?.title ?? "");
    const [content, setContent] = useState(initValues?.content ?? "");
    const [tags, setTags] = useState(initValues?.tags ?? []);
    const [selectedImage, setSelectedImage] = useState(() => {
      if (!isEdit || !initValues?.contentImg) {
        return null;
      }

      return {
        file: null,
        previewUrl: initValues.contentImg,
        existingUrl: initValues.contentImg,
        isObjectUrl: false,
      };
    });
    const [imageError, setImageError] = useState("");

    const [tagInput, setTagInput] = useState("");
    const [tagError, setTagError] = useState("");

    const addTag = (value) => {
      const normalizedTag = value.trim().replace(/^#+/, "");

      if(!normalizedTag){
        return;
      }

      if(normalizedTag.length > MAX_TAG_LENGTH){
        setTagError(`태그는 ${MAX_TAG_LENGTH}자 이하로 입력해주세요.`);
        return;
      }
      if (tags.length >= MAX_TAG_COUNT) {
        setTagError(`태그는 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있어요.`);
        return;
      }

      if (tags.includes(normalizedTag)) {
        setTagError("이미 추가한 태그예요.");
        return;      
      }

      setTags((currentTags) => [...currentTags, normalizedTag]);
      setTagInput("");
      setTagError("");
    };

    const removeTag = (tagToRemove) => {
      setTags((currentTags) => 
        currentTags.filter((tag) => tag !== tagToRemove)
      );
      setTagError("");
    }

    const handleTagKey = (event) => {
      if (event.nativeEvent.isComposing) {
        return;
      }
      if(event.key ==="Enter" || event.key ===","){
        event.preventDefault();
        addTag(tagInput);
        return;
      }

      if(event.key === "Backspace" && !tagInput && tags.length > 0){
        setTags((currentTags) => currentTags.slice(0,-1));
      }
    };

    const handleTagChange = (event) => {
      const value = event.target.value;
      if (value.endsWith(",")) {
        addTag(value.slice(0, -1));
        return;
      }

      setTagInput(value);
    };

    const isFormValid =
      Boolean(selectedImage) &&
      Boolean(title.trim()) &&
      Boolean(content.trim());

    useEffect(() => {
      return () => {
        if (selectedImage?.isObjectUrl) {
          URL.revokeObjectURL(selectedImage.previewUrl);
        }
      };
    }, [selectedImage]);

    const handleImageChange = (event) => {
      const file = event.target.files?.[0];

      setImageError("");

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        setImageError("이미지 파일만 첨부할 수 있어요.");
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        event.target.value = "";
        setImageError("10MB 이하의 이미지만 첨부할 수 있어요.");
        return;
      }

      setSelectedImage({
        file,
        previewUrl: URL.createObjectURL(file),
        existingUrl: null,
        isObjectUrl: true,
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
        title: formData.get("title").trim(),
        content: formData.get("description").trim(),
        contentImg: selectedImage?.file ?? selectedImage?.existingUrl ?? null,
        tags: tags,
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              className={tagError ? "tag-input-error" : ""}
              type="text"
              value={tagInput}
              maxLength={MAX_TAG_LENGTH + 1}
              placeholder={
                tags.length >= MAX_TAG_COUNT
                  ? "태그를 최대 5개까지 추가했어요"
                  : "태그 입력 후 쉼표 또는 Enter"
              }
              disabled={tags.length >= MAX_TAG_COUNT}
              onChange={handleTagChange}
              onKeyDown={handleTagKey}
            />

            {tags.length > 0 && (
              <div className="tag-list" aria-label="추가한 태그">
              {tags.map((tag) => (
                <span className="tag-chip" key={tag}>
                  #{tag}

                  <button
                    type="button"
                    className="tag-chip-remove"
                    aria-label={`${tag} 태그 삭제`}
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
              </div>
            )}

            <p className={`helper ${tagError ? "input-error" : ""}`}>
              {tagError || `쉼표 또는 Enter로 최대 ${MAX_TAG_COUNT}개까지 추가할 수 있어요.`}
            </p>
          </div>


          <div className="field">
            <label htmlFor="create-description">설명</label>
            <textarea
              id="create-description"
              name="description"
              value={content}
              onChange={(event) => setContent(event.target.value)}
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
                  <p>{selectedImage.file?.name ?? "현재 게시물 사진"}</p>
                  {selectedImage.file ? (
                    <span>
                      선택한 사진 · {formatFileSize(selectedImage.file.size)}
                    </span>
                  ) : (
                    <span>현재 등록된 사진</span>
                  )}
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
            <Link
                className="button outline"
                to={isEdit ? `/posts/${initValues.postId}` : "/"}
            >
                취소
            </Link>
            <button
              className="button"
              type="submit"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? "업로드 중..."
                : mode === "edit" ? "수정 완료" : "기록 올리기"}
            </button>
          </div>
        </form>
    </section>
  );
}
export default PostForm;
