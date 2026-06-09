import { axiosInstance } from "./axioxInstance";

export const getNotes = async () => {
    const response = await axiosInstance.get("/api/notes");
    return response.data;
};

export const addNote = async ({ title, content }) => {
    const response = await axiosInstance.post("/api/notes", { title, content });
    return response.data;
};

export const updateNote = async ({ noteId, title, content }) => {
    const response = await axiosInstance.put(`/api/notes/${noteId}`, { title, content });
    return response.data;
};

export const deleteNote = async (noteId) => {
    const response = await axiosInstance.delete(`/api/notes/${noteId}`);
    return response.data;
};

export const uploadNoteAttachment = async ({ noteId, file }) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(`/api/notes/${noteId}/attachments`, formData, {
        skipAuthRedirect: true,
    });
    return response.data;
};

export const downloadAttachment = async (attachmentId) => {
    const response = await axiosInstance.get(`/api/attachments/${attachmentId}/download`, {
        responseType: "blob",
        skipAuthRedirect: true,
    });
    return response;
};

export const deleteAttachment = async (attachmentId) => {
    const response = await axiosInstance.delete(`/api/attachments/${attachmentId}`, {
        skipAuthRedirect: true,
    });
    return response.data;
};
