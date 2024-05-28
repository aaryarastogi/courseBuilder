import React, { useState } from "react";
import LinkItem from "./LinkItem";
import FileItem from "./FileItem";

const Resources = ({initResources , item , idx}) => {
    const [resources, setResources] = useState(initResources);

    const handleDeleteLink = (index) => {
        const updatedResources = resources.filter((_, idx) => idx !== index);
        setResources(updatedResources);
    };

    const handleDeleteFile = (index) => {
        const updatedResources = resources.filter((_, idx) => idx !== index);
        setResources(updatedResources);
    };

    return (
        <div>
            {
                resources.map((item,idx)=>(
                    item.type === "link" ? (
                        <LinkItem
                            key={idx}
                            initialDisplayName={item.displayName}
                            initialUrl={item.url}
                            index={idx}
                            onDelete={() => handleDeleteLink()}
                            className="ml-10"
                        />
                    ) : item.type === "file" ? (
                        <FileItem
                            key={idx}
                            initialFileName={item.name}
                            file={item}
                            index={idx}
                            onDelete={() => handleDeleteFile()}
                        />
                    ) : (<div></div>)
                ))}
        </div>
    );
};

export default Resources;
