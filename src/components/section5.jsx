import React from "react";
import "../../public/css/section5.scss";

const Section5 = () => {
    return (
        <div className="section5">
            <div className="animation-title-achievement">
                <h1 className='title-achievement'>My Skill</h1>
            </div>
            <div className="section5-container">
                <div className="wrapper">
                    <div className="container">
                        <div className="label one">HTML</div>
                        <div className="progress-bar">
                            <div className="progress fill-1">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label two">CSS</div>
                        <div className="progress-bar">
                            <div className="progress fill-2">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label three">JavaScript</div>
                        <div className="progress-bar">
                            <div className="progress fill-3">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label four">Bootstrap</div>
                        <div className="progress-bar">
                            <div className="progress fill-4">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                <div className="container">
                        <div className="label five">React</div>
                        <div className="progress-bar">
                            <div className="progress fill-5">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label six">Python</div>
                        <div className="progress-bar">
                            <div className="progress fill-6">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label seven">C++</div>
                        <div className="progress-bar">
                            <div className="progress fill-7">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="label eight">Figma</div>
                        <div className="progress-bar">
                            <div className="progress fill-8">
                                <div className="glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Section5;