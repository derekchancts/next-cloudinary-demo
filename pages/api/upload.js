// const cloudinary = require("../../utils/cloudinary");
// require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     try {
//       const fileStr = req.body.data;
//       // console.log(fileStr);
//       const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//         upload_preset: "dev_Setups",
//       });
//       console.log(uploadedResponse);
//     } catch (error) {
//       console.log(error)
//     }
//   }
// };


const handler = async (req, res) => {
  switch (req.method) {
    case 'POST': 
      try {
        const fileStr = req.body.data;
        // console.log(fileStr);
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: "dev_Setups",
        });
        // console.log(uploadedResponse);
        res.status(200).json({ msg: "Image uploaded successfully!"})
      } catch (error) {
        console.log(error);
        res.status(500).json({ err: "Something went wrong"})
      }
    break;
    case 'GET':
      try {
        const { resources } = await cloudinary.search
          .expression("folder:dev_Setups")
          // .sort_by("public_id", "desc")
          .max_results(30)
          .execute()
        
        // const publicIds = resources.map(file => file.public_id);
        // console.log(resources)
        res.status(200).json({ data: resources })
      } catch (error) {;
        console.log(error);
        res.status(500).json({ err: "Something went wrong" });
      }
      break;
    default: 
      res.status(405).end() //Method Not Allowed
      break
  }
};


export default handler;



export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10000kb',
    },
  },
}