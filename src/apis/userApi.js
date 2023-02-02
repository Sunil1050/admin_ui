import axios from "axios";

export default axios.create({
    baseURL: 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
})