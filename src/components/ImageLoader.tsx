import { useContext } from 'react';
import Img from '../assets/icons/Img';
import { useQuery } from '@tanstack/react-query';
import { GlobalContext } from '../globalContext';
import './ImageLoader.module.css';

type ImageLoaderProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
};

const ImageLoader = (props: ImageLoaderProps) => {
  const { src, alt, className, width, height } = props;
  const { globalDispatch } = useContext(GlobalContext);

  const { isLoading, error } = useQuery({
    queryKey: ['image', src],
    queryFn: async () => {
      // Preload image
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
      });
    }
  });

  if (isLoading) return <Img width={'33'} height={'19'} />;

  if (error) {
    console.error('Image loading error:', error);
    globalDispatch({ type: 'SET_ERROR', payload: { code: 13, message: error } });
    return <Img />;
  }

  return <img width={width} height={height} src={src} alt={alt} className={className} />;
};

export default ImageLoader;
