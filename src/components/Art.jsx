import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { featureLists, goodLists } from '../../constants/index.js'

const Art = () => {
 const isMobile = useMediaQuery({ maxWidth: 767 });
 
 useGSAP(() => {
	const start = isMobile ? 'top 20%' : 'top top'; // Adjust start position based on device
	
	// As the user scrolls, pin the section, fade out the text element (bullet points) with class 'will-fade', scale and reveal the image mask and fade in closing message at the bottom. All tof this will be linked to the scroll of the mouse wheel
	const maskTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#art',
		start,
		end: 'bottom center', // End animation when bottom of section reaches center of viewport
		scrub: 1.5, // Smooth scrubbing, takes 1.5 seconds to "catch up" to the scrollbar
		pin: true // Pin the section during the animation
	 }
	})
	
	maskTimeline
	 .to('.will-fade', { opacity: 0, stagger: 0.2, ease: 'power1.inOut', }) // Fade out bullet points
	 .to('.masked-img', { scale: 1.3, maskPosition: 'center', maskSize: '400%', duration: 1, ease: 'power1.inOut '}) // Scale up and reveal the mask
	 .to('#masked-content', { opacity: 1, duration: 1, ease: 'power1.inOut'}) // Fade in closing message
 })
 
 return (
	<div id="art">
	 <div className="container mx-auto h-full pt-20">
		<h2 className="will-fade">The ART</h2>
		
		{/* Features list (handpicked ingredients, ....) */}
		<div className="content">
		 <ul className="space-y-4 will-fade">
			{goodLists.map((feature, index) => (
			 <li key={index} className="flex items-center gap-2">
				<img src="/images/check.png" alt="check" />
				<p>{feature}</p>
			 </li>
			))}
		 </ul>
		 
		 {/* Cocktail image container */}
		 {/* masked-img class contains CSS that applies the mask as well as mask image */}
		 <div className="cocktail-img">
			<img
				src="/images/under-img.jpg" // Image of the bartender pouring cocktail
				alt="cocktail"
				className="abs-center masked-img size-full object-contain"
			/>
		 </div>
		 
		 {/* Feature list (perfectly balanced blends, ...) */}
		 <ul className="space-y-4 will-fade">
			{featureLists.map((feature, index) => (
			 <li key={index} className="flex items-center justify-start gap-2">
				<img src="/images/check.png" alt="check" />
				<p className="md:w-fit w-60">{feature}</p>
			 </li>
			))}
		 </ul>
		</div>
		
		{/* Masked content container */}
		<div className="masked-container">
		 <h2 className="will-fade">Sip-Worthy Perfection</h2>
		 <div id="masked-content">
			<h3>Made with Craft, Poured with Passion</h3>
			<p>This isn't just a drink. It's a carefully crafted moment made just for you.</p>
		 </div>
		</div>
	 </div>
	</div>
 )
}
export default Art
