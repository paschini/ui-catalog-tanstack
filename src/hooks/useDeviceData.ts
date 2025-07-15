import { useQuery } from '@tanstack/react-query';
import { Data, DataSchema } from '../components/DeviceDataTypes';

const fetchDeviceData = async (): Promise<Data> => {
  const res = await fetch('https://static.ui.com/fingerprint/ui/public.json');
  const rawData = await res.json();
  return DataSchema.parse(rawData);
};

export const useDeviceData = () => {
  return useQuery({
    queryKey: ['deviceData'],
    queryFn: fetchDeviceData,
    staleTime: 1000 * 60 * 30, // 30 minuter
    gcTime: 1000 * 60 * 60 // 1 timme
  });
};
