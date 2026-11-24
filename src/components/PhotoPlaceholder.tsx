import Image from "next/image";

type PhotoPlaceholderProps = {
  ratio: string;
  label: string;
  src?: string;
  alt?: string;
};

export function PhotoPlaceholder({ ratio, label, src, alt }: PhotoPlaceholderProps) {
  if (src && alt) {
    return (
      <div className="photo photo-frame" style={{ aspectRatio: ratio }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 800px) 30vw, 100vw"
          className="photo-img"
        />
      </div>
    );
  }

  return (
    <div className="photo" style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      PHOTO
    </div>
  );
}
