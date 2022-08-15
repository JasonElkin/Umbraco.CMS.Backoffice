export const loadScript = (src: string) => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		//script.charset = 'utf-8';
		script.async = true;
		script.type = 'module';
		script.src = src;
		script.onload = function () {
			resolve(null);
		};
		script.onerror = function () {
			reject(new Error(`Script load error for ${src}`));
		};
		document.body.appendChild(script);
	}) as Promise<null>;
};
