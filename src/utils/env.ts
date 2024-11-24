'use client';

export function isMainNetwork() {
	if (typeof window !== 'undefined') {
		return (
			window.location.hostname === 'grow.rooch.network' ||
			window.location.hostname === 'main-grow.rooch.network'
		);
	}
	return false;
}
