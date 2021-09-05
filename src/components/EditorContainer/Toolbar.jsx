export const Toolbar = ({ editorStatus, setEditorStatus }) => {
    return (
        <div className="bg-gray-50 rounded p-2">
            <ToolBarButtons
                label={'Editor'}
                icon={'bx-pencil'}
                updateStatus={'EDITOR'}
                currentStatus={editorStatus}
                onClickHandler={setEditorStatus}
            />
            <ToolBarButtons
                label={'Preview'}
                icon={'bx-show'}
                updateStatus={'PREVIEW'}
                currentStatus={editorStatus}
                onClickHandler={setEditorStatus}
            />
            <ToolBarButtons
                label={'Guide'}
                icon={'bxl-markdown'}
                updateStatus={'GUIDE'}
                currentStatus={editorStatus}
                onClickHandler={setEditorStatus}
            />
        </div>
    );
};

const ToolBarButtons = ({
    label,
    icon,
    updateStatus,
    currentStatus,
    onClickHandler
}) => {
    return (
        <button
            onClick={() => onClickHandler(updateStatus)}
            className={`focus:outline-none hover:bg-gray-100 text-sm font-medium rounded px-1 mx-1 ${
                updateStatus === currentStatus
                    ? 'text-blue-600'
                    : 'text-gray-600'
            }`}
        >
            <span className="flex item-center justify-center">
                <i className={`bx ${icon} text-base mr-1`}></i>
                {label}
            </span>
        </button>
    );
};
