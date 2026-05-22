import React from 'react';
import bannerImg from '../assets/banner.jpg';
import userImg from '../assets/user.png';
import runImg from '../assets/run.jpg';
import weightImg from '../assets/weightLifting.png';
import calisthenicsImg from '../assets/calisthenics.jpg';
import nikeImg from '../assets/nike.png';
import adidasImg from '../assets/adidas.png';
import jordanImg from '../assets/jordan.png';
import gymsharkImg from '../assets/gymshark.png';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#19192a] text-white font-['Albert_Sans'] min-h-screen w-full overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Hero Banner Section */}
      <section className="relative h-screen min-h-[800px] w-full flex flex-col">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bannerImg})` }}>
          <div className="absolute inset-0 bg-[#020224] opacity-60"></div>
        </div>

        {/* Navigation - Constrained */}
        <nav className="relative z-20 w-full">
          <div className=" flex items-center justify-between px-6 py-6 md:py-10">
            <h1 className="text-3xl md:text-3xl font-extrabold tracking-tighter">FitX</h1>
         <Link to='/login' className="transition-transform hover:scale-110">
              <img src={userImg} alt="User" className="h-10 md:h-12 w-auto" />
          </Link>
          </div>
        </nav>

        {/* Welcome Area - Constrained */}
        <div className="relative z-10 flex-grow flex flex-col justify-center ml-5">
          <div className=" w-full px-6">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-['Bricolage_Grotesque'] leading-[1.1] mb-6 font-bold text-white">
                Welcome to <br className="hidden sm:block" /> Fitness Tracker
              </h1>
              <p className="text-lg md:text-xl opacity-80 leading-relaxed max-w-2xl mb-8 text-white">
                Track your progress, hit your goals, and master your body with our all-in-one elite fitness platform.
              </p>
              
              <Link to="/login">
              <button className="w-full sm:w-auto px-10 py-4 border-2 border-white rounded-full bg-transparent hover:bg-white text-white hover:text-black font-semibold transition-all duration-300 text-lg uppercase tracking-widest cursor-pointer">
                Start Today &gt;
              </button>
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-20 md:py-32 space-y-32 ">
        
        {/* Section Wrapper Component Logic */}
        {[
          { img: runImg, title: "Cardio", text: "Boost endurance and heart health. Track every heartbeat.", reverse: false },
          { img: weightImg, title: "Weight Lifting", text: "Build raw strength. Log sets, reps, and personal bests.", reverse: true },
          { img: calisthenicsImg, title: "Calisthenics", text: "Master bodyweight control. From pull-ups to muscle-ups.", reverse: false }
        ].map((item, index) => (
          <section key={index} className="w-full">
            <div className=" px-6">
              <div className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
                <div className="w-full lg:w-1/2">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-[350px] md:h-[500px] object-cover rounded-3xl ring-offset-4 ring-offset-[#111] hover:ring-2 ring-white transition-all duration-500" 
                  />
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 font-['Bricolage_Grotesque']">{item.title}</h2>
                  <p className="text-white text-xl md:text-2xl leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Call to Action - Constrained */}
      <section className="w-full mb-32">
        <div className=" px-6">
          <div className="bg-[#141421] border border-white/20 rounded-[40px] p-10 md:p-24 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Join the Elite</p>
              <h2 className="text-4xl md:text-7xl font-bold leading-tight max-w-2xl">
                Starting is hard. <br/> We make it easy.
              </h2>
              <button href="<>" className="bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all text-lg cursor-pointer">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141421] py-20">
        <div className="px-6 text-center">
          <p className="text-2xl font-semibold mb-12">Proudly Collaborating With</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-60 mb-20">
             {/* Map through your images here */}
             <img src={nikeImg} alt="Nike" className="h-12 mx-auto" />
             <img src={adidasImg} alt="Adidas" className="h-12 mx-auto" />
             <img src={jordanImg} alt="Jordan" className="h-12 mx-auto" />
             <img src={gymsharkImg} alt="Gymshark" className="h-12 mx-auto" />
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-500">
            <p>© 2026 FitX Fitness Tracker. All Rights Reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;