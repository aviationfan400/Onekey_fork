import React, { useCallback, useRef, useState } from 'react';
import { apiService } from '../../services/api';
import { getCroppedImageBlob } from '../../utils/cropImage';
import { resolveTeamImageSrc } from '../../utils/teamImageUrl';

const VIEWPORT_SIZE = 280;
const MIN_ZOOM = 1;
const MAX_ZOOM = 3;

interface TeamPhotoFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (imagePath: string) => void;
  required?: boolean;
}

const TeamPhotoField: React.FC<TeamPhotoFieldProps> = ({
  id,
  label = 'Photo',
  value,
  onChange,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [showPathInput, setShowPathInput] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; cropX: number; cropY: number } | null>(null);

  const previewSrc = resolveTeamImageSrc(value);

  const resetCropState = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setNaturalSize({ width: 0, height: 0 });
  };

  const openCropperWithSrc = (src: string) => {
    setSourceImage(src);
    resetCropState();
    setShowCropper(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        openCropperWithSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAdjustExisting = () => {
    if (!previewSrc) return;
    openCropperWithSrc(previewSrc);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
  };

  const baseScale =
    naturalSize.width && naturalSize.height
      ? Math.max(VIEWPORT_SIZE / naturalSize.width, VIEWPORT_SIZE / naturalSize.height)
      : 1;
  const displayWidth = naturalSize.width * baseScale * zoom;
  const displayHeight = naturalSize.height * baseScale * zoom;

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      cropX: crop.x,
      cropY: crop.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setCrop({
      x: dragRef.current.cropX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.cropY + (e.clientY - dragRef.current.startY),
    });
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleApplyCrop = useCallback(async () => {
    if (!sourceImage) return;
    setUploading(true);
    try {
      const blob = await getCroppedImageBlob(sourceImage, crop, zoom, VIEWPORT_SIZE);
      const file = new File([blob], `team-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const result = await apiService.uploadImage(file);
      if (result.success && result.data) {
        onChange(result.data.filePath);
        setShowCropper(false);
        setSourceImage(null);
        resetCropState();
      } else {
        alert(result.error || 'Failed to upload photo');
      }
    } catch (err) {
      console.error(err);
      alert('Could not crop or upload the image. Try another file.');
    } finally {
      setUploading(false);
    }
  }, [sourceImage, crop, zoom, onChange]);

  const handleCancelCrop = () => {
    setShowCropper(false);
    setSourceImage(null);
    resetCropState();
  };

  return (
    <div className="team-photo-field form-group">
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>

      {previewSrc && !showCropper && (
        <div className="team-photo-field__preview">
          <img src={previewSrc} alt="Team member preview" />
        </div>
      )}

      {!showCropper && (
        <div className="team-photo-field__actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {value ? 'Replace photo' : 'Upload photo'}
          </button>
          {value && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleAdjustExisting}>
              Adjust crop
            </button>
          )}
          <button
            type="button"
            className="team-photo-field__path-toggle"
            onClick={() => setShowPathInput((v) => !v)}
          >
            {showPathInput ? 'Hide path' : 'Use image path'}
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="team-photo-field__file-input"
        onChange={handleFileSelect}
        tabIndex={-1}
        aria-label={`${label} file`}
      />
      {required && (
        <input type="hidden" name="image" value={value} required={!value} />
      )}

      {showPathInput && !showCropper && (
        <input
          type="text"
          name="image"
          className="team-photo-field__path"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/pics/member.jpg or uploaded URL"
          required={required && !value}
        />
      )}

      {showCropper && sourceImage && (
        <div className="team-photo-crop">
          <p className="team-photo-crop__hint">Drag to reposition · use slider to zoom</p>
          <div
            className="team-photo-crop__viewport"
            style={{ width: VIEWPORT_SIZE, height: VIEWPORT_SIZE }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <img
              src={sourceImage}
              alt="Crop preview"
              className="team-photo-crop__image"
              onLoad={handleImageLoad}
              style={{
                width: displayWidth || undefined,
                height: displayHeight || undefined,
                transform: `translate(calc(-50% + ${crop.x}px), calc(-50% + ${crop.y}px))`,
              }}
              draggable={false}
            />
          </div>

          <label className="team-photo-crop__zoom-label">
            Zoom
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
          </label>

          <div className="team-photo-crop__buttons">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancelCrop} disabled={uploading}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleApplyCrop} disabled={uploading}>
              {uploading ? 'Uploading…' : 'Apply & upload'}
            </button>
          </div>
        </div>
      )}

      {required && !value && !showCropper && (
        <p className="team-photo-field__required-note">A photo is required (upload or enter a path).</p>
      )}
    </div>
  );
};

export default TeamPhotoField;
