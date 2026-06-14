import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER } from "@/core";

export const getImageUrl = (fileName: string) => (fileName ? `${IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER);
