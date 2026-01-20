import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
const Note = ({
  id,
  onRemoveNote,
  content,
  color: initialColor,
  onUpdateNote,
}) => {
  const [localContent, setLocalContent] = useState(content);
  const colorOptions = [
    'bg-yellow-300',
    'bg-pink-300',
    'bg-blue-300',
    'bg-green-300',
  ];

  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  const [color, setColor] = useState(() => {
    if (initialColor) return initialColor;
    return colorOptions[randomIndex];
  });
  const textareaRef = useRef(null);
  const handleContentChange = () => {
    onUpdateNote(id, localContent, color);
  };
  const handleColorChange = newcolor => {
    setColor(newcolor);
    onUpdateNote(id, content, newcolor);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      className={`p-4 relative max-h-[32rem] overflow-hidden ${color}`}
      onClick={() => setIsEditing(true)}
    >
      <div className="absolute top-2 right-2">
        {isEditing ? (
          <button aria-label="Check Note" className="text-gray-700">
            <AiOutlineCheck size={20} onClick={() => setIsEditing(false)} />
          </button>
        ) : (
          <button
            aria-label="Close Note"
            className="text-gray-700"
            onClick={e => {
              e.stopPropagation();
              onRemoveNote(id);
            }}
          >
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label="Edit Note"
        placeholder="메모를 작성하세요."
        readOnly={!isEditing}
        ref={textareaRef}
        value={localContent}
        onChange={e => setLocalContent(e.target.value)}
        onBlur={handleContentChange}
        style={{ height: 'auto', minHeight: '8rem' }}
      />
      {isEditing && (
        <div className="flex space-x-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              onClick={() => handleColorChange(option)}
              aria-label={`Change color to ${option}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
