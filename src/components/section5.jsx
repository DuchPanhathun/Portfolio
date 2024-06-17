import React from "react";
import "../../public/css/section5.scss";

const Section5 = () => {
    return (
        <div className="section5">
            <div className="animation-title-achievement">
                <h1 className='title-achievement'>My Skill</h1>
            </div>
            <div className="section5-container">
                <div class="wrapper">
                    <div class="container">
                        <div class="label one">HTML</div>
                        <div class="progress-bar">
                            <div class="progress fill-1">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label two">CSS</div>
                        <div class="progress-bar">
                            <div class="progress fill-2">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label three">JavaScript</div>
                        <div class="progress-bar">
                            <div class="progress fill-3">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label four">Bootstrap</div>
                        <div class="progress-bar">
                            <div class="progress fill-4">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                <div class="container">
                        <div class="label five">React</div>
                        <div class="progress-bar">
                            <div class="progress fill-5">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label six">Python</div>
                        <div class="progress-bar">
                            <div class="progress fill-6">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label seven">C++</div>
                        <div class="progress-bar">
                            <div class="progress fill-7">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div class="label eight">Figma</div>
                        <div class="progress-bar">
                            <div class="progress fill-8">
                                <div class="glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Section5;