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

// Request types for chat with RAG
export interface ChatRequest {
  message: string;
  llm_prompt_template: string;
  resource_ids?: string[]; // Optional list of resource IDs to use for RAG
}

// Types for summaries
export interface SummaryCreate {
  content: string;
  length_type: 'BRIEF' | 'DETAILED' | 'COMPREHENSIVE';
  focus_areas: string[];
  custom_prompt?: string;
  is_published: boolean;
  video_id?: string;
  resource_id?: string;
}

export interface SummaryRequest {
  length_type: 'BRIEF' | 'DETAILED' | 'COMPREHENSIVE';
  focus_areas?: string[];
  custom_prompt?: string;
}

export interface SummaryResponse {
  summaryId: string;
  videoId?: string;
  resourceId?: string;
  moduleId?: string;
  courseId: string;
  lengthType: string;
  content: string;
  wordCount: number;
  version: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt?: string;
  focusAreas: string[];
}

export interface ResourceWithSummary {
  resourceId: string;  // Changed from id to resourceId to match API
  title: string;
  type: string;
  status: string;
  hasSummary: boolean;
  summaryId?: string;
  summaryContent?: string;
  summaryLengthType?: string;
  isPublished: boolean;
  createdAt: string;
  hasTranscript: boolean;
  // Additional fields that might be in the response
  durationSeconds?: number;
  published?: boolean;
  publishedAt?: string | null;
  thumbnailUrl?: string | null;
  hasQuiz?: boolean;
}

export interface ResourcesWithSummariesResponse {
  courseId: string;
  resources: ResourceWithSummary[];
  totalResources: number;
}

export interface ModuleSummariesResponse {
  moduleId: string;
  summaries: SummaryResponse[];
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

  // Get resources with their summary status for a course
  getResourcesWithSummaries: async (courseId: string): Promise<ResourcesWithSummariesResponse> => {
    const response = await axiosInstance.get(
      `/api/v1/resources/${courseId}/resources-with-summaries`
    );
    return response.data;
  },

  // Generate summary for a resource (using the new resource-based API)
  generateResourceSummary: async (
    resourceId: string,
    requestData: SummaryRequest
  ): Promise<SummaryResponse> => {
    const response = await axiosInstance.post(
      `/api/v1/resources/${resourceId}/summaries`,
      requestData
    );
    return response.data;
  },

  // Get a specific summary
  getSummary: async (summaryId: string): Promise<SummaryResponse> => {
    const response = await axiosInstance.get(
      `/api/v1/summaries/${summaryId}`
    );
    return response.data;
  },

  // Update a summary
  updateSummary: async (summaryId: string, summaryData: Partial<SummaryRequest>): Promise<SummaryResponse> => {
    const response = await axiosInstance.put(
      `/api/v1/summaries/${summaryId}`,
      summaryData
    );
    return response.data;
  },

  // Delete a summary
  deleteSummary: async (summaryId: string): Promise<void> => {
    await axiosInstance.delete(`/api/v1/summaries/${summaryId}`);
  },

  // Update summary publishing status
  updateSummaryPublishStatus: async (summaryId: string, isPublished: boolean): Promise<SummaryResponse> => {
    const response = await axiosInstance.patch(
      `/api/v1/summaries/${summaryId}/publish`,
      { isPublished }
    );
    return response.data;
  },

  // Get all summaries for a module
  getModuleSummaries: async (moduleId: string): Promise<ModuleSummariesResponse> => {
    const response = await axiosInstance.get(
      `/api/v1/modules/${moduleId}/summaries`
    );
    return response.data;
  },
};