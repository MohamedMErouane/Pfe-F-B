'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import { BACKEND_URL } from '@/lib/Constants';
import { toast } from 'react-toastify';
import { User } from '@/lib/types';

function Card({ id }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [about, setAbout] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [image, setImage] = useState<string | null>(null); // Initial image path
  const [file, setFile] = useState<string | null>(null)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData: User = await response.json();
        setUser(userData);
        setLoading(false);

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setAbout(userData.about);
        setFacebook(userData.facebook);
        setTwitter(userData.twitter);
        setInstagram(userData.instagram);
        setLinkedIn(userData.linkedIn);
        setImage(userData.image ? `http://localhost:3333/user/profile/${id}` : '/1.jpg'); // Set image to null if not provided

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    setEditing(false);
  
    const userId = session?.user.id;
  
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('about', about);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('linkedIn', linkedIn);
  
    if (file) {
      formData.append('image', file);
    }
  
    try {
      const res = await fetch(`${BACKEND_URL}/user/${userId}`, {
        method: 'PUT',
        body: formData
      });
  
      if (res.ok) {
        toast.success("Information updated successfully");
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error("Something went wrong");
    }
  };
  

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setFile(file);
    setImage(imageUrl); // Update the image state for preview
  } else {
    console.warn("No image selected");
  }
};

  return (
    <div className='cursor-pointer m-1 rounded-2xl flex flex-col justify-start items-center w-96 border-8 border-gradient-to-l from-blue-300 via-white to-black-300 bg-gradient-to-tr h-3/4 '>

      {loading ? (
        <p className="text-black text-4xl flex justify-center items-center h-full">Loading...</p>
      ) : (
        <div>
          {!editing ? (
            <div>
              <div className='flex justify-center margin-right:30px items-center py-6'>
                {image ? (
                  <Image src={image} width="90" height="90" className='rounded-lg sepia' alt={''} />
                ) : (
                  <div>No image available</div>
                )}
              </div>
              <h1 className='text-neutral-700 font-bold text-3xl text-center'>{lastName} {firstName}</h1>
              <p className='font-normal uppercase text-base text-neutral-700 text-center pb-4'>{session?.user.email}</p>
              <h3 className='font-semibold text-md uppercase text-center py-2'>About</h3>
              <p className='text-sm text-neutral-600 text-center mx-10'>{about}</p>
              <div className='flex justify-center items-center gap-6 py-6'>
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebookSquare className='w-6 h-6 text-blue-600 cursor-pointer' />
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer">
                    <BsTwitter className='w-6 h-6 text-blue-400 cursor-pointer' />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className='w-6 h-6 text-yellow-400 cursor-pointer' />
                  </a>
                )}
                {linkedIn && (
                  <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='w-6 h-6 text-blue-400 cursor-pointer' />
                  </a>
                )}
              </div>
              {session?.user.id === user?.id &&
                <div className='flex justify-center items-center gap-6 py-6'>
                  <button onClick={handleEditClick} className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>Edit</button>
                </div>
              }
            </div>
          ) : (
            <form onSubmit={handleSaveClick} className="flex flex-col items-center w-full">
              <div className='flex justify-center margin-right:30px items-center py-6'>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook Link" className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter Link" className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram Link" className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <div className='flex flex-col justify-start items-center w-full mb-4'>
                <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} placeholder="LinkedIn Link" className='w-full p-2 rounded-lg border border-gray-300 text-black' />
              </div>
              <button type="submit" className='text-white uppercase bg-gradient-to-r hover:bg-gradient-to-l from-cyan-500 to-blue-500 p-3 font-semibold rounded-lg w-11/12 '>Save</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
