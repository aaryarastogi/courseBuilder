import React, { useState } from "react";

//mui
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Menu, MenuItem, styled } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

//assets
import link from './Assets/link.png'

const DropIcon=styled(ArrowDropDownIcon)`
    border:2px solid gray;
    border-radius:50%;
`

const MenuIcon=styled(MoreVertIcon)`
    margin-left:auto;
    cursor:pointer;
    color:black;
`

const MenuItems=styled(MenuItem)(({ theme }) => ({
    color:"gray",
    gap:'4px',
    width:'10rem',
    
    '&:hover': {
        color:"black"
    },

}));

const MenuItemss=styled(MenuItem)(({ theme }) => ({
    color:"red",
    gap:'4px',
    width:'10rem',
    
    '&:hover': {
        color:"red"
    },

}));


const LinkItem=({ initialDisplayName , initialUrl , index , onDelete})=>{

    const prevName=initialDisplayName;
    const prevURL=initialUrl;

    const [displayName,setDisplayName] = useState(initialDisplayName);
    const [url,setURL] = useState(initialUrl);
    const [edit,SetEdit] = useState(false);

    const handleSaveClick = () => {
        SetEdit(false);
    };

    const handleCancel=()=>{
        setDisplayName(prevName);
        setURL(prevURL);
        SetEdit(false);
    }

    return(
        <div>
        {
            edit ? (
                //editing module page
                <div className="bg-background w-full h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-bold mb-4 text-start">Edit Link</h1>
                        </div>
                        <p className="mb-2 text-start">URL</p>
                        <input
                        type="text"
                        placeholder={displayName}
                        value={displayName}
                        onChange={(e) => {setDisplayName(e.target.value)}}
                        className="w-full p-2 border border-gray-300 outline-none rounded mb-4"
                        />
                        <p className="mb-2 text-start">Display Name</p>
                        <input
                        type="text"
                        placeholder={url}
                        value={url}
                        onChange={(e) => {setURL(e.target.value)}}
                        className="w-full p-2 border border-gray-300 outline-none rounded mb-4"
                        />
                        <div className="flex justify-end gap-4">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-createButton text-white py-2 px-4 rounded"
                            onClick={handleSaveClick}
                        >
                            Save Changes
                        </button>
                        </div>
                    </div>
                </div>
            )
            :
            (
            //showed links part
            <div className="flex flex-row mb-4 border-2 border-gray-400 bg-white p-4 md:mx-20 mx-4 rounded-md items-center">
                <img src={link}/>
                <div className="flex flex-col text-start pl-4">
                    <h1>{displayName}</h1>
                    <p className="text-gray-500">{url}</p>
                </div>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                                <MenuIcon {...bindTrigger(popupState)}/>

                            <Menu {...bindMenu(popupState)}>
                                <MenuItems onClick={() => { SetEdit(true); popupState.close(); }}>
                                    <BorderColorIcon/> Edit
                                </MenuItems>

                                <MenuItemss onClick={()=>onDelete(index)}>
                                    <DeleteIcon/>
                                    <span>Remove</span>
                                </MenuItemss>
                            </Menu>

                        </React.Fragment>
                    )}
                </PopupState>
            </div>
            )
        }
        </div>
    )
}

export default LinkItem;