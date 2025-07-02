import React from "react";

const CommentTab = ({ comments, onClose }) => {
  const handleCancel=()=>{
    onClose()
  }
  return (
    <div className="fixed   inset-0 z-50 bg-black/40 flex justify-center items-center">
     <div className="bg-white relative h-full sm:max-h-[90vh] w-full max-w-3xl p-6  sm:rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
                >
                 <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center text-center  mt-5">
             <div>
             <p className="inter text-lg ">  All comment ({comments.length})</p>
             </div>
              </div>
        <div className="space-y-8 py-4">
        
          {comments.map((comment) => (
            <div key={comment.id} className="">
        
             
      
                          <div className=" ">
                         <div className="flex items-center gap-2">
                         <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, index) => (
                                                          <svg
                                                            key={index}
                                                            className={`w-4 h-4 ${index < comment.rating ? "text-black" : "text-gray-300"}`}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                          >
                                                            <path
                                                              fill="currentColor"
                                                              stroke="currentColor"
                                                              strokeWidth="1.5"
                                                              d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                                                            />
                                                          </svg>
                                                        ))}
                          </div>
                         <p className=" text-gray-500 text-sm">
                                                {comment.userName} -{" "}
                                                {new Date(comment.date).toLocaleDateString("en-GB", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                })}
                                              </p>
                                            
                        
                         </div>
                           <div className="py-2">
                           <p className="inter">{comment.title}</p>
                           <p className="">{comment.content}</p>
                           </div>
                          </div>
                         
       
            
              {Array.isArray(comment.images) && comment.images.length > 0 && (
                <div className="flex gap-2 items-center">
                  {comment.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`comment-img-${idx}`}
                      className="w-24 h-24 object-cover rounded-lg border-gray-300 border"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentTab;
