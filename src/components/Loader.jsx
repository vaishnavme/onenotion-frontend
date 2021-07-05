export const Loader = () => {
    return (
        <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-12 bg-gray-200 rounded w-3/4 w-full"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded"></div>
                        <div className="h-4 bg-gray-100 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded w-5/12"></div>
                        <div className="h-4 bg-gray-100 rounded w-9/12"></div>
                        <div className="h-4 bg-gray-100 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}