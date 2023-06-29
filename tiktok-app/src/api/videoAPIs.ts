import axiosInstance from "@/libs/axios/axiosConfig";

interface IValues {
    titleVideo: string
    hashtagVideo: string
}
export const getAllVideo = async (page: number, limit: number) => {
    const response = await axiosInstance.get(`videos/getAllVideo/?page=${page}&limit=${limit}`);
    return response.data
}

export const updateVideo = async (videoId: string, values: IValues) => {
    const response = await axiosInstance.put(`videos/update/${videoId}`, values)
    return response.data
}