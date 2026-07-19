import { currentUser } from "../../data/mockData";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import {useState} from "react";

function PostForm({mode, initValues, onSubmit}){
    const isEdit = mode === "edit";


    return (
    <section className="editor-card">
      <h1>{isEdit ? "기록 수정" : "새 기록"}</h1>
      <p className="lead">{isEdit ? "장면의 제목과 이야기를 다듬을 수 있어요." : "오늘 시선이 머문 장면을 사진과 함께 남겨보세요."}</p>

      <form className="editor-form" onSubmit={onSubmit} method="post">
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
                <strong>사진을 선택하거나 이곳에 놓아주세요</strong>
                <span>JPG, PNG · 최대 10MB</span>
              </span>
            </label>
            <input
              className="sr-only"
              id="create-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png"
              required
            />
          </div>
          <div className="form-actions">
            <Link className="button outline" to="/">
            취소
            </Link>
            <button className="button" type="submit">
                {isEdit ? "수정 완료" : "기록 올리기"}
            </button>
          </div>
        </form>
    </section>
  );
}
export default PostForm;