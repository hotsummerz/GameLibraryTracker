import { useRef } from 'react';
import { fileToCoverDataUrl } from '../utils/image';

interface CoverUploadProps {
  value?: string;
  onChange: (dataUrl?: string) => void;
  onError: (message: string) => void;
}

export default function CoverUpload({ value, onChange, onError }: CoverUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      onError('Format tidak didukung. Gunakan JPG, PNG, atau WebP.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError('Ukuran file terlalu besar (maks 5 MB).');
      return;
    }

    try {
      const dataUrl = await fileToCoverDataUrl(file);
      onChange(dataUrl);
      onError(''); // Clear error
    } catch (err) {
      onError('Gagal memproses gambar.');
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="cover-upload">
      {value ? (
        <div className="cover-preview-area">
          <img
            src={value}
            alt="Cover game"
            className="cover-preview-image"
          />
          <div className="cover-preview-actions">
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleChooseFile}
            >
              Ganti Cover
            </button>
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleRemove}
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <div className="cover-dropzone" onClick={handleChooseFile}>
          <div className="dropzone-icon">
            <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div className="dropzone-text">
            <span className="dropzone-main">Drag and Drop file here or <button type="button" className="link-button" onClick={(e) => { e.stopPropagation(); handleChooseFile(); }}>Choose file</button></span>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="sr-only"
      />
      <div className="cover-info">
        <span className="field-hint">Supported formats: JPG, PNG, WebP</span>
        <span className="field-hint">Maximum size: 5MB</span>
      </div>
    </div>
  );
}
