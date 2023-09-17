import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

function LegoAnimation() {
  const animationRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationRef.current, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animation.json' // the path to the animation json
    });
    anim.setSpeed(3.4);

    // Cleanup the animation instance on component unmount
    return () => {
      anim.destroy();
    };
  }, []);

  return <div ref={animationRef} style={{ width: '30%', height: '30%', backgroundColor: '#E31E24' }} />;

}

export default LegoAnimation;
