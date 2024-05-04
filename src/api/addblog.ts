import { useState } from "react";



export const useApi = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const submitBlog = async (formData: FormData) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blog`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      console.log("Form submitted successfully");
      return true;
    } catch (error:any) {
      console.error("Error:", error);
      setError(error.message || "Failed to submit form");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    submitBlog,
  };
};
