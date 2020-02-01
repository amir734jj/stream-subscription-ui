export const toBase64 = file => new Promise<string>((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result.toString().replace(/^data:(.*,)?/, ''));
	reader.onerror = error => reject(error);
});
