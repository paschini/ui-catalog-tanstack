import { useContext, useRef, useEffect, useState } from 'react';
import Img from '../assets/icons/Img';
import { useQuery } from '@tanstack/react-query';
import { GlobalContext } from '@/globalContext';
import './ImageLoader.module.css';

type ImageLoaderProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  lazy?: boolean;
};

const ImageLoader = (props: ImageLoaderProps) => {
  const { src, alt, className, width, height, lazy = true } = props;
  const { globalDispatch } = useContext(GlobalContext);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // start loading ahead a little bit
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  const { isLoading, error } = useQuery({
    queryKey: ['image', src],
    queryFn: async () => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
      });
    },
    enabled: shouldLoad,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours long cache
    gcTime: 7 * 24 * 60 * 60 * 1000 // 7 days garbage collection
  });

  if (!shouldLoad || isLoading) {
    return (
      <div ref={imgRef}>
        <Img width={width || '33px'} height={height || '19'} />
      </div>
    );
  }

  if (error) {
    console.error('Image loading error:', error);
    globalDispatch({ type: 'SET_ERROR', payload: { code: 13, message: error.message } });
    return <Img width={width || '33px'} height={height || '19'} />;
  }

  return <img width={width} height={height} src={src} alt={alt} className={className} />;
};

export default ImageLoader;
