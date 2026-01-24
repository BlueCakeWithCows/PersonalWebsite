import { useState } from 'react';
import './Create.css';

interface CreateProps {
}

export function Create({ }: CreateProps) {
  const [codeType, setCodeType] = useState<'dynamic' | 'static'>('dynamic');
  const [name, setName] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerateCode = () => {
    console.log('Generating code:', { codeType, name, destinationUrl, image });
    // Add your code generation logic here
  };

  return (
    <div className="create">
      <div className="create-form">
        <div className="code-type-tabs">
          <button 
            className={`tab ${codeType === 'dynamic' ? 'active' : ''}`}
            onClick={() => setCodeType('dynamic')}
          >
            Dynamic
          </button>
          <button 
            className={`tab ${codeType === 'static' ? 'active' : ''}`}
            onClick={() => setCodeType('static')}
          >
            Static
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Spring Campaign"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Destination URL</label>
          <input
            id="url"
            type="url"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            placeholder="https://example.com"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">(optional) Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="form-input-file"
          />
          {image && <span className="file-name">{image.name}</span>}
        </div>

        <button className="generate-btn" onClick={handleGenerateCode}>
          Generate Code
        </button>
      </div>
    </div>
  );
}
