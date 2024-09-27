import { motion, AnimatePresence } from 'framer-motion';        
const DocumentPopup=({ isOpen, onClose, documentUrl })=>{
    if (!isOpen) return null;
    return(
        <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="bg-red-500 text-white-1000   px-3 py-1 absolute top-2 right-2"
              onClick={onClose}
            >
              X
            </button>
  
            <h2 className="text-lg text-black font-semibold mb-4">Document </h2>
  
            {/* Scrollable Document Area */}
            <div className="overflow-auto max-h-[70vh] max-w-full border">
              {/* For simplicity, using an iframe to display document */}
              <iframe
                src={documentUrl}
                title="Document"
                className="w-full h-[70vh] object-cover"
                frameBorder="0"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
}

export default DocumentPopup;