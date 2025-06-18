import { api } from '../instance';

export const downloadFile = async (fileId: string, fileName?: string, extension?: string) => {
  try {
    const response = await api.get(`/Files/${fileId}`, {
      responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    const contentDisposition = response.headers['content-disposition'];
    let filename = fileName || 'download';
    if(extension) {
      filename = `${fileName}.${extension}`;
    }    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    link.remove();
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Ошибка скачивания файла:', error);
    throw error;
  }
}; 