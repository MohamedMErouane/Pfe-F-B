import Link from 'next/link';
const Features = () => {
  return (
    <div className="mt-20 container-53 w-container">
     
      <div className="flex justify-between">
        {/* First benefit */}
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
          <Link href="https://app.studytogether.com/auth/signin1?src=Homepage">
            <div className="p-20">
              <img src="/th3.png" alt="Benefit Image 1" className="w-full h-auto rounded-t-lg" />
              <h2 className="mt-4 text-2xl font-bold mb-8 text-black text-center">Own Study Universe</h2>
              <div className="mt-4 text-gray-700">
                Create your very own study room with atmospheric <strong>backgrounds</strong>, <strong>personal timers</strong>, and <strong>goals.</strong>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Second benefit */}
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <Link href="https://app.studytogether.com/auth/signin1?src=Homepage">
            <div className="p-20">
              <img src="/th2.png" alt="Benefit Image 2" className="w-full h-auto rounded-t-lg" />
              <div className="mt-4 text-gray-700">
              <h2 className="mt-4 text-2xl font-bold mb-8 text-black text-center">Group Study Rooms</h2>
                Join <strong>motivated students</strong> from all over the world to boost your <strong>productivity</strong> and find your study flow.
              </div>
            </div>
          </Link>
        </div>
        
        {/* Third benefit */}
        <div className="w-1/3 bg-white shadow-md rounded-lg overflow-hidden">
          <Link href="https://app.studytogether.com/auth/signin1?src=Homepage">
            <div className="p-20">
              <img src="/th4.jpeg" alt="Benefit Image 3" className="w-full h-auto rounded-t-lg" />
              <h2 className="mt-4 text-2xl font-bold mb-8 text-black text-center">Study Stats</h2>
              <div className="mt-4 text-gray-700">
              See your <strong> progress</strong> every day in your Stats and on the <strong> community leaderboard.</strong>
              </div>
              
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
