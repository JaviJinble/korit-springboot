import { css } from "@emotion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    addNote,
    deleteAttachment,
    deleteNote,
    downloadAttachment,
    getNotes,
    updateNote,
    uploadNoteAttachment,
} from "../../api/noteApi";
import { useLogout } from "../../hooks/useAuth";

const emptyNoteForm = {
    title: "",
    content: "",
};

const formatDateTime = (dateTime) => {
    if (!dateTime) {
        return "-";
    }

    return new Date(dateTime).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const formatFileSize = (size) => {
    if (!size) {
        return "0 KB";
    }
    if (size < 1024 * 1024) {
        return `${Math.ceil(size / 1024)} KB`;
    }
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

const isImageAttachment = (attachment) => attachment.contentType?.startsWith("image/");

function Notes() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const logoutMutation = useLogout();
    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [noteForm, setNoteForm] = useState(emptyNoteForm);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editingNoteForm, setEditingNoteForm] = useState(emptyNoteForm);
    const [attachmentModalNote, setAttachmentModalNote] = useState(null);
    const [previewAttachment, setPreviewAttachment] = useState(null);
    const [notice, setNotice] = useState("");

    const notesQuery = useQuery({
        queryKey: ["notes"],
        queryFn: getNotes,
    });

    const addNoteMutation = useMutation({
        mutationFn: addNote,
        onError: () => setNotice("메모를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요."),
    });

    const updateNoteMutation = useMutation({
        mutationFn: updateNote,
        onSuccess: () => {
            setEditingNoteId(null);
            setEditingNoteForm(emptyNoteForm);
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: () => setNotice("메모를 수정하지 못했습니다. 잠시 후 다시 시도해 주세요."),
    });

    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
        onError: () => setNotice("메모를 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요."),
    });

    const uploadAttachmentMutation = useMutation({
        mutationFn: uploadNoteAttachment,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
    });

    const deleteAttachmentMutation = useMutation({
        mutationFn: deleteAttachment,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
    });

    const notes = notesQuery.data?.body ?? [];

    const handleNoteFormChange = (e) => {
        setNoteForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleEditingNoteFormChange = (e) => {
        setEditingNoteForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleComposerCancel = () => {
        setNoteForm(emptyNoteForm);
        setSelectedFiles([]);
        setIsComposerOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = noteForm.title.trim();
        const content = noteForm.content.trim();

        if (!title || !content) {
            return;
        }

        const createdNote = await addNoteMutation.mutateAsync({ title, content });
        const noteId = createdNote.body?.id;

        if (selectedFiles.length > 0 && noteId) {
            let failedCount = 0;
            for (const file of selectedFiles) {
                try {
                    await uploadAttachmentMutation.mutateAsync({ noteId, file });
                } catch {
                    failedCount += 1;
                }
            }

            if (failedCount > 0) {
                setNotice(`메모는 저장됐지만 ${failedCount}개 첨부파일 업로드에 실패했습니다.`);
            }
        } else {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        }

        setNoteForm(emptyNoteForm);
        setSelectedFiles([]);
        setIsComposerOpen(false);
    };

    const handleEditStart = (note) => {
        setEditingNoteId(note.id);
        setEditingNoteForm({
            title: note.title,
            content: note.content,
        });
    };

    const handleEditCancel = () => {
        setEditingNoteId(null);
        setEditingNoteForm(emptyNoteForm);
    };

    const handleEditSave = async (noteId) => {
        const title = editingNoteForm.title.trim();
        const content = editingNoteForm.content.trim();

        if (!title || !content) {
            return;
        }

        await updateNoteMutation.mutateAsync({ noteId, title, content });
    };

    const handleDelete = async (noteId) => {
        if (!window.confirm("이 메모를 삭제할까요?")) {
            return;
        }

        await deleteNoteMutation.mutateAsync(noteId);
    };

    const handleFileUpload = async (noteId, e) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) {
            return;
        }

        let failedCount = 0;
        for (const file of files) {
            try {
                await uploadAttachmentMutation.mutateAsync({ noteId, file });
            } catch {
                failedCount += 1;
            }
        }

        if (failedCount > 0) {
            setNotice(`${failedCount}개 파일 업로드에 실패했습니다.`);
        }
        e.target.value = "";
    };

    const handleDownload = async (attachment) => {
        try {
            const response = await downloadAttachment(attachment.id);
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = attachment.originalFileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setNotice("첨부파일 다운로드에 실패했습니다.");
        }
    };

    const handleAttachmentDelete = async (attachmentId) => {
        if (!window.confirm("이 첨부파일을 삭제할까요?")) {
            return;
        }

        try {
            await deleteAttachmentMutation.mutateAsync(attachmentId);
        } catch {
            setNotice("첨부파일 삭제에 실패했습니다.");
        }
    };

    return (
        <main css={container}>
            <section css={panel}>
                <div css={header}>
                    <div>
                        <h1>메모장</h1>
                        <span>나만 볼 수 있는 개인 메모</span>
                    </div>
                    <div css={headerActions}>
                        <button type="button" onClick={() => navigate("/dash")}>
                            대시보드
                        </button>
                        <button type="button" onClick={() => navigate("/calendar")}>
                            캘린더
                        </button>
                        <button type="button" onClick={() => navigate("/mypage")}>
                            마이페이지
                        </button>
                        <button type="button" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
                            로그아웃
                        </button>
                    </div>
                </div>

                <div css={composerToolbar}>
                    <div>
                        <strong>{notes.length}개의 메모</strong>
                        <span>최근 수정된 메모가 먼저 표시됩니다.</span>
                    </div>
                    {!isComposerOpen && (
                        <button type="button" onClick={() => setIsComposerOpen(true)}>
                            + 새 메모 작성
                        </button>
                    )}
                </div>

                {notice && (
                    <div css={noticeBox} role="status">
                        <span>{notice}</span>
                        <button type="button" onClick={() => setNotice("")}>
                            닫기
                        </button>
                    </div>
                )}

                {isComposerOpen && (
                    <form css={composerCard} onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            placeholder="메모 제목"
                            maxLength={100}
                            value={noteForm.title}
                            onChange={handleNoteFormChange}
                        />
                        <textarea
                            name="content"
                            placeholder="메모 내용을 입력하세요"
                            value={noteForm.content}
                            onChange={handleNoteFormChange}
                        />
                        <FilePicker
                            files={selectedFiles}
                            onSelect={(files) => setSelectedFiles(files)}
                            onClear={(fileIndex) => setSelectedFiles((prev) => prev.filter((_, index) => index !== fileIndex))}
                        />
                        <div css={formActions}>
                            <button type="button" onClick={handleComposerCancel}>
                                취소
                            </button>
                            <button type="submit" disabled={addNoteMutation.isPending || uploadAttachmentMutation.isPending}>
                                저장
                            </button>
                        </div>
                    </form>
                )}

                {notesQuery.isLoading && <p css={message}>불러오는 중...</p>}
                {notesQuery.isError && <p css={message}>메모 목록을 불러오지 못했습니다.</p>}

                {!notesQuery.isLoading && !notesQuery.isError && notes.length === 0 && (
                    <div css={emptyState}>
                        <strong>아직 작성한 메모가 없습니다.</strong>
                        <span>기억해둘 내용을 첫 메모로 남겨보세요.</span>
                    </div>
                )}

                {notes.length > 0 && (
                    <ul css={noteList}>
                        {notes.map((note) => (
                            <li key={note.id} css={noteCard}>
                                {editingNoteId === note.id ? (
                                    <div css={editArea}>
                                        <input
                                            type="text"
                                            name="title"
                                            maxLength={100}
                                            value={editingNoteForm.title}
                                            onChange={handleEditingNoteFormChange}
                                        />
                                        <textarea
                                            name="content"
                                            value={editingNoteForm.content}
                                            onChange={handleEditingNoteFormChange}
                                        />
                                        <AttachmentPanel
                                            note={note}
                                            onUpload={handleFileUpload}
                                            onDownload={handleDownload}
                                            onDelete={handleAttachmentDelete}
                                            onOpenList={setAttachmentModalNote}
                                            onPreview={setPreviewAttachment}
                                            isBusy={uploadAttachmentMutation.isPending || deleteAttachmentMutation.isPending}
                                            compact={false}
                                        />
                                        <div css={formActions}>
                                            <button type="button" onClick={handleEditCancel}>
                                                취소
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleEditSave(note.id)}
                                                disabled={updateNoteMutation.isPending}
                                            >
                                                저장
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div css={noteHead}>
                                            <strong>{note.title}</strong>
                                            <span>수정 {formatDateTime(note.updatedAt || note.createdAt)}</span>
                                        </div>
                                        <p>{note.content}</p>
                                        <AttachmentPanel
                                            note={note}
                                            onUpload={handleFileUpload}
                                            onDownload={handleDownload}
                                            onDelete={handleAttachmentDelete}
                                            onOpenList={setAttachmentModalNote}
                                            onPreview={setPreviewAttachment}
                                            isBusy={uploadAttachmentMutation.isPending || deleteAttachmentMutation.isPending}
                                        />
                                        <div css={noteFooter}>
                                            <span>작성 {formatDateTime(note.createdAt)}</span>
                                            <div css={cardActions}>
                                                <button type="button" onClick={() => handleEditStart(note)}>
                                                    수정
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(note.id)}
                                                    disabled={deleteNoteMutation.isPending}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
            {attachmentModalNote && (
                <AttachmentListModal
                    note={attachmentModalNote}
                    onClose={() => setAttachmentModalNote(null)}
                    onUpload={handleFileUpload}
                    onDownload={handleDownload}
                    onDelete={handleAttachmentDelete}
                    onPreview={setPreviewAttachment}
                    isBusy={uploadAttachmentMutation.isPending || deleteAttachmentMutation.isPending}
                />
            )}
            {previewAttachment && (
                <ImagePreviewModal
                    attachment={previewAttachment}
                    onClose={() => setPreviewAttachment(null)}
                    onDownload={handleDownload}
                />
            )}
        </main>
    );
}

function FilePicker({ files, onSelect, onClear }) {
    return (
        <div css={filePicker}>
            <div>
                <strong>첨부파일</strong>
                <span>저장 후 메모에 자동으로 업로드됩니다.</span>
            </div>
            <label>
                파일 선택
                <input type="file" multiple onChange={(e) => onSelect(Array.from(e.target.files ?? []))} />
            </label>
            {files.length > 0 && (
                <ul css={selectedFileList}>
                    {files.map((file, index) => (
                        <li key={`${file.name}-${file.size}-${index}`} css={selectedFileRow}>
                            <span>{file.name}</span>
                            <small>{formatFileSize(file.size)}</small>
                            <button type="button" onClick={() => onClear(index)}>
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function AttachmentPanel({ note, onUpload, onDownload, onDelete, onOpenList, onPreview, isBusy, compact = true }) {
    const attachments = note.attachments ?? [];
    const visibleAttachments = attachments.slice(0, 2);
    const hiddenCount = Math.max(attachments.length - visibleAttachments.length, 0);

    return (
        <div css={attachmentPanel(compact)}>
            <div css={attachmentHeader}>
                <div>
                    <strong>첨부파일</strong>
                    <span>{attachments.length}개</span>
                </div>
                <label>
                    파일 추가
                    <input type="file" multiple onChange={(e) => onUpload(note.id, e)} disabled={isBusy} />
                </label>
            </div>
            {attachments.length === 0 ? (
                <span css={attachmentEmpty}>업로드된 파일이 없습니다.</span>
            ) : (
                <ul css={attachmentList}>
                    {visibleAttachments.map((attachment) => (
                        <AttachmentItem
                            key={attachment.id}
                            attachment={attachment}
                            onDownload={onDownload}
                            onDelete={onDelete}
                            onPreview={onPreview}
                            isBusy={isBusy}
                        />
                    ))}
                    {hiddenCount > 0 && (
                        <li css={moreAttachmentItem}>
                            <button type="button" onClick={() => onOpenList(note)}>
                                +{hiddenCount}개 더 보기
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}

function AttachmentItem({ attachment, onDownload, onDelete, onPreview, isBusy }) {
    const [previewUrl, setPreviewUrl] = useState("");
    const [isPreviewFailed, setIsPreviewFailed] = useState(false);
    const shouldShowPreview = isImageAttachment(attachment) && !isPreviewFailed;

    useEffect(() => {
        let objectUrl = "";
        let isMounted = true;

        if (!shouldShowPreview) {
            return undefined;
        }

        downloadAttachment(attachment.id)
            .then((response) => {
                objectUrl = window.URL.createObjectURL(response.data);
                if (isMounted) {
                    setPreviewUrl(objectUrl);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsPreviewFailed(true);
                }
            });

        return () => {
            isMounted = false;
            if (objectUrl) {
                window.URL.revokeObjectURL(objectUrl);
            }
        };
    }, [attachment.id, shouldShowPreview]);

    if (shouldShowPreview && previewUrl) {
        return (
            <li css={imageAttachmentItem}>
                <button type="button" css={thumbnailButton} onClick={() => onPreview(attachment)}>
                    <img
                        src={previewUrl}
                        alt={attachment.originalFileName}
                        onError={() => setIsPreviewFailed(true)}
                    />
                </button>
                <div css={imageMeta}>
                    <div>
                        <strong>{attachment.originalFileName}</strong>
                        <span>{formatFileSize(attachment.fileSize)}</span>
                    </div>
                    <div css={attachmentActions}>
                        <button type="button" onClick={() => onDownload(attachment)}>
                            다운로드
                        </button>
                        <button type="button" onClick={() => onDelete(attachment.id)} disabled={isBusy}>
                            삭제
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li>
            <div css={attachmentInfo}>
                <strong>{attachment.originalFileName}</strong>
                <span>{formatFileSize(attachment.fileSize)}</span>
            </div>
            <div css={attachmentActions}>
                <button type="button" onClick={() => onDownload(attachment)}>
                    다운로드
                </button>
                <button type="button" onClick={() => onDelete(attachment.id)} disabled={isBusy}>
                    삭제
                </button>
            </div>
        </li>
    );
}

function AttachmentListModal({ note, onClose, onUpload, onDownload, onDelete, onPreview, isBusy }) {
    const attachments = note.attachments ?? [];

    return (
        <div css={modalOverlay} role="presentation" onClick={onClose}>
            <section css={modalPanel} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <div css={modalHeader}>
                    <div>
                        <strong>첨부파일 전체 보기</strong>
                        <span>{note.title} · {attachments.length}개</span>
                    </div>
                    <button type="button" onClick={onClose}>
                        닫기
                    </button>
                </div>
                <div css={modalUploadRow}>
                    <label>
                        파일 추가
                        <input type="file" multiple onChange={(e) => onUpload(note.id, e)} disabled={isBusy} />
                    </label>
                </div>
                {attachments.length === 0 ? (
                    <p css={attachmentEmpty}>업로드된 파일이 없습니다.</p>
                ) : (
                    <ul css={modalAttachmentList}>
                        {attachments.map((attachment) => (
                            <AttachmentItem
                                key={attachment.id}
                                attachment={attachment}
                                onDownload={onDownload}
                                onDelete={onDelete}
                                onPreview={onPreview}
                                isBusy={isBusy}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

function ImagePreviewModal({ attachment, onClose, onDownload }) {
    const [previewUrl, setPreviewUrl] = useState("");
    const [isFailed, setIsFailed] = useState(false);

    useEffect(() => {
        let objectUrl = "";
        let isMounted = true;

        downloadAttachment(attachment.id)
            .then((response) => {
                objectUrl = window.URL.createObjectURL(response.data);
                if (isMounted) {
                    setPreviewUrl(objectUrl);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsFailed(true);
                }
            });

        return () => {
            isMounted = false;
            if (objectUrl) {
                window.URL.revokeObjectURL(objectUrl);
            }
        };
    }, [attachment.id]);

    return (
        <div css={modalOverlay} role="presentation" onClick={onClose}>
            <section css={imageModalPanel} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <div css={modalHeader}>
                    <div>
                        <strong>{attachment.originalFileName}</strong>
                        <span>{formatFileSize(attachment.fileSize)}</span>
                    </div>
                    <div css={modalActions}>
                        <button type="button" onClick={() => onDownload(attachment)}>
                            다운로드
                        </button>
                        <button type="button" onClick={onClose}>
                            닫기
                        </button>
                    </div>
                </div>
                {isFailed ? (
                    <p css={message}>이미지를 불러오지 못했습니다.</p>
                ) : (
                    <div css={previewStage}>
                        {previewUrl && <img src={previewUrl} alt={attachment.originalFileName} />}
                    </div>
                )}
            </section>
        </div>
    );
}

const container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 24px;
`;

const panel = css`
    width: min(980px, 100%);
    padding: 32px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(8px);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);

    @media (max-width: 560px) {
        padding: 22px;
    }
`;

const header = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;

    h1 {
        color: #ffffff;
        font-size: 2rem;
        font-weight: 700;
    }

    span {
        color: #94a3b8;
    }

    @media (max-width: 760px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const headerActions = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;

    button {
        height: 34px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-weight: 700;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }
`;

const composerToolbar = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;

    > div {
        display: grid;
        gap: 4px;
    }

    strong {
        color: #ffffff;
        font-size: 1.04rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.88rem;
    }

    button {
        height: 42px;
        padding: 0 16px;
        border-radius: 10px;
        background: #00a8ff;
        color: #ffffff;
        font-weight: 900;
        white-space: nowrap;
    }

    @media (max-width: 640px) {
        align-items: stretch;
        flex-direction: column;

        button {
            width: 100%;
        }
    }
`;

const composerCard = css`
    display: grid;
    gap: 14px;
    margin-bottom: 20px;
    padding: 18px;
    border: 1px solid rgba(0, 168, 255, 0.28);
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(0, 168, 255, 0.14), rgba(255, 255, 255, 0.065));
    box-shadow: 0 16px 36px rgba(0, 168, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.035);

    input,
    textarea {
        width: 100%;
        min-width: 0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.52);
        color: #ffffff;
    }

    input {
        height: 48px;
        padding: 0 16px;
        font-size: 1.05rem;
        font-weight: 800;
    }

    textarea {
        min-height: 190px;
        padding: 16px;
        font-size: 0.98rem;
        line-height: 1.65;
        resize: vertical;
    }

    input::placeholder,
    textarea::placeholder {
        color: rgba(226, 232, 240, 0.46);
    }

    input:focus,
    textarea:focus {
        border-color: rgba(0, 168, 255, 0.72);
        box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.13);
    }
`;

const filePicker = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 14px;
    border: 1px dashed rgba(125, 211, 252, 0.34);
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.36);

    strong {
        display: block;
        color: #ffffff;
        font-size: 0.94rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.84rem;
    }

    label {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        padding: 0 13px;
        overflow: hidden;
        border-radius: 9px;
        background: rgba(0, 168, 255, 0.22);
        color: #e0f2fe;
        cursor: pointer;
        font-size: 0.86rem;
        font-weight: 900;
        white-space: nowrap;
    }

    input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
    }

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
        align-items: stretch;

        label {
            width: 100%;
        }
    }
`;

const selectedFileList = css`
    display: grid;
    grid-column: 1 / -1;
    gap: 8px;
    list-style: none;
`;

const selectedFileRow = css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.07);

    span {
        min-width: 0;
        overflow: hidden;
        color: #e0f2fe;
        font-size: 0.9rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    small {
        color: #94a3b8;
        white-space: nowrap;
    }

    button {
        height: 28px;
        padding: 0 8px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-size: 0.8rem;
        font-weight: 800;
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
        align-items: stretch;
    }
`;

const formActions = css`
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
        min-width: 72px;
        height: 38px;
        padding: 0 14px;
        border-radius: 9px;
        color: #e2e8f0;
        font-weight: 800;
    }

    button:first-of-type {
        background: rgba(255, 255, 255, 0.1);
    }

    button:last-of-type {
        background: #00a8ff;
        color: #ffffff;
    }

    @media (max-width: 520px) {
        button {
            flex: 1;
        }
    }
`;

const noteList = css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    list-style: none;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const noteCard = css`
    display: flex;
    min-width: 0;
    height: 520px;
    flex-direction: column;
    gap: 14px;
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.075);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);

    p {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        color: #dbeafe;
        line-height: 1.68;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
    }
`;

const noteHead = css`
    display: grid;
    gap: 6px;

    strong {
        min-width: 0;
        color: #ffffff;
        font-size: 1.12rem;
        overflow-wrap: anywhere;
    }

    span {
        color: #94a3b8;
        font-size: 0.78rem;
    }
`;

const attachmentPanel = (compact) => css`
    display: grid;
    gap: 10px;
    max-height: ${compact ? "174px" : "220px"};
    overflow-y: auto;
    padding: ${compact ? "12px" : "14px"};
    border: 1px solid rgba(0, 168, 255, 0.18);
    border-radius: 12px;
    background: rgba(15, 23, 42, 0.34);
`;

const attachmentHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    > div {
        display: grid;
        gap: 2px;
    }

    strong {
        color: #ffffff;
        font-size: 0.9rem;
    }

    span {
        color: #94a3b8;
        font-size: 0.78rem;
    }

    label {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        padding: 0 10px;
        overflow: hidden;
        border-radius: 8px;
        background: rgba(0, 168, 255, 0.2);
        color: #bae6fd;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 800;
        white-space: nowrap;
    }

    input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
    }
`;

const attachmentEmpty = css`
    color: #94a3b8;
    font-size: 0.82rem;
`;

const attachmentList = css`
    display: grid;
    gap: 8px;
    list-style: none;

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.06);
    }

    button {
        height: 30px;
        padding: 0 9px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #e0f2fe;
        font-size: 0.8rem;
        font-weight: 800;
        white-space: nowrap;
    }

    @media (max-width: 520px) {
        li {
            align-items: stretch;
            flex-direction: column;
        }
    }
`;

const attachmentInfo = css`
    display: grid;
    flex: 1;
    min-width: 0;
    gap: 2px;

    strong {
        min-width: 0;
        overflow: hidden;
        color: #e0f2fe;
        font-size: 0.86rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: #94a3b8;
        font-size: 0.76rem;
    }
`;

const attachmentActions = css`
    display: flex;
    flex-shrink: 0;
    gap: 8px;
    white-space: nowrap;

    button {
        flex-shrink: 0;
    }

    @media (max-width: 520px) {
        width: 100%;

        button {
            flex: 1;
        }
    }
`;

const imageAttachmentItem = css`
    grid-template-columns: 74px minmax(0, 1fr) !important;
    gap: 10px !important;
    padding: 8px !important;
`;

const thumbnailButton = css`
    display: block;
    width: 100%;
    height: auto !important;
    max-height: 74px;
    overflow: hidden;
    padding: 0 !important;
    border-radius: 10px;
    background: rgba(15, 23, 42, 0.5) !important;

    img {
        display: block;
        width: 100%;
        height: 74px;
        object-fit: cover;
    }
`;

const imageMeta = css`
    display: grid;
    grid-template-columns: 1fr;
    gap: 7px;
    align-items: center;

    > div:first-of-type {
        display: grid;
        min-width: 0;
        gap: 2px;
    }

    strong {
        min-width: 0;
        overflow: hidden;
        color: #e0f2fe;
        font-size: 0.86rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: #94a3b8;
        font-size: 0.76rem;
    }

    > div:last-of-type {
        justify-content: flex-start;
    }

    button {
        height: 30px;
        padding: 0 9px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.08);
        color: #e0f2fe;
        font-size: 0.8rem;
        font-weight: 800;
        white-space: nowrap;
    }

    @media (max-width: 520px) {
        > div:last-of-type {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
`;

const moreAttachmentItem = css`
    display: block !important;
    padding: 0 !important;
    background: transparent !important;

    button {
        width: 100%;
        height: 34px;
        border: 1px dashed rgba(125, 211, 252, 0.28);
        border-radius: 10px;
        background: rgba(0, 168, 255, 0.12);
        color: #bae6fd;
        font-weight: 900;
    }
`;

const modalOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(2, 6, 23, 0.72);
    backdrop-filter: blur(6px);
`;

const modalPanel = css`
    width: min(720px, 100%);
    max-height: min(720px, 88vh);
    overflow: hidden;
    border: 1px solid rgba(0, 168, 255, 0.24);
    border-radius: 16px;
    background: rgba(15, 23, 42, 0.94);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.46);
`;

const modalHeader = css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    padding: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.09);

    strong {
        display: block;
        color: #ffffff;
        font-size: 1rem;
        overflow-wrap: anywhere;
    }

    span {
        color: #94a3b8;
        font-size: 0.84rem;
    }

    button {
        height: 32px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-weight: 800;
    }
`;

const modalActions = css`
    display: flex;
    gap: 8px;
`;

const modalUploadRow = css`
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px 0;

    label {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 34px;
        padding: 0 12px;
        overflow: hidden;
        border-radius: 9px;
        background: rgba(0, 168, 255, 0.2);
        color: #bae6fd;
        cursor: pointer;
        font-size: 0.84rem;
        font-weight: 900;
    }

    input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
    }
`;

const modalAttachmentList = css`
    display: grid;
    gap: 10px;
    max-height: 520px;
    overflow-y: auto;
    padding: 16px;
    list-style: none;
`;

const imageModalPanel = css`
    width: min(920px, 100%);
    max-height: 90vh;
    overflow: hidden;
    border: 1px solid rgba(0, 168, 255, 0.24);
    border-radius: 16px;
    background: rgba(15, 23, 42, 0.95);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.46);
`;

const previewStage = css`
    display: grid;
    max-height: calc(90vh - 74px);
    place-items: center;
    padding: 16px;
    overflow: auto;

    img {
        display: block;
        max-width: 100%;
        max-height: calc(90vh - 110px);
        border-radius: 12px;
        object-fit: contain;
    }
`;

const noteFooter = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.09);

    > span {
        color: #94a3b8;
        font-size: 0.78rem;
    }

    @media (max-width: 520px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

const editArea = css`
    display: grid;
    gap: 14px;

    input,
    textarea {
        min-width: 0;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(15, 23, 42, 0.52);
        color: #ffffff;
    }

    input {
        height: 46px;
        padding: 0 14px;
        font-size: 1rem;
        font-weight: 800;
    }

    textarea {
        min-height: 190px;
        padding: 14px;
        line-height: 1.65;
        resize: vertical;
    }
`;

const cardActions = css`
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    button {
        min-width: 52px;
        height: 34px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #e2e8f0;
        font-weight: 700;
    }

    button:hover:not(:disabled) {
        background: rgba(0, 168, 255, 0.35);
    }
`;

const message = css`
    padding: 24px 0;
    color: #cbd5e1;
    text-align: center;
`;

const noticeBox = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    padding: 12px 14px;
    border: 1px solid rgba(248, 113, 113, 0.32);
    border-radius: 10px;
    background: rgba(127, 29, 29, 0.24);
    color: #fecaca;

    button {
        height: 30px;
        padding: 0 10px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-weight: 800;
    }
`;

const emptyState = css`
    display: flex;
    min-height: 240px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px dashed rgba(255, 255, 255, 0.18);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);

    strong {
        color: #ffffff;
        font-size: 1.05rem;
    }

    span {
        color: #94a3b8;
    }
`;

export default Notes;
