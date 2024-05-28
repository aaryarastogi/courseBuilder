import React, { useState } from 'react';

//mui
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

//assets
import module from './Assets/module.png'
import link from './Assets/link.png'
import upload from './Assets/upload.png'
import mainpage from './Assets/mainpage.png'
import CreateModule from './CreateModule';
import AddedModule from './AddedModule';

import {v4 as uuidv4} from 'uuid';
import FileItem from './FileItem';
import CreateLink from './CreateLink';
import LinkItem from './LinkItem';

//animation
import {motion} from 'framer-motion'

const AddButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#AF273E",
    gap: '1rem',
    padding: '8px 12px',
    
    '&:hover': {
        backgroundColor: '#AF273E',
    },

    [theme.breakpoints.down('sm')]: {
        gap: '0rem',
        padding: '6px 10px',
    },
}));

const MenuItems=styled(MenuItem)(({ theme }) => ({
    gap:'1rem',
    width:'20rem',
    color:'#717171',

    '&:hover': {
        color:'black'
      },
  }));


const Home=()=>{
    const [modules, setModules] = useState([]);
    const[isModule,setIsModule]=useState(false);

    const handleCreateModule = (moduleName) => {
        setModules([...modules, { name: moduleName, resources: [] }]);
        setIsModule(false);
    };

    const handleDeleteModule=(index)=>{
        const updatedModules=modules.filter((_,i)=>i!==index);
        setModules(updatedModules);
    }

    const [files,setFiles]=useState([]);
    const[file,setFile]=useState(null);

    const handleUpload=()=>{
        if (file) {
            const newFile = {
              id: uuidv4(),
              name: file.name,
              file: URL.createObjectURL(file),
            };
            console.log(newFile.name)
            setFiles([...files, newFile]);
            setFile(null);
            document.getElementById('fileInput').value = null;
        }
    }

    const handleDeleteFile=(index)=>{
        const updatedFiles=files.filter((_,i)=>i!==index);
        setFiles(updatedFiles);
    }

    const [links,setLinks] = useState([]);
    const[isLink,setIsLink]=useState(false);

    const handleLink = (linkName,displayName) => {
        setLinks([...modules, { name: linkName, displayName: displayName}]);
        setIsLink(false);
    };

    const handleDeleteLink=(index)=>{
        const updatedLinks=links.filter((_,i)=>i!==index);
        setLinks(updatedLinks);
    }

    const handleFileDragStart=(e,file)=>{
        e.dataTransfer.setData("text/plain",file.id);
    }

    const handleLinkDragStart=(e,link)=>{
        e.dataTransfer.setData("application/link-id",link.name) 
    }

    const handleModuleDragOver = (e) => {
        e.preventDefault();
    };

    const handleModuleDrop = (e, moduleIndex) => {
        e.preventDefault();
        const fileId = e.dataTransfer.getData("text/plain");
        const linkname = e.dataTransfer.getData("application/link-id");

        const droppedFile = files.find(file => file.id === fileId);
        const droppedLink=links.find(link=>link.name===linkname);
        

        if (droppedFile) {
            setModules(prevModules => {
                const updatedModules = [...prevModules];
                updatedModules[moduleIndex].resources.push({ ...droppedFile, type: 'file' });
                return updatedModules;
            });
    
            setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
        }

        if(droppedLink){
            const updatedModules = [...modules];
            updatedModules[moduleIndex].resources.push({...droppedLink,type:'link'});
            setModules(updatedModules);

            const updatedLinks = links.filter(link => link.name !== linkname);
            setLinks(updatedLinks);
        }

    };

    console.log(modules)
    
    return(
        <div>
            {
                isModule && (
                    <CreateModule onCreateModule={handleCreateModule} onCancelModule={()=>setIsModule(false)} />
                )
            }
            {
                isLink && (
                    <CreateLink onCreateLink={handleLink} onCancelLink={()=>setIsLink(false)}/>
                )
            }
            {
                isModule===false && isLink===false && (
                    <div>
                    <div className='flex flex-row justify-around py-4'>
                        <h1 className='font-bold md:text-2xl text-xl '>Course Builder</h1>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <React.Fragment>
                                    <AddButton variant="contained" {...bindTrigger(popupState)}>
                                        <AddIcon/>
                                        Dashboard
                                        <ArrowDropUpIcon/>
                                    </AddButton>

                                    <Menu {...bindMenu(popupState)}>

                                        <MenuItems onClick={()=>setIsModule(true)}>
                                            <img src={module}></img>
                                            Create a module
                                        </MenuItems>

                                        <MenuItems onClick={()=>setIsLink(true)}>
                                            <img src={link}></img>
                                            Add a link
                                        </MenuItems>

                                        <MenuItems onClick={handleUpload}>
                                            <input id='fileInput' type="file" onChange={(e)=>{setFile(e.target.files[0])}} />
                                            <img src={upload} onClick={() => {popupState.close()}} ></img>
                                            Upload
                                        </MenuItems>
                                    </Menu>

                                </React.Fragment>
                            )}
                        </PopupState>
                    </div>

                    { modules.length > 0 && 
                        modules.map((module, index) => (
                            <div key={index} onDragOver={handleModuleDragOver} onDrop={(e) => handleModuleDrop(e, index)}>
                                <AddedModule initialModuleName={module.name} module={module} index={index} onDelete={handleDeleteModule}/>
                            </div>
                    ))}
                    { files.length > 0 &&
                        files.map((file,index)=>(
                            <div key={index} draggable onDragStart={(e)=>handleFileDragStart(e,file)}>
                                <FileItem initialFileName={file.name} file={file} index={index} onDelete={handleDeleteFile}/>
                            </div>
                    ))}
                    { links.length > 0 &&
                        links.map((link,index)=>(
                            <div key={index} draggable onDragStart={(e)=>handleLinkDragStart(e,link)}>
                                <LinkItem initialDisplayName={link.displayName} initialUrl={link.name} index={index} onDelete={handleDeleteLink}/>
                            </div>
                    ))}
                    { modules.length===0 && files.length===0 && links.length===0 &&
                        (
                            <motion.div 
                            initial={{
                              opacity:0
                            }}
                            whileInView={{
                              opacity:1
                            }}
                            transition={{
                              x: { type:'spring', stiffness: 300, damping: 30 },
                              duration:2,
                              ease:'easeInOut'
                            }} className='flex flex-col items-center justify-center gap-2 h-[80vh]'>
                                <img src={mainpage} alt="Main Page" className='items-center justify-center'/>
                                <h1 className='font-bold text-xl'>Nothing added here yet</h1>
                                <p>Click on the [+] Add button to add items to this course</p>
                            </motion.div>
                        )
                    }
                
                </div>
                )
            }
        </div>
    )
}

export default Home;