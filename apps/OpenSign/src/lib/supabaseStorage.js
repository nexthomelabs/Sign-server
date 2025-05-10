import { supabase } from './supabaseClient';

/**
 * Uploads a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The path within the bucket
 * @returns {Promise<{url: string, error: any}>} - The URL of the uploaded file or error
 */
export const uploadFile = async (file, bucket = 'documents', path = 'public/') => {
  try {
    // Create a unique file name
    const fileName = `${path}${Date.now()}_${file.name}`;
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      throw error;
    }
    
    // Get the public URL for the file
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { url: null, error };
  }
};

/**
 * Downloads a file from Supabase Storage
 * @param {string} path - The full path to the file
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{data: Blob, error: any}>} - The file data or error
 */
export const downloadFile = async (path, bucket = 'documents') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error downloading file:', error);
    return { data: null, error };
  }
};

/**
 * Deletes a file from Supabase Storage
 * @param {string} path - The full path to the file
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{success: boolean, error: any}>} - Success status or error
 */
export const deleteFile = async (path, bucket = 'documents') => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error };
  }
};

/**
 * Lists files in a Supabase Storage bucket
 * @param {string} path - The path within the bucket
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{files: Array, error: any}>} - List of files or error
 */
export const listFiles = async (path = '', bucket = 'documents') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);
    
    if (error) {
      throw error;
    }
    
    return { files: data, error: null };
  } catch (error) {
    console.error('Error listing files:', error);
    return { files: [], error };
  }
};

/**
 * Creates a signed URL for temporary access to a file
 * @param {string} path - The full path to the file
 * @param {string} bucket - The storage bucket name
 * @param {number} expiresIn - Seconds until the URL expires (default: 60)
 * @returns {Promise<{signedUrl: string, error: any}>} - Signed URL or error
 */
export const createSignedUrl = async (path, bucket = 'documents', expiresIn = 60) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      throw error;
    }
    
    return { signedUrl: data.signedUrl, error: null };
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return { signedUrl: null, error };
  }
};