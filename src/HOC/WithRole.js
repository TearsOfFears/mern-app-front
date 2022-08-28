import useRoles from "../hooks/useRoles";

export const WithAdmin = props => useRoles("admin") && props.children;
export const WithWritter = props => useRoles("writter") && props.children;
export const WithUser = props => useRoles("user") && props.children;