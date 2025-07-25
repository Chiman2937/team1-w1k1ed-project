import instance from './clients/axios';

type ArticleFormData = {
  image?: string | null;
  content: string;
  title: string;
};

type CommentFormData = {
  content: string;
};

export const getDetailArticle = async (articleId: string) => {
  try {
    const response = await instance.get(`/articles/${articleId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postArticle = async (formData: ArticleFormData) => {
  try {
    const response = await instance.post('/articles', formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const patchArticle = async (articleId: string, formData: ArticleFormData) => {
  try {
    const response = await instance.patch(`/articles/${articleId}`, formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticle = async (articleId: string) => {
  try {
    const response = await instance.delete(`/articles/${articleId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postArticleLike = async (articleId: string) => {
  try {
    const response = await instance.post(`/articles/${articleId}/like`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteArticleLike = async (articleId: string) => {
  try {
    const response = await instance.delete(`/articles/${articleId}/like`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getComment = async (articleId: string, limit: string, cursor?: string | null) => {
  try {
    const response = await instance.get(`/articles/${articleId}/comments`, {
      params: {
        limit,
        cursor,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (articleId: string, formData: CommentFormData) => {
  try {
    const response = await instance.post(`/articles/${articleId}/comments`, formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const patchComment = async (commentId: string, formData: CommentFormData) => {
  try {
    const response = await instance.patch(`/comments/${commentId}`, formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await instance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
