import { useEffect, useState } from 'react';

export function useFullWidth(defaultValue: boolean = false) {
	//
	const [isFullWidth, setIsFullWidth] = useState(() => {
		//
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('isFullWidth');
			return saved ? JSON.parse(saved) : defaultValue;
		}

		return defaultValue; // default value for SSR
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('isFullWidth', JSON.stringify(isFullWidth));
		}
	}, [isFullWidth]);

	return [isFullWidth, setIsFullWidth] as const;
}
