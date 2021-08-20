import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { saveUserPage, updateUserPage } from '../features/notions/request';
import { sharePage } from '../features/shared/request';
import { BASE_URL } from '../api';
import {
    EditorContainer,
    PreviewContainer,
    getTimeandData,
    ErrorToast,
    alreadyExist
} from '../components';

export default function CreatePage() {
    const { pageStatus, currentPage } = useSelector((state) => state.notion);
    const { publicPage, sharedStatus } = useSelector((state) => state.share);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pageLink, setPageLink] = useState('');

    const [editorStatus, setEditorStatus] = useState('EDITOR');
    const [isModalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pageId } = useParams();

    const savePageHandler = () => {
        if (title === '' && content === '')
            return setErrorMessage('Cannot save empty page!');

        let page = {
            title: title || 'Untitled',
            date: getTimeandData(),
            content: content
        };

        if (pageId && location.pathname.includes('/draft')) {
            dispatch(updateUserPage({ pageUpdate: page, pageId: pageId }));
        } else {
            dispatch(saveUserPage(page));
        }
    };

    const getLink = () => {
        !alreadyExist(publicPage, pageId) && dispatch(sharePage(pageId));
        const url = window.location.origin;
        const link = url + `/public/` + pageId;
        setPageLink(link);
        navigator.clipboard.writeText(pageLink);
    };

    useEffect(() => {
        if (pageId && location.pathname.includes('/draft')) {
            (async () => {
                try {
                    const response = await axios.get(
                        `${BASE_URL}/pages/${pageId}`
                    );
                    setTitle(response.data.page.title);
                    setContent(response.data.page.content);
                } catch (err) {
                    console.error(err);
                    setErrorMessage(err);
                }
            })();
        }
    }, [location, pageId]);

    useEffect(() => {
        if (currentPage !== null) {
            navigate(`/draft/${currentPage?._id}`);
            setTitle(currentPage.title);
            setContent(currentPage.content);
        }
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div>
            <div className="max-w-6xl m-auto flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                <div>{getTimeandData()}</div>
                <div>
                    <button
                        onClick={() =>
                            setModalVisible((prevState) => !prevState)
                        }
                        className="rounded focus:outline-none text-gray-600 hover:bg-gray-50 py-1 px-2 mr-2"
                    >
                        <span className="flex item-center justify-center">
                            <i className={`bx bx-share-alt text-xl mr-2`}></i>
                            <span className="hidden md:block">Share Page</span>
                        </span>
                    </button>
                    {isModalVisible && (
                        <div className="origin-left top-8 absolute mt-2 max-w-xs rounded text-left shadow-md bg-white p-2 mt-8">
                            <input
                                type="text"
                                readOnly={true}
                                value={pageLink}
                                className="w-full bg-gray-50 py-3 px-1 my-4 focus:outline-none border border-gray-200 rounded"
                            />
                            <div className="flex flex-wrap">
                                <button
                                    onClick={() => getLink()}
                                    className="text-blue-500 border-2 w-full md:w-24 mb-2 md:mb-0 border-blue-500 px-1 rounded focus:outline-none border border-blue-500 mr-0 md:mr-1"
                                >
                                    <span className="flex item-center justify-center">
                                        <i className="bx bx-link text-xl mr-1"></i>{' '}
                                        Get Link
                                    </span>
                                </button>
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(pageLink)
                                    }
                                    className="text-blue-500 border-2 w-full md:w-24 border-blue-500 px-1 rounded focus:outline-none border border-blue-500"
                                >
                                    {sharedStatus === 'sharing' ? (
                                        <i
                                            className={`bx bx-loader-alt animate-spin text-xl mr-2`}
                                        ></i>
                                    ) : (
                                        <span className="flex item-center justify-center">
                                            <i
                                                className={`bx bx-copy-alt text-xl mr-1`}
                                            ></i>{' '}
                                            Copy
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => savePageHandler()}
                        className="rounded focus:outline-none text-gray-600 hover:bg-gray-50 py-1 px-2"
                    >
                        {pageStatus === 'saving' ? (
                            <span className="flex item-center justify-center">
                                <i
                                    className={`bx bx-loader-alt animate-spin text-xl mr-2`}
                                ></i>{' '}
                                Saving
                            </span>
                        ) : (
                            <span className="flex item-center justify-center">
                                <i className={`bx bx-cloud text-xl mr-2`}></i>{' '}
                                Save
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <div className="m-auto w-full max-w-4xl">
                <div>
                    {editorStatus === 'EDITOR' && (
                        <EditorContainer
                            title={title}
                            content={content}
                            setTitle={setTitle}
                            setContent={setContent}
                            editorStatus={editorStatus}
                            setEditorStatus={setEditorStatus}
                        />
                    )}
                    {editorStatus === 'PREVIEW' && (
                        <PreviewContainer
                            title={title}
                            setTitle={setTitle}
                            content={content}
                            editorStatus={editorStatus}
                            setEditorStatus={setEditorStatus}
                        />
                    )}
                    {editorStatus === 'GUIDE' && <div>Guide</div>}
                </div>
                {
                    <ErrorToast
                        setMessage={setErrorMessage}
                        message={errorMessage}
                    />
                }
            </div>
        </div>
    );
}
