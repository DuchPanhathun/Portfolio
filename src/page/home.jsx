import React from "react";
import Nav from "../components/nav";
import Section1 from "../components/section1.jsx";
import { Helmet } from "react-helmet-async";
import "../../public/css/home.css"
import Section2 from "../components/section2.jsx";
import Section3 from "../components/section3.jsx";
import Section4 from "../components/section4.jsx";
import Section5 from "../components/section5.jsx";

const Home = () => {
  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add('show');
  //       } else {
  //         entry.target.classList.remove('show');
  //       }
  //     });
  //   });

  //   const hiddenElements = document.querySelectorAll('.hidden');
  //   hiddenElements.forEach((el) => observer.observe(el));

  //   // Cleanup observer on component unmount
  //   return () => {
  //     hiddenElements.forEach((el) => observer.unobserve(el));
  //   };
  // }, []);
  return (
    <div >
      <Helmet>
        <title>Thun - Portfolio of Duch Panhathun | Creative Projects and Works</title>
        <meta name="description" content="Welcome to my official portfolio website, a curated space where I proudly showcase the culmination of my creative endeavors. Here, you'll find a comprehensive display of completed projects that reflect my skills, passion, and dedication, alongside exciting works currently in progress, providing a dynamic glimpse into my evolving artistic journey." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.duchpanhathun.xyz/" />
        
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://duchpanhathun.xyz" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thun - Portfolio of Duch Panhathun" />
        <meta property="og:description" content="Welcome to my official portfolio website, a curated space where I proudly showcase the culmination of my creative endeavors. Here, you'll find a comprehensive display of completed projects that reflect my skills, passion, and dedication, alongside exciting works currently in progress, providing a dynamic glimpse into my evolving artistic journey." />
        <meta property="og:image" content="https://media.licdn.com/dms/image/D5603AQGJV9inu2faiA/profile-displayphoto-shrink_400_400/0/1718933205181?e=1724284800&v=beta&t=r20uvTQM2rCfP5RjmTJHmRFpsnxfJh4hf0lOCocmXBk" />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="duchpanhathun.xyz" />
        <meta property="twitter:url" content="https://duchpanhathun.xyz" />
        <meta name="twitter:title" content="Thun - Portfolio of Duch Panhathun" />
        <meta name="twitter:description" content="Welcome to my official portfolio website, a curated space where I proudly showcase the culmination of my creative endeavors. Here, you'll find a comprehensive display of completed projects that reflect my skills, passion, and dedication, alongside exciting works currently in progress, providing a dynamic glimpse into my evolving artistic journey." />
        <meta name="twitter:image" content="https://media.licdn.com/dms/image/D5603AQGJV9inu2faiA/profile-displayphoto-shrink_400_400/0/1718933205181?e=1724284800&v=beta&t=r20uvTQM2rCfP5RjmTJHmRFpsnxfJh4hf0lOCocmXBk" />
      </Helmet>
      <Nav />
      <Section1 />
      <Section3/>
      <Section2/>
      <Section5/>
      <Section4/>
    </div>
  );
}

export default Home;