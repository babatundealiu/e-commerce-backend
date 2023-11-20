import cloud, { v2 } from "cloudinary"
const cloudinary: typeof v2 = cloud.v2

cloudinary.config({
    cloud_name:"dclm7orqe",
    api_key: "463325467385432",
    api_secret: "wDjh9RzQaAEWx4JgXiu46a9coi0"
})

export default cloudinary
