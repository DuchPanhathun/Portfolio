import React from "react";
import Nav from "../components/nav";
import Section1 from "../components/section1.jsx";
import "../../public/css/home.css"
import Section2 from "../components/section2.jsx";
import Section3 from "../components/section3.jsx";
import Section4 from "../components/section4.jsx";
import Section5 from "../components/section5.jsx";
import Menu from "../components/menu.jsx";

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
    <div>
      <Menu/>
      <Nav/>
      <Section1 />
      <Section3/>
      <Section2/>
      <Section5/>
      <Section4/>
    </div>
  );
}

export default Home;