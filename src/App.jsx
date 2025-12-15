import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Cocktails from './components/Cocktails.jsx'
import About from './components/About.jsx'
import Art from './components/Art.jsx'
import Menu from './components/Menu.jsx'
import Contact from './components/Contact.jsx'

// Register GSAP plugins. Why here? Because App is the root component and this ensures plugins are registered once. Otherwise, registering in other components may lead to multiple registrations and unexpected behavior
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
 return (
	<main>
	 <Navbar />
	 <Hero />
	 <Cocktails />
	 <About />
	 <Art />
	 <Menu />
	 <Contact />
	</main>
 )
}

export default App
