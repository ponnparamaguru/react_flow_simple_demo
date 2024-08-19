import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

function ImageUploaderNode({ data, isConnectable }) {
  const [imageSrc, setImageSrc] = useState(null);

  const onChange = useCallback((evt) => {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onCancel = useCallback(() => {
    setImageSrc(null);
  }, []);

  return (
    <div className="bg-white p-10 flex flex-col border-2 border-orange-300 rounded-lg">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className='flex flex-col'>
        {!imageSrc ? (
          <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-24 border-2 border-dashed border-fuchsia-300 rounded-md">
            <span className="m-4 text-sm font-medium text-fuchsia-500">Upload Image</span>
            <input type="file" id="image" name="image" accept="image/*" onChange={onChange} className="hidden" />
          </label>
        ) : (
          <div className="image-preview flex flex-col items-center">
            <img src={imageSrc} alt="Uploaded" className="mb-4" />
            <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default ImageUploaderNode;
