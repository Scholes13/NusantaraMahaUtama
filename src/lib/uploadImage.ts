export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    // Create unique filename based on timestamp and original name
    const timestamp = new Date().getTime();
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const filename = `${timestamp}-${safeName}`;

    // Copy file to public/uploads
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}