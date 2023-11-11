const express=require('express')
const { CONNECTION_STRING}=require('./config/index')
const {mongoose}= require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config();
const serverless = require("serverless-http");
const userrouter = require('./api/router/userrouter')
const fileupload = require('./api/router/filerouter')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(CONNECTION_STRING)                                                     
.then(res=>console.log('connect'))
.catch(err=>console.log(err))
app.options("*", cors({ origin: ["https://food-xml4.onrender.com"], optionsSuccessStatus: 200 }));
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use('/api/user', userrouter)
app.use('/api/file', fileupload)
app.use((err,res)=>{
    res.status(err.statusCode || 500).json({
        message:err?.message || "Server error",
        statusCode:err.statusCode || 500
    })
})




module.exports=app
module.exports.handler = serverless(app);
















// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import Svg, { G, Path } from 'react-native-svg';

// return (
//     <Svg
//       aria-hidden="true"
//       focusable="false"
//       data-prefix="fas"
//       data-icon="heart"
//       role="img"
//       xmlns="../asset/1.png"
//       viewBox="0 0 512 512"
//     >
//       <G>
//         <Path
//           fill="currentColor"
//           d="M458.3 46.7C415.7 4.1 352-5.3 306.6 40.1L256 90.7l-50.6-50.6C160-5.3 96.3 4.1 53.7 46.7c-52.5 52.6-52.5 138.2 0 190.8L256 501.9l202.3-202.4c52.5-52.6 52.5-138.2 0-190.8z"
//         />
//       </G>
//     </Svg>