import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiMessageSquare, FiSend, FiUser, FiLock, FiTrash2, FiEdit2, FiX, FiCheck } from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import { fetchComments, addComment, deleteComment, updateComment } from '../../service/api';

import Loader from '../Loader/Loader';

import './ProductComments.css'

const ProductComments = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");

  // حالات خاصة بتعديل التعليق المختار محلياً
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  // 1. جلب التعليقات
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchComments(id),
  });

  // 2. Mutation إضافة تعليق
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    }
  });

  // 3. Mutation حذف تعليق
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      Swal.fire({ icon: 'success', title: 'تم حذف التعليق', confirmButtonText: 'حسناً', confirmButtonColor: '#4977e5' });
    }
  });

  // 4. Mutation تعديل تعليق
  const updateMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setEditingCommentId(null);
      setEditText("");
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
      Swal.fire({ icon: 'success', title: 'تم تحديث التعليق', confirmButtonText: 'حسناً', confirmButtonColor: '#4977e5' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;

    addMutation.mutate({
      productId: id,
      username: user?.name,
      text: commentText,
      email: user?.email
    });
  };

  const handleDelete = (commentId) => {
    Swal.fire({
      title: 'هل أنت متأكد من حذف التعليق؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d00000',
      cancelButtonColor: '#718096',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate({ productId: id, commentId });
      }
    });
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditText(comment.text);
  };

  const handleUpdateSubmit = (commentId) => {
    if (!editText.trim()) return;
    updateMutation.mutate({ productId: id, commentId, newText: editText });
  };

  return (
    <div className="commentsSectionContainer">
      <h3><FiMessageSquare /> تعليقات واستفسارات العملاء ({comments?.length || 0})</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="commentForm">
          <div className="inputGroup textAreaGroup">
            <textarea
              rows="3"
              placeholder="اكتب استفسارك أو تعليقك هنا عن المنتج..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              disabled={addMutation.isPending}
            />
            <button type="submit" className="btnSendComment" disabled={addMutation.isPending}>
              {addMutation.isPending ? "جاري النشر..." : <><FiSend /> إرسال</>}
            </button>
          </div>
        </form>
      ) : (
        <div className="loginRequiredNotice">
          <FiLock className="lockIcon" />
          <p>يرجى تسجيل الدخول أولاً لتتمكن من كتابة تعليق أو استفسار.</p>
          <button onClick={() => navigate('/login')} className="btnLoginRedirect">
            تسجيل الدخول الآن
          </button>
        </div>
      )}

      {isLoading && <div className="textCenter"><Loader /></div>}
      {error && <p className="errorText">فشل تحميل التعليقات، يرجى المحاولة لاحقاً.</p>}

      <div className="commentsList">
        {comments && comments.length === 0 && (
          <p className="noComments">لا توجد تعليقات بعد. كن أول من يستفسر عن هذا المنتج!</p>
        )}

        {comments?.map((comment) => {

          const isOwnComment = user && user.email === comment.email;
          const isEditing = editingCommentId === comment.id;

          return (
            <div key={comment.id} className="commentCard">
              <div className="commentHeader">
                <div className="userInfo">
                  <div className="userAvatar"><FiUser /></div>
                  <span className="userName">{comment.username}</span>
                  {isOwnComment && <span className="ownCommentBadge">تعليقك</span>}
                </div>

                <div className="commentHeaderLeft">
                  <span className="commentDate">
                    {comment.createdAt?.seconds
                      ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString('ar-SY')
                      : "الآن"}
                  </span>

                  {isOwnComment && !isEditing && (
                    <div className="commentActions">
                      <button onClick={() => startEdit(comment)} className="commentActionBtn editBtn" title="تعديل"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(comment.id)} className="commentActionBtn deleteBtn" title="حذف"><FiTrash2 /></button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing ? (
                <div className="editCommentForm">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="2"
                  />
                  <div className="editFormActions">
                    <button onClick={() => handleUpdateSubmit(comment.id)} className="saveEditBtn" disabled={updateMutation.isPending}><FiCheck /> حفظ</button>
                    <button onClick={() => setEditingCommentId(null)} className="cancelEditBtn"><FiX /> إلغاء</button>
                  </div>
                </div>
              ) : (
                <p className="commentBody">{comment.text}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductComments;
