import React, { useContext, useState } from 'react';
import './NotesBox.css';
import { FaPalette } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { StoreContext } from '../../store/storeContext';
import axios from 'axios';


const NotesBox = ({ title, description, bgcolor,noteId }) => {
  const [showPalette, setShowPalette] = useState(false);
  const [bgColor, setBgColor] = useState(bgcolor); 
  const {deleteNote} = useContext(StoreContext);
  const handlePaletteClick = () => {
    setShowPalette(!showPalette);
  };

  const changeColor = (color) => {
    setBgColor(color);
    setShowPalette(false);
  };

  const handleDelete = async () => {
    const notesId = noteId;
    deleteNote(notesId);
  };

  return (
    <>
      <div className="notesbox-wrapper" style={{ backgroundColor: bgColor }}>
        <div>
          <h3 className="notes-title">{title}</h3>
        </div>
        <div className="notes-content">
           <pre>{description}</pre>
        </div>

        {/* Hidden icons that appear on hover */}
        <div className="notes-icons">
          <FaPalette onClick={handlePaletteClick} style={{ cursor: 'pointer' }} />
          <FaRegTrashAlt onClick={handleDelete}/>
        </div>

        {/* Color Palette (Positioned below the Notes Box) */}
        <div className={`color-palette ${showPalette ? '' : 'hidden'}`}>
          <button
            style={{ backgroundColor: '#ffffff' }}
            onClick={() => changeColor('#ffffff')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#f28b82' }}
            onClick={() => changeColor('#f28b82')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#fbbc04' }}
            onClick={() => changeColor('#fbbc04')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#fff475' }}
            onClick={() => changeColor('#fff475')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#ccff90' }}
            onClick={() => changeColor('#ccff90')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#a7ffeb' }}
            onClick={() => changeColor('#a7ffeb')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#d7aefb' }}
            onClick={() => changeColor('#d7aefb')}
            className="color-button"
          />
          <button
            style={{ backgroundColor: '#fdcfe8' }}
            onClick={() => changeColor('#fdcfe8')}
            className="color-button"
          />
        </div>
      </div>
    </>
  );
};
export default NotesBox;
