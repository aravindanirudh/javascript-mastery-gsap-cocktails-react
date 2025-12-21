import { useGSAP } from "@gsap/react"; // React hook that safely runs GSAP animations and handles cleanup automatically
import gsap from "gsap"; // Core GSAP animation engine
import { SplitText } from "gsap/all"; // GSAP plugin that splits text into characters, words, or lines for detailed animations
import { useRef } from "react"; // Used to reference the <video> DOM element
import { useMediaQuery } from "react-responsive"; // Hook for handling responsive design based on media queries (used to change scroll behavior based on device)

const Hero = () => {
 const videoRef = useRef(); // Stores a reference to the <video> element. Required because GSAP cannot directly manipulate React refs. Later used to animate currentTime
 
 const isMobile = useMediaQuery({ maxWidth: 767 }); // Returns true if screen width<=767px
 
 useGSAP(() => {
	// Targets .title → <h1 className="title">MOJITO</h1>
	// Splits text into characters and words for animation
	// GSAP wraps each character in a <span>
	// Result (concpetual): <h1><span class="char">M</span><span class="char">O</span>...</h1> or <span>M</span><span>O</span><span>J</span><span>I</span><span>T</span><span>O</span>
	const heroSplit = new SplitText(".title", {	
	 type: "chars, words", 
	});
	
	// Targets .subtitle → <p className="subtitle">...</p>
	// Splits text into lines for animation
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	 
	// Apply text-gradient class to heroSplit.chars once before animating to each character. Done before animation. Ensures gradient animates together with movement. Why not in CSS directly? Because characters don’t exist until SplitText runs
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	// Animate each character from yPercent: 100 (below view) to yPercent: 0 (normal position)
	// Each character starts 100% below its position and lides upward into place
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out", // Fast start, smooth landing
	 stagger: 0.06, // Characters animate one after another
	});
	
	// Each line starts 100% below its position and slides upward into place
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1, // Delay so that subtitle animation starts after hero title animation. Without delay, there will be too many elements animating at once and it looks messy
	});
	
	// Leaf and arrow scroll animations
	// Moves right leaf down 200px, left leaf up 200px, arrow down 100px as user scrolls through #hero section
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true, // Links animation progress to scroll progress
	 },
	})
	.to(".right-leaf", { y: 200 }, 0)
	.to(".left-leaf", { y: -200 }, 0)
	.to(".arrow", { y: 100 }, 0);
	
	// Different end values for mobile and desktop for better effect
	// On mobile, video scrolls out of view faster due to smaller screen height
	const startValue = isMobile ? "top 50%" : "center 60%"; // When video is halfway visible on mobile, 60% visible on desktop
	const endValue = isMobile ? "120% top" : "bottom top"; // When video is fully out of view on mobile, fully out of view on desktop

	// Video scroll animation
	// Animates video currentTime from 0 to video duration as user scrolls through the video
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true, // Links animation progress to scroll progress
		pin: true, // Pins video in place during scroll
	 },
	});
	
	// Waits until video metadata loads
	// Then animates video currentTime from 0 to video duration
	// Scroll position controls playback
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
 }, []); // Empty dependency array ensures this runs once on mount
 
 return (
	<>
	 <section id="hero" className="noisy">
		<h1 className="title">MOJITO</h1>
		
		<img
		 src="/images/hero-left-leaf.png"
		 alt="left-leaf"
		 className="left-leaf"
		/>
		<img
		 src="/images/hero-right-leaf.png"
		 alt="right-leaf"
		 className="right-leaf"
		/>
		
		<div className="body">
		 {/* <img src="/images/arrow.png" alt="arrow" className="arrow" /> */}
		 
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Cool. Crisp. Classic.</p>
			 <p className="subtitle">
				Sip the Spirit <br /> of Summer
			 </p>
			</div>
			
			<div className="view-cocktails">
			 <p className="subtitle">
				Every cocktail on our menu is a blend of premium ingredients,
				creative flair, and timeless recipes — designed to delight your
				senses.
			 </p>
			 <a href="#cocktails">View cocktails</a>
			</div>
		 </div>
		</div>
	 </section>
	 
	 {/* Video container positioned absolutely to cover entire viewport and separated from noisy overlay */}
	 <div className="video absolute inset-0">
		<video
		 ref={videoRef} // Reference to <video> element for GSAP animation
		 muted // Mute video to allow autoplay in browsers
		 playsInline // Hides player controls
		 preload="auto" // Preload video for smoother playback
		 src="/videos/output.mp4"
		/>
	 </div>
	</>
 );
};

export default Hero;