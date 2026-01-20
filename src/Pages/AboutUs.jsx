// import filter from "daisyui/components/filter/index.js";
import HomeLayout from "../Layouts/HomeLayout.jsx";
import aboutImage from "../imge/AboutImage.png";
import apj from "../imge/apj.png";
import billGetes from "../imge/billGates.png";
import einstine from "../imge/einstines.png";
import melsonMandel from "../imge/melsonMandela.png";
import setveJobs from "../imge/setveJobs.png";

const AboutUs = () => {
  return (
    <>
      <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white">
          <div className="flex items-center gap-5 mx-10">
            <section className="w-1/2 space-y-10">
              <h1 className="text-4xl text-yellow-500 font-semibold">
                Affordable and quality education
              </h1>
              <p className="text-xl text-gray-200">
                Our gole is to provide the afoordable and quality education to
                the word. we are providing the platform for the aspiringn
                teachers and students to share their skills creativity and
                knowledge to each other to empower and contribute in the growth
                and wellness of mankind.
              </p>
            </section>

            <div className="w-1/2">
              <img
                src={aboutImage}
                alt="about main image"
                className="drop-shadow-2xl"
                id="testl"
                style={{
                  filter: "drop-shadow(0px 10px 10px rgb(0 0 0)",
                }}
              />
            </div>
          </div>

          {/* carousel */}
          <div className="carousel w-1/2 my-16 m-auto ">
            <div id="slide1" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img
                  src={apj}
                  className="w-40 rounded-[100%] border-2 border-gray-400"
                />
                <p className="text-xl text-gray-200">
                  {
                    "Education is mot powerfull tool you can use to change the world."
                  }
                </p>
                <h1 className="text-2xl font-semibold">A. P. J. Abdul Kalam</h1>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className= "btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img
                  src={billGetes}
                  className="w-40 rounded-[100%] border-2 border-gray-400"
                />
                <p className="text-xl text-gray-200">
                  {
                    "Don’t compare yourself with anyone in this world. If you do so, you are insulting yourself."
                  }
                </p>
                <h1 className="text-2xl font-semibold">Bill Gates</h1>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>

            <div id="slide3" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img
                  src={setveJobs}
                  className="w-40 rounded-[100%] border-2 border-gray-400"
                />
                <p className="text-xl text-gray-200">
                  {
                    "Your time is limited, so don’t waste it living someone else’s life."
                  }
                </p>
                <h1 className="text-2xl font-semibold">Steve Jobs</h1>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img
                  src={melsonMandel}
                  className="w-40 rounded-[100%] border-2 border-gray-400"
                />
                <p className="text-xl text-gray-200">
                  {
                    "Education is the most powerful weapon which you can use to change the world."
                  }
                </p>
                <h1 className="text-2xl font-semibold">Nelson Mandela</h1>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide3" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>

            <div id="slide5" className="carousel-item relative w-full">
              <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                <img
                  src={einstine}
                  className="w-40 rounded-[100%] border-2 border-gray-400"
                />
                <p className="text-xl text-gray-200">
                  {
                    "Education is not the learning of facts, but the training of the mind to think."
                  }
                </p>
                <h1 className="text-2xl font-semibold">Albert Einstein</h1>
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default AboutUs;
