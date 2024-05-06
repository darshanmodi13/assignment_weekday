import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Cleanup the previous timeout on re-render
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const debouncedCallback = (...args: any[]) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			callback(...args);
		}, delay);
	};

	return debouncedCallback;
};
