"use client"
import React, { useState } from 'react';
import Image from "next/image";
import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { useSession } from 'next-auth/react';

function Card() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Merouane Mohamed');
  const [jobTitle, setJobTitle] = useState('Full stack Developer');
  const [about, setAbout] = useState('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [image, setImage] = useState('/1.jpg'); // Initial image path

  const {data : session} = useSession()

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Perform save operation here (e.g., send data to backend)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  return (
    <div  className='cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-96 border-8 border-gradient-to-l from-blue-300 via-white to-black-300 bg-gradient-to-tr h-3/4 '>
      <div>
        <div className='flex justify-center margin-right:30px items-center py-6'>
          {editing ? (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          ) : (
            <Image src={image} width="90" height="90" className='rounded-lg sepia' alt={''} />
          )}
        </div>
        {!editing ? (
          <div>
            <h1 className='text-neutral-700 font-bold text-3xl text-center'>{session?.user.lastName} {session?.user.firstName}</h1>
            <p className='font-normal uppercase text-base text-neutral-700 text-center pb-4'>{session?.user.email}</p>
            <h3 className='font-semibold text-md uppercase text-center py-2'>About</h3>
            <p className='text-sm text-neutral-600 text-center mx-10'>{about}</p>
            <div className='flex justify-center items-center gap-6 py-6'>
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebookSquare className='w-6 h-6 text-blue-600 cursor-pointer'/>
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <BsTwitter className='w-6 h-6 text-blue-400 cursor-pointer'/>
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className='w-6 h-6 text-yellow-400 cursor-pointer'/>
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className='w-6 h-6 text-blue-400 cursor-pointer'/>
                </a>
              )}
            </div>
            <div className='flex justify-center items-center gap-6 py-6'>
              <button onClick={handleEditClick} className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>Edit</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveClick} className="flex flex-col items-center w-full">
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook Link" className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter Link" className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram Link" className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <div className='flex flex-col justify-start items-center w-full mb-4'>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="LinkedIn Link" className='w-full p-2 rounded-lg border border-gray-300 text-black'/>
            </div>
            <button type="submit" className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>Save</button>
          </form>
        )}
      </div>      
    </div>
  );
}

export default Card;
