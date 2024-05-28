import React, { useState } from "react";

//animation
import {motion} from 'framer-motion'

//icons
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material";

const Icons=styled(CloseIcon)`
    cursor:pointer;
`

const CreateLink=({ onCreateLink ,onCancelLink})=>{
    const [linkName, setLinkName] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleAddLink = () => {
        if (linkName.trim() !== '') {
            onCreateLink(linkName,displayName)
            setLinkName('');
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
            <h1 className="text-2xl font-bold mb-4 text-start">Add New Link</h1>
            <Icons onClick={onCancelLink}/>
        </div>
        <p className="mb-2 text-start">URL</p>
        <input
          type="text"
          placeholder="Enter link URL"
          value={linkName}
          onChange={(e) => setLinkName(e.target.value)}
          className="w-full p-2 border border-gray-300 outline-none rounded mb-4"
        />
        <p className="mb-2 text-start">Display Name</p>
        <input
          type="text"
          placeholder="Enter Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full p-2 border border-gray-300 outline-none rounded mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
            onClick={onCancelLink}
          >
            Cancel
          </button>
          <button
            className="bg-createButton text-white py-2 px-4 rounded"
            onClick={handleAddLink}
          >
            Add
          </button>
        </div>
      </motion.div>
    </div>
    )
}

export default CreateLink;