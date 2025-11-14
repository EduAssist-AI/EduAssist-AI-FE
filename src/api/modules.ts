import axiosInstance from './axios';

// Types related to modules
export interface ChatMessage {
  query: string;
  response: string;
  role: string;
  timestamp: string;
}

export interface ChatHistoryResponse {
  moduleId: string;
  chatHistory: ChatMessage[];
}

export interface Video {
  id: string;
  title: string;
  durationSeconds: number;
  status: string;
  published: boolean;
  publishedAt: string | null;
  thumbnailUrl: string | null;
  hasTranscript: boolean;
  hasSummary: boolean;
  hasQuiz: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: string;  // New field for resource type (video, pdf, docx, txt)
  durationSeconds: number;
  status: string;
  published: boolean;
  publishedAt: string | null;
  thumbnailUrl: string | null;
  hasTranscript: boolean;
  hasSummary: boolean;
  hasQuiz: boolean;
}

export interface VideosResponse {
  videos: Video[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ResourcesResponse {
  resources: Resource[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface VideoUploadResponse {
  videoId: string;
  title: string;
  status: string;
  statusUrl: string;
  estimatedProcessingTime: number;
}

export interface ResourceUploadResponse {
  resourceId: string;
  title: string;
  type: string;
  status: string;
  statusUrl: string;
  estimatedProcessingTime: number;
}

// API functions for modules
export const moduleApi = {
  // Get module chat history
  getModuleChatHistory: async (moduleId: string): Promise<ChatHistoryResponse> => {
    const response = await axiosInstance.get(`/api/v1/modules/${moduleId}/chat/history`);
    return response.data;
  },

  // Get all videos for a module
  getModuleVideos: async (moduleId: string): Promise<VideosResponse> => {
    const response = await axiosInstance.get(`/api/v1/courses/modules/${moduleId}/videos`);
    return response.data;
  },

  // Get all resources for a module
  getModuleResources: async (moduleId: string): Promise<ResourcesResponse> => {
    const response = await axiosInstance.get(`/api/v1/courses/modules/${moduleId}/resources`);
    return response.data;
  },

  // Upload a video to a module
  uploadModuleVideo: async (
    moduleId: string,
    file: File,
    title: string,
    uploadToDrive: boolean = false
  ): Promise<VideoUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('upload_to_drive', uploadToDrive.toString());

    const response = await axiosInstance.post(
      `/api/v1/courses/modules/${moduleId}/videos-sync`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  // Upload a resource to a module
  uploadModuleResource: async (
    moduleId: string,
    file: File,
    title: string,
    uploadToDrive: boolean = false
  ): Promise<ResourceUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('upload_to_drive', uploadToDrive.toString());

    const response = await axiosInstance.post(
      `/api/v1/courses/modules/${moduleId}/resources-sync`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};