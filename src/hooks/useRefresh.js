import { useQueryClient } from "react-query";

export function useRefresh() {
    const queryClient = useQueryClient();
    return (query) => queryClient.invalidateQueries(query);
}