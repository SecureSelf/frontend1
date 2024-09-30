import React, { useContext } from 'react'
import Carddocument from './Carddocument';
import { StoreContext } from '../store/storeContext';
// const imageUrls = [
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547523/uploads/n7ueocazljnfwtw8uqxq.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727546844/uploads/tpy7wdijksi287sbxmg5.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547947/uploads/duad8mzws9gvx6u8flwq.jpg",
//     // "https://res.cloudinary.com/dmig0doro/image/upload/v1727509859/uploads/wmsvdvd48mabrndjvryf.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547523/uploads/n7ueocazljnfwtw8uqxq.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727546844/uploads/tpy7wdijksi287sbxmg5.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547947/uploads/duad8mzws9gvx6u8flwq.jpg",
//     // "https://res.cloudinary.com/dmig0doro/image/upload/v1727509859/uploads/wmsvdvd48mabrndjvryf.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547523/uploads/n7ueocazljnfwtw8uqxq.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727546844/uploads/tpy7wdijksi287sbxmg5.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547947/uploads/duad8mzws9gvx6u8flwq.jpg",
//     // "https://res.cloudinary.com/dmig0doro/image/upload/v1727509859/uploads/wmsvdvd48mabrndjvryf.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547523/uploads/n7ueocazljnfwtw8uqxq.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727546844/uploads/tpy7wdijksi287sbxmg5.jpg",
//     "https://res.cloudinary.com/dmig0doro/image/upload/v1727547947/uploads/duad8mzws9gvx6u8flwq.jpg",
//     // "https://res.cloudinary.com/dmig0doro/image/upload/v1727509859/uploads/wmsvdvd48mabrndjvryf.jpg",    

//     // More URLs...
//   ];
function Documentupload() {
  
  return (
    <div className=" ">
    <h1 className="text-3xl font-bold text-center my-4 ">Document Upload</h1>
    <div className=' bg-black w-[250px] text-center  m-auto h-[3px]  justify-center'></div>
    <Carddocument />
  </div>
  )
}

export default Documentupload
