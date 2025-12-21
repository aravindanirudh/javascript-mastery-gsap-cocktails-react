import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../constants/index.js'

const Navbar = () => {
 useGSAP(() => {
	const navTween = gsap.timeline({
	 scrollTrigger: {
		trigger: 'nav', // Element to trigger the animation
		start: 'bottom top' // Start when the bottom of the nav hits the top of the viewport
	 }
	});
	
	navTween.fromTo('nav', { backgroundColor: 'transparent' }, {
	 backgroundColor: '#00000050', // Semi-transparent black
	 backdropFilter: 'blur(10px)', // In tutorial, it was backgroundFilter but there is no such CSS property so it must be backdropFilter
	 duration: 1, // 1 second duration
	 ease: 'power1.inOut',
	});
 })
 
 return (
	<nav>
	 <div>
		<a href="#home" className="flex items-center gap-2">
		 <img src="/images/logo.png" alt="logo" />
		 <p>Velvet Pour</p>
		</a>
		
		<ul>
		 {navLinks.map((link) => (
			<li key={link.id}>
			 <a href={`#${link.id}`}>{link.title}</a>
			</li>
		 ))}
		</ul>
	 </div>
	</nav>
 )
}

export default Navbar