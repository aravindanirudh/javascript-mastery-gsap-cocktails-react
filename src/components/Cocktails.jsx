import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { cocktailLists, mockTailLists } from '../../constants/index.js'

const Cocktails = () => {
 useGSAP(() => {
	const parallaxTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#cocktails', // Trigger the animation when the #cocktails section is in view
		start: 'top 30%', // Start animation when top of section reaches 30% of viewport height
		end: 'bottom 80%', // End animation when bottom of section reaches 80% of viewport height
		scrub: true, // Smooth scrubbing, ties animation progress to scrollbar position
	 }
	})
	
	parallaxTimeline // Create a parallax effect for the left and right leaf images
	 .from('#c-left-leaf', {
		x: -100, y: 100 // Move left leaf from left and down
	})
	 .from('#c-right-leaf', {
		x: 100, y: 100 // Move right leaf from right and down
	})
 })
 
 return (
	<section id="cocktails" className="noisy">
	 <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
	 <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />
	 
	 <div className="list">
		<div className="popular">
		 <h2>Most popular cocktails:</h2>
		 
		 <ul>
			{cocktailLists.map(({ name, country, detail, price }) => (
			 <li key={name}>
				<div className="md:me-28">
				 <h3>{name}</h3>
				 <p>{country} | {detail}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
		
		<div className="loved">
		 <h2>Most loved mocktails:</h2>
		 
		 <ul>
			{mockTailLists.map(({ name, country, detail, price }) => (
			 <li key={name}>
				<div className="me-28">
				 <h3>{name}</h3>
				 <p>{country} | {detail}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
	 </div>
	</section>
 )
}

export default Cocktails
