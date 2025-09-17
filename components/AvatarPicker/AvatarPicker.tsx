'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';

type Props = {
  profilePhotoUrl?: string;
  onChange?: (url: string) => void;
};

const AvatarPicker = ({ profilePhotoUrl, onChange }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRemove = () => {
    setPreviewUrl('');
    onChange?.(''); // повідомляємо батьківський компонент
  };

  useEffect(() => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
  }, [profilePhotoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only images');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onChange?.(result); // повідомляємо про зміну
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
        <label
          className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          📷 Choose photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;