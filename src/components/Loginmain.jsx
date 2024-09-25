import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations
import adharcard from '../img/aadharcard.png'; // Assuming you have this image
import pancard from '../img/pancard.png';
import drivingcard from '../img/drivingcard.avif'
import votercard from '../img/votercard.png'
import abhacard from '../img/abhacard.png'
import medical from '../img/medical.avif'
import blood from '../img/blood.webp' 
import vaccination from '../img/vaccination.jpg'
import studentcard from '../img/studentcard.jpg'
import mmarksheet from '../img/marksheet.png'
import hmmarksheet from '../img/hmarksheet.png'
import library from '../img/library.png'
import buscard from '../img/buscard.png'
import metrocard from '../img/metrocard.png'
import Footer from './Footer';
// Define a basic animation for card loading
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } }, // Adjust duration if needed
};

function Loginmain() {
  const categories = [
    {
      name: 'Government',
      cards: [
        { name: 'Aadhar Card', img: adharcard },
        { name: 'Pan Card', img: pancard },
        { name: 'Driving License', img: drivingcard },
        { name: 'Voter Card', img: votercard },
      ],
    },
    {
      name: 'Health',
      cards: [
        { name: 'Ayushman Card', img: abhacard },
        { name: 'Medical Insurance', img: medical },
        { name: 'Blood Donation', img: blood },
        { name: 'Vaccination', img: vaccination },
      ],
    },
    {
      name: 'Education',
      cards: [
        { name: 'School ID', img: studentcard },
        { name: '10th Marksheet', img: mmarksheet },
        { name: '12th Marksheet', img: hmmarksheet },
        { name: 'Library Card', img: library },
      ],
    },
    {
      name: 'Public',
      cards: [
        { name: 'Bus Pass', img: buscard },
        { name: 'Metro Card', img: metrocard },
        { name: 'Railway Ticket', img: adharcard },
        { name: 'Public ID', img: adharcard },
      ],
    },
  ];

  return (
    <div>
      <Header />
      
      {/* Page Wrapper */}
      <div className='bg-[#e4e6e7] py-8'>
        
        {/* Loop through the categories */}
        {categories.map((category) => (
          <section key={category.name} className='mb-12'>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3, // delay between each card
                  },
                },
              }}
            >
              <h1 className='text-5xl font-bold ml-[2%] mb-6 bg-[#dee2e6] text-black p-4 rounded-lg shadow-lg inline-block relative'>
                {category.name}
                <div className='absolute bottom-0 left-0 right-0 h-1 bg-[#343a40]'></div> {/* Bottom line */}
              </h1>

              {/* Cards Wrapper */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 lg:mx-16 py-6 px-6 rounded-lg bg-[#123455]">
                {category.cards.map((card) => (
                  <motion.div
                    key={card.name}
                    className='bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-500 hover:scale-105'
                    variants={cardVariant}
                  >
                    <img src={card.img} alt={card.name} className='w-32 h-32 mx-auto mb-4 rounded-lg' />
                    <h2 className='text-xl font-semibold mb-4'>{card.name}</h2>

                    <Link to={`/upload/${card.name}`}>
                      <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'>
                        Upload {card.name}
                      </button>
                    </Link>
                  </motion.div>


                ))}
              </div>
                <Link to='/other'>
                <div className='  text-center'>
               <button className="bg-[#123455] mt-[20px] items-center text-white font-bold py-5 px-[50px] rounded shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none">
                          OTHER
                </button>
               </div>
               
               </Link> 
            </motion.div>
          </section>
        ))}
      </div>

   <div className='mt-[40px]'>
    <h1 className=' text-5xl font-bold text-center'>OTHER DOCUMENT</h1>
   </div>

   <div className='flex justify-center'>
    <div className='w-[100px] h-[100px] mt-[50px]'>
       <h1 className='text-5xl'>➡️</h1>
    </div>
     
    <Link to='/other-doc'>
      <div className='w-[150px] h-[40px] mt-[55px] mr-[20px]'>
        <button className='w-full h-full bg-teal-500 text-white  font-bold rounded-lg
                           animate-pulse-glow'>
          HERE
        </button>
      </div>
    </Link>
    <div className='w-[100px] h-[100px] mt-[50px]'>
        <h1 className='text-5xl'>⬅️</h1>
    </div>
  
   </div>
      <Footer/>
    </div>
  );
}

export default Loginmain;
