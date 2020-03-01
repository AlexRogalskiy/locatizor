import { FileTree } from "@/renderer/FileTree";
import React, { useState } from "react";

const remote = window.require("electron").remote;
const {dialog, clipboard} = remote;

const clipboardText = clipboard.readText();
const confirmation = () => confirm(`Do you want me to start with the link: ${clipboardText}`);

const osmLink = "https://www.openstreetmap.org/#map=";

if (clipboardText.startsWith(osmLink) && confirmation()) {
  const [_, lat, lng] = clipboardText.replace(osmLink, "").split("/");
  console.log({ lat, lng });
}

export const FileSelect = () => {
  const [path, setPath] = useState();
  const handleClick = async () => {
    const directory = await dialog.showOpenDialog({properties: ["openDirectory"]});
    setPath(directory.filePaths[0]);
  };

  return (
    <>
      <button onClick={handleClick}>Open path</button>
      <FileTree path={path}/>
    </>
  );
};
