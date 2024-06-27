const baseUrl="https://localhost:7046/api";
export default function useRequests(){
    const endpoints={
        getAllProducts:`${baseUrl}/product`,
        createProduct:`${baseUrl}/product`,
        deleteProductById:`${baseUrl}/product`,
        updateProductById:`${baseUrl}/product`,
        getProductById:`${baseUrl}/product`,
    }
    return endpoints;
}