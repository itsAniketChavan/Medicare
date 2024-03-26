import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/aboutCardImg.png";
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          {/* About image */}

          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 ">
            <img src={aboutImg} alt="" />
            <div
              className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30] md:right-[-7%] 
                lg:right-[22%]"
            >
              <img src={aboutCardImg} alt="" />
            </div>
          </div>

          {/* ----About-Content---- */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2 ">
            <h2 className="heading">Proud to be one of the nations best</h2>
            <p className="text__para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              dolorem quae molestias perspiciatis expedita aliquam eaque
              incidunt magnam odio neque nostrum id unde, quasi reprehenderit?
              Repellat laudantium nobis nihil ipsam.
            </p>
            <p className="text__para mt-[30px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              labore asperiores recusandae, officiis quo placeat? Iusto officia
              inventore, suscipit iure ad odit porro. Dicta maiores praesentium
              assumenda, temporibus vero pariatur!
            </p>
            <Link to="/" >
                <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
