import Image from 'next/image';

const AboutSection = () => {
  return (
    
    <section id="about-st" className="section-39  flex justify-center " style={{background: 'linear-gradient(#f4eef5, #fff)'}}>
      
      {/* Container for images and text */}
      <div className="mt-40 px-2 sm:px-40 flex flex-wrap justify-between items-center">
        {/* Image container for smaller image (a1.jpg) */}
        <div className="w-full sm:w-1/2 md:w-1/3 mb-1 sm:mb-2 md:mb-1 order-2 md:order-4">
         
        </div>

        {/* Image container for larger image (th5.png) */}
        <div className="w-full sm:w-1/2 md:w-1/3 mb-1 sm:mb-2 md:mb-1 order-2 md:order-3">
          {/* Larger image */}
          <Image
            src="/th5.png"
            alt="Dashboard Study Together"
            width={800}
            height={667}
          />
        </div>

        {/* Text container */}
        <div className="w-full sm:w-1/2 md:w-/3 mb-1 sm:mb-2 md:mb-1 text-black order-4 md:order-3 ml-0">
          <div className="mb-1">
            <h3 className="text-2xl font-bold mb-1">Stronger together 💪</h3>
            <div className="copy-st text-black">
              Imagine a world in which <strong>studying is actually enjoyable</strong>. A world where you<strong> set goals and </strong>actually<strong> accomplish them</strong>. Where you <strong>find guidance where you need it</strong>, and you feel supported. Where you <strong>see progress</strong> and can <strong>celebrate your achievements</strong> alongside thousands of peers - where someone is always there for you! OK - enough imagining - <strong>welcome to StudyTogether.</strong>
            </div>
          </div>
          <div className="div-block-161">
            <a href="/how-to-studytogether" className="textlink dark w-inline-block ">
              <div className="div-block-161">
                <div className="st-textlink dark text-black text-indigo-700">Learn more</div>
                <Image src="https://uploads-ssl.webflow.com/60890f6ac44206aef9237eb4/60890f6ac44206acbe23804a_arrow-right%20(1).svg" alt="arrow right" width={20} height={20} />
              </div>
            </a>
            <a href="/faq" className="textlink dark w-inline-block">
              <div className="div-block-161">
                <div className="st-textlink dark text-indigo-700">FAQ &amp; Rules</div>
                <Image src="https://uploads-ssl.webflow.com/60890f6ac44206aef9237eb4/60890f6ac44206acbe23804a_arrow-right%20(1).svg" alt="arrow right" width={20} height={20} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
