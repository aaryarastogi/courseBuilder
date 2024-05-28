import React, { useState } from "react";

//animation
import {motion} from 'framer-motion'

//icons
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material";

const Icons=styled(CloseIcon)`
    cursor:pointer;
`

const CreateModule=({ onCreateModule , onCancelModule})=>{
    const [moduleName, setModuleName] = useState('');

    const handleAddModule = () => {
        if (moduleName.trim() !== '') {
            onCreateModule(moduleName);
            setModuleName('');
        }
    };

    return (
        <div className="bg-background w-full h-screen flex items-center justify-center">
        <motion.div 
        initial={{
          opacity:0,
          scale: 0.5 }}
        whileInView={{ 
          opacity:1,
          scale: 1 }}
          exit={{
            opacity:0,
            scale:0.5
          }}
        transition={{ 
          x: { type: "spring", stiffness: 300, damping: 30 },
          ease: "easeInOut",
          delay:0.1,
          duration: 1 }}className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4 text-start">Create New Module</h1>
            <Icons onClick={onCancelModule}/>
        </div>
        <p className="mb-2 text-start">Module name</p>
        <input
          type="text"
          placeholder="Enter module name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="w-full p-2 border border-gray-300 outline-none rounded mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
            onClick={onCancelModule}
          >
            Cancel
          </button>
          <button
            className="bg-createButton text-white py-2 px-4 rounded"
            onClick={handleAddModule}
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
    )
}

export default CreateModule;