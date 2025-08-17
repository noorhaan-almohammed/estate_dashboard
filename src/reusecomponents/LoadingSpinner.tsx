
export default function LoadingSpinner() {
  return (
     <div className="flex flex-col items-center justify-center py-12 max-w-full mx-auto p-6 space-y-8 bg-bg min-h-screen overflow-hidden  ">
      <div className="relative w-24 h-24">
        <div className="absolute w-full h-full border-4 border-mainPurple border-t-transparent rounded-full animate-spin"></div>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-mainPurple rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        </div>
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-mainPurple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-3 h-3 bg-mainPurple rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-mainPurple rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
      <p className="mt-4 text-mainPurple text-xl font-medium">Loading Details</p>
    </div>
  )
}
